import { getAdminSupabase, getEnv } from '@/pipeline/utils';

export const PRICE_ID_MAP: Record<string, string> = {
  [getOptionalEnv('STRIPE_PRICE_ID_PLAN_01')]: '01',
  [getOptionalEnv('STRIPE_PRICE_ID_PLAN_02')]: '02',
  [getOptionalEnv('STRIPE_PRICE_ID_PLAN_03')]: '03',
  [getOptionalEnv('STRIPE_PRICE_ID_PLAN_04')]: '04',
};

function getOptionalEnv(name: string): string {
  if (typeof process !== 'undefined' && process.env?.[name]) return process.env[name] as string;
  if (typeof import.meta !== 'undefined' && import.meta.env?.[name]) {
    return import.meta.env[name] as string;
  }
  return '';
}

function assertServerOnly() {
  if (typeof window !== 'undefined') {
    throw new Error('Stripe server utilities must not run in the browser');
  }
}

function stripeHeaders() {
  return {
    Authorization: `Bearer ${getEnv('STRIPE_SECRET_KEY')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
}

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  userEmail: string,
): Promise<string> {
  assertServerOnly();

  const successUrl = `${getOptionalEnv('SITE_URL') || 'http://localhost:8080'}/dashboard?checkout=success`;
  const cancelUrl = `${getOptionalEnv('SITE_URL') || 'http://localhost:8080'}/pricing?checkout=cancelled`;
  const params = new URLSearchParams({
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: userEmail,
    client_reference_id: userId,
    'metadata[user_id]': userId,
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    allow_promotion_codes: 'true',
  });

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: stripeHeaders(),
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Stripe checkout session failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  if (!payload.url) {
    throw new Error('Stripe did not return a checkout URL');
  }

  return payload.url;
}

export async function getSubscriptionStatus(userId: string): Promise<{
  status: string;
  plan: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
} | null> {
  assertServerOnly();

  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from('subscriptions')
    .select('status, plan, current_period_end, cancel_at_period_end')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const encoder = new TextEncoder();

function getEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function priceIdMap(): Record<string, string> {
  return {
    [Deno.env.get("STRIPE_PRICE_ID_PLAN_01") ?? ""]: "01",
    [Deno.env.get("STRIPE_PRICE_ID_PLAN_02") ?? ""]: "02",
    [Deno.env.get("STRIPE_PRICE_ID_PLAN_03") ?? ""]: "03",
    [Deno.env.get("STRIPE_PRICE_ID_PLAN_04") ?? ""]: "04",
  };
}

function parseStripeSignature(header: string): { timestamp: string; signatures: string[] } {
  const parts = header.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3));

  if (!timestamp || signatures.length === 0) {
    throw new Error("Malformed Stripe signature header");
  }

  return { timestamp, signatures };
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySignature(rawBody: string, signatureHeader: string): Promise<boolean> {
  const { timestamp, signatures } = parseStripeSignature(signatureHeader);
  const secret = getEnv("STRIPE_WEBHOOK_SECRET");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signedPayload = `${timestamp}.${rawBody}`;
  const digest = toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload)));

  return signatures.includes(digest);
}

async function stripeGet(path: string) {
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${getEnv("STRIPE_SECRET_KEY")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Stripe API read failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

function subscriptionPayload(subscription: any, userId: string | null, customerId: string | null) {
  const priceId = subscription.items?.data?.[0]?.price?.id ?? null;
  return {
    user_id: userId ?? subscription.metadata?.user_id,
    stripe_customer_id: customerId ?? subscription.customer,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    status: subscription.status ?? "inactive",
    plan: priceIdMap()[priceId ?? ""] ?? null,
    current_period_start: subscription.current_period_start
      ? new Date(subscription.current_period_start * 1000).toISOString()
      : null,
    current_period_end: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
    cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !(await verifySignature(rawBody, signature))) {
    return new Response(JSON.stringify({ error: "Invalid Stripe signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const event = JSON.parse(rawBody);
  const supabase = createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  });

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const subscriptionId = session.subscription;
      const subscription = await stripeGet(`/subscriptions/${subscriptionId}`);
      const userId = session.client_reference_id ?? session.metadata?.user_id;
      const payload = subscriptionPayload(subscription, userId, session.customer);

      if (!payload.user_id) throw new Error("Missing user_id for checkout session");

      const { error } = await supabase.from("subscriptions").upsert(payload, {
        onConflict: "user_id",
      });
      if (error) throw error;
    }

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      const payload = subscriptionPayload(subscription, subscription.metadata?.user_id ?? null, null);
      const { error } = await supabase
        .from("subscriptions")
        .update(payload)
        .eq("stripe_subscription_id", subscription.id);
      if (error) throw error;
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const { error } = await supabase
        .from("subscriptions")
        .update({
          status: "cancelled",
          cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
        })
        .eq("stripe_subscription_id", subscription.id);
      if (error) throw error;
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return new Response(JSON.stringify({ error: "Webhook handling failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

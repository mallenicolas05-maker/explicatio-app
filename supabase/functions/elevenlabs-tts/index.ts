import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Whitelist of allowed ElevenLabs voice IDs
const ALLOWED_VOICE_IDS = new Set([
  "CwhRBWXzGAHq8TQ4Fs17", // Roger
  "EXAVITQu4vr4xnSDxMaL", // Sarah
  "FGY2WhTYpPnrIDTdsKH5", // Laura
  "IKne3meq5aSn9XLyUdCD", // Charlie
  "JBFqnCBsd6RMkjVDRZzb", // George (default)
  "N2lVS1w4EtoT3dr4eOWO", // Callum
  "SAz9YHcvj6GT2YYXdXww", // River
  "TX3LPaxmHKxFdv7VOQHJ", // Liam
  "Xb7hH8MSUJpSbSDYk0k2", // Alice
  "XrExE9yKIg1WjnnlVkGX", // Matilda
  "bIHbv24MWmeRgasZH58o", // Will
  "cgSgspJ2msm6clMCkdW9", // Jessica
  "cjVigY5qzO86Huf0OWal", // Eric
  "iP95p4xoKVk53GoZ742B", // Chris
  "nPczCjzI2devNBz1zQrb", // Brian
  "onwK4e9ZLuTAKqWW03F9", // Daniel
  "pFZP5JQG7iQjIQuC4Bku", // Lily
  "pqHfZKP75CvOlQylNhV4", // Bill
]);

// Validate text input - only allow reasonable characters and length
function validateText(text: unknown): { valid: boolean; error?: string; sanitized?: string } {
  if (typeof text !== 'string') {
    return { valid: false, error: "Text must be a string" };
  }
  
  if (text.length === 0) {
    return { valid: false, error: "Text is required" };
  }
  
  if (text.length > 5000) {
    return { valid: false, error: "Text must be 5000 characters or less" };
  }
  
  // Basic sanitization - remove control characters except newlines and tabs
  const sanitized = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  return { valid: true, sanitized };
}

// Validate voiceId against whitelist
function validateVoiceId(voiceId: unknown): { valid: boolean; error?: string } {
  if (voiceId === undefined || voiceId === null) {
    return { valid: true }; // Will use default
  }
  
  if (typeof voiceId !== 'string') {
    return { valid: false, error: "Voice ID must be a string" };
  }
  
  if (!ALLOWED_VOICE_IDS.has(voiceId)) {
    return { valid: false, error: "Invalid voice ID" };
  }
  
  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error("JWT validation failed:", claimsError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // User authenticated successfully - don't log user ID for privacy
    console.log('Authenticated TTS request received');

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { text, voiceId = "JBFqnCBsd6RMkjVDRZzb" } = body;

    // Validate text input
    const textValidation = validateText(text);
    if (!textValidation.valid) {
      return new Response(
        JSON.stringify({ error: textValidation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate voiceId
    const voiceValidation = validateVoiceId(voiceId);
    if (!voiceValidation.valid) {
      return new Response(
        JSON.stringify({ error: voiceValidation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY is not configured");
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    console.log(`Generating TTS, text length: ${textValidation.sanitized!.length}, voice: ${voiceId}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textValidation.sanitized,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Speech generation failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error in elevenlabs-tts function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planName: string;
  amount: number;
  email: string;
  priceId?: string;
  successUrl?: string;
  cancelUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) throw new Error("Stripe is not configured");

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

    const { planName, amount, email, priceId, successUrl, cancelUrl }: CheckoutRequest = await req.json();

    if (!email) throw new Error("Missing required field: email");

    const finalSuccessUrl = successUrl || "https://ownyourai.org/thank-you?session_id={CHECKOUT_SESSION_ID}";
    const finalCancelUrl = cancelUrl || "https://ownyourai.org/products";

    let sessionConfig: any = {
      payment_method_types: ["card"],
      customer_email: email,
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: { planName, site: "ownyourai" },
    };

    if (priceId) {
      // Use canonical price ID — one-time payment
      sessionConfig.mode = "payment";
      sessionConfig.line_items = [{ price: priceId, quantity: 1 }];
    } else {
      // Legacy: price_data path
      if (!planName || !amount) throw new Error("Missing required fields: planName or amount");
      sessionConfig.mode = "payment";
      sessionConfig.line_items = [{
        price_data: {
          currency: "aud",
          product_data: { name: planName, description: `Own Your AI — ${planName}` },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Log to Supabase
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      await supabase.from("subscriptions").insert({
        user_email: email,
        plan_name: planName,
        stripe_session_id: session.id,
        amount_cents: amount ? Math.round(amount * 100) : null,
        status: "pending",
      });
    } catch (dbErr) {
      console.error("DB log error (non-fatal):", dbErr);
    }

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Checkout session error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TrialEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  aiUseCase?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, company, aiUseCase }: TrialEmailRequest = await req.json();

    console.log("Sending trial welcome email to:", email);

    const emailResponse = await resend.emails.send({
      from: "OwnMyAI <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Your 14-Day Free Trial!",
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1f2937; margin-bottom: 20px;">Welcome to OwnMyAI, ${firstName}!</h1>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Thank you for signing up for our 14-day free trial. We're excited to help you protect your AI assets and maintain control over your data.
          </p>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h2 style="color: white; margin: 0 0 16px 0; font-size: 20px;">Your Trial Includes:</h2>
            <ul style="color: white; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Full access to all AI asset protection features</li>
              <li>Real-time monitoring and alerts</li>
              <li>Advanced encryption protocols</li>
              <li>24/7 support from our team</li>
              <li>Custom integration assistance</li>
            </ul>
          </div>

          ${company ? `<p style="color: #374151; font-size: 14px;"><strong>Company:</strong> ${company}</p>` : ''}
          ${aiUseCase ? `<p style="color: #374151; font-size: 14px;"><strong>AI Use Case:</strong> ${aiUseCase}</p>` : ''}

          <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
            <h3 style="color: #1f2937; margin-bottom: 12px;">Next Steps:</h3>
            <ol style="color: #374151; line-height: 1.8;">
              <li>Check your inbox for your login credentials</li>
              <li>Access the dashboard and explore the features</li>
              <li>Schedule a demo with our team if needed</li>
            </ol>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            If you have any questions, feel free to reach out to us at 
            <a href="mailto:troy@ownyourai.org" style="color: #667eea;">troy@ownyourai.org</a>
          </p>

          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            <strong>OwnMyAI</strong> by Tech 4 Humanity<br>
            Protecting your AI assets, one byte at a time.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-trial-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { RESEND_API_KEY, RESEND_FROM_EMAIL } = context.env;

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (!RESEND_FROM_EMAIL) {
      return new Response(JSON.stringify({ error: "Missing RESEND_FROM_EMAIL" }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    const payload = await context.request.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim();
    const store = String(payload?.store || "").trim();
    const volume = String(payload?.volume || "").trim();
    const gateway = String(payload?.gateway || "").trim();
    const message = String(payload?.message || "").trim();

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: ["support@getfincile.com"],
        reply_to: email || undefined,
        subject: `New Audit Request — ${name || "Unknown"}`,
        text: [
          "A new audit request has been submitted from the Fincile website.",
          "",
          `Name: ${name}`,
          `Business Email: ${email}`,
          `Shopify Store URL: ${store}`,
          `Monthly Order Volume: ${volume}`,
          `Primary Payment Gateway: ${gateway}`,
          `Message: ${message}`,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();

      return new Response(JSON.stringify({ error: "Failed to send email", details }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Unexpected server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
};

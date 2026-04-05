const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL || "Fincile <onboarding@resend.dev>";

  if (!resendApiKey) {
    return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const payload = await request.json();
  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const store = String(payload?.store || "").trim();
  const volume = String(payload?.volume || "").trim();
  const gateway = String(payload?.gateway || "").trim();
  const message = String(payload?.message || "").trim();

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: ["support@getfincile.com"],
      reply_to: email || undefined,
      subject: `New Audit Request - ${name || "Unknown"}`,
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
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

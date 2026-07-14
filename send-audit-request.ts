interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  // Optional — add these to actually capture leads into HubSpot + Klaviyo.
  // If either is missing, that integration is silently skipped (the email
  // notification below still works exactly as before).
  HUBSPOT_ACCESS_TOKEN?: string; // HubSpot Settings -> Integrations -> Private Apps -> create app with "crm.objects.contacts.write" scope
  KLAVIYO_PUBLIC_API_KEY?: string; // Klaviyo public "Company ID" (safe to expose) — Fincile's is XEsQGu
  KLAVIYO_LIST_ID?: string; // Klaviyo list to subscribe leads to — Fincile's "Payout Checklist Leads" list is SJABSE
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

// Creates the contact in HubSpot if it doesn't exist yet, or updates it if it does.
// Only sends the default properties every HubSpot portal already has, so this
// never fails due to an undefined custom property.
async function upsertHubSpotContact(
  token: string,
  { name, email, store, volume, gateway, message }: Record<string, string>
) {
  const [firstname, ...rest] = name.split(" ");
  const lastname = rest.join(" ");

  const properties: Record<string, string> = { email };
  if (firstname) properties.firstname = firstname;
  if (lastname) properties.lastname = lastname;
  if (store) properties.website = store;

  const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) return { ok: true, action: "created" };

  // 409 = contact with this email already exists — look it up and update instead.
  if (createRes.status === 409) {
    const body = await createRes.json().catch(() => null);
    const existingId: string | undefined =
      body?.message?.match(/Existing ID:\s*(\d+)/)?.[1];

    if (existingId) {
      const updateRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties }),
        }
      );
      return { ok: updateRes.ok, action: "updated" };
    }
  }

  const details = await createRes.text().catch(() => "");
  return { ok: false, action: "failed", details };
}

// Subscribes the lead to a Klaviyo list using the public Company/Site ID —
// this is the same public key Klaviyo's own JS snippet uses, safe to call
// from a server (or even a browser) with no secret involved.
async function subscribeToKlaviyo(
  publicApiKey: string,
  listId: string,
  { name, email }: Record<string, string>
) {
  const [first_name, ...rest] = name.split(" ");
  const last_name = rest.join(" ");

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions?company_id=${publicApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email,
                  ...(first_name ? { first_name } : {}),
                  ...(last_name ? { last_name } : {}),
                },
              },
            },
          },
          relationships: {
            list: { data: { type: "list", id: listId } },
          },
        },
      }),
    }
  );

  return { ok: res.status === 202 || res.ok };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { RESEND_API_KEY, RESEND_FROM_EMAIL, HUBSPOT_ACCESS_TOKEN, KLAVIYO_PUBLIC_API_KEY, KLAVIYO_LIST_ID } =
      context.env;

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!RESEND_FROM_EMAIL) {
      return new Response(JSON.stringify({ error: "Missing RESEND_FROM_EMAIL" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = await context.request.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim();
    const store = String(payload?.store || "").trim();
    const volume = String(payload?.volume || "").trim();
    const gateway = String(payload?.gateway || "").trim();
    const message = String(payload?.message || "").trim();

    // Fire the lead into HubSpot + Klaviyo in parallel with the email send.
    // Neither is allowed to block or fail the user-facing request — if a key
    // is missing or the call errors, we just skip it and keep going.
    const integrations = { hubspot: "skipped" as string, klaviyo: "skipped" as string };

    const resendPromise = fetch("https://api.resend.com/emails", {
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

    const hubspotPromise = HUBSPOT_ACCESS_TOKEN
      ? upsertHubSpotContact(HUBSPOT_ACCESS_TOKEN, { name, email, store, volume, gateway, message })
          .then((r) => { integrations.hubspot = r.ok ? r.action : "failed"; })
          .catch(() => { integrations.hubspot = "failed"; })
      : Promise.resolve();

    const klaviyoPromise = KLAVIYO_PUBLIC_API_KEY && KLAVIYO_LIST_ID
      ? subscribeToKlaviyo(KLAVIYO_PUBLIC_API_KEY, KLAVIYO_LIST_ID, { name, email })
          .then((r) => { integrations.klaviyo = r.ok ? "subscribed" : "failed"; })
          .catch(() => { integrations.klaviyo = "failed"; })
      : Promise.resolve();

    const [resendResponse] = await Promise.all([resendPromise, hubspotPromise, klaviyoPromise]);

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      return new Response(JSON.stringify({ error: "Failed to send email", details }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, integrations }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Unexpected server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

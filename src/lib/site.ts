// Links and plan wording used across the site, kept in one place.

// The public Shopify App Store listing. (apps.shopify.com/fincile-revenue-
// reconciliation is a 404.)
export const SHOPIFY_APP_STORE_URL = 'https://apps.shopify.com/fincile';

// Existing merchants sign in to the app here.
export const APP_LOGIN_URL = 'https://app.getfincile.com';

// Mirrors the Fincile app's plan config (lib/billing.ts: Starter $29/month is
// the cheapest paid plan; the Free audit plan is free). The site is deployed
// separately from the app, so change both together.
export const PAID_PLANS_FROM = '$29/month';
export const PRICING_LINE = `Start with a free audit. Paid plans from ${PAID_PLANS_FROM}.`;
export const TRIAL_LINE = 'Free audit plan, plus a 14-day free trial on paid plans.';

// What syncs live and what needs a payout CSV (app: lib/auto-sync.ts).
export const SYNC_LINE = 'Live sync for Stripe and PayPal. Shopify Payments and 11+ other gateways by payout CSV upload.';

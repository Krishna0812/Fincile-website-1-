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

// Workspace product pricing wording. Billing runs in test mode, so nothing is charged yet.
export const WORKSPACE_PRICING_LINE = 'Free plan with no card. Paid plans from $29/month are in test mode and nothing is charged yet.';

// What syncs live and what needs a payout CSV (app: lib/auto-sync.ts).
export const SYNC_LINE = 'Live sync for Stripe and PayPal. Shopify Payments and 11+ other gateways by payout CSV upload.';

// Workspace product (general reconciliation). Sign up and log in live in the app.
export const APP_SIGNUP_URL = 'https://app.getfincile.com/signup';
export const APP_SIGNIN_URL = 'https://app.getfincile.com/signin';

/** Flip to true only after live payments are verified end to end (Dodo live mode on, live webhook delivering). */
export const LIVE_BILLING = false;

export function signupUrl(template?: string, plan?: string) {
  const q = new URLSearchParams();
  if (template) q.set('template', template);
  if (plan && plan !== 'free') q.set('plan', plan);
  const qs = q.toString();
  return qs ? `${APP_SIGNUP_URL}?${qs}` : APP_SIGNUP_URL;
}

// Mirrors the app's plan table (lib/billing.ts and lib/entitlements.ts). The site is
// deployed separately from the app, so change both together.
export const WORKSPACE_PLANS = [
  { key: 'free', name: 'Free', price: '$0', rows: '100', runs: '1 run per month', exports: false, history: '90 days' },
  { key: 'starter', name: 'Starter', price: '$29', rows: '500', runs: '4 runs per month', exports: true, history: '90 days' },
  { key: 'growth', name: 'Growth', price: '$79', rows: '2,000', runs: 'Unlimited runs', exports: true, history: '1 year' },
  { key: 'scale', name: 'Scale', price: '$179', rows: '8,000', runs: 'Unlimited runs', exports: true, history: 'Until you delete it' },
] as const;

// What works today. Keep this list in step with the app's adapter table (lib/recon/adapters/index.ts).
export const INTEGRATION_STATUS = [
  { name: 'CSV, TSV and Excel upload', status: 'Available', note: 'Any two files. Save your column choices as a template.' },
  { name: 'Shopify orders export', status: 'Available', note: 'Recognised automatically. This is a file upload, not a live connection.' },
  { name: 'Payment processor exports', status: 'Available', note: 'Stripe, PayPal, Shopify Payments, Square, Klarna, Afterpay, Authorize.net, Braintree, 2Checkout, Adyen and Razorpay headers are recognised. File upload only.' },
  { name: 'QuickBooks Online (read-only)', status: 'Beta, not switched on', note: 'OAuth connection that reads invoices, payments, deposits, bills and expenses. Tested against a simulated API only, not against an Intuit sandbox or a live company. Upload an export for now.' },
  { name: 'Live Shopify sync inside workspaces', status: 'Not built', note: 'Not available. Upload a Shopify orders export. The separate Shopify app syncs installed stores.' },
] as const;

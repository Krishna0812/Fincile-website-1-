import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Why doesn't my Shopify payout match my bank deposit?",
    a: "Shopify payouts rarely equal your gross sales because Shopify deducts transaction fees, refunds, chargebacks, and adjustments before sending the payout. The payout you receive is the net amount after all deductions. If the number still seems wrong, common causes are: a refund processed in Stripe but not reflected in Shopify, a duplicate charge from a webhook retry, or a settlement timing gap where an order from the previous period rolled into the next payout cycle. Fincile reconciles every order line-by-line against your Stripe and PayPal records to show you exactly where the discrepancy is."
  },
  {
    q: "How do I reconcile Shopify payouts with Stripe?",
    a: "To reconcile Shopify with Stripe manually, you export your Shopify payouts report and your Stripe balance transactions, then match each Shopify order ID to a corresponding Stripe charge. Refunds, fees, and currency conversions must all be accounted for separately. Fincile automates this entire process — it connects to both platforms, matches every transaction automatically, and flags any lines that don't add up, saving hours of spreadsheet work every month."
  },
  {
    q: "Why is my Shopify payout less than my sales total?",
    a: "Your Shopify payout is always less than your total sales because Shopify deducts: (1) Shopify Payments transaction fees, (2) refunds and returns issued during the payout period, (3) chargebacks and disputes, (4) Shopify balance adjustments, and (5) currency conversion fees if you sell in multiple currencies. If your payout is unexpectedly low, you may also have a missing payment — an order that shows as paid in Shopify but was never actually captured in your processor."
  },
  {
    q: "What causes Shopify payout discrepancies?",
    a: "The most common causes of Shopify payout discrepancies are: missing payments (orders settled in Shopify but not captured in Stripe/PayPal), duplicate charges from payment retry logic or webhook failures, refund mismatches where refunds are recorded in one platform but not the other, processor fee calculation errors, and settlement timing gaps where orders fall between payout cycles. Fincile detects all six categories automatically."
  },
  {
    q: "How do I find missing payments in Shopify?",
    a: "To find missing payments in Shopify, compare your list of 'Paid' orders in Shopify against the charges list in your payment processor (Stripe or PayPal). Any order ID present in Shopify but absent in your processor export is a missing payment. This is tedious to do manually for high-volume stores. Fincile automates this comparison and surfaces missing payments with the exact order ID, amount, and date."
  },
  {
    q: "Shopify says order is paid but money never arrived — what do I do?",
    a: "If Shopify shows an order as paid but the money never arrived in your bank, check: (1) Has the payout been initiated? Payouts can take 1-3 business days to arrive. (2) Is there a hold on your Shopify Payments account? New accounts sometimes have a reserve. (3) Did the charge actually succeed in Stripe? Log into Stripe and search for the order amount and date. (4) Was the payment made through a processor not connected to your bank (e.g., PayPal balance not auto-transferred)? If none of these explain it, you likely have a missing payment that Fincile's audit will surface."
  },
  {
    q: "How do I reconcile Shopify with PayPal?",
    a: "To reconcile Shopify with PayPal, export your Shopify orders filtered by 'PayPal' as the payment gateway, then download your PayPal transaction history for the same period. Match each order total to a PayPal transaction by order ID or amount and date. Watch for PayPal fees, partial refunds, and currency conversions that can cause small variances. Fincile connects to both Shopify and PayPal directly and performs this matching automatically."
  },
  {
    q: "What is Shopify payout reconciliation?",
    a: "Shopify payout reconciliation is the process of verifying that every Shopify order that shows as 'paid' corresponds to an actual charge in your payment processor (Stripe, PayPal, Klarna, etc.) and that the net payout you receive in your bank matches what you expect after fees, refunds, and adjustments. It catches missing payments, duplicate charges, and refund discrepancies that can cost merchants thousands of dollars per month."
  },
  {
    q: "How often should I reconcile Shopify payouts?",
    a: "For most Shopify stores, monthly reconciliation is the minimum. High-volume stores ($100k+/month revenue) should reconcile weekly because payment errors compound quickly at scale. Monthly reconciliation misses errors that fall across payout cycles. Fincile runs continuously and flags discrepancies as soon as they occur, so you catch issues in hours rather than months."
  },
  {
    q: "Can I reconcile Shopify with QuickBooks or Xero?",
    a: "Fincile focuses on payment-level reconciliation between Shopify, Stripe, and PayPal — verifying that every order that shows as paid actually has a corresponding charge. For accounting integration with QuickBooks or Xero, you would use Fincile's reconciled data as a clean source of truth, then import verified transaction records into your accounting software."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-3 block">FAQ</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">
            Shopify Payout Reconciliation — Common Questions
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Everything Shopify merchants ask about fixing payout mismatches, missing payments, and reconciliation errors.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 bg-card hover:bg-surface transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-navy text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-teal transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 py-4 bg-surface border-t border-border">
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

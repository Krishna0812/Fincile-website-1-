# Diagnosis, baseline of 2026-11-14

Basis: 5 unbranded prompts (p01-p05), Perplexity only, logged out, one run each. This is a small single sample, so treat the patterns as leads, not conclusions.

## What the engine chose, and why

- Fincile was not named in any of the 5 answers.
- The answers named accounting platforms (QuickBooks and Xero in all 5), enterprise reconciliation platforms (BlackLine, FloQast, Trintech, SolveXia, HighRadius), and ecommerce sync apps (Synder and A2X in 2 of 5).
- The cited sources were third-party listicles and vendor blogs (scryai.com, simetrik.com, solvexia.com, thefinancelead.com, tesorio.com, bluecopa.com, maxima.ai) plus first-party help pages (quickbooks.intuit.com, xero.com, shopify.com, stripe.com).
- No cited source was a Fincile page or a page that lists Fincile.

## Gaps on getfincile.com before this change

1. No page answered the generic questions (reconcile two CSV files, QuickBooks deposit vs payout, how to choose reconciliation software). The site's posts were Shopify-specific, so generic prompts had nothing to retrieve.
2. No page explained the categories of tool, which is the structure the cited listicles use.
3. No FAQ markup on content pages.
4. robots.txt allowed everything but named no AI crawlers.
5. Fincile appears on no third-party listicle that the engine cites. This is the largest gap and on-site changes cannot close it.

## What changed on-site (this PR)

Three answer-style guides with visible FAQ and FAQPage schema, sitemap and llms.txt entries, explicit AI-crawler allow rules, and blog index entries. See the PR description.

## What cannot be fixed on-site

Engines that cite listicles will name tools that those listicles name. Getting Fincile into them takes earned mentions (see OFFSITE-PACK.md). That takes weeks to months and is outside our control.

# Re-check schedule and plan

## Weekly re-run

1. Open each engine logged out (or a fresh browser profile), one prompt at a time, from prompts.json.
2. Record one JSONL line per prompt and run in `runs/YYYY-MM-DD-<engine>.jsonl`.
3. Run `node seo/ai-visibility/score.mjs`, then `node seo/ai-visibility/score.mjs --compare <old date> <new date>`.
4. Slow down: Perplexity stalled after about 5 rapid logged-out queries on 2026-11-14. Leave a few seconds or minutes between prompts.
5. Do not use a signed-in personal account; its memory and history bias the answers.

## Timing, honestly

| Horizon | What can change |
|---|---|
| Days | Engines that search live (Perplexity, Google AI Overviews, ChatGPT search) can pick up new pages once crawled. Expect small movement on prompts the new guides answer directly. |
| Weeks to months | Appearing in third-party listicles and review sites, which engines cite most. Slow and not under our control. |
| Months | Model-trained knowledge of the brand. Cannot be forced. |

No one can guarantee a first-place position in any AI engine.

## 30 / 60 / 90 days

- 30: finish the baseline on all engines with clean sessions (3 runs each); merge and deploy; request indexing for the three new pages; fix the stale PickYourApp prices; send 5 listicle outreach emails.
- 60: add a comparison page for Link My Books and a QuickBooks-specific page once the connection is live; publish 1 guest article; re-run and compare.
- 90: publish original data only if real aggregate data exists and the merchant privacy terms allow it; re-run and write the second report.

# AI visibility tracking

Measures whether answer engines mention Fincile, in what position, next to which competitors and citing which sources. Nothing here is estimated: every number comes from a recorded run.

## Files
- `prompts.json`: fixed prompt set (30). Do not edit existing prompts; add new ids.
- `runs/YYYY-MM-DD-<engine>.jsonl`: one JSON line per prompt run (schema below). Append only. Never edit a past run.
- `score.mjs`: computes metrics. `node seo/ai-visibility/score.mjs [runs-dir]` prints a markdown report. Add `--compare <dateA> <dateB>` to diff two dates.

## Run record
```
{"date":"2026-11-14","engine":"perplexity","promptId":"p01","run":1,"mentioned":false,
 "position":null,"competitors":["A2X","Synder"],"sources":["a2x.com","synder.com"],
 "sentiment":"none","note":""}
```
- `position`: 1-based rank of Fincile among the distinct products/vendors the answer names, in order of appearance or in its own ranking if it gives one. `null` if not mentioned.
- `competitors`: other products named, normalized names.
- `sources`: cited domains (engines that show no citations: leave empty).
- `sentiment`: `positive`, `neutral`, `negative` or `none` (not mentioned).

## Method
Prompts are typed into each engine's normal web UI in a fresh session, logged-out where the engine allows it. Answers vary, so the same prompt should be run 3 times per engine for a trustworthy rate; runs recorded with `run` = 1 only are single samples and are reported as such. Location, account history and personalization can change answers. Engines not run are reported as "not run", never estimated.

## Weekly re-run
Same prompts, same engines, new dated file in `runs/`, then `node seo/ai-visibility/score.mjs --compare <old> <new>`. A scheduled task can do this (see the PR description); it takes about 40 minutes of browser time per engine.

#!/usr/bin/env node
// Computes AI-visibility metrics from recorded runs. No estimates: it only
// counts what is in runs/*.jsonl. Usage:
//   node score.mjs [runsDir]
//   node score.mjs [runsDir] --compare 2026-11-14 2026-11-21
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const cmpAt = args.indexOf("--compare");
const dirArg = args.find((a, i) => !a.startsWith("--") && (cmpAt < 0 || i < cmpAt));
const runsDir = dirArg ? path.resolve(dirArg) : path.join(here, "runs");
const prompts = JSON.parse(readFileSync(path.join(here, "prompts.json"), "utf8")).prompts;
const byId = new Map(prompts.map((p) => [p.id, p]));

export function loadRuns(dir) {
  const rows = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".jsonl")).sort()) {
    for (const line of readFileSync(path.join(dir, f), "utf8").split("\n")) {
      if (!line.trim()) continue;
      const r = JSON.parse(line);
      if (!byId.has(r.promptId)) throw new Error(`${f}: unknown promptId ${r.promptId}`);
      rows.push(r);
    }
  }
  return rows;
}

const pct = (n, d) => (d ? `${((100 * n) / d).toFixed(0)}% (${n}/${d})` : "n/a");
const avg = (xs) => (xs.length ? (xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2) : "n/a");
const top = (counter, n = 8) => [...counter.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);

export function metrics(rows) {
  const mentioned = rows.filter((r) => r.mentioned);
  const positions = mentioned.map((r) => r.position).filter((p) => Number.isInteger(p));
  const comp = new Map();
  for (const r of rows) for (const c of new Set(r.competitors || [])) comp.set(c, (comp.get(c) || 0) + 1);
  const src = new Map();
  for (const r of rows) for (const s of new Set(r.sources || [])) src.set(s, (src.get(s) || 0) + 1);
  const mentionsTotal = mentioned.length + [...comp.values()].reduce((a, b) => a + b, 0);
  return {
    runs: rows.length,
    mentionRate: pct(mentioned.length, rows.length),
    avgPosition: avg(positions),
    firstPlaceRate: pct(rows.filter((r) => r.mentioned && r.position === 1).length, rows.length),
    shareOfVoice: pct(mentioned.length, mentionsTotal),
    topCompetitors: top(comp),
    topSources: top(src),
  };
}

function report(rows, label) {
  const unbranded = rows.filter((r) => !byId.get(r.promptId).branded);
  const lines = [`## ${label}`, ""];
  const engines = [...new Set(rows.map((r) => r.engine))].sort();
  lines.push("| Engine | Runs | Mention rate (unbranded) | Avg position | First-place rate | Share of voice |", "|---|---|---|---|---|---|");
  for (const e of engines) {
    const m = metrics(unbranded.filter((r) => r.engine === e));
    lines.push(`| ${e} | ${m.runs} | ${m.mentionRate} | ${m.avgPosition} | ${m.firstPlaceRate} | ${m.shareOfVoice} |`);
  }
  const all = metrics(unbranded);
  lines.push(`| **all** | ${all.runs} | ${all.mentionRate} | ${all.avgPosition} | ${all.firstPlaceRate} | ${all.shareOfVoice} |`, "");
  lines.push("Top competitors (runs naming them): " + all.topCompetitors.map(([n, c]) => `${n} ${c}`).join(", "), "");
  lines.push("Most-cited domains: " + all.topSources.map(([n, c]) => `${n} ${c}`).join(", "), "");
  const cats = [...new Set(prompts.map((p) => p.cat))];
  lines.push("| Category | Runs | Mention rate |", "|---|---|---|");
  for (const c of cats) {
    const rs = unbranded.filter((r) => byId.get(r.promptId).cat === c);
    if (rs.length) lines.push(`| ${c} | ${rs.length} | ${metrics(rs).mentionRate} |`);
  }
  const branded = rows.filter((r) => byId.get(r.promptId).branded);
  if (branded.length) lines.push("", `Branded prompts (not in the rates above): mentioned in ${pct(branded.filter((r) => r.mentioned).length, branded.length)}`);
  return lines.join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rows = loadRuns(runsDir);
  if (cmpAt >= 0) {
    const [a, b] = args.slice(cmpAt + 1);
    console.log(report(rows.filter((r) => r.date === a), `Run ${a}`) + "\n\n" + report(rows.filter((r) => r.date === b), `Run ${b}`));
  } else {
    const dates = [...new Set(rows.map((r) => r.date))].sort();
    for (const d of dates) console.log(report(rows.filter((r) => r.date === d), `Run ${d}`) + "\n");
  }
}

import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const PORT = 8811;

const routes = [
  "/",
  "/about",
  "/blog",
  "/blog/ghost-orders-shopify",
  "/blog/shopify-stripe-reconciliation",
  "/blog/shopify-payout-discrepancy",
  "/blog/fincile-vs-a2x",
  "/blog/fincile-vs-synder",
  "/blog/shopify-duplicate-charge-stripe",
  "/blog/shopify-refund-not-in-stripe",
  "/blog/shopify-paypal-reconciliation",
  "/blog/shopify-bnpl-reconciliation",
];

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = req.url.split("?")[0];
      let filePath = path.join(distDir, decodeURIComponent(urlPath));
      // Serve the built app shell for any route without a file extension —
      // React Router determines the actual page client-side from the URL.
      if (urlPath === "/" || !path.extname(filePath)) {
        filePath = path.join(distDir, "index.html");
      }
      try {
        const data = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

function outputPathFor(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${route.replace(/^\//, "")}.html`);
}

async function main() {
  const server = await startServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture all rendered HTML first, then write to disk afterwards —
  // this way the "/" route being overwritten mid-loop can never affect
  // the shell used to boot later routes.
  const captured = [];
  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    await page.goto(url, { waitUntil: "networkidle" });
    // useSeoMeta runs in a useEffect after mount — give it a beat to settle.
    await page.waitForTimeout(150);
    const html = await page.content();
    captured.push({ route, html });
    console.log(`Rendered ${route}`);
  }

  await browser.close();
  server.close();

  for (const { route, html } of captured) {
    const outPath = outputPathFor(route);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log(`Wrote ${path.relative(distDir, outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

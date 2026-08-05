import { chromium } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "og-image.png");
const iconPath = path.join(__dirname, "..", "public", "apple-touch-icon.png");
const iconUrl = "data:image/png;base64," + fs.readFileSync(iconPath).toString("base64");

const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: linear-gradient(135deg, hsl(213 44% 10%) 0%, hsl(213 35% 15%) 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, hsl(160 93% 34% / 0.35) 0%, transparent 70%);
    top: -260px;
    right: -220px;
  }
  .content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 90px;
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 44px;
  }
  .brand-icon {
    height: 40px;
    width: 40px;
    border-radius: 9px;
    object-fit: cover;
  }
  .brand-word {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.3px;
  }
  .headline {
    font-size: 54px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    max-width: 920px;
    letter-spacing: -0.5px;
  }
  .accent { color: hsl(160 93% 44%); }
  .subhead {
    margin-top: 26px;
    font-size: 24px;
    color: hsl(214 32% 82%);
    max-width: 780px;
    line-height: 1.5;
  }
  .pill-row {
    margin-top: 40px;
    display: flex;
    gap: 12px;
  }
  .pill {
    background: hsl(0 0% 100% / 0.08);
    border: 1px solid hsl(0 0% 100% / 0.16);
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 18px;
    border-radius: 100px;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="content">
    <div class="brand-row">
      <img class="brand-icon" src="${iconUrl}" />
      <span class="brand-word">Fincile</span>
    </div>
    <div class="headline">Fix Your Shopify Payout<br/>Mismatches <span class="accent">Automatically</span></div>
    <div class="subhead">Fincile reconciles Shopify, Stripe, PayPal &amp; 11+ gateways &mdash; catches every missing payment and duplicate charge in minutes.</div>
    <div class="pill-row">
      <div class="pill">Stripe</div>
      <div class="pill">PayPal</div>
      <div class="pill">Shopify Payments</div>
      <div class="pill">+11 more</div>
    </div>
  </div>
</body>
</html>
`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: outPath });
await browser.close();
console.log("Wrote", outPath);

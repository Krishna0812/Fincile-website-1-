import { useEffect } from "react";

export const SITE_URL = "https://www.getfincile.com";
const STRUCTURED_DATA_ID = "page-structured-data";

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function setStructuredData(data?: Record<string, unknown>) {
  const existing = document.getElementById(STRUCTURED_DATA_ID);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = STRUCTURED_DATA_ID;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export interface SeoMetaOptions {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  /** og:type value; only set when provided (the site default lives in index.html). */
  ogType?: string;
  structuredData?: Record<string, unknown>;
  /** Set true for pages that should never be indexed (e.g. a 404) --
   * otherwise a soft-404 SPA route with no robots tag can get indexed by
   * search engines under its own URL. */
  noindex?: boolean;
}

/** Updates document title, meta description/canonical/OG/Twitter tags, and
 * page-level JSON-LD for the currently mounted route. Runs once on mount,
 * matching the SPA's per-route component lifecycle. */
export function useSeoMeta(options: SeoMetaOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${options.path}`;
    document.title = options.title;
    setMetaByName("description", options.description);
    setCanonical(url);
    setMetaByProperty("og:title", options.ogTitle ?? options.title);
    setMetaByProperty("og:description", options.ogDescription ?? options.description);
    setMetaByProperty("og:url", url);
    if (options.ogType) setMetaByProperty("og:type", options.ogType);
    setMetaByName("twitter:title", options.ogTitle ?? options.title);
    setMetaByName("twitter:description", options.ogDescription ?? options.description);
    setStructuredData(options.structuredData);
    setMetaByName("robots", options.noindex ? "noindex, nofollow" : "index, follow");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function blogPostingSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    datePublished: opts.datePublished,
    author: {
      "@type": "Person",
      name: "Krishna Mandala",
    },
    publisher: {
      "@type": "Organization",
      name: "Fincile",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/apple-touch-icon.png`,
      },
    },
    image: `${SITE_URL}/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${opts.path}`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}

/** Combines multiple schema objects into one @graph block under a single
 * @context, so a page can carry e.g. BlogPosting + BreadcrumbList together
 * without stacking multiple <script> tags. */
export function combineSchemas(...schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _drop, ...rest }) => rest),
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: { "@type": "WebSite", name: "Fincile", url: SITE_URL },
  };
}

/** The product as a web application. Only the free tier is listed as an offer:
 * paid workspace plans are in test mode and cannot be bought yet. */
export function softwareApplicationSchema() {
  return {
    "@type": "SoftwareApplication",
    name: "Fincile",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: "Reconciliation software that matches any two datasets, scores each match, and lists exceptions for review.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan: 1 run per month, up to 100 rows per source" },
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    name: "Fincile",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    email: "support@getfincile.com",
  };
}

export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${SITE_URL}${it.path}` })),
  };
}

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
  structuredData?: Record<string, unknown>;
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
    setMetaByName("twitter:title", options.ogTitle ?? options.title);
    setMetaByName("twitter:description", options.ogDescription ?? options.description);
    setStructuredData(options.structuredData);
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

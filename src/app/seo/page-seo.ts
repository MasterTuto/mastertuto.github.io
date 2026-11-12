import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { effect, inject, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { translations } from '../i18n/translations';

export const SITE_URL = 'https://brenocs.dev.br';
export const SITE_NAME = 'Breno Carvalho';
export const SHARE_IMAGE_WIDTH = 1200;
export const SHARE_IMAGE_HEIGHT = 630;
const DEFAULT_LANGUAGE = 'pt';

/** BCP 47 code for `<html lang>` and hreflang, and the Open Graph locale, per URL language. */
const LOCALES: Record<string, { html: string; og: string }> = {
  pt: { html: 'pt-BR', og: 'pt_BR' },
  en: { html: 'en', og: 'en_US' },
  es: { html: 'es', og: 'es_ES' },
  fr: { html: 'fr', og: 'fr_FR' },
  de: { html: 'de', og: 'de_DE' },
  it: { html: 'it', og: 'it_IT' },
  ja: { html: 'ja', og: 'ja_JP' },
  ru: { html: 'ru', og: 'ru_RU' },
};

/**
 * Sections that also exist without a language prefix (`/`, `/games`, `/tools`, `/para`, `/services`).
 * Those URLs adapt to the visitor's language and are the `x-default` of each page.
 */
const UNPREFIXED = /^\/(?:(?:games|tools|para)(?:\/.*)?|services)?$/;

export interface PageSeo {
  /** Page title without the site name; `| Breno Carvalho` is appended to the document `<title>`. */
  readonly title: string;
  readonly description: string;
  /** Path of the page without the language prefix, e.g. `/services/landing-pages` (`/` for the home page). */
  readonly path: string;
  /**
   * Language the content is written in when it does not follow the URL (segment pages are always
   * Portuguese, dev tools always English). Such pages have one canonical URL, without language prefix,
   * and no hreflang alternates. Omit for pages translated into every language.
   */
  readonly fixedLanguage?: 'pt' | 'en';
  readonly type?: 'website' | 'article';
  /** Trail from the home page to this page as `[name, path]`, paths written like `path`. */
  readonly breadcrumbs?: readonly (readonly [name: string, path: string])[];
  /** schema.org nodes for this page; they are wrapped in a single `@graph`. */
  readonly jsonLd?: readonly Record<string, unknown>[];
  /**
   * Absolute URL of the social card. Defaults to the card generated at build time from this page's
   * title and description (see `scripts/generate-og-images.mjs`).
   */
  readonly image?: string;
}

/** `/services/` → `https://brenocs.dev.br/services/`. Pages are served as `<path>/index.html`, so URLs end in `/`. */
export function absoluteUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${clean ? clean + '/' : ''}`;
}

/**
 * URL of the Open Graph image generated at build time for a canonical path:
 * `/` → `/og/index.png`, `/pt/services/landing-pages/` → `/og/pt/services/landing-pages.png`.
 * Must stay in sync with `ogImagePath` in `scripts/generate-og-images.mjs`.
 */
export function shareImageUrl(path: string): string {
  const slug = path.replace(/^\/+|\/+$/g, '') || 'index';
  return `${SITE_URL}/og/${slug}.png`;
}

/**
 * Title, description, canonical URL, hreflang alternates, Open Graph, Twitter card and JSON-LD of a page.
 *
 * Call it from the component a route renders. Only the document title follows client-side navigation;
 * every other tag is written while prerendering (platform server) and left as is in the browser, since
 * crawlers and link previews read the static HTML and never navigate inside the app.
 */
export function usePageSeo(details: () => PageSeo): void {
  const titleService = inject(Title);
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const meta = inject(Meta);
  const document = inject(DOCUMENT);
  const location = inject(Location);

  effect(() => {
    const page = details();
    const title = page.title.includes(SITE_NAME) ? page.title : `${page.title} | ${SITE_NAME}`;
    titleService.setTitle(title);
    if (isBrowser) return;

    const urlLanguage = location.path(false).split(/[/?#]/)[1];
    const prefixed = urlLanguage in translations;
    const language = page.fixedLanguage ?? (prefixed ? urlLanguage : DEFAULT_LANGUAGE);
    const path = normalize(page.path);
    // Same language prefix as the page itself, so a page and its breadcrumbs agree.
    const localize = (target: string) =>
      absoluteUrl(page.fixedLanguage || !prefixed ? target : `/${urlLanguage}${normalize(target)}`);
    const canonical = page.fixedLanguage ? absoluteUrl(path) : localize(path);
    const image = page.image ?? shareImageUrl(new URL(canonical).pathname);

    document.documentElement.lang = LOCALES[language].html;
    setLink(document, 'canonical', canonical);
    setAlternates(document, page.fixedLanguage ? [] : alternates(path));

    const tags: MetaDefinition[] = [
      { name: 'description', content: page.description },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:type', content: page.type ?? 'website' },
      { property: 'og:locale', content: LOCALES[language].og },
      { property: 'og:url', content: canonical },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:alt', content: page.title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: page.title },
    ];
    if (!page.image) {
      tags.push(
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: String(SHARE_IMAGE_WIDTH) },
        { property: 'og:image:height', content: String(SHARE_IMAGE_HEIGHT) },
      );
    }
    for (const tag of tags) meta.updateTag(tag);

    setJsonLd(document, [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: LOCALES[language].html,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: image,
      },
      ...(page.breadcrumbs ? [breadcrumbList(page.breadcrumbs, localize)] : []),
      ...(page.jsonLd ?? []),
    ]);
  });
}

/** `/` for the home page, otherwise `/a/b` without trailing slash. */
function normalize(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}` : '/';
}

function alternates(path: string): [hreflang: string, href: string][] {
  const suffix = path === '/' ? '' : path;
  const languages = Object.keys(translations).map(
    (lang): [string, string] => [LOCALES[lang]?.html ?? lang, absoluteUrl(`/${lang}${suffix}`)],
  );
  const fallback = UNPREFIXED.test(path) ? path : `/${DEFAULT_LANGUAGE}${suffix}`;
  return [...languages, ['x-default', absoluteUrl(fallback)]];
}

function setLink(document: Document, rel: string, href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setAlternates(document: Document, links: [string, string][]): void {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
  for (const [hreflang, href] of links) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }
}

function setJsonLd(document: Document, nodes: readonly Record<string, unknown>[]): void {
  let script = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  const graph = { '@context': 'https://schema.org', '@graph': [WEBSITE, PERSON, ...nodes] };
  script.textContent = JSON.stringify(graph).replace(/</g, '\\u003c');
}

function breadcrumbList(items: NonNullable<PageSeo['breadcrumbs']>, localize: (path: string) => string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: localize(path),
    })),
  };
}

/** schema.org reference to the site's author, for `provider`, `author` or `creator`. */
export const PERSON_REF = { '@id': `${SITE_URL}/#person` } as const;

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Breno Carvalho da Silva',
  alternateName: 'BrenoCS',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/icons/android-chrome-512x512.png`,
  jobTitle: 'Web developer',
  knowsAbout: ['Landing pages', 'Web development', 'Angular', 'Automation', 'SEO'],
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: PERSON_REF,
};

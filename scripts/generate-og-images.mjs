import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

import { projectCases } from '../src/app/data/cases.data.ts';
import { allProTools } from '../src/app/screens/tools/pro-tools/pro-tools.data.ts';
import { existsSync } from 'node:fs';

/**
 * Generates one 1200×630 Open Graph card per prerendered page, in the site's visual identity:
 * light background with the purple glow, white rounded card, the BCS logo, Poppins headings and
 * Inter text. Segment pages show their hero illustration and case pages use the client's colors.
 *
 * The prerendered HTML is the source of truth: `usePageSeo` already wrote the title, description,
 * canonical URL and the `og:image` URL each card must be saved at. Pages that share a canonical URL
 * (the language-prefixed copies of a Portuguese-only page, for example) share one card.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browserRoot = path.resolve(root, process.argv[2] ?? 'dist/portfolio/browser');
const siteUrl = 'https://brenocs.dev.br';
const fontsDir = path.join(root, 'scripts/og/fonts');

const WIDTH = 1200;
const HEIGHT = 630;
const CARD = 32; // margin around the white card
const PADDING = 80;
const ART = 340; // width of the illustration column
const TEXT_WIDTH = WIDTH - PADDING * 2 - ART - 24;
const FONT = {
  fontFiles: [
    'Poppins-SemiBold.ttf',
    'Poppins-Medium.ttf',
    'Inter-Regular.ttf',
    'Inter-SemiBold.ttf',
    'NotoSansJP-Regular.ttf',
    'NotoSansJP-SemiBold.ttf',
  ].map((file) => path.join(fontsDir, file)),
  loadSystemFonts: false,
  defaultFontFamily: 'Inter',
};
const CJK = /[\u3040-\u30ff\u4e00-\u9fff]/;
/**
 * Poppins (headings) has no Cyrillic or Japanese glyphs. Font fallback in resvg ignores the weight,
 * so the family is chosen by script instead: Inter for Cyrillic, Noto Sans JP for Japanese.
 */
const headingFont = (text) => (CJK.test(text) ? 'Noto Sans JP' : /[\u0400-\u04ff]/.test(text) ? 'Inter' : 'Poppins');
const bodyFont = (text) => (CJK.test(text) ? 'Noto Sans JP' : 'Inter');
const HEADING = 'Poppins';

/** Colors from tailwind.config.js. */
const BRAND = {
  background: '#f4f2f2',
  surface: '#fafafa',
  foreground: '#444a51',
  primary: '#151c25',
  light: '#8e9095',
  emphasis: '#7a70e1',
  decoration: '#eaebf9',
  decorationForeground: '#646cfa',
};

/** Translation file of each URL language; the eyebrow labels come from the site's own translations. */
const LANGUAGE_FILES = {
  pt: 'portuguese',
  en: 'english',
  es: 'spanish',
  fr: 'french',
  de: 'german',
  it: 'italian',
  ja: 'japanese',
  ru: 'russian',
};

/** Must stay in sync with `shareImageUrl` in `src/app/seo/page-seo.ts`. */
export function ogImagePath(pagePath) {
  const slug = pagePath.replace(/^\/+|\/+$/g, '') || 'index';
  return `/og/${slug}.png`;
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function metaContent(html, attribute) {
  const tag = html.match(new RegExp(`<meta[^>]+${attribute}[^>]*>`))?.[0];
  const content = tag?.match(/content="([^"]*)"/)?.[1];
  return content == null ? undefined : decodeEntities(content);
}

const widthCache = new Map();

function textWidth(text, size, family, weight) {
  const key = `${family}:${weight}:${size}:${text}`;
  if (!widthCache.has(key)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH * 4}" height="${size * 2}"><text x="0" y="${size}" font-family="${family}" font-weight="${weight}" font-size="${size}">${escapeXml(text)}</text></svg>`;
    widthCache.set(key, new Resvg(svg, { font: FONT }).getBBox()?.width ?? 0);
  }
  return widthCache.get(key);
}

/** Japanese has no spaces: it wraps between characters. */
function tokens(text) {
  return /[぀-ヿ一-鿿]/.test(text)
    ? [...text].map((char) => ({ text: char, joiner: '' }))
    : text.split(/\s+/).filter(Boolean).map((word) => ({ text: word, joiner: ' ' }));
}

/** Greedy wrap; the last line gets an ellipsis when the text does not fit. */
function wrap(text, { size, family, weight, maxLines, maxWidth = TEXT_WIDTH }) {
  const parts = tokens(text);
  const lines = [];
  let index = 0;
  while (index < parts.length && lines.length < maxLines) {
    let line = parts[index++].text;
    while (
      index < parts.length &&
      textWidth(line + parts[index].joiner + parts[index].text, size, family, weight) <= maxWidth
    ) {
      line += parts[index].joiner + parts[index++].text;
    }
    lines.push(line);
  }
  const overflow = index < parts.length;
  if (overflow) {
    let last = lines.pop();
    while (last.length > 1 && textWidth(`${last}…`, size, family, weight) > maxWidth) {
      last = last.includes(' ') ? last.slice(0, last.lastIndexOf(' ')) : last.slice(0, -1);
    }
    lines.push(`${last.replace(/[\s,.;:—–-]+$/, '')}…`);
  }
  return { lines, overflow };
}

/** Largest title size that fits in two lines, or else in three, without truncating. */
function fitTitle(title) {
  for (const [size, maxLines] of [[56, 2], [50, 2], [50, 3], [44, 3], [40, 3]]) {
    const result = wrap(title, { size, family: headingFont(title), weight: 600, maxLines });
    if (!result.overflow) return { ...result, size };
  }
  return { ...wrap(title, { size: 40, family: headingFont(title), weight: 600, maxLines: 3 }), size: 40 };
}

async function loadLabels() {
  const entries = await Promise.all(
    Object.entries(LANGUAGE_FILES).map(async ([lang, file]) => {
      const module = await import(`../src/app/i18n/${file}.ts`);
      const dict = Object.values(module).find((value) => value && typeof value === 'object');
      return [
        lang,
        {
          home: dict.seo.cardTagline,
          services: dict.home.nav.services,
          games: dict.games.label,
          tools: dict.tools.label,
          cases: dict.home.nav.projects,
        },
      ];
    }),
  );
  return Object.fromEntries(entries);
}

async function dataUri(file, type) {
  return `data:${type};base64,${(await readFile(path.join(root, file))).toString('base64')}`;
}

/** Eyebrow, accent colors and illustration of a card, by canonical path. */
async function describePage(pagePath, labels) {
  const segments = pagePath.split('/').filter(Boolean);
  const lang = segments[0] in LANGUAGE_FILES ? segments.shift() : 'pt';
  const label = labels[lang];
  const [section, slug] = segments;
  const theme = { accent: BRAND.decorationForeground, tint: BRAND.decoration, glow: BRAND.emphasis };

  if (section === 'para') {
    // Each segment has its illustration at assets/images/segments/<slug>/hero.svg.
    const hero = `src/assets/images/segments/${slug ?? 'advogado'}/hero.svg`;
    const art = existsSync(path.join(root, hero)) ? { href: await dataUri(hero, 'image/svg+xml'), kind: 'scene' } : undefined;
    return { eyebrow: 'Sites para cada profissão', ...theme, art };
  }
  if (section === 'cases') {
    const project = projectCases.find((item) => item.slug === slug);
    return { eyebrow: `${label.cases} · ${project?.name ?? ''}`, accent: project?.accent ?? theme.accent, tint: project?.tint ?? theme.tint, glow: project?.accent ?? theme.glow };
  }
  if (section === 'tools') {
    if (slug === 'dev-tools') return { eyebrow: `${label.tools} · Dev Tools`, ...theme };
    const tool = allProTools.find((item) => item.slug === slug);
    if (tool) return { eyebrow: `Grátis · ${tool.audience}`, ...theme };
    return { eyebrow: label.tools, ...theme };
  }
  if (section === 'games') return { eyebrow: label.games, ...theme };
  if (section === 'services') return { eyebrow: label.services, ...theme };
  return { eyebrow: label.home, ...theme };
}

function renderSvg({ title, description, pagePath, eyebrow, accent, tint, glow, art, logo }) {
  const heading = fitTitle(title);
  const lineHeight = Math.round(heading.size * 1.2);
  const eyebrowTop = 214;
  const titleTop = eyebrowTop + 40 + Math.round(heading.size * 1.05);
  const descriptionTop = titleTop + (heading.lines.length - 1) * lineHeight + 54;
  const summary = wrap(description, {
    size: 24,
    family: bodyFont(description),
    weight: 400,
    maxLines: heading.lines.length > 2 ? 2 : 3,
  });
  const eyebrowText = eyebrow.toUpperCase();
  const eyebrowWidth = Math.min(TEXT_WIDTH, textWidth(eyebrowText, 18, bodyFont(eyebrowText), 600) + 18 * 0.12 * eyebrowText.length + 36);
  const titleLines = heading.lines
    .map((line, index) => `<tspan x="${PADDING}" y="${titleTop + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
  const summaryLines = summary.lines
    .map((line, index) => `<tspan x="${PADDING}" y="${descriptionTop + index * 36}">${escapeXml(line)}</tspan>`)
    .join('');
  const url = `brenocs.dev.br${pagePath === '/' ? '' : pagePath.replace(/\/$/, '')}`;
  const artX = WIDTH - PADDING - ART + 20;
  const artwork =
    art?.kind === 'scene'
      ? `<image x="${artX - 30}" y="170" width="${ART + 10}" height="${Math.round(((ART + 10) * 3) / 4)}" xlink:href="${art.href}"/>`
      : `<image x="${artX}" y="150" width="${ART - 20}" height="${ART - 20}" xlink:href="${logo}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="${BRAND.primary}" flood-opacity="0.08"/>
    </filter>
    <clipPath id="card"><rect x="${CARD}" y="${CARD}" width="${WIDTH - CARD * 2}" height="${HEIGHT - CARD * 2}" rx="40"/></clipPath>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BRAND.background}"/>
  <rect x="${CARD}" y="${CARD}" width="${WIDTH - CARD * 2}" height="${HEIGHT - CARD * 2}" rx="40" fill="${BRAND.surface}" filter="url(#shadow)"/>
  <g clip-path="url(#card)">
    <circle cx="${artX + ART / 2 - 10}" cy="330" r="330" fill="url(#glow)"/>
    <rect x="${CARD}" y="${HEIGHT - CARD - 10}" width="${WIDTH - CARD * 2}" height="10" fill="${accent}"/>
  </g>
  ${artwork}
  <image x="${PADDING}" y="76" width="64" height="64" xlink:href="${logo}"/>
  <text x="${PADDING + 80}" y="104" font-family="${HEADING}" font-weight="600" font-size="26" fill="${BRAND.primary}">Breno Carvalho</text>
  <text x="${PADDING + 80}" y="132" font-family="Inter" font-weight="400" font-size="18" fill="${BRAND.light}">${escapeXml(url)}</text>
  <rect x="${PADDING}" y="${eyebrowTop - 28}" width="${eyebrowWidth}" height="40" rx="20" fill="${tint}"/>
  <text x="${PADDING + 18}" y="${eyebrowTop - 1}" font-family="${bodyFont(eyebrowText)}" font-weight="600" font-size="18" letter-spacing="2" fill="${accent}">${escapeXml(eyebrowText)}</text>
  <text font-family="${headingFont(title)}" font-weight="600" font-size="${heading.size}" fill="${BRAND.primary}">${titleLines}</text>
  <text font-family="${bodyFont(description)}" font-weight="400" font-size="24" fill="${BRAND.foreground}" opacity="0.85">${summaryLines}</text>
</svg>`;
}

async function findPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return entry.name === 'og' || entry.name === 'assets' ? [] : findPages(fullPath);
      return entry.name === 'index.html' ? [fullPath] : [];
    }),
  );
  return nested.flat();
}

async function main() {
  const [files, labels, logo] = await Promise.all([
    findPages(browserRoot),
    loadLabels(),
    dataUri('src/assets/icons/android-chrome-512x512.png', 'image/png'),
  ]);

  const done = new Set();
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
    const title = metaContent(html, 'property="og:title"');
    const description = metaContent(html, 'property="og:description"') ?? '';
    const image = metaContent(html, 'property="og:image"');
    if (!canonical || !title || !image) continue;

    const pagePath = new URL(canonical).pathname;
    const expected = `${siteUrl}${ogImagePath(pagePath)}`;
    if (image !== expected) {
      // A page may point og:image elsewhere on purpose (`PageSeo.image`); nothing to generate.
      if (image.includes('/og/')) throw new Error(`${file}: og:image ${image} differs from ${expected}`);
      continue;
    }
    if (done.has(expected)) continue;
    done.add(expected);

    const svg = renderSvg({ title, description, pagePath, logo, ...(await describePage(pagePath, labels)) });
    const png = new Resvg(svg, { font: FONT, fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
    const output = path.join(browserRoot, ogImagePath(pagePath));
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, png);
  }

  if (!done.size) throw new Error(`No page with a generated og:image found in ${browserRoot}`);
  console.log(`${done.size} Open Graph images generated in ${path.join(browserRoot, 'og')}`);
}

await main();

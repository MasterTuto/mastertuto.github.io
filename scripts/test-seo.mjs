import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Run after `npm run build:prod`: checks the SEO tags written while prerendering and the build-time cards.
const root = new URL('../dist/portfolio/browser/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const count = (html, pattern) => (html.match(pattern) ?? []).length;
const attr = (html, selector) => html.match(new RegExp(`<${selector}[^>]*(?:content|href)="([^"]*)"`))?.[1];

const pages = {
  'index.html': { url: 'https://brenocs.dev.br/', lang: 'pt-BR', image: 'index', alternates: true },
  'en/index.html': { url: 'https://brenocs.dev.br/en/', lang: 'en', image: 'en', alternates: true },
  'pt/services/landing-pages/index.html': { url: 'https://brenocs.dev.br/pt/services/landing-pages/', lang: 'pt-BR', image: 'pt/services/landing-pages', alternates: true },
  'ja/games/sudoku/index.html': { url: 'https://brenocs.dev.br/ja/games/sudoku/', lang: 'ja', image: 'ja/games/sudoku', alternates: true },
  'para/advogado/index.html': { url: 'https://brenocs.dev.br/para/advogado/', lang: 'pt-BR', image: 'para/advogado', alternates: false },
  'en/para/advogado/index.html': { url: 'https://brenocs.dev.br/para/advogado/', lang: 'pt-BR', image: 'para/advogado', alternates: false },
  'de/tools/dev-tools/jwt-decoder/index.html': { url: 'https://brenocs.dev.br/tools/dev-tools/jwt-decoder/', lang: 'en', image: 'tools/dev-tools/jwt-decoder', alternates: false },
  'pt/cases/jingle-ia-br/index.html': { url: 'https://brenocs.dev.br/pt/cases/jingle-ia-br/', lang: 'pt-BR', image: 'pt/cases/jingle-ia-br', alternates: true },
};

test('every page has one canonical, its language, social tags and its own card', () => {
  for (const [file, expected] of Object.entries(pages)) {
    const html = read(file);
    const image = `https://brenocs.dev.br/og/${expected.image}.png`;
    assert.equal(count(html, /rel="canonical"/g), 1, file);
    assert.equal(attr(html, 'link rel="canonical"'), expected.url, file);
    assert.match(html, new RegExp(`<html lang="${expected.lang}"`), file);
    assert.equal(attr(html, 'meta property="og:url"'), expected.url, file);
    for (const tag of ['og:title', 'og:description', 'og:site_name', 'og:locale', 'og:type']) {
      assert.equal(count(html, new RegExp(`property="${tag}"`, 'g')), 1, `${file}: ${tag}`);
    }
    assert.equal(attr(html, 'meta name="twitter:card"'), 'summary_large_image', file);
    assert.equal(attr(html, 'meta property="og:image"'), image, file);
    assert.equal(attr(html, 'meta name="twitter:image"'), image, file);
    assert.equal(count(html, /application\/ld\+json/g), 1, file);
    assert.equal(count(html, /hreflang=/g) > 0, expected.alternates, `${file}: hreflang`);

    const png = readFileSync(new URL(`og/${expected.image}.png`, root));
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a', `${expected.image}.png is a PNG`);
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
});

test('translated pages list every language and x-default', () => {
  const html = read('pt/services/index.html');
  for (const lang of ['pt-BR', 'en', 'es', 'fr', 'de', 'it', 'ja', 'ru']) {
    assert.match(html, new RegExp(`hreflang="${lang}" href="https://brenocs.dev.br/${lang.slice(0, 2)}/services/"`), lang);
  }
  assert.match(html, /hreflang="x-default" href="https:\/\/brenocs.dev.br\/services\/"/);
  assert.match(read('index.html'), /hreflang="x-default" href="https:\/\/brenocs.dev.br\/"/);
});

test('titles are specific to each page and language', () => {
  const titles = Object.keys(pages).map(file => read(file).match(/<title>([^<]+)<\/title>/)[1]);
  assert.equal(new Set(titles.filter((_, index) => index !== 5)).size, titles.length - 1);
  assert.match(read('pt/services/landing-pages/index.html'), /<title>Criação de landing pages[^<]+\| Breno Carvalho<\/title>/);
});

test('sitemap lists canonical URLs only and robots.txt points to it', () => {
  const xml = read('sitemap.xml');
  assert.ok(xml.includes('<loc>https://brenocs.dev.br/</loc>'));
  assert.ok(xml.includes('<loc>https://brenocs.dev.br/para/advogado/</loc>'));
  assert.ok(!xml.includes('/en/para/'));
  assert.ok(!xml.includes('<loc>https://brenocs.dev.br/services/landing-pages/</loc>'), 'redirect page');
  assert.match(read('robots.txt'), /Sitemap: https:\/\/brenocs\.dev\.br\/sitemap\.xml/);
});

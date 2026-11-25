import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regions } from '../src/app/data/regions.data.ts';
import { industries } from '../src/app/data/industries.data.ts';

const root = new URL('../dist/portfolio/browser/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const SERVICES = [
  'landing-pages', 'sites-para-autonomos', 'seo-e-geo', 'blogs-e-portfolios', 'lojas-virtuais', 'agentes-de-ia',
  'automacao-de-processos', 'integracoes', 'sistemas-sob-medida', 'mvp-e-saas', 'cloud-e-devops', 'modernizacao-de-sistemas',
];

test('region data is complete and every link points to an existing page', () => {
  const slugs = new Set(regions.map(r => r.slug));
  assert.equal(slugs.size, regions.length, 'unique slugs');
  for (const region of regions) {
    assert.equal(region.searches.length, 4, `${region.slug}: searches`);
    assert.equal(region.opportunities.length, 3, `${region.slug}: opportunities`);
    assert.equal(region.services.length, 3, `${region.slug}: services`);
    assert.equal(region.faq.length, 3, `${region.slug}: faq`);
    assert.ok(region.places.length >= 6, `${region.slug}: places`);
    for (const service of region.services) assert.ok(SERVICES.includes(service.slug), `${region.slug}: service ${service.slug}`);
    for (const segment of region.segments) assert.ok(industries.some(i => i.slug === segment), `${region.slug}: segment ${segment}`);
    for (const other of region.nearby) assert.ok(slugs.has(other) && other !== region.slug, `${region.slug}: nearby ${other}`);
  }
});

test('all region pages and language-prefixed routes render their own content', () => {
  for (const prefix of ['', 'pt/', 'en/']) {
    for (const page of regions) {
      const html = read(`${prefix}regioes/${page.slug}/index.html`);
      assert.ok(html.includes(page.title), `${prefix}${page.slug}: headline`);
      assert.ok(html.includes(`<title>Criação de sites e automação ${page.where} | Breno Carvalho</title>`), `${prefix}${page.slug}: title`);
      assert.ok(html.includes('href="https://brenocs.dev.br/regioes/' + page.slug + '/"'), `${prefix}${page.slug}: canonical`);
      for (const place of page.places) assert.ok(html.includes(place), `${page.slug}: ${place}`);
      assert.ok(html.includes('wa.me/5513997653999?text='), `${page.slug}: contact`);
      assert.ok(html.includes('"@type":"FAQPage"'), `${page.slug}: FAQ structured data`);
    }
  }
});

test('index links every region, the footer links the index only, and the sitemap has canonical URLs', () => {
  const index = read('regioes/index.html');
  for (const page of regions) assert.ok(index.includes(`/regioes/${page.slug}`), page.slug);
  const home = read('pt/index.html');
  assert.ok(/<footer[\s\S]*href="\/regioes"/.test(home), 'footer link to /regioes');
  assert.ok(!/<footer[\s\S]*href="\/(?:pt\/)?regioes\/[a-z]/.test(home), 'no city links in the footer');
  const xml = read('sitemap.xml');
  for (const page of regions) {
    assert.ok(xml.includes(`<loc>https://brenocs.dev.br/regioes/${page.slug}/</loc>`), page.slug);
    assert.ok(!xml.includes(`<loc>https://brenocs.dev.br/pt/regioes/${page.slug}/</loc>`), page.slug);
  }
});

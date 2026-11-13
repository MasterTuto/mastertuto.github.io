import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { industries } from '../src/app/data/industries.data.ts';

const root = new URL('../dist/portfolio/browser/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');

test('all profession pages and language-prefixed routes render their own content', () => {
  for (const prefix of ['', 'pt/', 'en/', 'es/', 'fr/', 'de/', 'it/', 'ja/', 'ru/']) {
    for (const page of industries) {
      const html = read(`${prefix}para/${page.slug}/index.html`);
      assert.ok(html.includes(page.title), `${prefix}${page.slug}: headline`);
      assert.ok(html.includes(`Site e automação para ${page.name}: menos tarefa manual, mais clientes | Breno Carvalho`), `${prefix}${page.slug}: metadata`);
      for (const problem of page.problems) assert.ok(html.includes(problem.title), `${page.slug}: ${problem.title}`);
      assert.ok(html.includes('wa.me/5513997653999?text='), `${page.slug}: contact`);
      assert.ok(html.includes('lang="pt-BR"'), `${page.slug}: content language`);
    }
  }
});
test('sitemap includes all twelve canonical profession URLs, not their language copies', () => {
  const xml = read('sitemap.xml');
  for (const page of industries) {
    assert.ok(xml.includes(`<loc>https://brenocs.dev.br/para/${page.slug}/</loc>`));
    assert.ok(!xml.includes(`<loc>https://brenocs.dev.br/pt/para/${page.slug}/</loc>`));
  }
  assert.ok(!xml.includes(':lang'));
  assert.ok(!xml.includes(':service'));
});
test('directory links every profession and each page has its own illustrations', () => {
  const index = read('para/index.html');
  for (const page of industries) assert.ok(index.includes(`/para/${page.slug}`));
  assert.equal(new Set(industries.map(p => p.images.hero.src)).size, industries.length);
});

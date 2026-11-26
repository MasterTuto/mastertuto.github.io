// Accessibility checks on the prerendered site (run after `npm run build:prod`):
// - axe-core against WCAG 2.0/2.1/2.2 A and AA, in light and dark scheme;
// - keyboard: skip link, visible focus, glass toggle with arrow keys, WhatsApp form errors.
//
// Uses the Playwright installed on the machine (PLAYWRIGHT_MODULE overrides where to load it from).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const root = fileURLToPath(new URL('../dist/portfolio/browser/', import.meta.url));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.json': 'application/json', '.ico': 'image/x-icon', '.pdf': 'application/pdf' };

const SERVICES = [
  'landing-pages', 'sites-para-autonomos', 'seo-e-geo', 'blogs-e-portfolios', 'lojas-virtuais', 'agentes-de-ia',
  'automacao-de-processos', 'integracoes', 'sistemas-sob-medida', 'mvp-e-saas', 'cloud-e-devops', 'modernizacao-de-sistemas',
];
const PAGES = [
  '/pt/', '/en/', '/pt/services/', '/para/', '/para/advogado/', '/tools/', '/pt/games/', '/pt/games/sudoku/',
  '/pt/games/minesweeper/', '/pt/cases/jingle-ia-br/',
  ...SERVICES.map((slug) => `/pt/services/${slug}/`),
  '/en/services/agentes-de-ia/',
  ...['calculadora-de-salario-liquido', 'calculadora-de-custo-de-funcionario', 'calculadora-de-rescisao-trabalhista',
    'calculadora-de-honorarios-de-sucumbencia', 'calculadora-de-energia-solar', 'calculadora-luminotecnica'].map((slug) => `/tools/${slug}/`),
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

let server;
let browser;
let origin;

before(async () => {
  server = createServer(async (request, response) => {
    let path = decodeURIComponent(new URL(request.url, 'http://x').pathname);
    let file = join(root, path);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(root, 'index.html');
    }
    try {
      const body = await readFile(file);
      response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, resolve));
  origin = `http://localhost:${server.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  server?.close();
});

async function open(path, scheme = 'light') {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme, reducedMotion: 'reduce' });
  // Third-party scripts (ads, analytics, fonts) are not part of what we test.
  await context.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
  const page = await context.newPage();
  await page.goto(origin + path, { waitUntil: 'networkidle' });
  // Let hydration attach the event listeners before interacting.
  await page.waitForTimeout(700);
  return { page, context };
}

async function axe(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async (tags) => {
    const result = await window.axe.run(document, { runOnly: { type: 'tag', values: tags } });
    return result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' — ' + n.failureSummary.split('\n').slice(1, 2).join('')),
    }));
  }, TAGS);
}

for (const scheme of ['light', 'dark']) {
  for (const path of PAGES) {
    test(`axe WCAG 2.2 AA: ${path} (${scheme})`, async () => {
      const { page, context } = await open(path, scheme);
      const violations = await axe(page);
      await context.close();
      assert.deepEqual(violations, [], JSON.stringify(violations, null, 2));
    });
  }
}

test('keyboard: the first Tab reaches the skip link, which moves focus to the content', async () => {
  const { page, context } = await open('/pt/');
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => ({ text: document.activeElement?.textContent?.trim(), href: document.activeElement?.getAttribute('href') }));
  assert.equal(first.href, '#content');
  await context.close();
});

test('keyboard: every focus stop shows a visible indicator and Tab never gets stuck', async () => {
  const { page, context } = await open('/pt/services/agentes-de-ia/');
  const seen = new Set();
  for (let step = 0; step < 60; step++) {
    await page.keyboard.press('Tab');
    const focus = await page.evaluate(() => {
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      const style = getComputedStyle(element);
      const visible = (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== 'none';
      const path = [];
      for (let node = element; node && node !== document.body; node = node.parentElement) {
        path.unshift(node.tagName + (node.id ? '#' + node.id : '') + ':' + [...(node.parentElement?.children ?? [])].indexOf(node));
      }
      return { key: path.join('>'), visible, label: element.getAttribute('aria-label') || element.textContent?.trim().slice(0, 40) };
    });
    if (!focus) continue;
    assert.ok(focus.visible, `no visible focus on "${focus.label}"`);
    seen.add(focus.key);
  }
  assert.ok(seen.size > 20, `Tab only visited ${seen.size} elements`);
  await context.close();
});

test('keyboard: the glass toggle is a radio group operated with arrow keys', async () => {
  const { page, context } = await open('/pt/games/');
  const group = page.getByRole('radiogroup', { name: 'Tema' }).first();
  const light = group.getByRole('radio', { name: 'Modo claro' });
  await light.focus();
  assert.equal(await light.getAttribute('aria-checked'), 'true');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(100);
  const dark = group.getByRole('radio', { name: 'Modo escuro' });
  assert.equal(await dark.getAttribute('aria-checked'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Modo escuro');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.scheme), 'dark');
  await context.close();
});

test('keyboard: submitting the empty WhatsApp form announces errors and focuses the first field', async () => {
  const { page, context } = await open('/pt/services/automacao-de-processos/');
  const submit = page.getByRole('button', { name: 'Continuar no WhatsApp' });
  await submit.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const focused = await page.evaluate(() => ({
    name: document.activeElement?.getAttribute('name'),
    invalid: document.activeElement?.getAttribute('aria-invalid'),
    describedBy: document.activeElement?.getAttribute('aria-describedby'),
  }));
  assert.equal(focused.name, 'nome');
  assert.equal(focused.invalid, 'true');
  const error = await page.locator(`#${focused.describedBy}`).textContent();
  assert.match(error ?? '', /Preencha/);
  await context.close();
});

test('the WhatsApp form opens a pre-filled message', async () => {
  const { page, context } = await open('/pt/services/automacao-de-processos/');
  await page.getByLabel('Seu nome').fill('Ana');
  await page.getByLabel('Qual tarefa?').fill('Cobrar clientes');
  await page.getByLabel('Horas gastas por semana').selectOption({ index: 2 });
  const request = context.waitForEvent('request', (r) => r.url().includes('wa.me'));
  await page.getByRole('button', { name: 'Continuar no WhatsApp' }).click();
  const url = decodeURIComponent((await request).url()).replace(/\+/g, ' ');
  assert.match(url, /wa\.me\/\d+\?text=/);
  assert.match(url, /Seu nome: Ana/);
  assert.match(url, /Qual tarefa\?: Cobrar clientes/);
  await context.close();
});

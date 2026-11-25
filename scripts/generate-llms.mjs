// Writes /llms.txt (https://llmstxt.org): a plain Markdown map of the site for AI assistants and
// answer engines. Like the sitemap, it reads the prerendered pages, so titles and descriptions are
// exactly what each page declares. Run after `ng build`.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/portfolio/browser/', import.meta.url));
const SITE = 'https://brenocs.dev.br';

const decode = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

function page(path) {
  const file = join(root, path, 'index.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ?? `${SITE}/${path}/`;
  return title ? { title: decode(title), description: decode(description ?? ''), url: canonical } : null;
}

const children = (path) =>
  readdirSync(join(root, path), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${path}/${entry.name}`);

const list = (paths) =>
  paths
    .map(page)
    .filter(Boolean)
    .map((item) => `- [${item.title}](${item.url})${item.description ? `: ${item.description}` : ''}`)
    .join('\n');

const sections = [
  ['Serviços (português)', children('pt/services')],
  ['Services (English)', children('en/services')],
  ['Sites e automação por profissão', children('para')],
  ['Sites e automação por região', children('regioes')],
  ['Ferramentas gratuitas', children('tools').filter((path) => !path.endsWith('dev-tools'))],
  ['Developer tools', children('tools/dev-tools')],
  ['Cases', children('pt/cases')],
  ['Jogos de lógica', children('pt/games')],
];

const body = `# Breno Carvalho

> Engenheiro de software full stack (TypeScript, Node.js, Angular, AWS) em Santos/SP, Brasil. Cria landing pages, sites, lojas virtuais, agentes de IA para WhatsApp, automações (n8n e código), integrações, sistemas sob medida, MVPs de SaaS, infraestrutura AWS/DevOps e modernização de sistemas legados — entregando a solução sem exigir que o cliente entenda a tecnologia.

Atende em português e inglês, remotamente. Contato: WhatsApp +55 13 99765-3999, e-mail contato@brenocs.dev.br. Cada página de serviço tem preço inicial, processo, perguntas frequentes e um formulário que abre o WhatsApp com a mensagem pronta.

${sections.map(([title, paths]) => `## ${title}\n\n${list(paths)}`).join('\n\n')}

## Optional

- [Currículo (PDF)](${SITE}/assets/Breno%20Carvalho%20da%20Silva%20Curriculum.pdf)
- [GitHub](https://github.com/MasterTuto)
- [Sitemap](${SITE}/sitemap.xml)
`;

writeFileSync(join(root, 'llms.txt'), body);
console.log(`llms.txt generated (${body.split('\n').filter((line) => line.startsWith('- [')).length} links)`);

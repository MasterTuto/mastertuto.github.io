import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist/portfolio/browser');
const siteUrl = 'https://brenocs.dev.br';

// The prerendered output is the source of truth, including composed/lazy routes.
function pages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return pages(path);
    if (entry.name !== 'index.html') return [];
    const route = relative(root, directory).split(sep).join('/');
    return [route ? '/' + route + '/' : '/'];
  });
}
const urls = [...new Set(pages(root))].sort();
const urlset = urls.map(url => `  <url>\n    <loc>${siteUrl}${url}</loc>\n  </url>`).join('\n');
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`);
console.log(`Sitemap generated (${urls.length} URLs)`);

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist/portfolio/browser');
const siteUrl = 'https://brenocs.dev.br';

// The prerendered output is the source of truth: each page declares its canonical URL, so redirects
// and language copies of the same page (which point their canonical elsewhere) stay out of the sitemap.
function pages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === 'og' || entry.name === 'assets' ? [] : pages(path);
    return entry.name === 'index.html' ? [path] : [];
  });
}
const canonical = file => readFileSync(file, 'utf8').match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
const urls = [...new Set(pages(root).map(canonical).filter(url => url?.startsWith(siteUrl)))].sort();
const urlset = urls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n');
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Sitemap generated (${urls.length} URLs)`);

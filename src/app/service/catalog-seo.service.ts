import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { games } from '../data/games.data';
import { devTools } from '../screens/tools/dev-tools/dev-tools.data';
import { TranslateService } from './translate.service';

/** Title, description, canonical URL and structured data for the games and tools pages. */
@Injectable({ providedIn: 'root' })
export class CatalogSeoService {
  private document = inject(DOCUMENT);
  private translate = inject(TranslateService);
  private title = inject(Title);
  private meta = inject(Meta);

  update(url: string): void {
    const path = url.split(/[?#]/)[0];
    const category = path.split('/').includes('tools') ? 'tools' : 'games';
    const game = games.find((item) => path.endsWith('/' + item.route));
    const tool = devTools.find((item) => path.endsWith('/dev-tools/' + item.slug));
    const isDevTools = path.endsWith('/dev-tools');

    // Tool content is currently English; consolidate language-prefixed copies.
    const canonicalPath = tool || isDevTools ? path.replace(/^\/(pt|en|es|fr|de|it|ja|ru)(?=\/)/, '') : path;
    const canonicalUrl = 'https://brenocs.dev.br' + canonicalPath;
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    if (game?.route !== 'word-ladder') this.document.getElementById('word-ladder-jsonld')?.remove();
    // Word Ladder already owns its structured data and metadata.
    if (game?.route === 'word-ladder') return;

    const title = tool
      ? `${tool.name} — ${tool.keyword}`
      : isDevTools
        ? 'Dev Tools — JSON Formatter & JWT Decoder Online'
        : this.translate.translate(game ? game.nameKey : category === 'games' ? 'catalog.gamesTitle' : 'catalog.toolsTitle');
    const description = tool
      ? tool.description
      : isDevTools
        ? 'Free browser-based developer tools. Format, validate and minify JSON or decode JWT headers, payloads and expiration claims locally.'
        : this.translate.translate(game ? game.descriptionKey : category === 'games' ? 'catalog.gamesIntro' : 'catalog.toolsIntro');

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    this.clearToolSchema();
    if (tool) {
      const schema = this.document.createElement('script');
      schema.id = 'dev-tool-jsonld';
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: tool.name, description: tool.description, url: canonicalUrl,
        applicationCategory: 'DeveloperApplication', operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript', inLanguage: 'en',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      });
      this.document.head.appendChild(schema);
    }
  }

  clearToolSchema(): void {
    this.document.getElementById('dev-tool-jsonld')?.remove();
  }
}

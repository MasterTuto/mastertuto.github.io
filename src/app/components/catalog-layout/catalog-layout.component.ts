import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerLayoutDashboard, tablerLayoutSidebarLeftCollapse, tablerX, tablerCrown, tablerGrid4x4, tablerStack2, tablerTools } from '@ng-icons/tabler-icons';
import { filter } from 'rxjs';
import { devTools } from 'src/app/screens/tools/dev-tools/dev-tools.data';
import { games } from 'src/app/data/games.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-catalog-layout',
  templateUrl: './catalog-layout.component.html',
  styleUrl: './catalog-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, NgIconComponent, TranslatePipe],
  providers: [provideIcons({ tablerLayoutDashboard, tablerLayoutSidebarLeftCollapse, tablerX, tablerCrown, tablerGrid4x4, tablerStack2, tablerTools })],
})
export class CatalogLayoutComponent {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private translate = inject(TranslateService);
  private title = inject(Title);
  private meta = inject(Meta);
  private destroyRef = inject(DestroyRef);
  readonly drawer = viewChild<ElementRef<HTMLDialogElement>>('drawer');
  readonly collapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly currentUrl = signal(this.router.url);
  readonly games = games;
  readonly devTools = devTools;

  get activeTool() {
    return devTools.find(tool => this.currentUrl().split(/[?#]/)[0].endsWith('/dev-tools/' + tool.slug));
  }

  get isDevTools() { return this.currentUrl().split(/[?#]/)[0].endsWith('/dev-tools'); }

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.currentUrl.set(this.router.url);
      this.closeMenu();
      this.updateSeo();
    });
    this.updateSeo();
    this.destroyRef.onDestroy(() => this.document.getElementById('dev-tool-jsonld')?.remove());
  }

  get category(): 'games' | 'tools' {
    return this.currentUrl().split(/[/?#]/).includes('tools') ? 'tools' : 'games';
  }

  get activeGame() {
    return games.find(game => this.currentUrl().split(/[?#]/)[0].endsWith('/' + game.route));
  }

  link(section: string, item?: string): string[] {
    const lang = this.currentUrl().split('/')[1];
    const prefix = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'ru'].includes(lang) ? ['/', lang] : ['/'];
    return [...prefix, section, ...(item ? item.split('/') : [])];
  }

  openMenu(): void {
    this.drawer()?.nativeElement.showModal();
    this.mobileOpen.set(true);
  }

  closeMenu(): void {
    const dialog = this.drawer()?.nativeElement;
    if (dialog?.open) dialog.close();
    this.mobileOpen.set(false);
  }

  private updateSeo(): void {
    const game = this.activeGame;
    const tool = this.activeTool;
    const path = this.currentUrl().split(/[?#]/)[0];
    // Tool content is currently English; consolidate language-prefixed copies.
    const canonicalPath = tool || this.isDevTools ? path.replace(/^\/(pt|en|es|fr|de|it|ja|ru)(?=\/)/, '') : path;
    const url = 'https://brenocs.dev.br' + canonicalPath;
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    if (game?.route !== 'word-ladder') this.document.getElementById('word-ladder-jsonld')?.remove();
    // Word Ladder already owns its structured data and metadata.
    if (game?.route === 'word-ladder') return;
    const title = tool ? `${tool.name} — ${tool.keyword}` : this.isDevTools ? 'Dev Tools — JSON Formatter & JWT Decoder Online' : this.translate.translate(game ? game.nameKey : this.category === 'games' ? 'catalog.gamesTitle' : 'catalog.toolsTitle');
    const description = tool ? tool.description : this.isDevTools ? 'Free browser-based developer tools. Format, validate and minify JSON or decode JWT headers, payloads and expiration claims locally.' : this.translate.translate(game ? game.descriptionKey : this.category === 'games' ? 'catalog.gamesIntro' : 'catalog.toolsIntro');
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.document.getElementById('dev-tool-jsonld')?.remove();
    if (tool) {
      const schema = this.document.createElement('script');
      schema.id = 'dev-tool-jsonld';
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: tool.name, description: tool.description, url,
        applicationCategory: 'DeveloperApplication', operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript', inLanguage: 'en',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      });
      this.document.head.appendChild(schema);
    }
  }
}

import { fromEvent, map, startWith } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerBrandWhatsapp, tablerChevronDown, tablerMenu2, tablerX } from '@ng-icons/tabler-icons';

import { siteNav } from 'src/app/data/navigation.data';
import { NavLink } from 'src/app/model/nav-item.model';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { ButtonComponent } from '../@my/button/button.component';
import { createWhatsAppLink } from 'src/app/utils/html';
import { injectCurrentPath } from 'src/app/layouts/current-url';

const ANIMATION_THRESHOLD = 120;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  host: {
    class: 'sticky top-0 left-0 z-50',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenus()',
  },
  providers: [provideIcons({
      tablerArrowRight,
      tablerBrandWhatsapp,
      tablerChevronDown,
      tablerMenu2,
      tablerX,
    })],
  imports: [
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LangLinkPipe,
    ButtonComponent,
    NgIconComponent
  ]
})
export class NavigationComponent {
  destroyRef = inject(DestroyRef);
  private translateService = inject(TranslateService);

  /** Links for the current area of the site; the rest of the bar is the same everywhere. */
  readonly items = input<NavLink[]>(siteNav);
  /** Square bottom corners so the bar joins the content below it. */
  readonly attached = input(false);
  readonly menuOpen = signal(false);
  /** Label of the desktop menu that is open, if any. */
  readonly openGroup = signal<string | null>(null);
  /** Current path without the language prefix (`services/integracoes`). */
  private readonly appPath = computed(() =>
    this.currentPath().replace(/^\/(pt|en|es|fr|de|it|ja|ru)(?=\/|$)/, '').replace(/^\//, ''),
  );
  private readonly currentPath = injectCurrentPath(() => this.closeMenus());

  isAtBottom = signal(false);

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate("home.whatsappMessage"));
  }

  toggleGroup(label: string): void {
    this.openGroup.update((open) => (open === label ? null : label));
  }

  closeMenus(): void {
    this.openGroup.set(null);
    this.menuOpen.set(false);
  }

  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as Element | null)?.closest('[data-nav-group]')) this.openGroup.set(null);
  }

  hasGroups(item: NavLink): boolean {
    return !!item.children?.some((child) => child.children);
  }

  /** A menu is highlighted when the current page is one of its links. */
  isGroupActive(item: NavLink): boolean {
    const path = this.appPath();
    const paths = (links: NavLink[] = []): string[] =>
      links.flatMap((link) => [...(link.path ? [link.path] : []), ...paths(link.children)]);
    return paths(item.children).some((link) => path === link || path.startsWith(link + '/'));
  }

  /** Anchor links (e.g. #projects) are only active on that anchor; the rest follow `exact`. */
  activeOptions(item: NavLink): IsActiveMatchOptions | { exact: boolean } {
    if (item.fragment) {
      return { paths: 'exact', fragment: 'exact', queryParams: 'ignored', matrixParams: 'ignored' };
    }
    return { exact: !!item.exact };
  }

  sizeStyling = computed(() => {
    switch (this.isAtBottom()) {
      case true:
        return 'px-2 text-xs bg-surface/50';
      default:
        return 'h-full';
    }
  });

  logoStyling = computed(() => {
    switch (this.isAtBottom()) {
      case true:
        return 'h-8 w-8';
      default:
        return 'h-16 w-16';
    }
  });

  constructor() {
    // Publish the bar's height as --site-nav-h so other sticky elements (tool result bars) sit below it.
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      const root = document.documentElement;
      const observer = new ResizeObserver(() => root.style.setProperty('--site-nav-h', `${host.offsetHeight}px`));
      observer.observe(host);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
    afterNextRender( () => {
      fromEvent(window, 'scroll')
        .pipe(
          startWith(null),
          map(() => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            if (window.scrollY >= viewportHeight - ANIMATION_THRESHOLD) {
              return true;
            }
            return false;
          }),
          takeUntilDestroyed(this.destroyRef),
      ).subscribe((isAtBottom) => this.isAtBottom.set(isAtBottom));
    })
  }
}

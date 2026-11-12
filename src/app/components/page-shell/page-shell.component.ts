import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { siteNav } from 'src/app/data/navigation.data';
import { NavLink } from 'src/app/model/nav-item.model';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

/**
 * The single page frame used across the site: navigation, optional breadcrumbs, content and footer.
 * Layouts only decide which links go in the navigation and breadcrumbs.
 */
@Component({
  selector: 'app-page-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, BreadcrumbsComponent, FooterComponent, TranslatePipe],
  host: { class: 'flex min-h-dvh flex-col font-display text-foreground' },
  template: `
    <a
      href="#content"
      class="fixed left-4 top-2 z-[60] -translate-y-[200%] rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0"
    >{{ 'catalog.skip' | translate }}</a>
    <app-navigation [items]="items()" [attached]="flush()" />
    <main id="content" tabindex="-1" class="flex w-full flex-1 flex-col pb-8 outline-none" [class.pt-8]="!flush()">
      @if (crumbs().length) {
        <div class="mx-auto mb-6 w-full max-w-[1200px]">
          <app-breadcrumbs [crumbs]="crumbs()" />
        </div>
      }
      <ng-content />
    </main>
    <app-footer />
  `,
})
export class PageShellComponent {
  readonly items = input<NavLink[]>(siteNav);
  readonly crumbs = input<NavLink[]>([]);
  /** Content starts right under the navigation, sharing its card (used by the home hero). */
  readonly flush = input(false, { transform: booleanAttribute });
}

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
  host: { class: 'flex min-h-dvh flex-col font-body text-surface-0-foreground' },
  templateUrl: './page-shell.component.html',
})
export class PageShellComponent {
  readonly items = input<NavLink[]>(siteNav);
  readonly crumbs = input<NavLink[]>([]);
  /** Content starts right under the navigation, sharing its card (used by the home hero). */
  readonly flush = input(false, { transform: booleanAttribute });
}

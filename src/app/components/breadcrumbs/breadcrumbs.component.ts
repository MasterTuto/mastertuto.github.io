import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavLink } from 'src/app/model/nav-item.model';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

/** Trail of links; the last crumb is the current page. */
@Component({
  selector: 'app-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe, LangLinkPipe],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="flex flex-wrap items-center gap-2 text-sm text-foreground-light">
        @for (crumb of crumbs(); track crumb.label; let last = $last) {
          <li class="flex items-center gap-2">
            @if (last) {
              <span aria-current="page" class="text-foreground">{{ crumb.literal ? crumb.label : (crumb.label | translate) }}</span>
            } @else {
              <a [routerLink]="crumb.path | langLink" class="transition hover:text-foreground">
                {{ crumb.literal ? crumb.label : (crumb.label | translate) }}
              </a>
              <span aria-hidden="true">/</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbsComponent {
  readonly crumbs = input.required<NavLink[]>();
}

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
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
  readonly crumbs = input.required<NavLink[]>();
}

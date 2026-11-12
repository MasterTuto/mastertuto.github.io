import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';
import { industries } from 'src/app/data/industries.data';
import { NavLink } from 'src/app/model/nav-item.model';
import { injectCurrentPath } from './current-url';

/** Route wrapper for /para: the shared page shell with breadcrumbs. */
@Component({
  selector: 'app-industries-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  template: `<app-page-shell [crumbs]="crumbs()"><router-outlet /></app-page-shell>`,
})
export class IndustriesLayoutComponent {
  private path = injectCurrentPath();

  readonly crumbs = computed<NavLink[]>(() => {
    const industry = industries.find((item) => this.path().endsWith('/para/' + item.slug));
    return [
      { label: 'home.nav.home', path: '' },
      { label: 'home.nav.segments', path: 'para' },
      ...(industry ? [{ label: industry.name, literal: true, path: `para/${industry.slug}` }] : []),
    ];
  });
}

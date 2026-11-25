import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';
import { regions } from 'src/app/data/regions.data';
import { NavLink } from 'src/app/model/nav-item.model';
import { injectCurrentPath } from './current-url';

/** Route wrapper for /regioes: the shared page shell with breadcrumbs. */
@Component({
  selector: 'app-regions-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  template: '<app-page-shell [crumbs]="crumbs()"><router-outlet /></app-page-shell>',
})
export class RegionsLayoutComponent {
  private path = injectCurrentPath();

  readonly crumbs = computed<NavLink[]>(() => {
    const region = regions.find((item) => this.path().endsWith('/regioes/' + item.slug));
    return [
      { label: 'home.nav.home', path: '' },
      { label: 'home.footer.regions', path: 'regioes' },
      ...(region ? [{ label: region.name, literal: true, path: `regioes/${region.slug}` }] : []),
    ];
  });
}

import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';
import { projectCases } from 'src/app/data/cases.data';
import { NavLink } from 'src/app/model/nav-item.model';
import { injectCurrentPath } from './current-url';

/** Route wrapper for /cases: the shared page shell with breadcrumbs. */
@Component({
  selector: 'app-cases-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  template: `<app-page-shell [crumbs]="crumbs()"><router-outlet /></app-page-shell>`,
})
export class CasesLayoutComponent {
  private path = injectCurrentPath();

  readonly crumbs = computed<NavLink[]>(() => {
    const project = projectCases.find((item) => this.path().endsWith('/' + item.slug));
    return [
      { label: 'home.nav.home', path: '' },
      ...(project ? [{ label: project.name, literal: true, path: `cases/${project.slug}` }] : []),
    ];
  });
}

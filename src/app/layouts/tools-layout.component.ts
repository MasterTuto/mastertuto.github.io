import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';
import { NavLink } from 'src/app/model/nav-item.model';
import { devTools } from 'src/app/screens/tools/dev-tools/dev-tools.data';
import { injectCurrentPath } from './current-url';

/** Route wrapper for /tools: the shared page shell with breadcrumbs. */
@Component({
  selector: 'app-tools-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  template: `<app-page-shell [crumbs]="crumbs()"><router-outlet /></app-page-shell>`,
})
export class ToolsLayoutComponent {
  private path = injectCurrentPath();

  readonly crumbs = computed<NavLink[]>(() => {
    const path = this.path();
    const tool = devTools.find((item) => path.endsWith('/dev-tools/' + item.slug));
    const inDevTools = Boolean(tool) || path.endsWith('/dev-tools');
    return [
      { label: 'home.nav.home', path: '' },
      { label: 'tools.label', path: 'tools' },
      ...(inDevTools ? [{ label: 'Dev Tools', literal: true, path: 'tools/dev-tools' }] : []),
      ...(tool ? [{ label: tool.name, literal: true, path: `tools/dev-tools/${tool.slug}` }] : []),
    ];
  });
}

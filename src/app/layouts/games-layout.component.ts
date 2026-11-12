import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';
import { games } from 'src/app/data/games.data';
import { NavLink } from 'src/app/model/nav-item.model';
import { injectCurrentPath } from './current-url';

/** Route wrapper for /games: the shared page shell with breadcrumbs. */
@Component({
  selector: 'app-games-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  template: `<app-page-shell [crumbs]="crumbs()"><router-outlet /></app-page-shell>`,
})
export class GamesLayoutComponent {
  private path = injectCurrentPath();

  readonly crumbs = computed<NavLink[]>(() => {
    const game = games.find((item) => this.path().endsWith('/' + item.route));
    return [
      { label: 'home.nav.home', path: '' },
      { label: 'games.label', path: 'games' },
      ...(game ? [{ label: game.nameKey, path: `games/${game.route}` }] : []),
    ];
  });
}

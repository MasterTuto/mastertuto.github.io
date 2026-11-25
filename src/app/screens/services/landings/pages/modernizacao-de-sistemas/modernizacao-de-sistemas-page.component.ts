import { ChangeDetectionStrategy, Component } from '@angular/core';

import { modernizacaoDeSistemasCopy } from '../../content/modernizacao-de-sistemas';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-modernizacao-de-sistemas-page',
  templateUrl: './modernizacao-de-sistemas-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class ModernizacaoDeSistemasPageComponent extends LandingPageBase {
  /** Illustrative share (%) of the system already on the new code after each step. */
  protected readonly shares = this.copy.steps.items.map((_, index, steps) => Math.round(((index + 1) / steps.length) * 80));

  constructor() {
    super(modernizacaoDeSistemasCopy);
  }
}

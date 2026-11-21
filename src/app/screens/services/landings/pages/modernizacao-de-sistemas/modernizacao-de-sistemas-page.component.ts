import { ChangeDetectionStrategy, Component } from '@angular/core';

import { modernizacaoDeSistemasCopy } from '../../content/modernizacao-de-sistemas';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-modernizacao-de-sistemas-page',
  templateUrl: './modernizacao-de-sistemas-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class ModernizacaoDeSistemasPageComponent extends LandingPageBase {
  constructor() {
    super(modernizacaoDeSistemasCopy);
  }
}

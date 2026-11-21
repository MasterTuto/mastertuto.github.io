import { ChangeDetectionStrategy, Component } from '@angular/core';

import { integracoesCopy } from '../../content/integracoes';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-integracoes-page',
  templateUrl: './integracoes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class IntegracoesPageComponent extends LandingPageBase {
  constructor() {
    super(integracoesCopy);
  }
}

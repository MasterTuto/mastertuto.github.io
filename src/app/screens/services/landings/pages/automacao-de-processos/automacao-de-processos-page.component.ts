import { ChangeDetectionStrategy, Component } from '@angular/core';

import { automacaoDeProcessosCopy } from '../../content/automacao-de-processos';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-automacao-de-processos-page',
  templateUrl: './automacao-de-processos-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class AutomacaoDeProcessosPageComponent extends LandingPageBase {
  constructor() {
    super(automacaoDeProcessosCopy);
  }
}

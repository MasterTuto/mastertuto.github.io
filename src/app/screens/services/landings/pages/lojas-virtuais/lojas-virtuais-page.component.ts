import { ChangeDetectionStrategy, Component } from '@angular/core';

import { lojasVirtuaisCopy } from '../../content/lojas-virtuais';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-lojas-virtuais-page',
  templateUrl: './lojas-virtuais-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class LojasVirtuaisPageComponent extends LandingPageBase {
  constructor() {
    super(lojasVirtuaisCopy);
  }
}

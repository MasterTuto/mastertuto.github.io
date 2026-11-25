import { ChangeDetectionStrategy, Component } from '@angular/core';

import { lojasVirtuaisCopy } from '../../content/lojas-virtuais';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-lojas-virtuais-page',
  templateUrl: './lojas-virtuais-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class LojasVirtuaisPageComponent extends LandingPageBase {
  /** Stage of the purchase where each problem (same order) loses the sale. */
  protected readonly stages = this.pt ? ['Produto', 'Frete', 'Checkout', 'Estoque'] : ['Product', 'Shipping', 'Checkout', 'Inventory'];

  constructor() {
    super(lojasVirtuaisCopy);
  }
}

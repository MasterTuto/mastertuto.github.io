import { ChangeDetectionStrategy, Component } from '@angular/core';

import { sistemasSobMedidaCopy } from '../../content/sistemas-sob-medida';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-sistemas-sob-medida-page',
  templateUrl: './sistemas-sob-medida-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class SistemasSobMedidaPageComponent extends LandingPageBase {
  /** Tiles of the dashboard mockup (illustrative numbers). */
  protected readonly kpis = this.pt
    ? [{ label: 'Ordens abertas', value: '18' }, { label: 'Faturado', value: '82%' }, { label: 'Atrasos', value: '2' }]
    : [{ label: 'Open orders', value: '18' }, { label: 'Billed', value: '82%' }, { label: 'Late', value: '2' }];
  /** Heights (%) of the chart bars in the mockup. */
  protected readonly bars = [40, 55, 48, 70, 62, 80, 74, 92];

  constructor() {
    super(sistemasSobMedidaCopy);
  }
}

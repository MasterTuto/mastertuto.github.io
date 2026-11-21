import { ChangeDetectionStrategy, Component } from '@angular/core';

import { sistemasSobMedidaCopy } from '../../content/sistemas-sob-medida';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-sistemas-sob-medida-page',
  templateUrl: './sistemas-sob-medida-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class SistemasSobMedidaPageComponent extends LandingPageBase {
  constructor() {
    super(sistemasSobMedidaCopy);
  }
}

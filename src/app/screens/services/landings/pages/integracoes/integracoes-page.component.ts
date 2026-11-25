import { ChangeDetectionStrategy, Component } from '@angular/core';

import { integracoesCopy } from '../../content/integracoes';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-integracoes-page',
  templateUrl: './integracoes-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class IntegracoesPageComponent extends LandingPageBase {
  /** Systems drawn in the hero, unconnected. */
  protected readonly systems = this.pt ? ['Site', 'WhatsApp', 'CRM', 'ERP', 'Pix'] : ['Website', 'WhatsApp', 'CRM', 'ERP', 'Payments'];

  constructor() {
    super(integracoesCopy);
  }
}

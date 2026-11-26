import { ChangeDetectionStrategy, Component } from '@angular/core';

import { landingPagesCopy } from '../../content/landing-pages';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-landing-pages-page',
  templateUrl: './landing-pages-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class LandingPagesPageComponent extends LandingPageBase {
  /** Callouts on the browser mockup, top to bottom. */
  protected readonly pins = (this.pt ? ['Título', 'Botão único', 'Prova', 'Formulário curto'] : ['Headline', 'One button', 'Proof', 'Short form']).map(
    (label, index) => ({ label, top: ['14%', '36%', '56%', '76%'][index] }),
  );

  constructor() {
    super(landingPagesCopy);
  }
}

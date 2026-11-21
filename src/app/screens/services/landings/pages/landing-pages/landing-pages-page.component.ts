import { ChangeDetectionStrategy, Component } from '@angular/core';

import { landingPagesCopy } from '../../content/landing-pages';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-landing-pages-page',
  templateUrl: './landing-pages-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class LandingPagesPageComponent extends LandingPageBase {
  constructor() {
    super(landingPagesCopy);
  }
}

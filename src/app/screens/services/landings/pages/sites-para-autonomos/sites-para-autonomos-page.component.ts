import { ChangeDetectionStrategy, Component } from '@angular/core';

import { sitesParaAutonomosCopy } from '../../content/sites-para-autonomos';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-sites-para-autonomos-page',
  templateUrl: './sites-para-autonomos-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class SitesParaAutonomosPageComponent extends LandingPageBase {
  constructor() {
    super(sitesParaAutonomosCopy);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { cloudEDevopsCopy } from '../../content/cloud-e-devops';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-cloud-e-devops-page',
  templateUrl: './cloud-e-devops-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class CloudEDevopsPageComponent extends LandingPageBase {
  /** Timestamps of the incident log (problems, same order). */
  protected readonly times = ['03:12', '17:48', '09:05', '22:31'];

  constructor() {
    super(cloudEDevopsCopy);
  }
}

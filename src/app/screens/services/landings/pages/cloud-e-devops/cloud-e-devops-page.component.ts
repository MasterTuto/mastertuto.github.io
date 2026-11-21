import { ChangeDetectionStrategy, Component } from '@angular/core';

import { cloudEDevopsCopy } from '../../content/cloud-e-devops';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-cloud-e-devops-page',
  templateUrl: './cloud-e-devops-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class CloudEDevopsPageComponent extends LandingPageBase {
  constructor() {
    super(cloudEDevopsCopy);
  }
}

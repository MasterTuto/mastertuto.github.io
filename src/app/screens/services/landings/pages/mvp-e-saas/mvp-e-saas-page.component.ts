import { ChangeDetectionStrategy, Component } from '@angular/core';

import { mvpESaasCopy } from '../../content/mvp-e-saas';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-mvp-e-saas-page',
  templateUrl: './mvp-e-saas-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class MvpESaasPageComponent extends LandingPageBase {
  constructor() {
    super(mvpESaasCopy);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { mvpESaasCopy } from '../../content/mvp-e-saas';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-mvp-e-saas-page',
  templateUrl: './mvp-e-saas-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class MvpESaasPageComponent extends LandingPageBase {
  /** Columns of the roadmap: eight weeks, then the launch. */
  protected readonly weeks = [...Array.from({ length: 8 }, (_, i) => (this.pt ? 'S' : 'W') + (i + 1)), '🚀'];
  /** Grid columns [start, end) each step covers, matching the weeks in its title. */
  protected readonly spans = [[1, 2], [2, 4], [4, 9], [9, 10]];

  constructor() {
    super(mvpESaasCopy);
  }
}

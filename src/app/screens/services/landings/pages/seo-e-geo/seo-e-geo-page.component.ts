import { ChangeDetectionStrategy, Component } from '@angular/core';

import { seoEGeoCopy } from '../../content/seo-e-geo';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-seo-e-geo-page',
  templateUrl: './seo-e-geo-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class SeoEGeoPageComponent extends LandingPageBase {
  constructor() {
    super(seoEGeoCopy);
  }
}

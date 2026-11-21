import { ChangeDetectionStrategy, Component } from '@angular/core';

import { blogsEPortfoliosCopy } from '../../content/blogs-e-portfolios';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-blogs-e-portfolios-page',
  templateUrl: './blogs-e-portfolios-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  host: { class: 'landing-page' },
})
export class BlogsEPortfoliosPageComponent extends LandingPageBase {
  constructor() {
    super(blogsEPortfoliosCopy);
  }
}

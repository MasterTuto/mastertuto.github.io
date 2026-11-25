import { ChangeDetectionStrategy, Component } from '@angular/core';

import { blogsEPortfoliosCopy } from '../../content/blogs-e-portfolios';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-blogs-e-portfolios-page',
  templateUrl: './blogs-e-portfolios-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class BlogsEPortfoliosPageComponent extends LandingPageBase {
  protected readonly chapter = this.pt ? 'Capítulo' : 'Chapter';
  /** Table of contents: each entry jumps to a chapter of the page. */
  protected readonly contents = [
    { id: 'problema', label: this.copy.problem.title },
    { id: 'solucao', label: this.copy.solution.title },
    { id: 'processo', label: this.copy.steps.title },
    { id: 'investimento', label: this.common.priceLabel },
    { id: 'form', label: this.pt ? 'Contato' : 'Contact' },
    { id: 'perguntas', label: this.common.faqTitle },
  ];

  constructor() {
    super(blogsEPortfoliosCopy);
  }
}

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { BcsAccordionItemComponent } from '@bcs/components/accordion/accordion-item.component';
import { BcsAccordionComponent } from '@bcs/components/accordion/accordion.component';
import { BcsTextDirective } from '@bcs/directives/text/text.directive';

export interface LandingFaqEntry {
  readonly question: string;
  readonly answer: string;
}

/** Questions and answers of a service page, on the generic accordion. */
@Component({
  selector: 'app-landing-faq',
  templateUrl: './landing-faq.component.html',
  styleUrl: './landing-faq.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsAccordionComponent, BcsAccordionItemComponent, BcsTextDirective],
  host: { class: 'landing-faq' },
})
export class LandingFaqComponent {
  readonly heading = input.required<string>();
  readonly items = input.required<readonly LandingFaqEntry[]>();
}

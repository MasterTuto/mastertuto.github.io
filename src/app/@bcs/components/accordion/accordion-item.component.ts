import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { BcsAccordionComponent } from './accordion.component';

/** One panel of a `bcs-accordion`: a heading that toggles projected content. */
@Component({
  selector: 'bcs-accordion-item',
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-accordion__item' },
})
export class BcsAccordionItemComponent {
  protected readonly accordion = inject(BcsAccordionComponent);

  readonly heading = input.required<string>();
}

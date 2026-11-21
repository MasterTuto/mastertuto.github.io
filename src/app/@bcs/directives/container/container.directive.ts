import { Directive, input } from '@angular/core';

import { BcsWidth } from '@bcs/types/bcs.types';

/** Centers content at one of the three page widths. */
@Directive({
  selector: '[bcs-container]',
  host: { class: 'bcs-container', '[attr.data-width]': 'width()' },
})
export class BcsContainerDirective {
  readonly width = input<BcsWidth>('content');
}

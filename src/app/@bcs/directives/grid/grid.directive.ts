import { Directive, input } from '@angular/core';

import { BcsGap } from '@bcs/types/bcs.types';

export type BcsGridMin = 'sm' | 'md' | 'lg';

/**
 * Responsive grid without breakpoints: as many columns as fit, each at least `min` wide
 * (sm ≈ 14rem, md ≈ 18rem, lg ≈ 24rem).
 */
@Directive({
  selector: '[bcs-grid]',
  host: { class: 'bcs-grid', '[attr.data-gap]': 'gap()', '[attr.data-min]': 'min()' },
})
export class BcsGridDirective {
  readonly gap = input<BcsGap>('md');
  readonly min = input<BcsGridMin>('md');
}

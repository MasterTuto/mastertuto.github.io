import { booleanAttribute, Directive, input } from '@angular/core';

import { BcsAlign, BcsGap, BcsJustify } from '@bcs/types/bcs.types';

export type BcsStackDirection = 'column' | 'row' | 'adaptive';

/**
 * One-dimensional flow. `adaptive` is a column on phones and a row from 48rem up.
 *
 *   <div bcs-stack gap="lg" direction="adaptive" align="center">…</div>
 */
@Directive({
  selector: '[bcs-stack]',
  host: {
    class: 'bcs-stack',
    '[attr.data-gap]': 'gap()',
    '[attr.data-direction]': 'direction()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap() || null',
  },
})
export class BcsStackDirective {
  readonly gap = input<BcsGap>('md');
  readonly direction = input<BcsStackDirection>('column');
  readonly align = input<BcsAlign>('stretch');
  readonly justify = input<BcsJustify>('start');
  readonly wrap = input(false, { transform: booleanAttribute });
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';

@Component({
  selector: 'inv-totals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inv-totals.component.html',
})
export class InvTotalsComponent {
  readonly doc = input.required<DocView>();
  readonly totalLabel = input('');
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';

@Component({
  selector: 'inv-meta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inv-meta.component.html',
})
export class InvMetaComponent {
  readonly doc = input.required<DocView>();
}

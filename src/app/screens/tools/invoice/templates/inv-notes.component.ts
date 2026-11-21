import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';

@Component({
  selector: 'inv-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inv-notes.component.html',
})
export class InvNotesComponent {
  readonly doc = input.required<DocView>();
}

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { BcsColor } from '@bcs/types/bcs.types';

/** Short label (status, category). Always the soft pair of a role. */
@Component({
  selector: 'bcs-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-tag', '[attr.data-color]': 'color()' },
})
export class BcsTagComponent {
  readonly color = input<BcsColor>('muted');
}

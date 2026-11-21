import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BcsColor } from '@bcs/core';

/** Short label (status, category). Always the soft pair of a role. */
@Component({
  selector: 'bcs-tag',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-tag', '[attr.data-color]': 'color()' },
})
export class BcsTag {
  readonly color = input<BcsColor>('muted');
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** One number and what it means. */
@Component({
  selector: 'bcs-stat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-stat' },
  template: `
    <span class="bcs-stat__value">{{ value() }}</span>
    <span class="bcs-stat__label">{{ label() }}</span>
  `,
})
export class BcsStat {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}

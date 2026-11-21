import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type BcsListMarker = 'check' | 'cross' | 'dash' | 'number';

/** List with a semantic marker: positive (check), negative (cross), neutral (dash) or ordered (number). */
@Component({
  selector: 'bcs-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-list', '[attr.data-marker]': 'marker()' },
})
export class BcsListComponent {
  readonly items = input.required<readonly string[]>();
  readonly marker = input<BcsListMarker>('check');
}

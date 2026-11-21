import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';

import type { DocView } from '../invoice.view';

@Component({
  selector: 'inv-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inv-items.component.html',
})
export class InvItemsComponent {
  readonly doc = input.required<DocView>();
  /** Two-line rows (description, then "qty × price") instead of a table. */
  readonly stack = input(false);
  readonly numbered = input(false);
  readonly emptyText = computed(() =>
    ({ pt: 'Adicione itens para vê-los aqui.', en: 'Add items to see them here.', es: 'Agregue ítems para verlos aquí.' })[this.doc().lang],
  );
}

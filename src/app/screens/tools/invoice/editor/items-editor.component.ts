import { ChangeDetectionStrategy, Component, ElementRef, computed, inject } from '@angular/core';

import { computeTotals, currencyDecimals, currencySymbol, formatMoney, itemPresets } from '../invoice.logic';
import { InvoiceStore } from '../invoice.store';
import type { LineItem } from '../invoice.types';
import { NumberInputDirective } from './number-input.directive';

/**
 * Line items as ruled rows (one compact block per item on phones). Enter walks description → quantity
 * → unit → price → discount; Enter on the last field of the last item adds a new item.
 */
@Component({
  selector: 'app-items-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NumberInputDirective],
  templateUrl: './items-editor.component.html',
  styles: `
    .items { display: grid; }
    .item { padding: .9rem 0; border-top: 1px solid rgb(68 74 81 / .1); }
    .item:first-child { border-top: 0; padding-top: 0; }
    .item-top { display: flex; align-items: flex-end; gap: .6rem; }
    .idx { display: grid; flex-shrink: 0; width: 1.75rem; height: 48px; place-items: center; color: #7a70e1; font-weight: 700; font-variant-numeric: tabular-nums; }
    .lbl { color: #8e9095; font-size: .75rem; font-weight: 600; }
    .tools { display: flex; flex-shrink: 0; gap: 2px; }
    .tool { display: grid; width: 36px; height: 48px; place-items: center; border-radius: .6rem; color: #8e9095; font-size: 1rem; }
    .tool:hover:not(:disabled) { background: rgb(68 74 81 / .07); color: #444a51; }
    .tool:disabled { opacity: .3; }
    .tool.del:hover { color: #dc2626; }
    .nums { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem; margin-top: .6rem; padding-left: 2.35rem; }
    @media (min-width: 560px) { .nums { grid-template-columns: .8fr .9fr 1.4fr .85fr 1.2fr; } }
    .pre { position: absolute; left: .85rem; color: #8e9095; font-size: .875rem; font-weight: 550; pointer-events: none; }
    .price .pro-input { padding-right: .6rem; }
    .disc .pro-input { padding-right: 1.9rem; }
    .disc .pro-suffix { right: .7rem; }
    .amount { display: flex; flex-direction: column; justify-content: flex-end; gap: .4rem; min-width: 0; text-align: right; }
    .amount strong { display: flex; min-height: 48px; align-items: center; justify-content: flex-end; color: #151c25; font-size: 1rem; font-variant-numeric: tabular-nums; white-space: nowrap; }
    @media (max-width: 559px) { .amount { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; } .amount strong { min-height: 0; } }
  `,
})
export class ItemsEditorComponent {
  readonly store = inject(InvoiceStore);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly items = computed(() => this.store.invoice().items);
  readonly decimals = computed(() => currencyDecimals(this.store.invoice().currency));
  readonly symbol = computed(() => currencySymbol(this.store.invoice().currency));
  readonly amounts = computed(() => {
    const inv = this.store.invoice();
    return computeTotals(inv, this.decimals()).lines.map((value) => formatMoney(value, inv.currency));
  });
  readonly presets = computed(() => itemPresets(this.store.invoice().lang, this.store.invoice().emitter.hourlyRate));
  readonly units = computed(() => ({ pt: ['h', 'un', 'dia', 'mês', 'projeto', 'página'], en: ['h', 'unit', 'day', 'month', 'project', 'page'], es: ['h', 'ud.', 'día', 'mes', 'proyecto', 'página'] })[this.store.invoice().lang]);

  set<K extends keyof LineItem>(item: LineItem, key: K, value: LineItem[K]): void {
    this.store.updateItems((items) => items.map((it) => (it.id === item.id ? { ...it, [key]: value } : it)));
  }

  move(item: LineItem, delta: number): void {
    this.store.moveItem(item.id, delta);
  }

  /** Adds an item (reusing a single empty one) and focuses its first useful field. */
  add(partial: Partial<LineItem> = {}): void {
    const items = this.items();
    const lone = items.length === 1 && !items[0].description.trim() && !items[0].price ? items[0] : null;
    let id: string;
    if (lone && Object.keys(partial).length) {
      this.store.updateItems(() => [{ ...lone, ...partial }]);
      id = lone.id;
    } else {
      id = this.store.addItem(partial).id;
    }
    const field = partial.description ? (partial.unit === 'h' ? 'qty' : 'price') : 'desc';
    this.focus(`item-${field}-${id}`);
  }

  addAfter(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.add();
  }

  private focus(id: string): void {
    setTimeout(() => {
      const el = this.host.querySelector<HTMLInputElement>(`#${id}`);
      el?.focus();
      el?.select();
    });
  }
}

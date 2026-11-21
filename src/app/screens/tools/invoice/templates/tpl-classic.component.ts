import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './invoice-parts';

/** Clássico: letterhead on the left, title and details on the right, ruled table, total in a brand band. */
@Component({
  selector: 'inv-tpl-classic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  templateUrl: './tpl-classic.component.html',
  styles: `
    inv-tpl-classic { display: flex; flex-direction: column; min-height: 1123px; padding: 56px 60px 40px; }
    .tpl-classic .c-head { display: flex; justify-content: space-between; gap: 32px; padding-bottom: 24px; border-bottom: 3px solid var(--brand); }
    .tpl-classic .c-from { display: grid; gap: 12px; max-width: 50%; }
    .tpl-classic .c-title { display: grid; gap: 12px; min-width: 240px; text-align: right; }
    .tpl-classic h1 { color: var(--brand); font-size: 34px; font-weight: 800; letter-spacing: .04em; line-height: 1; text-transform: uppercase; }
    .tpl-classic .im-row { justify-content: flex-end; }
    .tpl-classic .c-to { margin: 28px 0 24px; }
    .tpl-classic .ii th { border-bottom: 2px solid var(--brand); color: var(--brand); }
    .tpl-classic .c-sum { display: flex; justify-content: space-between; gap: 40px; margin-top: 20px; }
    .tpl-classic .c-sum inv-notes { flex: 1; max-width: 360px; }
    .tpl-classic .it-total { margin-top: 8px; padding: 10px 12px; border: 0; border-radius: 6px; background: var(--brand); color: var(--brand-ink); }
    .tpl-classic .it-row:not(.it-total) { padding-inline: 12px; }
    .tpl-classic inv-pay { margin-top: 32px; padding-top: 18px; border-top: 1px solid #e5e7eb; }
    .tpl-classic .c-foot { margin-top: auto; padding-top: 32px; color: #9ca3af; font-size: 12px; text-align: center; }
  `,
})
export class TplClassicComponent {
  readonly doc = input.required<DocView>();
}

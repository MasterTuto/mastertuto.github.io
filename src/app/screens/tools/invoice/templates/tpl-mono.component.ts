import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Tech: monospace, a terminal-style header, dashed rules and the brand as the syntax color. */
@Component({
  selector: 'inv-tpl-mono',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <header class="t-term">
      <div class="t-dots" aria-hidden="true"><i></i><i></i><i></i></div>
      <p class="t-cmd"><span class="t-prompt">$</span> {{ doc().title.toLowerCase() }} <span class="t-flag">--id</span> {{ doc().number || '—' }}</p>
      <div class="t-row">
        <h1>{{ doc().emitter.name || '—' }}</h1>
        <inv-logo [doc]="doc()" />
      </div>
    </header>
    <div class="t-grid">
      <inv-party [party]="doc().emitter" [label]="'// ' + doc().t.from" />
      <inv-party [party]="doc().client" [label]="'// ' + doc().t.billTo" />
      <inv-meta [doc]="doc()" />
    </div>
    <inv-items [doc]="doc()" [numbered]="true" />
    <div class="t-totals"><inv-totals [doc]="doc()" /></div>
    <div class="t-foot">
      <inv-pay [doc]="doc()" />
      <inv-notes [doc]="doc()" />
    </div>
    <p class="t-eof">EOF · {{ doc().t.thanks }}</p>
  `,
  styles: `
    inv-tpl-mono { display: flex; flex-direction: column; gap: 26px; min-height: 1123px; padding: 44px 48px; font-family: ui-monospace, 'SF Mono', 'Cascadia Mono', 'JetBrains Mono', Menlo, Consolas, 'Liberation Mono', monospace; font-size: 12px; color: #1e293b; }
    .tpl-mono .t-term { padding: 14px 22px 22px; border-radius: 10px; background: #0f172a; color: #e2e8f0; }
    .tpl-mono .t-dots { display: flex; gap: 6px; margin-bottom: 14px; }
    .tpl-mono .t-dots i { width: 10px; height: 10px; border-radius: 50%; background: #475569; }
    .tpl-mono .t-dots i:first-child { background: var(--brand); }
    .tpl-mono .t-cmd { color: #94a3b8; }
    .tpl-mono .t-prompt, .tpl-mono .t-flag { color: var(--brand-soft); }
    .tpl-mono .t-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 10px; }
    .tpl-mono h1 { font-size: 24px; font-weight: 700; }
    .tpl-mono .ilogo { max-height: 44px; padding: 4px; border-radius: 6px; background: #fff; }
    .tpl-mono .t-grid { display: grid; grid-template-columns: 1fr 1fr 220px; gap: 22px; }
    .tpl-mono .ip-label, .tpl-mono .ipay-title, .tpl-mono .in-title { color: var(--brand); font-size: 11px; letter-spacing: 0; text-transform: none; }
    .tpl-mono .ip-name { font-size: 13px; }
    .tpl-mono .ip-line, .tpl-mono .in-text { font-size: 11.5px; }
    .tpl-mono .im { padding-left: 12px; border-left: 2px solid var(--brand); }
    .tpl-mono .ii th { border-block: 1px dashed #64748b; color: #64748b; letter-spacing: 0; }
    .tpl-mono .ii td { border-bottom: 1px dashed #e2e8f0; }
    .tpl-mono .ii .ii-n { color: var(--brand); }
    .tpl-mono .t-totals { display: flex; justify-content: flex-end; }
    .tpl-mono .it { min-width: 300px; }
    .tpl-mono .it-total { border-top: 1px dashed #1e293b; color: var(--brand-deep); }
    .tpl-mono .it-total span:first-child::before { content: '> '; color: var(--brand); }
    .tpl-mono .t-foot { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; }
    .tpl-mono .t-eof { margin-top: auto; padding-top: 12px; border-top: 1px dashed #cbd5e1; color: #94a3b8; font-size: 11px; }
  `,
})
export class TplMonoComponent {
  readonly doc = input.required<DocView>();
}

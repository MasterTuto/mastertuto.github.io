import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './invoice-parts';

/** Corporativo: brand header band, a strip with the key figures, framed parties and a zebra table. */
@Component({
  selector: 'inv-tpl-corporate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  templateUrl: './tpl-corporate.component.html',
  styles: `
    inv-tpl-corporate { display: flex; flex-direction: column; min-height: 1123px; }
    .tpl-corporate .k-band { display: flex; align-items: center; gap: 18px; padding: 34px 52px; background: var(--brand); color: var(--brand-ink); }
    .tpl-corporate .k-logo .ilogo { max-height: 56px; padding: 8px; border-radius: 8px; background: #fff; }
    .tpl-corporate .k-logo .ilogo-mono { background: var(--brand-ink); color: var(--brand); }
    .tpl-corporate .k-name { display: grid; flex: 1; font-size: 12px; }
    .tpl-corporate .k-name strong { font-size: 17px; }
    .tpl-corporate .k-name span { opacity: .8; }
    .tpl-corporate .k-title { display: grid; text-align: right; }
    .tpl-corporate h1 { font-size: 30px; font-weight: 800; line-height: 1.05; letter-spacing: .06em; text-transform: uppercase; }
    .tpl-corporate .k-title span { opacity: .85; font-weight: 600; }
    .tpl-corporate .k-strip { display: flex; background: var(--brand-soft); }
    .tpl-corporate .k-strip > div { display: grid; flex: 1; padding: 14px 18px; border-right: 1px solid #fff; }
    .tpl-corporate .k-strip > div:first-child { padding-left: 52px; }
    .tpl-corporate .k-strip span { color: #4b5563; font-size: 10.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
    .tpl-corporate .k-strip strong { color: #111827; font-size: 14px; }
    .tpl-corporate .k-strip .k-amount { flex: 1.3; padding-right: 52px; border: 0; background: var(--brand-deep); text-align: right; }
    .tpl-corporate .k-strip .k-amount span, .tpl-corporate .k-strip .k-amount strong { color: #fff; }
    .tpl-corporate .k-strip .k-amount strong { font-size: 18px; }
    .tpl-corporate .k-body { display: flex; flex-direction: column; gap: 26px; padding: 34px 52px 48px; }
    .tpl-corporate .k-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .tpl-corporate .k-parties .ip { padding: 14px 16px; border: 1px solid #e5e7eb; border-top: 3px solid var(--brand); }
    .tpl-corporate .ii th { background: var(--brand-deep); color: #fff; }
    .tpl-corporate .ii tbody tr:nth-child(even) td { background: var(--brand-tint); }
    .tpl-corporate .ii td { border-bottom: 0; }
    .tpl-corporate .ii .ii-n { color: #6b7280; }
    .tpl-corporate .k-sum { display: flex; justify-content: space-between; align-items: flex-start; gap: 32px; }
    .tpl-corporate .k-sum inv-pay { flex: 1; }
    .tpl-corporate .it { min-width: 280px; padding: 12px 16px; background: #f9fafb; }
    .tpl-corporate .it-total { border-top-color: var(--brand); color: var(--brand-deep); }
  `,
})
export class TplCorporateComponent {
  readonly doc = input.required<DocView>();
}

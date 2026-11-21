import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';

import { computeTotals, currencyDecimals, formatMoney, isoToBr } from '../invoice.logic';
import { InvoiceStore } from '../invoice.store';
import { downloadBlob } from '../invoice.export';

/** Saved invoices as a ruled table with search, plus backup export/import of all local data. */
@Component({
  selector: 'app-invoice-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './history.component.html',
  styles: `
    .head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1rem; }
    .search { width: min(100%, 340px); }
    .list { width: 100%; margin-top: 1rem; border-collapse: collapse; font-size: .9rem; font-variant-numeric: tabular-nums; }
    th { padding: .5rem; color: #8e9095; font-size: .75rem; font-weight: 600; text-align: left; border-bottom: 1px solid rgb(68 74 81 / .2); }
    td { padding: .65rem .5rem; border-bottom: 1px solid rgb(68 74 81 / .1); vertical-align: middle; }
    .r { text-align: right; }
    .t { font-weight: 650; color: #151c25; white-space: nowrap; }
    tr.current td { background: rgb(122 112 225 / .06); }
    .link { color: #7a70e1; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
    .a { text-align: right; white-space: nowrap; }
    .a button { min-height: 40px; padding: 0 .5rem; border-radius: .5rem; color: #444a51; font-size: .82rem; font-weight: 550; }
    .a button:hover { background: rgb(68 74 81 / .07); }
    .a .del { color: #dc2626; }
    @media (max-width: 719px) {
      thead { display: none; }
      tr { display: grid; grid-template-columns: 1fr auto; gap: .15rem .75rem; padding: .75rem 0; border-bottom: 1px solid rgb(68 74 81 / .1); }
      td { padding: 0; border: 0; }
      .c { grid-column: 1; grid-row: 2; color: #444a51; }
      .d { grid-column: 1; grid-row: 3; color: #8e9095; font-size: .8rem; }
      .t { grid-column: 2; grid-row: 1; }
      .s { grid-column: 2; grid-row: 2 / 4; text-align: right; }
      .a { grid-column: 1 / -1; text-align: left; margin-left: -.5rem; }
    }
    .backup { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1.25rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgb(68 74 81 / .1); font-size: .875rem; }
  `,
})
export class InvoiceHistoryComponent {
  readonly store = inject(InvoiceStore);
  readonly open = output<string>();
  readonly duplicate = output<string>();
  readonly query = signal('');

  readonly rows = computed(() => {
    const q = this.query().trim().toLowerCase();
    const today = new Date().toISOString().slice(0, 10);
    return this.store
      .history()
      .filter((inv) => !q || [inv.number, inv.client.name, inv.reference, ...inv.items.map((i) => i.description)].join(' ').toLowerCase().includes(q))
      .map((inv) => ({
        id: inv.id,
        number: inv.number,
        client: inv.client.name,
        date: isoToBr(inv.issueDate),
        total: formatMoney(computeTotals(inv, currencyDecimals(inv.currency)).total, inv.currency),
        status: inv.status,
        overdue: !!inv.dueDate && inv.dueDate < today,
        statusLabel: inv.status === 'paid' ? 'Paga' : inv.status === 'draft' ? 'Rascunho' : inv.dueDate && inv.dueDate < today ? 'Vencida' : 'Em aberto',
      }));
  });
  readonly paidCount = computed(() => this.store.history().filter((inv) => inv.status === 'paid').length);

  exportBackup(): void {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadBlob(new Blob([this.store.backupJson()], { type: 'application/json' }), `invoices-backup-${stamp}.json`);
  }

  async importBackup(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      const count = this.store.importBackup(await file.text());
      this.store.notify(`Backup importado: ${count} registros.`);
    } catch {
      this.store.notify('Esse arquivo não parece um backup do Gerador de Invoice.');
    }
  }
}

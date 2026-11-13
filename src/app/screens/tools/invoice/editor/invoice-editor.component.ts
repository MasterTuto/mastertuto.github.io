import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCopy, tablerDots, tablerPencil, tablerPlus, tablerStar, tablerTrash } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import {
  LANG_NAMES, MAIN_CURRENCIES, OTHER_CURRENCIES, TAX_PRESETS, addDays, brToIso, computeTotals, currencyDecimals,
  currencyName, currencySymbol, daysBetween, formatInvoiceNumber, formatMoney, formatPercent, isoToBr, uid,
} from '../invoice.logic';
import { InvoiceStore } from '../invoice.store';
import type { DocLang, Invoice, InvoiceStatus, Party, Tax } from '../invoice.types';
import { detectPixKey } from '../invoice.validation';
import { ItemsEditorComponent } from './items-editor.component';
import { NumberInputDirective } from './number-input.directive';
import { SetupStepperComponent } from './setup-stepper.component';

/** The form: six open sections separated by hairlines, in the order a person fills an invoice. */
@Component({
  selector: 'app-invoice-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormFlowDirective, InputMaskDirective, NumberInputDirective, ItemsEditorComponent, SetupStepperComponent, NgIconComponent],
  providers: [provideIcons({ tablerPencil, tablerPlus, tablerDots, tablerCopy, tablerTrash, tablerStar })],
  templateUrl: './invoice-editor.component.html',
  styleUrl: './invoice-editor.component.scss',
})
export class InvoiceEditorComponent {
  readonly store = inject(InvoiceStore);
  /** Opens the profile/client dialog (owned by the page). */
  readonly editParty = output<{ party: Party | null; kind: Party['kind'] }>();

  readonly inv = this.store.invoice;
  readonly langs = Object.entries(LANG_NAMES) as [DocLang, string][];
  readonly mainCurrencies = MAIN_CURRENCIES.map((code) => ({ code, name: currencyName(code) }));
  readonly otherCurrencies = OTHER_CURRENCIES.map((code) => ({ code, name: currencyName(code) }));
  readonly taxPresets = TAX_PRESETS;
  readonly statuses: { id: InvoiceStatus; label: string }[] = [
    { id: 'open', label: 'Em aberto' },
    { id: 'draft', label: 'Rascunho' },
    { id: 'paid', label: 'Pago' },
  ];
  readonly dueChips = [0, 7, 15, 30];
  readonly dateErrors = signal<{ issue?: string; due?: string }>({});

  readonly decimals = computed(() => currencyDecimals(this.inv().currency));
  readonly symbol = computed(() => currencySymbol(this.inv().currency));
  readonly totals = computed(() => computeTotals(this.inv(), this.decimals()));
  readonly money = (value: number) => formatMoney(value, this.inv().currency);
  readonly pct = (value: number) => formatPercent(value);
  readonly dueDays = computed(() => daysBetween(this.inv().issueDate, this.inv().dueDate));
  readonly issueText = computed(() => isoToBr(this.inv().issueDate));
  readonly dueText = computed(() => isoToBr(this.inv().dueDate));
  readonly emitterSaved = computed(() => this.store.emitters().find((p) => p.id === this.inv().emitterId) ?? null);
  readonly clientSaved = computed(() => this.store.clients().find((p) => p.id === this.inv().clientId) ?? null);
  readonly pix = computed(() => detectPixKey(this.inv().emitter.pixKey));
  readonly payment = computed(() => {
    const e = this.inv().emitter;
    return [
      e.pixKey && `PIX (${this.pix().label}): ${e.pixKey}`,
      (e.bank || e.account) && [e.bank, e.agency && `ag. ${e.agency}`, e.account && `c/c ${e.account}`].filter(Boolean).join(' · '),
      e.iban && `IBAN ${e.iban}`,
      e.swift && `SWIFT ${e.swift}`,
      e.payLink,
    ].filter((line): line is string => !!line);
  });
  readonly nextNumber = computed(() => {
    const e = this.emitterSaved();
    return e ? formatInvoiceNumber(e.prefix, e.nextNumber) : '';
  });

  summary(party: Party): string {
    const place = party.international ? party.country : [party.city, party.uf].filter(Boolean).join('/');
    return [party.taxId, party.email, place].filter(Boolean).join(' · ');
  }

  patch(patch: Partial<Invoice>): void {
    this.store.update(patch);
  }

  setLang(lang: DocLang): void {
    this.patch({ lang });
  }

  onNumber(event: Event): void {
    const number = (event.target as HTMLInputElement).value;
    const e = this.emitterSaved();
    const seqText = e && number.startsWith(e.prefix) ? number.slice(e.prefix.length) : '';
    this.patch({ number, seq: /^\d+$/.test(seqText) ? Number(seqText) : null });
  }

  onDate(which: 'issue' | 'due', event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    const iso = brToIso(text);
    if (iso) {
      if (which === 'issue') {
        // Keep the same payment term when the issue date moves.
        const days = this.dueDays();
        this.patch({ issueDate: iso, ...(days !== null ? { dueDate: addDays(iso, days) } : {}) });
      } else this.patch({ dueDate: iso });
      this.dateErrors.update((errors) => ({ ...errors, [which]: undefined }));
    } else if (!text) {
      this.patch(which === 'issue' ? { issueDate: '' } : { dueDate: '' });
    }
  }

  checkDate(which: 'issue' | 'due', event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    const error = text && !brToIso(text) ? 'Data inválida. Use dd/mm/aaaa.' : undefined;
    this.dateErrors.update((errors) => ({ ...errors, [which]: error }));
  }

  setDue(days: number): void {
    this.patch({ dueDate: addDays(this.inv().issueDate || addDays('', 0), days) });
    this.dateErrors.update((errors) => ({ ...errors, due: undefined }));
  }

  addTax(preset?: Omit<Tax, 'id'>): void {
    const tax: Tax = { id: uid(), name: preset?.name ?? '', rate: preset?.rate ?? 0, withheld: preset?.withheld ?? false };
    this.patch({ taxes: [...this.inv().taxes, tax] });
    if (!preset) setTimeout(() => document.getElementById(`tax-name-${tax.id}`)?.focus());
  }

  setTax(tax: Tax, patch: Partial<Tax>): void {
    this.patch({ taxes: this.inv().taxes.map((t) => (t.id === tax.id ? { ...t, ...patch } : t)) });
  }

  removeTax(tax: Tax): void {
    this.patch({ taxes: this.inv().taxes.filter((t) => t.id !== tax.id) });
  }

  onEmitterSelect(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    if (id === '__new') {
      (event.target as HTMLSelectElement).value = this.inv().emitterId ?? '';
      this.editParty.emit({ party: null, kind: 'emitter' });
    } else this.store.selectEmitter(id);
  }

  onClientSelect(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    if (id === '__new') {
      (event.target as HTMLSelectElement).value = this.inv().clientId ?? '';
      this.editParty.emit({ party: null, kind: 'client' });
    } else this.store.selectClient(id || null);
  }

  /** Edit the saved profile, or create one from the invoice snapshot (shared link copies). */
  edit(kind: Party['kind']): void {
    const saved = kind === 'emitter' ? this.emitterSaved() : this.clientSaved();
    const snapshot = kind === 'emitter' ? this.inv().emitter : this.inv().client;
    this.editParty.emit({ party: saved ?? (snapshot.name ? { ...snapshot, id: uid() } : null), kind });
  }

  closeMenu(event: Event): void {
    (event.target as HTMLElement).closest('details')?.removeAttribute('open');
  }
}

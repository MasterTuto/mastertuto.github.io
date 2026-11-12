import { Injectable, PLATFORM_ID, computed, effect, inject, signal, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  advanceCounter, blankInvoice, blankItem, blankParty, formatInvoiceNumber, nextSequence, normalizeInvoice,
  normalizeParty, uid,
} from './invoice.logic';
import { decodeShare, readShareHash } from './invoice.share';
import type { Invoice, LineItem, Party } from './invoice.types';

const DATA_KEY = 'bcs-invoice:data:v1';
const DRAFT_KEY = 'bcs-invoice:draft:v1';

interface StoredData {
  emitters: Party[];
  clients: Party[];
  history: Invoice[];
  defaultEmitterId: string | null;
  defaultClientId: string | null;
  onboarded: boolean;
}

export interface Toast {
  id: number;
  message: string;
  actionLabel?: string;
  action?: () => void;
}

/**
 * State of the invoice generator: profiles, clients, history and the invoice being edited, kept in
 * localStorage (browser only; nothing is sent anywhere). Provided by the page component.
 */
@Injectable()
export class InvoiceStore {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly emitters = signal<Party[]>([]);
  readonly clients = signal<Party[]>([]);
  readonly history = signal<Invoice[]>([]);
  readonly defaultEmitterId = signal<string | null>(null);
  readonly defaultClientId = signal<string | null>(null);
  /** First-run setup finished or skipped. */
  readonly onboarded = signal(false);
  readonly invoice = signal<Invoice>(blankInvoice());
  /** Storage was read (always false while prerendering). */
  readonly ready = signal(false);
  /** Showing an invoice opened from a shared link (read-only until "Editar uma cópia"). */
  readonly shared = signal(false);
  readonly toast = signal<Toast | null>(null);

  readonly inHistory = computed(() => this.history().some((item) => item.id === this.invoice().id));
  readonly needsSetup = computed(() => this.ready() && !this.shared() && !this.onboarded() && !this.emitters().length);

  private toastTimer: ReturnType<typeof setTimeout> | undefined;
  private saveTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect(() => {
      const data: StoredData = {
        emitters: this.emitters(),
        clients: this.clients(),
        history: this.history(),
        defaultEmitterId: this.defaultEmitterId(),
        defaultClientId: this.defaultClientId(),
        onboarded: this.onboarded(),
      };
      const draft = this.invoice();
      if (!this.ready() || untracked(this.shared)) return;
      clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => this.write(data, draft), 250);
    });
  }

  /** Reads storage and the share hash. Call once, in the browser, after the first render. */
  async init(): Promise<void> {
    if (!this.browser) return;
    const data = this.read<Partial<StoredData>>(DATA_KEY) ?? {};
    this.emitters.set((data.emitters ?? []).map((p) => normalizeParty(p, 'emitter')));
    this.clients.set((data.clients ?? []).map((p) => normalizeParty(p, 'client')));
    this.history.set((data.history ?? []).map(normalizeInvoice).filter((i): i is Invoice => !!i));
    this.defaultEmitterId.set(data.defaultEmitterId ?? null);
    this.defaultClientId.set(data.defaultClientId ?? null);
    this.onboarded.set(Boolean(data.onboarded));

    const payload = readShareHash(location.hash);
    if (payload) {
      try {
        const invoice = normalizeInvoice(await decodeShare(payload));
        if (invoice) {
          this.shared.set(true);
          this.invoice.set(invoice);
          this.ready.set(true);
          return;
        }
      } catch {
        this.notify('Não foi possível abrir este link de invoice.');
      }
    }
    const draft = normalizeInvoice(this.read(DRAFT_KEY));
    this.invoice.set(draft ?? this.freshInvoice());
    this.ready.set(true);
  }

  // ------------------------------------------------------------ invoice

  update(patch: Partial<Invoice>): void {
    this.invoice.update((inv) => ({ ...inv, ...patch, updatedAt: Date.now() }));
  }

  updateItems(fn: (items: LineItem[]) => LineItem[]): void {
    this.invoice.update((inv) => ({ ...inv, items: fn(inv.items), updatedAt: Date.now() }));
  }

  /** A new invoice with the default profile and client and the next free number. */
  freshInvoice(): Invoice {
    const emitter = this.emitters().find((p) => p.id === this.defaultEmitterId()) ?? this.emitters()[0] ?? blankParty('emitter');
    const client = this.clients().find((p) => p.id === this.defaultClientId()) ?? blankParty('client');
    const invoice = blankInvoice({ ...emitter }, { ...client });
    return { ...invoice, ...this.numberFor(emitter) };
  }

  newInvoice(): void {
    this.shared.set(false);
    this.invoice.set(this.freshInvoice());
  }

  private numberFor(emitter: Party): Pick<Invoice, 'number' | 'seq'> {
    const used = this.history().filter((inv) => inv.emitterId === emitter.id || !inv.emitterId).map((inv) => inv.number);
    const seq = nextSequence(emitter.nextNumber, used, emitter.prefix);
    return { seq, number: formatInvoiceNumber(emitter.prefix, seq) };
  }

  selectEmitter(id: string): void {
    const emitter = this.emitters().find((p) => p.id === id);
    if (!emitter) return;
    const inv = this.invoice();
    const renumber = !this.inHistory() && inv.seq !== null;
    this.update({
      emitterId: emitter.id,
      emitter: { ...emitter },
      template: emitter.template,
      notes: inv.notes || emitter.notes,
      terms: inv.terms || emitter.terms,
      ...(renumber ? this.numberFor(emitter) : {}),
    });
  }

  selectClient(id: string | null): void {
    const client = this.clients().find((p) => p.id === id);
    if (!client) {
      this.update({ clientId: null, client: blankParty('client') });
      return;
    }
    const inv = this.invoice();
    this.update({
      clientId: client.id,
      client: { ...client },
      lang: client.lang || inv.lang,
      currency: client.currency || inv.currency,
    });
  }

  /** Saves the invoice to the history and moves the profile counter past its number. */
  saveInvoice(silent = false): void {
    const inv = { ...this.invoice(), updatedAt: Date.now() };
    this.invoice.set(inv);
    this.history.update((list) => {
      const index = list.findIndex((item) => item.id === inv.id);
      return index >= 0 ? list.map((item, i) => (i === index ? inv : item)) : [inv, ...list];
    });
    const emitter = this.emitters().find((p) => p.id === inv.emitterId);
    if (emitter) {
      const next = advanceCounter(emitter.nextNumber, inv.number, emitter.prefix);
      if (next !== emitter.nextNumber) this.patchParty({ ...emitter, nextNumber: next }, false);
    }
    if (!silent) this.notify(`Invoice ${inv.number || ''} salva no histórico.`);
  }

  openFromHistory(id: string): void {
    const inv = this.history().find((item) => item.id === id);
    if (!inv) return;
    this.shared.set(false);
    this.invoice.set(structuredClone(inv));
  }

  duplicateFromHistory(id: string): void {
    const source = this.history().find((item) => item.id === id) ?? this.invoice();
    this.invoice.set(this.copyOf(source));
    this.notify('Cópia criada com novo número. Revise as datas e salve.');
  }

  /** Copy of an invoice with a new id, the next number and today's date. */
  copyOf(source: Invoice): Invoice {
    const fresh = this.freshInvoice();
    const emitter = this.emitters().find((p) => p.id === source.emitterId);
    return {
      ...structuredClone(source),
      id: uid(),
      status: 'open',
      issueDate: fresh.issueDate,
      dueDate: fresh.dueDate,
      items: source.items.map((item) => ({ ...item, id: uid() })),
      ...(emitter ? this.numberFor(emitter) : { number: source.number, seq: null }),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  /** Leaves the shared-link view with an editable copy. */
  editSharedCopy(): void {
    const copy = { ...this.invoice(), id: uid(), emitterId: null, clientId: null, createdAt: Date.now() };
    this.shared.set(false);
    this.invoice.set(copy);
    history.replaceState(history.state, '', location.pathname + location.search);
    this.notify('Agora é uma cópia sua. Salve o emissor e o cliente nos seus perfis se quiser reutilizar.');
  }

  setHistoryStatus(id: string, status: Invoice['status']): void {
    this.history.update((list) => list.map((item) => (item.id === id ? { ...item, status, updatedAt: Date.now() } : item)));
    if (this.invoice().id === id) this.update({ status });
  }

  deleteFromHistory(id: string): void {
    const list = this.history();
    const index = list.findIndex((item) => item.id === id);
    if (index < 0) return;
    const removed = list[index];
    this.history.set(list.filter((item) => item.id !== id));
    this.notify(`Invoice ${removed.number} excluída.`, 'Desfazer', () =>
      this.history.update((current) => [...current.slice(0, index), removed, ...current.slice(index)]),
    );
  }

  // ------------------------------------------------------------ profiles

  /** Inserts or updates a profile; refreshes the invoice snapshot when it uses that profile. */
  saveParty(party: Party, select = true): void {
    this.patchParty(party, select);
  }

  private patchParty(party: Party, select: boolean): void {
    const saved = { ...party, updatedAt: Date.now() };
    const list = party.kind === 'emitter' ? this.emitters : this.clients;
    list.update((items) => (items.some((p) => p.id === saved.id) ? items.map((p) => (p.id === saved.id ? saved : p)) : [...items, saved]));
    if (party.kind === 'emitter' && !this.defaultEmitterId()) this.defaultEmitterId.set(saved.id);
    const inv = this.invoice();
    if (party.kind === 'emitter' && (inv.emitterId === saved.id || (select && !this.shared()))) {
      const renumber = inv.seq !== null && !this.inHistory();
      this.update({
        emitterId: saved.id,
        emitter: { ...saved },
        notes: inv.notes || saved.notes,
        terms: inv.terms || saved.terms,
        ...(renumber ? this.numberFor(saved) : {}),
      });
    }
    if (party.kind === 'client' && (inv.clientId === saved.id || (select && !this.shared()))) {
      this.update({ clientId: saved.id, client: { ...saved } });
    }
  }

  duplicateParty(party: Party): Party {
    const copy = { ...party, id: uid(), name: `${party.name} (cópia)` };
    this.saveParty(copy, false);
    return copy;
  }

  deleteParty(party: Party): void {
    const list = party.kind === 'emitter' ? this.emitters : this.clients;
    const before = list();
    list.set(before.filter((p) => p.id !== party.id));
    const defaultId = party.kind === 'emitter' ? this.defaultEmitterId : this.defaultClientId;
    const wasDefault = defaultId() === party.id;
    if (wasDefault) defaultId.set(party.kind === 'emitter' ? (list()[0]?.id ?? null) : null);
    const inv = this.invoice();
    if (party.kind === 'emitter' && inv.emitterId === party.id) this.update({ emitterId: null });
    if (party.kind === 'client' && inv.clientId === party.id) this.update({ clientId: null });
    this.notify(`“${party.name || 'Perfil'}” excluído.`, 'Desfazer', () => {
      list.set(before);
      if (wasDefault) defaultId.set(party.id);
    });
  }

  setDefault(party: Party): void {
    (party.kind === 'emitter' ? this.defaultEmitterId : this.defaultClientId).set(party.id);
    this.notify(`“${party.name}” agora é o ${party.kind === 'emitter' ? 'perfil' : 'cliente'} padrão.`);
  }

  // ------------------------------------------------------------ backup

  backupJson(): string {
    const data: StoredData & { app: string; version: number } = {
      app: 'brenocs.dev.br/tools/gerador-de-invoice',
      version: 1,
      emitters: this.emitters(),
      clients: this.clients(),
      history: this.history(),
      defaultEmitterId: this.defaultEmitterId(),
      defaultClientId: this.defaultClientId(),
      onboarded: true,
    };
    return JSON.stringify(data, null, 2);
  }

  /** Merges a backup: items with the same id are replaced. Returns how many records were read. */
  importBackup(json: string): number {
    const data = JSON.parse(json) as Partial<StoredData>;
    const merge = <T extends { id: string }>(current: T[], incoming: T[]) => [
      ...current.filter((item) => !incoming.some((other) => other.id === item.id)),
      ...incoming,
    ];
    const emitters = (data.emitters ?? []).map((p) => normalizeParty(p, 'emitter'));
    const clients = (data.clients ?? []).map((p) => normalizeParty(p, 'client'));
    const history = (data.history ?? []).map(normalizeInvoice).filter((i): i is Invoice => !!i);
    if (!emitters.length && !clients.length && !history.length) throw new Error('empty');
    this.emitters.update((list) => merge(list, emitters));
    this.clients.update((list) => merge(list, clients));
    this.history.update((list) => merge(list, history));
    if (!this.defaultEmitterId()) this.defaultEmitterId.set(data.defaultEmitterId ?? this.emitters()[0]?.id ?? null);
    if (!this.defaultClientId() && data.defaultClientId) this.defaultClientId.set(data.defaultClientId);
    this.onboarded.set(true);
    if (!this.invoice().emitterId && this.emitters().length) this.selectEmitter(this.defaultEmitterId() ?? this.emitters()[0].id);
    return emitters.length + clients.length + history.length;
  }

  // ------------------------------------------------------------ items

  addItem(partial: Partial<LineItem> = {}, afterIndex?: number): LineItem {
    const item = blankItem(partial);
    this.updateItems((items) => {
      const at = afterIndex === undefined ? items.length : afterIndex + 1;
      return [...items.slice(0, at), item, ...items.slice(at)];
    });
    return item;
  }

  removeItem(id: string): void {
    const items = this.invoice().items;
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) return;
    const removed = items[index];
    this.updateItems((list) => list.filter((item) => item.id !== id));
    this.notify(`Item ${index + 1} removido.`, 'Desfazer', () =>
      this.updateItems((list) => [...list.slice(0, index), removed, ...list.slice(index)]),
    );
  }

  moveItem(id: string, delta: number): void {
    this.updateItems((items) => {
      const index = items.findIndex((item) => item.id === id);
      const target = index + delta;
      if (index < 0 || target < 0 || target >= items.length) return items;
      const copy = [...items];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  // ------------------------------------------------------------ toast and storage

  notify(message: string, actionLabel?: string, action?: () => void): void {
    clearTimeout(this.toastTimer);
    this.toast.set({ id: Date.now(), message, actionLabel, action });
    this.toastTimer = setTimeout(() => this.toast.set(null), action ? 6000 : 3500);
  }

  dismissToast(runAction = false): void {
    const toast = this.toast();
    clearTimeout(this.toastTimer);
    this.toast.set(null);
    if (runAction) toast?.action?.();
  }

  private read<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  private quotaWarned = false;

  private write(data: StoredData, draft: Invoice): void {
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(data));
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      if (!this.quotaWarned) {
        this.quotaWarned = true;
        this.notify('O armazenamento do navegador está cheio. Use uma logo menor ou exporte um backup.');
      }
    }
  }
}

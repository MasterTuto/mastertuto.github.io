/**
 * Pure logic of the invoice generator: document labels, money/date formatting, totals, numbering and
 * defaults. No Angular and no runtime relative imports, so `scripts/test-invoice.mjs` can load it in Node.
 */
import type { DocLang, Invoice, LineItem, Party, Tax, TemplateId } from './invoice.types';

// ---------------------------------------------------------------- labels

export interface DocLabels {
  invoice: string;
  number: string;
  issueDate: string;
  dueDate: string;
  reference: string;
  from: string;
  billTo: string;
  description: string;
  qty: string;
  unit: string;
  unitPrice: string;
  discount: string;
  amount: string;
  subtotal: string;
  shipping: string;
  total: string;
  withheld: string;
  payment: string;
  pix: string;
  pixQr: string;
  bank: string;
  agency: string;
  account: string;
  iban: string;
  swift: string;
  payLink: string;
  notes: string;
  terms: string;
  taxId: string;
  contact: string;
  paid: string;
  draft: string;
  page: string;
  thanks: string;
  amountDue: string;
}

export const DOC_LABELS: Record<DocLang, DocLabels> = {
  pt: {
    invoice: 'Fatura',
    number: 'Nº',
    issueDate: 'Data de emissão',
    dueDate: 'Vencimento',
    reference: 'Referência',
    from: 'De',
    billTo: 'Faturar para',
    description: 'Descrição',
    qty: 'Qtd.',
    unit: 'Unid.',
    unitPrice: 'Preço unit.',
    discount: 'Desconto',
    amount: 'Valor',
    subtotal: 'Subtotal',
    shipping: 'Frete e outros',
    total: 'Total',
    withheld: 'retido',
    payment: 'Dados para pagamento',
    pix: 'Chave PIX',
    pixQr: 'Pague com PIX',
    bank: 'Banco',
    agency: 'Agência',
    account: 'Conta',
    iban: 'IBAN',
    swift: 'SWIFT/BIC',
    payLink: 'Link de pagamento',
    notes: 'Observações',
    terms: 'Termos e condições',
    taxId: 'CPF/CNPJ',
    contact: 'A/C',
    paid: 'Pago',
    draft: 'Rascunho',
    page: 'Página',
    thanks: 'Obrigado pela preferência!',
    amountDue: 'Valor a pagar',
  },
  en: {
    invoice: 'Invoice',
    number: 'No.',
    issueDate: 'Issue date',
    dueDate: 'Due date',
    reference: 'Reference',
    from: 'From',
    billTo: 'Bill to',
    description: 'Description',
    qty: 'Qty',
    unit: 'Unit',
    unitPrice: 'Unit price',
    discount: 'Discount',
    amount: 'Amount',
    subtotal: 'Subtotal',
    shipping: 'Shipping & other',
    total: 'Total',
    withheld: 'withheld',
    payment: 'Payment details',
    pix: 'PIX key',
    pixQr: 'Pay with PIX',
    bank: 'Bank',
    agency: 'Branch',
    account: 'Account',
    iban: 'IBAN',
    swift: 'SWIFT/BIC',
    payLink: 'Payment link',
    notes: 'Notes',
    terms: 'Terms & conditions',
    taxId: 'Tax ID',
    contact: 'Attn.',
    paid: 'Paid',
    draft: 'Draft',
    page: 'Page',
    thanks: 'Thank you for your business!',
    amountDue: 'Amount due',
  },
  es: {
    invoice: 'Factura',
    number: 'N.º',
    issueDate: 'Fecha de emisión',
    dueDate: 'Vencimiento',
    reference: 'Referencia',
    from: 'De',
    billTo: 'Facturar a',
    description: 'Descripción',
    qty: 'Cant.',
    unit: 'Unidad',
    unitPrice: 'Precio unit.',
    discount: 'Descuento',
    amount: 'Importe',
    subtotal: 'Subtotal',
    shipping: 'Envío y otros',
    total: 'Total',
    withheld: 'retenido',
    payment: 'Datos de pago',
    pix: 'Clave PIX',
    pixQr: 'Pague con PIX',
    bank: 'Banco',
    agency: 'Sucursal',
    account: 'Cuenta',
    iban: 'IBAN',
    swift: 'SWIFT/BIC',
    payLink: 'Enlace de pago',
    notes: 'Notas',
    terms: 'Términos y condiciones',
    taxId: 'NIF/Tax ID',
    contact: 'Atn.',
    paid: 'Pagado',
    draft: 'Borrador',
    page: 'Página',
    thanks: '¡Gracias por su preferencia!',
    amountDue: 'Importe a pagar',
  },
};

export const LOCALES: Record<DocLang, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

export const LANG_NAMES: Record<DocLang, string> = { pt: 'Português', en: 'English', es: 'Español' };

/** Currencies shown first in the picker; the rest come from Intl. */
export const MAIN_CURRENCIES = ['BRL', 'USD', 'EUR', 'GBP'];
export const OTHER_CURRENCIES = [
  'ARS', 'AUD', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'DKK', 'HKD', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'NOK',
  'NZD', 'PEN', 'PLN', 'PYG', 'SEK', 'SGD', 'UYU', 'ZAR',
];

export const TEMPLATE_IDS: TemplateId[] = [
  'classic', 'modern', 'minimal', 'corporate', 'elegant', 'creative', 'compact', 'mono', 'stripe', 'receipt',
];

export const TEMPLATE_NAMES: Record<TemplateId, string> = {
  classic: 'Clássico',
  modern: 'Moderno',
  minimal: 'Minimalista',
  corporate: 'Corporativo',
  elegant: 'Elegante',
  creative: 'Criativo',
  compact: 'Compacto',
  mono: 'Tech',
  stripe: 'Faixa lateral',
  receipt: 'Recibo',
};

// ---------------------------------------------------------------- numbers and money

/** Fraction digits of a currency (JPY 0, BRL 2, BHD 3). */
export function currencyDecimals(currency: string): number {
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
}

/** Rounds half away from zero to `decimals`, ignoring binary noise such as 1.005 → 1.00499999. */
export function roundTo(value: number, decimals: number): number {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  const scaled = Number((Math.abs(value) * factor).toPrecision(15));
  const rounded = Math.round(scaled) / factor;
  return value < 0 ? -rounded : rounded;
}

export function formatMoney(value: number, currency: string, locale = 'pt-BR'): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

/** Symbol of a currency as shown in Brazilian Portuguese (R$, US$, €, £). */
export function currencySymbol(currency: string): string {
  try {
    const parts = new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).formatToParts(0);
    return parts.find((part) => part.type === 'currency')?.value ?? currency;
  } catch {
    return currency;
  }
}

export function currencyName(currency: string): string {
  try {
    return new Intl.DisplayNames(['pt-BR'], { type: 'currency' }).of(currency) ?? currency;
  } catch {
    return currency;
  }
}

/** Quantities: up to 3 decimals, no trailing zeros. */
export function formatQty(value: number, locale = 'pt-BR'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 3 }).format(value);
}

export function formatPercent(value: number, locale = 'pt-BR'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value) + '%';
}

/**
 * Parses a number typed by a person: "1.234,56", "1,234.56", "1234.5", "R$ 10". With a single kind
 * of separator, a comma is decimal; a dot is decimal unless it groups exactly three digits more than once.
 */
export function parseNumberText(text: string): number {
  let clean = String(text ?? '').replace(/[^\d,.-]/g, '');
  const negative = clean.startsWith('-');
  clean = clean.replace(/-/g, '');
  if (!clean) return 0;
  const lastComma = clean.lastIndexOf(',');
  const lastDot = clean.lastIndexOf('.');
  let normalized: string;
  if (lastComma >= 0 && lastDot >= 0) {
    const decimal = lastComma > lastDot ? ',' : '.';
    const group = decimal === ',' ? '.' : ',';
    normalized = clean.split(group).join('').replace(decimal, '.');
  } else if (lastComma >= 0) {
    normalized = clean.split('.').join('').replace(/,(?=.*,)/g, '').replace(',', '.');
  } else if (lastDot >= 0) {
    const groups = clean.split('.');
    const grouped = groups.length > 2 && groups.slice(1).every((g) => g.length === 3);
    normalized = grouped ? groups.join('') : groups.slice(0, -1).join('') + '.' + groups[groups.length - 1];
  } else {
    normalized = clean;
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? (negative ? -value : value) : 0;
}

/**
 * Formats a money field while typing, Brazilian style: "1234,5" → "1.234,5". Keeps a trailing comma and
 * at most `decimals` decimal digits. Dots are treated as group separators (the field turns a typed
 * dot into a comma before this runs).
 */
export function formatMoneyTyping(text: string, decimals: number): string {
  const clean = String(text ?? '').replace(/[^\d,]/g, '');
  const comma = clean.indexOf(',');
  let intPart = comma >= 0 ? clean.slice(0, comma) : clean;
  let decPart = comma >= 0 ? clean.slice(comma + 1).replace(/,/g, '') : '';
  intPart = intPart.replace(/^0+(?=\d)/, '');
  if (intPart.length > 13) intPart = intPart.slice(0, 13);
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (comma < 0 || decimals === 0) return grouped;
  decPart = decPart.slice(0, decimals);
  return `${grouped || '0'},${decPart}`;
}

/** Value of a money field formatted by `formatMoneyTyping`. */
export function parseMoneyTyping(text: string): number {
  const clean = String(text ?? '').replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
  const value = Number(clean);
  return Number.isFinite(value) ? value : 0;
}

/** A number as a money field shows it when not being edited: "1.234,50" (or "" for zero when `blankZero`). */
export function formatMoneyField(value: number, decimals: number, blankZero = false): string {
  if (!value && blankZero) return '';
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(
    roundTo(value || 0, decimals),
  );
}

// ---------------------------------------------------------------- totals

export interface TotalsInput {
  items: Pick<LineItem, 'qty' | 'price' | 'discount'>[];
  discountMode: 'pct' | 'value';
  discountValue: number;
  taxes: Tax[];
  shipping: number;
}

export interface TaxLine extends Tax {
  amount: number;
}

export interface Totals {
  lines: number[];
  subtotal: number;
  discount: number;
  base: number;
  taxes: TaxLine[];
  taxAdded: number;
  taxWithheld: number;
  shipping: number;
  total: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Number(value) || 0));

export function lineAmount(item: Pick<LineItem, 'qty' | 'price' | 'discount'>, decimals: number): number {
  const gross = (Number(item.qty) || 0) * (Number(item.price) || 0);
  return roundTo(gross * (1 - clamp(item.discount, 0, 100) / 100), decimals);
}

/**
 * Totals rounded to the currency at each step, as a person checking the invoice by hand would:
 * line amounts → subtotal → discount (percent or fixed, never above the subtotal) → taxes on the
 * discounted base (added, or subtracted when withheld) → shipping/other → total.
 */
export function computeTotals(input: TotalsInput, decimals: number): Totals {
  const lines = input.items.map((item) => lineAmount(item, decimals));
  const subtotal = roundTo(lines.reduce((sum, value) => sum + value, 0), decimals);
  const discount =
    input.discountMode === 'pct'
      ? roundTo((subtotal * clamp(input.discountValue, 0, 100)) / 100, decimals)
      : roundTo(clamp(input.discountValue, 0, Math.max(subtotal, 0)), decimals);
  const base = roundTo(subtotal - discount, decimals);
  const taxes = input.taxes.map((tax) => ({ ...tax, amount: roundTo((base * (Number(tax.rate) || 0)) / 100, decimals) }));
  const taxAdded = roundTo(taxes.filter((t) => !t.withheld).reduce((sum, t) => sum + t.amount, 0), decimals);
  const taxWithheld = roundTo(taxes.filter((t) => t.withheld).reduce((sum, t) => sum + t.amount, 0), decimals);
  const shipping = roundTo(Number(input.shipping) || 0, decimals);
  const total = roundTo(base + taxAdded - taxWithheld + shipping, decimals);
  return { lines, subtotal, discount, base, taxes, taxAdded, taxWithheld, shipping, total };
}

// ---------------------------------------------------------------- numbering

export function formatInvoiceNumber(prefix: string, seq: number, pad = 4): string {
  return `${prefix ?? ''}${String(Math.max(0, Math.floor(seq))).padStart(pad, '0')}`;
}

/** Sequence of `number` when it starts with `prefix` and ends in digits ("2026-0042" → 42), else null. */
export function parseSequence(number: string, prefix: string): number | null {
  const text = String(number ?? '');
  if (!text.startsWith(prefix ?? '')) return null;
  const rest = text.slice((prefix ?? '').length);
  return /^\d+$/.test(rest) ? Number(rest) : null;
}

/** Next free sequence: never below the profile counter nor at or below a number already used with the prefix. */
export function nextSequence(counter: number, usedNumbers: string[], prefix: string): number {
  let next = Math.max(1, Math.floor(Number(counter) || 1));
  for (const number of usedNumbers) {
    const seq = parseSequence(number, prefix);
    if (seq !== null && seq >= next) next = seq + 1;
  }
  return next;
}

/** Profile counter after an invoice with `number` was saved or exported. */
export function advanceCounter(counter: number, number: string, prefix: string): number {
  const seq = parseSequence(number, prefix);
  const current = Math.max(1, Math.floor(Number(counter) || 1));
  return seq !== null && seq >= current ? seq + 1 : current;
}

export function defaultPrefix(date = new Date()): string {
  return `${date.getFullYear()}-`;
}

// ---------------------------------------------------------------- dates

const pad2 = (n: number) => String(n).padStart(2, '0');

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

function parseIso(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.getMonth() === Number(match[2]) - 1 ? date : null;
}

export function addDays(iso: string, days: number): string {
  const date = parseIso(iso) ?? new Date();
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function daysBetween(fromIso: string, toIso: string): number | null {
  const a = parseIso(fromIso);
  const b = parseIso(toIso);
  if (!a || !b) return null;
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/** "2026-11-12" → "12/11/2026" (the format of the date fields). */
export function isoToBr(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  return match ? `${match[3]}/${match[2]}/${match[1]}` : '';
}

/** "12/11/2026" → "2026-11-12", or '' when incomplete or not a real date. */
export function brToIso(text: string): string {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text ?? '');
  if (!match) return '';
  const iso = `${match[3]}-${match[2]}-${match[1]}`;
  return parseIso(iso) ? iso : '';
}

/** Date as the document language writes it: "12 de nov. de 2026", "Nov 12, 2026", "12 nov 2026". */
export function formatDocDate(iso: string, lang: DocLang): string {
  const date = parseIso(iso);
  if (!date) return '';
  return new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

// ---------------------------------------------------------------- misc

/** URL- and file-safe slug: "São Paulo Ltda." → "sao-paulo-ltda". */
export function slugify(text: string, max = 40): string {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max)
    .replace(/-+$/g, '');
}

/** "invoice-2026-0042-acme.pdf". */
export function invoiceFileName(number: string, clientName: string, ext: string): string {
  const parts = ['invoice', slugify(number, 30), slugify(clientName, 30)].filter(Boolean);
  return `${parts.join('-')}.${ext}`;
}

export function uid(): string {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c?.randomUUID) return c.randomUUID().replace(/-/g, '').slice(0, 12);
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/** Brand color helpers: text color that reads on it and soft tints for backgrounds. */
export function brandPalette(hex: string): { color: string; ink: string; soft: string; tint: string; deep: string } {
  const rgb = hexToRgb(hex) ?? [79, 70, 229];
  const [r, g, b] = rgb;
  const luminance = (0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b));
  const mix = (amount: number, to: number) => rgb.map((c) => Math.round(c + (to - c) * amount));
  const toHex = (values: number[]) => '#' + values.map((v) => v.toString(16).padStart(2, '0')).join('');
  return {
    color: toHex(rgb),
    ink: luminance > 0.42 ? '#111827' : '#ffffff',
    soft: toHex(mix(0.88, 255)),
    tint: toHex(mix(0.95, 255)),
    deep: toHex(mix(0.35, 0)),
  };
}

function lin(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(String(hex ?? '').trim());
  if (!match) return null;
  const value = match[1].length === 3 ? match[1].replace(/./g, (c) => c + c) : match[1];
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as [number, number, number];
}

export const BRAND_COLORS = ['#4f46e5', '#0f766e', '#2563eb', '#be123c', '#c2410c', '#15803d', '#7c3aed', '#0f172a', '#a16207', '#db2777'];

export function blankParty(kind: Party['kind']): Party {
  return {
    id: uid(),
    kind,
    name: '',
    taxId: '',
    contact: '',
    international: false,
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    uf: '',
    country: 'Brasil',
    addressFree: '',
    lang: kind === 'emitter' ? 'pt' : '',
    currency: kind === 'emitter' ? 'BRL' : '',
    logo: '',
    brandColor: kind === 'emitter' ? BRAND_COLORS[0] : '',
    pixKey: '',
    bank: '',
    agency: '',
    account: '',
    iban: '',
    swift: '',
    payLink: '',
    notes: '',
    terms: '',
    template: 'modern',
    prefix: kind === 'emitter' ? defaultPrefix() : '',
    nextNumber: 1,
    hourlyRate: 0,
    updatedAt: 0,
  };
}

export function blankItem(partial: Partial<LineItem> = {}): LineItem {
  return { id: uid(), description: '', qty: 1, unit: '', price: 0, discount: 0, ...partial };
}

export function blankInvoice(emitter: Party = blankParty('emitter'), client: Party = blankParty('client')): Invoice {
  const issueDate = todayIso();
  const lang = (client.lang || emitter.lang || 'pt') as DocLang;
  return {
    id: uid(),
    number: formatInvoiceNumber(emitter.prefix, emitter.nextNumber),
    seq: emitter.nextNumber,
    status: 'open',
    lang,
    currency: client.currency || emitter.currency || 'BRL',
    template: emitter.template || 'modern',
    issueDate,
    dueDate: addDays(issueDate, 15),
    reference: '',
    emitterId: emitter.name ? emitter.id : null,
    clientId: client.name ? client.id : null,
    emitter,
    client,
    items: [blankItem()],
    discountMode: 'pct',
    discountValue: 0,
    taxes: [],
    shipping: 0,
    notes: emitter.notes,
    terms: emitter.terms,
    showPixQr: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/** Fills missing fields of stored data (older versions, imports, shared links). */
export function normalizeParty(value: unknown, kind: Party['kind']): Party {
  const base = blankParty(kind);
  if (!value || typeof value !== 'object') return base;
  const out = { ...base } as unknown as Record<string, unknown>;
  for (const [key, def] of Object.entries(base)) {
    const v = (value as Record<string, unknown>)[key];
    if (v !== undefined && v !== null && typeof v === typeof def) out[key] = v;
  }
  out['kind'] = kind;
  if (!TEMPLATE_IDS.includes(out['template'] as TemplateId)) out['template'] = base.template;
  return out as unknown as Party;
}

export function normalizeInvoice(value: unknown): Invoice | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;
  const emitter = normalizeParty(raw['emitter'], 'emitter');
  const client = normalizeParty(raw['client'], 'client');
  const base = blankInvoice(emitter, client);
  const out = { ...base } as unknown as Record<string, unknown>;
  for (const [key, def] of Object.entries(base)) {
    const v = raw[key];
    if (v === undefined) continue;
    if (key === 'emitterId' || key === 'clientId' || key === 'seq') out[key] = v ?? null;
    else if (v !== null && typeof v === typeof def) out[key] = v;
  }
  out['emitter'] = emitter;
  out['client'] = client;
  out['items'] = Array.isArray(raw['items'])
    ? (raw['items'] as Record<string, unknown>[]).map((item) =>
        blankItem({
          description: String(item?.['description'] ?? ''),
          qty: Number(item?.['qty']) || 0,
          unit: String(item?.['unit'] ?? ''),
          price: Number(item?.['price']) || 0,
          discount: Number(item?.['discount']) || 0,
        }),
      )
    : base.items;
  out['taxes'] = Array.isArray(raw['taxes'])
    ? (raw['taxes'] as Record<string, unknown>[]).map((tax) => ({
        id: uid(),
        name: String(tax?.['name'] ?? ''),
        rate: Number(tax?.['rate']) || 0,
        withheld: Boolean(tax?.['withheld']),
      }))
    : [];
  if (!TEMPLATE_IDS.includes(out['template'] as TemplateId)) out['template'] = base.template;
  if (!['pt', 'en', 'es'].includes(out['lang'] as string)) out['lang'] = 'pt';
  if (!['open', 'draft', 'paid'].includes(out['status'] as string)) out['status'] = 'open';
  return out as unknown as Invoice;
}

/** Item presets for quick entry, in the document language. */
export function itemPresets(lang: DocLang, hourlyRate = 0): { label: string; item: Partial<LineItem> }[] {
  const t = {
    pt: ['Horas × taxa', 'Desenvolvimento', 'h', 'Diária', 'Diária de trabalho', 'dia', 'Projeto fechado', 'Projeto', 'un', 'Mensalidade', 'Mensalidade', 'mês', 'Consultoria', 'Consultoria'],
    en: ['Hours × rate', 'Development', 'h', 'Day rate', 'Day of work', 'day', 'Fixed project', 'Project', 'unit', 'Monthly fee', 'Monthly retainer', 'month', 'Consulting', 'Consulting'],
    es: ['Horas × tarifa', 'Desarrollo', 'h', 'Jornada', 'Jornada de trabajo', 'día', 'Proyecto cerrado', 'Proyecto', 'ud.', 'Mensualidad', 'Mensualidad', 'mes', 'Consultoría', 'Consultoría'],
  }[lang];
  return [
    { label: t[0], item: { description: t[1], unit: t[2], qty: 10, price: hourlyRate } },
    { label: t[3], item: { description: t[4], unit: t[5], qty: 1, price: hourlyRate * 8 } },
    { label: t[6], item: { description: t[7], unit: t[8], qty: 1 } },
    { label: t[9], item: { description: t[10], unit: t[11], qty: 1 } },
    { label: t[12], item: { description: t[13], unit: t[2], qty: 1, price: hourlyRate } },
  ];
}

/** Common taxes for one-tap entry. */
export const TAX_PRESETS: Omit<Tax, 'id'>[] = [
  { name: 'ISS', rate: 5, withheld: false },
  { name: 'ISS', rate: 2, withheld: false },
  { name: 'IRRF', rate: 1.5, withheld: true },
  { name: 'VAT', rate: 20, withheld: false },
  { name: 'IVA', rate: 21, withheld: false },
];

/**
 * Builds the ready-to-render view of an invoice document: every string formatted in the document
 * language, so the ten templates only lay things out.
 */
import {
  DOC_LABELS, LOCALES, brandPalette, computeTotals, currencyDecimals, formatDocDate, formatMoney, formatPercent,
  formatQty, type DocLabels,
} from './invoice.logic';
import type { DocLang, Invoice, InvoiceStatus, Party, TemplateId } from './invoice.types';
import { cpfCnpjKind, detectPixKey, pixPayload } from './invoice.validation';

export interface PartyView {
  name: string;
  /** Address and identification lines, already joined and without empty parts. */
  lines: string[];
  taxId: string;
  email: string;
  phone: string;
  contact: string;
}

export interface ItemView {
  n: number;
  description: string;
  qty: string;
  unit: string;
  qtyUnit: string;
  unitPrice: string;
  discount: string;
  amount: string;
}

export interface Row {
  label: string;
  value: string;
}

export interface DocView {
  lang: DocLang;
  locale: string;
  template: TemplateId;
  t: DocLabels;
  /** Shown title, e.g. "Invoice" / "Fatura". */
  title: string;
  number: string;
  issueDate: string;
  dueDate: string;
  reference: string;
  /** Number, dates and reference as label/value rows. */
  meta: Row[];
  brand: ReturnType<typeof brandPalette>;
  /** Inline CSS variables for the document root. */
  style: string;
  logo: string;
  emitter: PartyView;
  client: PartyView;
  items: ItemView[];
  hasDiscount: boolean;
  /** Subtotal, discount, taxes and shipping rows (the total is separate). */
  totals: Row[];
  total: string;
  currency: string;
  payment: Row[];
  /** PIX "copia e cola" for the QR code, when the currency is BRL and the key is valid. */
  pix: string;
  notes: string;
  terms: string;
  status: InvoiceStatus;
  stamp: string;
  empty: boolean;
}

function partyView(party: Party, t: DocLabels, lang: DocLang): PartyView {
  const taxKind = party.international ? null : cpfCnpjKind(party.taxId);
  const taxLabel = taxKind ? (lang === 'pt' ? taxKind : `${t.taxId} (${taxKind})`) : t.taxId;
  const taxId = party.taxId.trim() ? `${taxLabel}: ${party.taxId.trim()}` : '';
  const lines: string[] = [];
  if (party.international) {
    lines.push(...party.addressFree.split('\n').map((line) => line.trim()).filter(Boolean));
    if (party.country.trim()) lines.push(party.country.trim());
  } else {
    const street = [party.street, party.number].map((s) => s.trim()).filter(Boolean).join(', ');
    const first = [street, party.complement.trim()].filter(Boolean).join(' – ');
    if (first) lines.push(first);
    const cityUf = [party.city.trim(), party.uf.trim()].filter(Boolean).join('/');
    const second = [party.district.trim(), cityUf].filter(Boolean).join(' – ');
    const cep = party.cep.trim() ? `CEP ${party.cep.trim()}` : '';
    const line2 = [second, cep].filter(Boolean).join(', ');
    if (line2) lines.push(line2);
    if (lang !== 'pt' && (first || line2)) lines.push(party.country.trim() || 'Brasil');
  }
  return {
    name: party.name.trim(),
    lines,
    taxId,
    email: party.email.trim(),
    phone: party.phone.trim(),
    contact: party.contact.trim() ? `${t.contact} ${party.contact.trim()}` : '',
  };
}

export function buildDocView(invoice: Invoice): DocView {
  const lang = invoice.lang;
  const t = DOC_LABELS[lang];
  const locale = LOCALES[lang];
  const currency = invoice.currency || 'BRL';
  const decimals = currencyDecimals(currency);
  const money = (value: number) => formatMoney(value, currency, locale);
  const totals = computeTotals(invoice, decimals);
  const brand = brandPalette(invoice.emitter.brandColor || '#4f46e5');
  const hasDiscount = invoice.items.some((item) => Number(item.discount) > 0);
  const items = invoice.items
    .filter((item) => item.description.trim() || item.price)
    .map((item, i) => {
      const qty = formatQty(Number(item.qty) || 0, locale);
      return {
        n: i + 1,
        description: item.description.trim(),
        qty,
        unit: item.unit.trim(),
        qtyUnit: item.unit.trim() ? `${qty} ${item.unit.trim()}` : qty,
        unitPrice: money(Number(item.price) || 0),
        discount: Number(item.discount) > 0 ? formatPercent(Number(item.discount), locale) : '',
        amount: money(totals.lines[invoice.items.indexOf(item)] ?? 0),
      };
    });

  const totalRows: Row[] = [{ label: t.subtotal, value: money(totals.subtotal) }];
  if (totals.discount) {
    const pct = invoice.discountMode === 'pct' ? ` (${formatPercent(invoice.discountValue, locale)})` : '';
    totalRows.push({ label: t.discount + pct, value: '−' + money(totals.discount) });
  }
  for (const tax of totals.taxes) {
    if (!tax.rate) continue;
    const name = `${tax.name || 'Tax'} ${formatPercent(tax.rate, locale)}${tax.withheld ? ` (${t.withheld})` : ''}`;
    totalRows.push({ label: name, value: (tax.withheld ? '−' : '') + money(tax.amount) });
  }
  if (totals.shipping) totalRows.push({ label: t.shipping, value: money(totals.shipping) });

  const e = invoice.emitter;
  const payment: Row[] = [];
  const pixKey = detectPixKey(e.pixKey);
  if (e.pixKey.trim()) payment.push({ label: `${t.pix}${pixKey.type !== 'unknown' ? ` (${pixKey.label})` : ''}`, value: e.pixKey.trim() });
  if (e.bank.trim()) payment.push({ label: t.bank, value: e.bank.trim() });
  if (e.agency.trim() || e.account.trim())
    payment.push({ label: `${t.agency} / ${t.account}`, value: [e.agency.trim(), e.account.trim()].filter(Boolean).join(' / ') });
  if (e.iban.trim()) payment.push({ label: t.iban, value: e.iban.trim() });
  if (e.swift.trim()) payment.push({ label: t.swift, value: e.swift.trim() });
  if (e.payLink.trim()) payment.push({ label: t.payLink, value: e.payLink.trim() });

  const pix =
    invoice.showPixQr && currency === 'BRL' && pixKey.valid && totals.total > 0
      ? pixPayload({ key: e.pixKey, name: e.name, city: e.city || 'BRASIL', amount: totals.total, txid: invoice.number })
      : '';

  const issueDate = formatDocDate(invoice.issueDate, lang);
  const dueDate = formatDocDate(invoice.dueDate, lang);
  const meta: Row[] = [{ label: t.number, value: invoice.number || '—' }];
  if (issueDate) meta.push({ label: t.issueDate, value: issueDate });
  if (dueDate) meta.push({ label: t.dueDate, value: dueDate });
  if (invoice.reference.trim()) meta.push({ label: t.reference, value: invoice.reference.trim() });

  return {
    lang,
    locale,
    template: invoice.template,
    t,
    title: t.invoice,
    number: invoice.number,
    issueDate,
    dueDate,
    reference: invoice.reference.trim(),
    meta,
    brand,
    style: `--brand:${brand.color};--brand-ink:${brand.ink};--brand-soft:${brand.soft};--brand-tint:${brand.tint};--brand-deep:${brand.deep}`,
    logo: e.logo,
    emitter: partyView(e, t, lang),
    client: partyView(invoice.client, t, lang),
    items,
    hasDiscount,
    totals: totalRows,
    total: money(totals.total),
    currency,
    payment,
    pix,
    notes: invoice.notes.trim(),
    terms: invoice.terms.trim(),
    status: invoice.status,
    stamp: invoice.status === 'paid' ? t.paid : invoice.status === 'draft' ? t.draft : '',
    empty: !items.length,
  };
}

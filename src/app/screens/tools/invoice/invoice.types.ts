/** Data model of the invoice generator. Type-only module: safe to import with `import type` anywhere. */

/** Language of the invoice document (the page itself is always in Portuguese). */
export type DocLang = 'pt' | 'en' | 'es';

export type TemplateId =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'corporate'
  | 'elegant'
  | 'creative'
  | 'compact'
  | 'mono'
  | 'stripe'
  | 'receipt';

/** `open` is a normal issued invoice; `draft` and `paid` add a stamp to the document. */
export type InvoiceStatus = 'open' | 'draft' | 'paid';

/** A business (the emitter) or a client. Emitter-only fields stay empty on clients. */
export interface Party {
  id: string;
  kind: 'emitter' | 'client';
  name: string;
  /** Brazilian CPF/CNPJ (masked) or, when `international`, any tax ID / VAT number. */
  taxId: string;
  /** Contact person or department ("A/C"). */
  contact: string;
  international: boolean;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
  country: string;
  /** Free-form address for addresses outside Brazil. */
  addressFree: string;
  /** Preferred document language and currency ('' = no preference, for clients). */
  lang: DocLang | '';
  currency: string;
  // Emitter only.
  logo: string;
  brandColor: string;
  pixKey: string;
  bank: string;
  agency: string;
  account: string;
  iban: string;
  swift: string;
  payLink: string;
  notes: string;
  terms: string;
  template: TemplateId;
  prefix: string;
  nextNumber: number;
  hourlyRate: number;
  updatedAt: number;
}

export interface LineItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  price: number;
  /** Percentage, 0–100. */
  discount: number;
}

export interface Tax {
  id: string;
  name: string;
  /** Percentage, e.g. 5 for 5 %. */
  rate: number;
  /** Withheld by the client (e.g. IRRF): subtracted from the total instead of added. */
  withheld: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  /** Sequence number taken from the emitter profile, or null when typed by hand. */
  seq: number | null;
  status: InvoiceStatus;
  lang: DocLang;
  currency: string;
  template: TemplateId;
  /** ISO dates (yyyy-mm-dd). */
  issueDate: string;
  dueDate: string;
  reference: string;
  emitterId: string | null;
  clientId: string | null;
  /** Snapshots, so saved and shared invoices do not change when a profile changes. */
  emitter: Party;
  client: Party;
  items: LineItem[];
  discountMode: 'pct' | 'value';
  discountValue: number;
  taxes: Tax[];
  shipping: number;
  notes: string;
  terms: string;
  showPixQr: boolean;
  createdAt: number;
  updatedAt: number;
}

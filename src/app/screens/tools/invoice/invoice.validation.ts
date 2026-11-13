/**
 * Validation of Brazilian documents and payment data, plus the PIX "copia e cola" (BR Code) payload.
 * Self-contained and Angular-free: tested by `scripts/test-invoice.mjs`.
 */

export const onlyDigits = (text: string) => String(text ?? '').replace(/\D/g, '');

export function isValidCpf(text: string): boolean {
  const d = onlyDigits(text);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (const size of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < size; i++) sum += Number(d[i]) * (size + 1 - i);
    const check = ((sum * 10) % 11) % 10;
    if (check !== Number(d[size])) return false;
  }
  return true;
}

export function isValidCnpj(text: string): boolean {
  const d = onlyDigits(text);
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  for (const size of [12, 13]) {
    let sum = 0;
    let weight = size - 7;
    for (let i = 0; i < size; i++) {
      sum += Number(d[i]) * weight--;
      if (weight < 2) weight = 9;
    }
    const rest = sum % 11;
    const check = rest < 2 ? 0 : 11 - rest;
    if (check !== Number(d[size])) return false;
  }
  return true;
}

/** Error message for a CPF/CNPJ field, or null when empty or valid. */
export function cpfCnpjError(text: string): string | null {
  const d = onlyDigits(text);
  if (!d) return null;
  if (d.length === 11) return isValidCpf(d) ? null : 'CPF inválido: confira os dígitos.';
  if (d.length === 14) return isValidCnpj(d) ? null : 'CNPJ inválido: confira os dígitos.';
  return d.length < 11 ? 'CPF incompleto: são 11 dígitos.' : 'CNPJ incompleto: são 14 dígitos.';
}

/** "CPF" or "CNPJ" for a complete number, else null. */
export function cpfCnpjKind(text: string): 'CPF' | 'CNPJ' | null {
  const d = onlyDigits(text);
  return d.length === 11 ? 'CPF' : d.length === 14 ? 'CNPJ' : null;
}

export function isValidEmail(text: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(text ?? '').trim());
}

export function emailError(text: string): string | null {
  return !String(text ?? '').trim() || isValidEmail(text) ? null : 'E-mail inválido.';
}

/** Brazilian phone with area code: 10 digits (landline) or 11 (mobile starting with 9). */
export function brPhoneError(text: string): string | null {
  const d = onlyDigits(text);
  if (!d) return null;
  if (d.length < 10) return 'Telefone incompleto: inclua o DDD.';
  if (d.length === 11 && d[2] !== '9') return 'Celular deve começar com 9 depois do DDD.';
  return null;
}

export function cepError(text: string): string | null {
  const d = onlyDigits(text);
  return !d || d.length === 8 ? null : 'CEP incompleto: são 8 dígitos.';
}

export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'phone' | 'evp' | 'unknown';

export interface PixKeyInfo {
  type: PixKeyType;
  /** Portuguese label for the type, e.g. "CNPJ", "Celular", "Chave aleatória". */
  label: string;
  /** Key as it goes into the BR Code: digits for CPF/CNPJ, +55… for phones, lowercase e-mail. */
  normalized: string;
  valid: boolean;
}

const PIX_LABELS: Record<PixKeyType, string> = {
  cpf: 'CPF',
  cnpj: 'CNPJ',
  email: 'E-mail',
  phone: 'Celular',
  evp: 'Chave aleatória',
  unknown: 'Chave',
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Detects the kind of PIX key typed. An 11-digit number is a CPF when its check digits match, otherwise
 * a mobile number; a leading "+" or formatting like "(11) 9…" always means a phone.
 */
export function detectPixKey(text: string): PixKeyInfo {
  const raw = String(text ?? '').trim();
  const info = (type: PixKeyType, normalized: string, valid: boolean): PixKeyInfo => ({ type, label: PIX_LABELS[type], normalized, valid });
  if (!raw) return info('unknown', '', false);
  if (raw.includes('@')) return info('email', raw.toLowerCase(), isValidEmail(raw));
  if (UUID.test(raw)) return info('evp', raw.toLowerCase(), true);
  const digits = onlyDigits(raw);
  if (/[a-z]/i.test(raw)) return info('unknown', raw, false);
  const looksPhone = raw.startsWith('+') || /\(\d{2}\)/.test(raw);
  if (looksPhone || (digits.length === 13 && digits.startsWith('55'))) {
    const national = digits.startsWith('55') && digits.length >= 12 ? digits.slice(2) : digits;
    return info('phone', '+55' + national, national.length === 11 || national.length === 10);
  }
  if (digits.length === 14) return info('cnpj', digits, isValidCnpj(digits));
  if (digits.length === 11) {
    if (isValidCpf(digits)) return info('cpf', digits, true);
    if (digits[2] === '9') return info('phone', '+55' + digits, true);
    return info('cpf', digits, false);
  }
  if (digits.length === 10) return info('phone', '+55' + digits, true);
  return info('unknown', raw, false);
}

// ---------------------------------------------------------------- BR Code (PIX copia e cola)

/** CRC16/CCITT-FALSE (poly 0x1021, init 0xFFFF) as 4 uppercase hex digits. */
export function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, '0')}${value}`;

/** ASCII-only, upper bound on length (the BR Code spec limits name to 25 and city to 15). */
const ascii = (text: string, max: number) =>
  String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\x20-\x7e]/g, '')
    .trim()
    .slice(0, max);

export interface PixPayloadInput {
  key: string;
  name: string;
  city: string;
  amount?: number;
  txid?: string;
  description?: string;
}

/** Static PIX BR Code (EMV® QRCPS) with optional amount. Returns '' when the key is not valid. */
export function pixPayload(input: PixPayloadInput): string {
  const key = detectPixKey(input.key);
  if (!key.valid) return '';
  const description = ascii(input.description ?? '', 40);
  const account = field('00', 'br.gov.bcb.pix') + field('01', key.normalized) + (description ? field('02', description) : '');
  const txid = ascii(input.txid ?? '', 25).replace(/[^A-Za-z0-9]/g, '') || '***';
  const amount = input.amount && input.amount > 0 ? field('54', input.amount.toFixed(2)) : '';
  const body =
    field('00', '01') +
    field('26', account) +
    field('52', '0000') +
    field('53', '986') +
    amount +
    field('58', 'BR') +
    field('59', ascii(input.name, 25) || 'N') +
    field('60', ascii(input.city, 15) || 'BRASIL') +
    field('62', field('05', txid)) +
    '6304';
  return body + crc16(body);
}

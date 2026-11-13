import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeTotals, lineAmount, roundTo, currencyDecimals, formatInvoiceNumber, parseSequence, nextSequence,
  advanceCounter, parseNumberText, formatMoneyTyping, parseMoneyTyping, formatMoneyField, invoiceFileName,
  isoToBr, brToIso, addDays, formatDocDate, brandPalette, normalizeInvoice, blankInvoice, blankParty, formatMoney,
} from '../src/app/screens/tools/invoice/invoice.logic.ts';
import {
  isValidCpf, isValidCnpj, cpfCnpjError, detectPixKey, crc16, pixPayload, brPhoneError,
} from '../src/app/screens/tools/invoice/invoice.validation.ts';
import { encodeShare, decodeShare, readShareHash } from '../src/app/screens/tools/invoice/invoice.share.ts';

const base = { discountMode: 'pct', discountValue: 0, taxes: [], shipping: 0 };

test('rounds half away from zero without binary noise', () => {
  assert.equal(roundTo(1.005, 2), 1.01);
  assert.equal(roundTo(2.675, 2), 2.68);
  assert.equal(roundTo(-1.005, 2), -1.01);
  assert.equal(roundTo(0.1 + 0.2, 2), 0.3);
  assert.equal(roundTo(1234.5, 0), 1235);
});

test('currency decimals come from Intl', () => {
  assert.equal(currencyDecimals('BRL'), 2);
  assert.equal(currencyDecimals('JPY'), 0);
  assert.equal(currencyDecimals('CLP'), 0);
  assert.equal(currencyDecimals('BHD'), 3);
  assert.equal(currencyDecimals('???'), 2);
});

test('line amounts apply quantity, price and line discount', () => {
  assert.equal(lineAmount({ qty: 3, price: 33.333, discount: 0 }, 2), 100);
  assert.equal(lineAmount({ qty: 10, price: 150, discount: 10 }, 2), 1350);
  assert.equal(lineAmount({ qty: 1.5, price: 99.99, discount: 0 }, 2), 149.99);
  assert.equal(lineAmount({ qty: 2, price: 10, discount: 150 }, 2), 0, 'discount is clamped to 100%');
});

test('totals: percent discount, added and withheld taxes, shipping', () => {
  const t = computeTotals({
    items: [{ qty: 10, price: 150, discount: 0 }, { qty: 1, price: 500, discount: 0 }],
    discountMode: 'pct', discountValue: 10,
    taxes: [{ id: 'a', name: 'ISS', rate: 5, withheld: false }, { id: 'b', name: 'IRRF', rate: 1.5, withheld: true }],
    shipping: 25.5,
  }, 2);
  assert.equal(t.subtotal, 2000);
  assert.equal(t.discount, 200);
  assert.equal(t.base, 1800);
  assert.deepEqual(t.taxes.map((x) => x.amount), [90, 27]);
  assert.equal(t.taxAdded, 90);
  assert.equal(t.taxWithheld, 27);
  assert.equal(t.total, 1888.5);
});

test('totals: fixed discount never exceeds subtotal and rounds per currency', () => {
  const t = computeTotals({ ...base, items: [{ qty: 1, price: 100, discount: 0 }], discountMode: 'value', discountValue: 500 }, 2);
  assert.equal(t.discount, 100);
  assert.equal(t.total, 0);
  const yen = computeTotals({ ...base, items: [{ qty: 3, price: 333.4, discount: 0 }], taxes: [{ id: 't', name: 'VAT', rate: 10, withheld: false }] }, 0);
  assert.equal(yen.subtotal, 1000);
  assert.equal(yen.taxAdded, 100);
  assert.equal(yen.total, 1100);
  const cents = computeTotals({ ...base, items: [{ qty: 1, price: 0.1, discount: 0 }, { qty: 1, price: 0.2, discount: 0 }] }, 2);
  assert.equal(cents.total, 0.3);
});

test('invoice numbers: format, parse and sequence', () => {
  assert.equal(formatInvoiceNumber('2026-', 42), '2026-0042');
  assert.equal(formatInvoiceNumber('', 12345), '12345');
  assert.equal(parseSequence('2026-0042', '2026-'), 42);
  assert.equal(parseSequence('2025-0042', '2026-'), null);
  assert.equal(parseSequence('2026-A1', '2026-'), null);
  assert.equal(nextSequence(1, ['2026-0001', '2026-0007', 'X-0099'], '2026-'), 8);
  assert.equal(nextSequence(20, ['2026-0007'], '2026-'), 20);
  assert.equal(advanceCounter(42, '2026-0042', '2026-'), 43);
  assert.equal(advanceCounter(42, '2026-0010', '2026-'), 42, 'an older number does not move the counter back');
  assert.equal(advanceCounter(42, 'manual', '2026-'), 42);
});

test('parses typed numbers in Brazilian and international formats', () => {
  assert.equal(parseNumberText('1.234,56'), 1234.56);
  assert.equal(parseNumberText('1,234.56'), 1234.56);
  assert.equal(parseNumberText('R$ 10'), 10);
  assert.equal(parseNumberText('1.5'), 1.5);
  assert.equal(parseNumberText('1.000.000'), 1000000);
  assert.equal(parseNumberText('12,5'), 12.5);
  assert.equal(parseNumberText(''), 0);
});

test('money fields format while typing', () => {
  assert.equal(formatMoneyTyping('1234', 2), '1.234');
  assert.equal(formatMoneyTyping('1234,', 2), '1.234,');
  assert.equal(formatMoneyTyping('1.234,567', 2), '1.234,56');
  assert.equal(formatMoneyTyping(',5', 2), '0,5');
  assert.equal(formatMoneyTyping('0012', 2), '12');
  assert.equal(formatMoneyTyping('1234,5', 0), '1.234');
  assert.equal(parseMoneyTyping('1.234,5'), 1234.5);
  assert.equal(formatMoneyField(1234.5, 2), '1.234,50');
  assert.equal(formatMoneyField(0, 2, true), '');
});

test('money and dates follow the document language', () => {
  assert.equal(formatMoney(1234.5, 'BRL', 'pt-BR').replace(/\s/g, ' '), 'R$ 1.234,50');
  assert.equal(formatMoney(1234.5, 'USD', 'en-US'), '$1,234.50');
  assert.match(formatDocDate('2026-11-12', 'en'), /Nov 12, 2026/);
  assert.match(formatDocDate('2026-11-12', 'pt'), /12 de nov/);
  assert.match(formatDocDate('2026-11-12', 'es'), /12 nov/);
  assert.equal(isoToBr('2026-11-12'), '12/11/2026');
  assert.equal(brToIso('12/11/2026'), '2026-11-12');
  assert.equal(brToIso('31/02/2026'), '');
  assert.equal(addDays('2026-12-25', 15), '2027-01-09');
});

test('file names are slugged', () => {
  assert.equal(invoiceFileName('2026-0042', 'Açaí & Cia Ltda.', 'pdf'), 'invoice-2026-0042-acai-cia-ltda.pdf');
  assert.equal(invoiceFileName('', '', 'png'), 'invoice.png');
});

test('brand palette picks readable ink', () => {
  assert.equal(brandPalette('#ffffff').ink, '#111827');
  assert.equal(brandPalette('#0f172a').ink, '#ffffff');
  assert.equal(brandPalette('#fe0').color, '#ffee00');
});

test('CPF and CNPJ check digits', () => {
  assert.ok(isValidCpf('529.982.247-25'));
  assert.ok(!isValidCpf('529.982.247-24'));
  assert.ok(!isValidCpf('111.111.111-11'));
  assert.ok(isValidCnpj('11.222.333/0001-81'));
  assert.ok(isValidCnpj('04.252.011/0001-10'));
  assert.ok(!isValidCnpj('11.222.333/0001-80'));
  assert.ok(!isValidCnpj('00.000.000/0000-00'));
  assert.equal(cpfCnpjError(''), null);
  assert.match(cpfCnpjError('123'), /incompleto/);
  assert.match(cpfCnpjError('11.222.333/0001-80'), /CNPJ inválido/);
  assert.equal(brPhoneError('(11) 98765-4321'), null);
  assert.match(brPhoneError('(11) 88765-4321'), /9/);
});

test('PIX key type detection', () => {
  assert.deepEqual([detectPixKey('fulano@Email.com').type, detectPixKey('fulano@Email.com').normalized], ['email', 'fulano@email.com']);
  assert.equal(detectPixKey('529.982.247-25').type, 'cpf');
  assert.equal(detectPixKey('11.222.333/0001-81').type, 'cnpj');
  assert.equal(detectPixKey('11222333000180').valid, false);
  assert.deepEqual([detectPixKey('(11) 98765-4321').type, detectPixKey('(11) 98765-4321').normalized], ['phone', '+5511987654321']);
  assert.equal(detectPixKey('+55 11 98765-4321').normalized, '+5511987654321');
  assert.equal(detectPixKey('11987654321').type, 'phone', 'an 11-digit number that is not a CPF is a mobile');
  assert.equal(detectPixKey('123e4567-e12b-12d1-a456-426655440000').type, 'evp');
  assert.equal(detectPixKey('abc').type, 'unknown');
});

test('PIX BR Code matches the Banco Central example', () => {
  const payload = pixPayload({ key: '123e4567-e12b-12d1-a456-426655440000', name: 'Fulano de Tal', city: 'BRASILIA' });
  assert.equal(payload, '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D');
  assert.equal(crc16('123456789'), '29B1');
  const withAmount = pixPayload({ key: 'a@b.co', name: 'José Ação', city: 'São Paulo', amount: 10.5, txid: 'INV-0042' });
  assert.match(withAmount, /540510\.50/);
  assert.match(withAmount, /5909Jose Acao/);
  assert.match(withAmount, /0507INV0042/);
  assert.equal(pixPayload({ key: 'x', name: 'a', city: 'b' }), '');
});

test('share hash round-trip, compressed and plain', async () => {
  const invoice = blankInvoice({ ...blankParty('emitter'), name: 'Estúdio Ñandu' }, { ...blankParty('client'), name: 'ACME Inc.' });
  invoice.items = [{ id: 'x', description: 'Design — 🎨 logo', qty: 2, unit: 'h', price: 99.9, discount: 5 }];
  for (const compress of [true, false]) {
    const encoded = await encodeShare(invoice, compress);
    assert.equal(encoded[0], compress ? 'z' : 'j');
    assert.match(encoded, /^[A-Za-z0-9_-]+$/);
    assert.deepEqual(await decodeShare(encoded), JSON.parse(JSON.stringify(invoice)));
  }
  const big = { ...invoice, notes: 'Lorem ipsum '.repeat(200) };
  assert.ok((await encodeShare(big)).length < (await encodeShare(big, false)).length / 3);
  await assert.rejects(decodeShare('xabc'));
  assert.equal(readShareHash('#invoice=zAbC_-1'), 'zAbC_-1');
  assert.equal(readShareHash('#other'), null);
});

test('normalizes stored or shared invoices', () => {
  const restored = normalizeInvoice({ number: 'A-1', lang: 'xx', template: 'nope', items: [{ description: 'a', qty: '2', price: 3 }], emitter: { name: 'E', logo: 5 } });
  assert.equal(restored.number, 'A-1');
  assert.equal(restored.lang, 'pt');
  assert.equal(restored.template, 'modern');
  assert.equal(restored.items[0].qty, 2);
  assert.equal(restored.emitter.name, 'E');
  assert.equal(restored.emitter.logo, '');
  assert.equal(normalizeInvoice(null), null);
});

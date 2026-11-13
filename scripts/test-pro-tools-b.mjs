import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  businessDaysBetween,
  compactTimeline,
  computeDeadline,
  dayNum,
  easter,
  formatBr,
  holidaysOf,
  parseBrDate,
  weekdayName,
} from '../src/app/screens/tools/prazos/deadline.logic.ts';
import {
  ANNEXES,
  annexByFatorR,
  computeSimples,
  effectiveRate,
  formatMoneyTyping,
  moneyField,
  parseMoney,
  proportionalRbt12,
} from '../src/app/screens/tools/simples/simples.logic.ts';

const base = { dje: false, days: 15, mode: 'uteis', double: false, optional: true, forensic: false, recess: true, custom: [] };
const d = (text) => parseBrDate(text);
const run = (start, extra = {}) => computeDeadline({ ...base, start: d(start), ...extra });

test('Easter dates', () => {
  assert.equal(formatBr(easter(2025)), '20/04/2025');
  assert.equal(formatBr(easter(2026)), '05/04/2026');
  assert.equal(formatBr(easter(2027)), '28/03/2027');
  assert.equal(formatBr(easter(2024)), '31/03/2024');
});

test('movable holidays of 2026', () => {
  const names = Object.fromEntries(holidaysOf(2026).map((h) => [h.name, formatBr(h.day)]));
  assert.equal(names['Carnaval (segunda-feira)'], '16/02/2026');
  assert.equal(names['Carnaval (terça-feira)'], '17/02/2026');
  assert.equal(names['Sexta-feira Santa'], '03/04/2026');
  assert.equal(names['Corpus Christi'], '04/06/2026');
  assert.equal(names['Dia Nacional de Zumbi e da Consciência Negra'], '20/11/2026');
  assert.ok(!holidaysOf(2023).some((h) => h.name.startsWith('Dia Nacional de Zumbi')));
});

test('parses dates strictly and without time zone drift', () => {
  assert.equal(parseBrDate('31/02/2026'), null);
  assert.equal(parseBrDate('1/2/2026'), null);
  assert.equal(formatBr(d('29/02/2024')), '29/02/2024');
  assert.equal(weekdayName(d('12/11/2026')), 'quinta-feira');
  assert.equal(dayNum(2026, 1, 1) - dayNum(2025, 12, 31), 1);
});

test('15 business days across Tiradentes and Good Friday', () => {
  // Intimação on Wed 01/04/2026: Good Friday 03/04 and Tiradentes (Tue 21/04) are skipped.
  const r = run('01/04/2026');
  assert.equal(formatBr(r.firstCounted), '02/04/2026');
  assert.equal(formatBr(r.end), '24/04/2026');
  assert.deepEqual(r.skipped.map((s) => s.label), ['Sexta-feira Santa', 'Tiradentes']);
  const counted = r.timeline.filter((t) => t.kind === 'counted');
  assert.equal(counted.length, 15);
});

test('intimação on Friday starts on Monday', () => {
  const r = run('06/03/2026', { days: 5 });
  assert.equal(formatBr(r.firstCounted), '09/03/2026');
  assert.equal(formatBr(r.end), '13/03/2026');
});

test('recess 20/12–20/01 suspends the count (intimação 15/12/2025)', () => {
  const r = run('15/12/2025');
  assert.equal(formatBr(r.firstCounted), '16/12/2025');
  // 16–19/12 = 4 days; 21/01 to 04/02/2026 = 11 business days.
  assert.equal(formatBr(r.end), '04/02/2026');
  const rows = compactTimeline(r.timeline);
  const recess = rows.find((row) => row.kind === 'recess');
  assert.equal(formatBr(recess.day), '20/12/2025');
  assert.equal(formatBr(recess.until), '06/01/2026');
  assert.ok(rows.length < r.timeline.length);
  const noRecess = run('15/12/2025', { recess: false });
  assert.equal(formatBr(noRecess.end), '07/01/2026');
});

test('intimação during the recess starts on 21/01', () => {
  const r = run('22/12/2025', { days: 5 });
  assert.equal(formatBr(r.firstCounted), '21/01/2026');
  assert.equal(formatBr(r.end), '27/01/2026');
});

test('calendar days: an end on the weekend moves to the next business day', () => {
  // Intimação Mon 02/03/2026, 5 calendar days: 03..07/03, Saturday → Monday 09/03.
  const r = run('02/03/2026', { days: 5, mode: 'corridos' });
  assert.equal(formatBr(r.firstCounted), '03/03/2026');
  assert.equal(formatBr(r.movedFrom), '07/03/2026');
  assert.equal(formatBr(r.end), '09/03/2026');
  // Calendar-day count starting on a Friday intimação begins on Monday (Súmula 310 STF).
  assert.equal(formatBr(run('06/03/2026', { days: 2, mode: 'corridos' }).firstCounted), '09/03/2026');
});

test('DJe: publication on the next business day, count from the following one', () => {
  // Disponibilização on Fri 13/02/2026: Carnaval on 16–17/02, publication Wed 18/02, count from 19/02.
  const r = run('13/02/2026', { dje: true, days: 5 });
  assert.equal(formatBr(r.publication), '18/02/2026');
  assert.equal(formatBr(r.firstCounted), '19/02/2026');
  assert.equal(formatBr(r.end), '25/02/2026');
  const noCarnaval = run('13/02/2026', { dje: true, days: 5, optional: false });
  assert.equal(formatBr(noCarnaval.publication), '16/02/2026');
});

test('double deadline, custom holidays and invalid input', () => {
  const r = run('01/04/2026', { double: true });
  assert.equal(r.total, 30);
  const custom = run('06/03/2026', { days: 5, custom: [d('10/03/2026')] });
  assert.equal(formatBr(custom.end), '16/03/2026');
  assert.equal(run('06/03/2026', { days: 0 }), null);
  assert.equal(businessDaysBetween(base, d('06/03/2026'), d('13/03/2026')), 5);
});

test('Simples tables are consistent', () => {
  for (const annex of Object.values(ANNEXES)) {
    assert.equal(annex.brackets.length, 6);
    for (const b of annex.brackets) {
      const sum = Object.values(b.split).reduce((a, v) => a + v, 0);
      assert.ok(Math.abs(sum - 100) < 1e-9, `${annex.id} ${b.limit} sums ${sum}`);
    }
    // The effective rate is continuous at each limit up to R$ 1,8 mi (the 6th bracket drops ICMS/ISS).
    for (let i = 0; i < 4; i++) {
      const limit = annex.brackets[i].limit;
      assert.ok(Math.abs(effectiveRate(annex.id, limit) - effectiveRate(annex.id, limit + 0.01)) < 1e-6, `${annex.id} at ${limit}`);
    }
  }
});

test('Simples examples', () => {
  const r = computeSimples('III', 300_000, 25_000);
  assert.equal(r.bracket, 1);
  assert.equal(r.nominal, 0.112);
  assert.equal(r.deduction, 9_360);
  assert.equal(Math.round(r.effective * 10000) / 100, 8.08);
  assert.equal(r.das, 2_020);
  assert.equal(Math.round(r.split.reduce((a, s) => a + s.value, 0) * 100) / 100, 2_020);
  const c = computeSimples('I', 180_000, 15_000);
  assert.equal(c.bracket, 0);
  assert.equal(c.effective, 0.04);
  assert.equal(c.das, 600);
  assert.equal(computeSimples('I', 0, 1000), null);
  assert.equal(computeSimples('I', 4_800_001, 1000), null);
  const high = computeSimples('III', 4_000_000, 300_000);
  assert.ok(high.overSublimit);
  assert.ok(!high.split.some((s) => s.tax === 'ISS'));
});

test('ISS limited to 5% in the 5th bracket of Anexo III', () => {
  const r = computeSimples('III', 3_500_000, 100_000);
  assert.ok(r.issCapped);
  const iss = r.split.find((s) => s.tax === 'ISS');
  assert.equal(iss.rate, 0.05);
  assert.ok(Math.abs(r.split.reduce((a, s) => a + s.rate, 0) - r.effective) < 1e-12);
});

test('Fator R and início de atividade', () => {
  assert.equal(annexByFatorR(84_000, 300_000), 'III');
  assert.equal(annexByFatorR(83_999, 300_000), 'V');
  assert.equal(proportionalRbt12(0, 0, 20_000), 240_000);
  assert.equal(proportionalRbt12(3, 60_000, 30_000), 240_000);
});

test('money typing and parsing in pt-BR', () => {
  assert.equal(formatMoneyTyping('300000'), '300.000');
  assert.equal(formatMoneyTyping('300.0000'), '3.000.000');
  assert.equal(formatMoneyTyping('1234,567'), '1.234,56');
  assert.equal(formatMoneyTyping('1234.', true), '1.234,');
  assert.equal(formatMoneyTyping(',5'), '0,5');
  assert.equal(parseMoney('300.000,50'), 300000.5);
  assert.equal(parseMoney('R$ 1.234'), 1234);
  assert.equal(parseMoney('1234.5'), 1234.5);
  assert.ok(Number.isNaN(parseMoney('')));
  assert.equal(moneyField(300000), '300.000');
  assert.equal(moneyField(1234.5), '1.234,50');
});

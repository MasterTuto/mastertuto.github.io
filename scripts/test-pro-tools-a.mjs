import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ampacity,
  comparisonRows,
  designCurrent,
  groupingFactor,
  parseNumberBR,
  sizeCable,
  voltageDrop,
} from '../src/app/screens/tools/bitola/wire-gauge.logic.ts';
import { btuBreakdown, consumption, parseNumberBR as parseBtu, recommend } from '../src/app/screens/tools/btu/btu.logic.ts';
import {
  dayNumber,
  formatDateBR,
  formatWeeks,
  fromIsoDate,
  gestation,
  lmpFromConception,
  lmpFromUltrasound,
  parseDateBR,
  toIsoDate,
  today,
  trimesterOf,
} from '../src/app/screens/tools/gestacional/gestational.logic.ts';

const base = {
  phases: 1,
  voltage: 220,
  mode: 'power',
  power: 5500,
  current: 0,
  powerFactor: 1,
  length: 20,
  maxDropPct: 4,
  material: 'cu',
  method: 'B1',
  grouped: 1,
  kind: 'power',
};
const close = (actual, expected, tolerance = 0.01) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);

// ---- Wire gauge ----
test('parses Brazilian numbers', () => {
  for (const parse of [parseNumberBR, parseBtu]) {
    assert.equal(parse('1,5'), 1.5);
    assert.equal(parse('5.500'), 5500);
    assert.equal(parse('1.234,5'), 1234.5);
    assert.equal(parse('2.5'), 2.5);
    assert.equal(parse(' 12 '), 12);
    assert.equal(parse('R$ 0,85'), 0.85);
    assert.ok(Number.isNaN(parse('')));
    assert.ok(Number.isNaN(parse('abc')));
  }
});

test('design current single-phase and three-phase', () => {
  assert.equal(designCurrent(5500, 220, 1, 1), 25);
  close(designCurrent(10000, 380, 3, 0.92), 16.51);
  assert.equal(designCurrent(0, 220, 1, 1), 0);
});

test('NBR 5410 table values and grouping factors', () => {
  assert.equal(ampacity('cu', 'B1', 2, 2.5), 24);
  assert.equal(ampacity('cu', 'B1', 3, 4), 28);
  assert.equal(ampacity('cu', 'C', 2, 10), 63);
  assert.equal(ampacity('al', 'B1', 2, 10), null);
  assert.equal(ampacity('al', 'B1', 2, 16), 60);
  assert.equal(groupingFactor('B1', 1), 1);
  assert.equal(groupingFactor('B1', 3), 0.7);
  assert.equal(groupingFactor('B1', 40), 0.38);
  assert.equal(groupingFactor('C', 12), 0.7);
});

test('shower 5500 W at 220 V, 20 m, 4%: 25 A, 4 mm², 25 A breaker', () => {
  const r = sizeCable(base);
  assert.equal(r.current, 25);
  assert.equal(r.byAmpacity, 4); // 2,5 mm² carries 24 A in B1
  assert.equal(r.byDrop, 2.5); // 2·0,0172·20·25/2,5 = 6,88 V = 3,13%
  assert.equal(r.recommended, 4);
  assert.equal(r.decidedBy, 'ampacity');
  assert.equal(r.breaker, 25);
  assert.equal(r.breakerMax, 32);
  close(r.dropV, 4.3);
  close(r.dropPct, 1.9545, 0.001);
  assert.equal(r.status, 'ok');
});

test('long run is decided by voltage drop', () => {
  const r = sizeCable({ ...base, length: 60 });
  // 2·0,0172·60·25 / (0,04·220) = 5,86 mm² → 6 mm²
  assert.equal(r.byDrop, 6);
  assert.equal(r.recommended, 6);
  assert.equal(r.decidedBy, 'drop');
  assert.ok(r.dropPct <= 4);
  close(voltageDrop(25, 60, 6, 'cu', 1), 8.6);
});

test('small lighting load respects the 1,5 mm² minimum and power circuits 2,5 mm²', () => {
  const light = sizeCable({ ...base, kind: 'lighting', power: 300, voltage: 127, length: 10 });
  assert.equal(light.recommended, 1.5);
  assert.equal(light.breaker, 10);
  const socket = sizeCable({ ...base, power: 300, voltage: 127, length: 10 });
  assert.equal(socket.recommended, 2.5);
  assert.equal(socket.decidedBy, 'minimum');
});

test('three-phase, by current, grouped circuits', () => {
  const r = sizeCable({ ...base, phases: 3, voltage: 380, mode: 'current', current: 40, length: 30, grouped: 3 });
  // B1, 3 conductors, factor 0,7: 10 mm² → 35 A, 16 mm² → 47,6 A ≥ 40 → In 40 A
  assert.equal(r.loadedConductors, 3);
  assert.equal(r.recommended, 16);
  assert.equal(r.breaker, 40);
  close(r.iz, 47.6);
});

test('impossible load gives a bad status', () => {
  const r = sizeCable({ ...base, mode: 'current', current: 200 });
  assert.equal(r.recommended, null);
  assert.equal(r.status, 'bad');
  assert.equal(sizeCable({ ...base, length: 0 }), null);
});

test('comparison rows surround the recommended section', () => {
  const r = sizeCable(base);
  assert.deepEqual(comparisonRows(r).map((row) => row.section), [1.5, 2.5, 4, 6, 10]);
});

// ---- BTU ----
test('12 m², afternoon sun, 2 people → 10.200 BTU/h → 12.000', () => {
  const b = btuBreakdown({ area: 12, people: 2, devices: 0, sun: 'afternoon', room: 'bedroom', ceiling: 2.7 });
  assert.equal(b.total, 10200);
  assert.deepEqual(recommend(b.total), { units: 1, capacity: 12000 });
});

test('BTU extras: devices, kitchen and high ceiling', () => {
  const b = btuBreakdown({ area: 20, people: 1, devices: 2, sun: 'morning', room: 'kitchen', ceiling: 3.6 });
  // 20·600·1,2 = 14.400 + 2·600 + 1.200 = 16.800
  assert.equal(b.total, 16800);
  assert.deepEqual(recommend(9000), { units: 1, capacity: 9000 });
  assert.deepEqual(recommend(7000), { units: 1, capacity: 7500 });
  assert.deepEqual(recommend(70000), { units: 2, capacity: 36000 });
  assert.equal(btuBreakdown({ area: 0, people: 1, devices: 0, sun: 'none', room: 'living', ceiling: 2.7 }), null);
});

test('consumption estimate', () => {
  const conv = consumption(12000, 'conventional', 8, 0.85);
  // 12.000 BTU/h = 3.517 W térmicos; ÷4 = 879 W médios; 8 h · 30 = 211 kWh
  close(conv.watts, 879.2, 0.1);
  close(conv.kwhMonth, 211.0, 0.1);
  close(conv.costMonth, 179.4, 0.1);
  const inv = consumption(12000, 'inverter', 8, 0.85);
  assert.ok(inv.kwhMonth < conv.kwhMonth);
  close(inv.kwhMonth, 153.5, 0.1);
});

// ---- Gestational age ----
test('date parsing and formatting', () => {
  assert.equal(parseDateBR('31/02/2026'), null);
  assert.equal(parseDateBR('01/01/26'), null);
  assert.equal(formatDateBR(parseDateBR('1/1/2026')), '01/01/2026');
  assert.equal(toIsoDate(parseDateBR('29/02/2028')), '2028-02-29');
  assert.equal(fromIsoDate('2026-10-08'), parseDateBR('08/10/2026'));
});

test('local today ignores the time of day', () => {
  assert.equal(today(new Date(2026, 2, 8, 0, 5)), dayNumber(2026, 3, 8));
  assert.equal(today(new Date(2026, 2, 8, 23, 55)), dayNumber(2026, 3, 8));
});

test('DUM 01/01/2026 → DPP 08/10/2026', () => {
  const lmp = parseDateBR('01/01/2026');
  const g = gestation(lmp, parseDateBR('23/06/2026'));
  assert.equal(formatDateBR(g.dueDate), '08/10/2026');
  assert.equal(g.ageDays, 173);
  assert.equal(g.ageLabel, '24s 5d');
  assert.equal(g.trimester, 2);
  assert.equal(g.daysToDue, 107);
  const byLabel = Object.fromEntries(g.windows.map((w) => [w.label, w]));
  assert.equal(byLabel['Ultrassom do 1º trimestre / translucência nucal'].state, 'past');
  assert.equal(formatDateBR(byLabel['Ultrassom do 1º trimestre / translucência nucal'].start), '19/03/2026');
  assert.equal(formatDateBR(byLabel['Ultrassom do 1º trimestre / translucência nucal'].end), '08/04/2026');
  assert.equal(byLabel['TOTG 75 g'].state, 'current');
  assert.equal(byLabel['Vacina dTpa'].state, 'current');
  assert.equal(byLabel['Termo precoce'].state, 'future');
  assert.equal(formatDateBR(byLabel['Termo precoce'].start), '17/09/2026');
});

test('DST and leap years do not shift dates', () => {
  assert.equal(formatDateBR(parseDateBR('15/02/2028') + 280), '21/11/2028');
  assert.equal(formatDateBR(parseDateBR('20/05/2025') + 280), '24/02/2026');
});

test('ultrasound and conception methods', () => {
  const lmp = lmpFromUltrasound(parseDateBR('10/03/2026'), 8, 2);
  assert.equal(formatDateBR(lmp), '11/01/2026'); // 10/03 − 58 dias
  assert.equal(formatDateBR(lmpFromConception(parseDateBR('15/01/2026'), 'conception')), '01/01/2026');
  assert.equal(formatDateBR(lmpFromConception(parseDateBR('20/01/2026'), 'ivf5')), '01/01/2026');
  assert.equal(formatDateBR(lmpFromConception(parseDateBR('18/01/2026'), 'ivf3')), '01/01/2026');
});

test('trimesters and labels', () => {
  assert.equal(formatWeeks(171), '24s 3d');
  assert.equal(trimesterOf(13 * 7 + 6), 1);
  assert.equal(trimesterOf(14 * 7), 2);
  assert.equal(trimesterOf(28 * 7), 3);
  assert.equal(trimesterOf(-1), null);
  assert.ok(gestation(parseDateBR('01/01/2026'), parseDateBR('31/12/2025')).warnings.length > 0);
});

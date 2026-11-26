import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inss, irrf, irrfReduction, netSalary, INSS_CEILING } from '../src/app/screens/tools/salario/payroll.logic.ts';
import { employeeCost } from '../src/app/screens/tools/custo-funcionario/employee-cost.logic.ts';
import {
  acquisitionStart,
  completeYears,
  monthBalanceDays,
  noticeDaysFor,
  severance,
  thirteenthAvosInYear,
  vacationAvos,
} from '../src/app/screens/tools/rescisao/severance.logic.ts';
import { dayNumber, formatDateBR } from '../src/app/screens/tools/gestacional/gestational.logic.ts';
import { contractFees, sucumbencia } from '../src/app/screens/tools/honorarios/fees.logic.ts';
import { fioBShare, inverterFor, sizeSolar } from '../src/app/screens/tools/solar/solar.logic.ts';
import { layout, lighting, roomIndex, utilization } from '../src/app/screens/tools/luminotecnico/lighting.logic.ts';

const close = (actual, expected, tolerance = 0.01) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
const d = (text) => {
  const [day, month, year] = text.split('/').map(Number);
  return dayNumber(year, month, day);
};

// ---- INSS and IRRF 2026 ----
test('progressive INSS 2026', () => {
  close(inss(1621).total, 121.58);
  // 121,575 + (3000 − 1621) × 9% = 121,575 + 124,11 → 245,69
  close(inss(3000).total, 121.575 + 115.3656 + (3000 - 2902.84) * 0.12);
  close(inss(INSS_CEILING).total, 988.09);
  close(inss(20000).total, 988.09);
  assert.equal(inss(20000).capped, true);
  assert.equal(inss(0).total, 0);
});

test('IRRF 2026 with the Lei 15.270 reduction', () => {
  // Up to R$ 5.000 the tax is zero.
  assert.equal(netSalary({ gross: 5000, dependents: 0, transport: false }).irrf.tax, 0);
  assert.equal(netSalary({ gross: 4000, dependents: 0, transport: false }).irrf.tax, 0);
  // R$ 5.900: reduction 978,62 − 0,133145 × 5.900 = 193,06 (Receita Federal example).
  const r = netSalary({ gross: 5900, dependents: 0, transport: false });
  close(r.irrf.reduction, 193.06);
  close(r.irrf.tableTax - r.irrf.reduction, r.irrf.tax);
  assert.equal(r.irrf.method, 'legal');
  // Above R$ 7.350 there is no reduction.
  assert.equal(irrfReduction(8000, 900), 0);
  // Simplified discount beats INSS alone on low salaries.
  assert.equal(irrf({ taxable: 3000, inss: 245.69 }).method, 'simplified');
  // 13º salário: no simplified discount.
  assert.equal(irrf({ taxable: 3000, inss: 245.69, allowSimplified: false }).method, 'legal');
});

test('net salary with dependents and transport voucher', () => {
  const r = netSalary({ gross: 10000, dependents: 2, transport: true, transportCost: 300 });
  close(r.inss.total, 988.09);
  // base = 10000 − 988,09 − 2 × 189,59 = 8.632,73 → 27,5% − 908,73 = 1.465,27
  close(r.irrf.base, 8632.73);
  close(r.irrf.tax, 1465.27);
  assert.equal(r.transport, 300);
  close(r.net, 10000 - 988.09 - 1465.27 - 300);
  assert.equal(netSalary({ gross: 0, dependents: 0, transport: false }), null);
});

// ---- Employee cost ----
test('employee cost in the Simples and in the normal regime', () => {
  const base = { salary: 3000, rat: 0.02, fap: 1, thirdParty: 0.058, transport: 0, meal: 0, health: 0, provisionFine: false };
  const simples = employeeCost({ ...base, regime: 'simples' });
  // 3000 × (1 + 1/12 + 1/12 + 1/36) = 3.583,33; FGTS 286,67
  close(simples.remuneration, 3583.33);
  close(simples.monthly, 3583.33 + 286.67, 0.02);
  const normal = employeeCost({ ...base, regime: 'presumido' });
  // + 20% + 2% + 5,8% = 27,8% of 3.583,33 = 996,17
  close(normal.monthly - simples.monthly, 3583.33 * 0.278, 0.03);
  close(normal.chargesRate, 0.278, 1e-9);
  const iv = employeeCost({ ...base, regime: 'simples-iv' });
  close(iv.chargesRate, 0.22, 1e-9);
});

test('employee cost benefits and FGTS fine provision', () => {
  const r = employeeCost({ salary: 2000, regime: 'simples', rat: 0.01, fap: 1, thirdParty: 0, transport: 200, meal: 500, health: 0, provisionFine: true });
  // Employee pays 6% of 2000 = 120; company 80.
  assert.equal(r.transportEmployee, 120);
  close(r.lines.find((l) => l.id === 'transport').value, 80);
  close(r.lines.find((l) => l.id === 'fine').value, 2000 * (1 + 1 / 12 + 1 / 12 + 1 / 36) * 0.08 * 0.4);
});

// ---- Severance ----
test('dates: complete years, notice and avos', () => {
  assert.equal(completeYears(d('10/03/2020'), d('09/03/2023')), 2);
  assert.equal(completeYears(d('10/03/2020'), d('10/03/2023')), 3);
  assert.equal(noticeDaysFor(0), 30);
  assert.equal(noticeDaysFor(3), 39);
  assert.equal(noticeDaysFor(25), 90);
  assert.equal(monthBalanceDays(d('31/05/2026'), d('01/01/2020')), 30);
  assert.equal(monthBalanceDays(d('28/02/2026'), d('01/01/2020')), 30);
  assert.equal(monthBalanceDays(d('12/05/2026'), d('01/01/2020')), 12);
  assert.equal(monthBalanceDays(d('20/05/2026'), d('11/05/2026')), 10);
  // 13º: January to 14 June → 5 avos (June has 14 days); to 15 June → 6.
  assert.equal(thirteenthAvosInYear(d('01/01/2020'), d('14/06/2026'), 2026), 5);
  assert.equal(thirteenthAvosInYear(d('01/01/2020'), d('15/06/2026'), 2026), 6);
  // Férias: period from 10/03/2026; to 24/06 is 3 months and 15 days → 4 avos.
  assert.equal(formatDateBR(acquisitionStart(d('10/03/2020'), d('24/06/2026'))), '10/03/2026');
  assert.equal(vacationAvos(d('10/03/2020'), d('24/06/2026')), 4);
  assert.equal(vacationAvos(d('10/03/2020'), d('23/06/2026')), 3);
});

test('dismissal without cause: notice projected, FGTS fine', () => {
  const r = severance({
    salary: 3000, admission: d('10/03/2020'), end: d('12/05/2026'), reason: 'sem-justa-causa', notice: 'indenizado',
    overdueVacations: 0, fgtsBalance: 15000, dependents: 0, advance13: 0,
  });
  assert.equal(r.years, 6);
  assert.equal(r.noticeDays, 48);
  assert.equal(r.paidNoticeDays, 48);
  assert.equal(formatDateBR(r.projected), '29/06/2026');
  close(r.earnings.find((l) => l.id === 'saldo').value, 1200);
  close(r.earnings.find((l) => l.id === 'aviso').value, 4800);
  assert.equal(r.thirteenthAvos, 6);
  // Férias period from 10/03/2026 to 29/06: 3 months + 20 days → 4 avos.
  assert.equal(r.vacationAvos, 4);
  assert.equal(r.fgts.fineRate, 0.4);
  close(r.fgts.fine, (15000 + r.fgts.onSeverance) * 0.4);
  assert.equal(r.unemploymentInsurance, true);
  assert.equal(formatDateBR(r.paymentDeadline), '22/05/2026');
});

test('resignation, agreement and dismissal for cause', () => {
  const base = { salary: 2000, admission: d('01/02/2025'), end: d('31/07/2026'), notice: 'trabalhado', overdueVacations: 0, fgtsBalance: 0, dependents: 0, advance13: 0 };
  const pedido = severance({ ...base, reason: 'pedido', notice: 'nao-cumprido' });
  assert.equal(pedido.fgts.fine, 0);
  assert.equal(pedido.fgts.withdraw, 0);
  close(pedido.deductions.find((l) => l.id === 'aviso-desc').value, 2000);
  assert.equal(pedido.thirteenthAvos, 7);
  const acordo = severance({ ...base, reason: 'acordo', notice: 'indenizado' });
  assert.equal(acordo.paidNoticeDays, 16);
  assert.equal(acordo.fgts.fineRate, 0.2);
  assert.equal(acordo.fgts.withdrawRate, 0.8);
  assert.equal(acordo.unemploymentInsurance, false);
  const cause = severance({ ...base, reason: 'justa-causa', overdueVacations: 1 });
  assert.deepEqual(cause.earnings.map((l) => l.id), ['saldo', 'venc0', 'venc0t']);
  close(cause.gross, 2000 + 2000 + 2000 / 3);
  const two = severance({ ...base, reason: 'justa-causa', overdueVacations: 2 });
  close(two.gross, 2000 + 2000 * 2 * (4 / 3) + 2000 * (4 / 3));
  assert.equal(severance({ ...base, reason: 'pedido', end: d('01/01/2025') }), null);
});

// ---- Fees ----
test('fees between private parties and on appeal', () => {
  const r = sucumbencia({ base: 100000, publicTreasury: false, rate: 0.15, position: 0, appealPoints: 0.1, wage: 1621 });
  assert.equal(r.fees, 15000);
  assert.equal(r.appealFees, 20000);
  assert.equal(r.appealCapped, true);
});

test('fees against the Public Treasury in brackets (§ 3º and § 5º)', () => {
  const wage = 1621;
  // 500 minimum wages: 200 SM at 10% + 300 SM at 8% (minimums).
  const r = sucumbencia({ base: 500 * wage, publicTreasury: true, rate: 0, position: 0, appealPoints: 0, wage });
  close(r.fees, 200 * wage * 0.1 + 300 * wage * 0.08);
  assert.equal(r.shares.length, 2);
  const max = sucumbencia({ base: 500 * wage, publicTreasury: true, rate: 0, position: 1, appealPoints: 0, wage });
  close(max.fees, 200 * wage * 0.2 + 300 * wage * 0.1);
  close(r.maxFees, max.fees);
  const appeal = sucumbencia({ base: 500 * wage, publicTreasury: true, rate: 0, position: 0, appealPoints: 0.01, wage });
  close(appeal.appealFees, 200 * wage * 0.11 + 300 * wage * 0.09);
  const c = contractFees({ award: 100000, rate: 0.3, fixed: 2000 });
  assert.deepEqual(c, { success: 30000, fixed: 2000, total: 32000, client: 70000 });
});

// ---- Solar ----
test('solar sizing', () => {
  const r = sizeSolar({
    consumption: 400, hsp: 5, connection: 'bi', moduleWp: 600, pr: 0.8, tariff: 1, fioBTariffShare: 0.28,
    simultaneity: 0.3, price: 0, startYear: 2026, tariffIncrease: 0, degradation: 0,
  });
  // (400 − 50) ÷ (5 × 30,4167 × 0,8) = 2,877 kWp → 5 modules of 600 Wp = 3 kWp
  close(r.kwpNeeded, 350 / (5 * (365 / 12) * 0.8), 1e-6);
  assert.equal(r.modules, 5);
  close(r.kwp, 3);
  assert.equal(inverterFor(3), 3);
  // Generation 365 kWh > 350 offsettable; 30% of 365 used instantly, the rest pays 60% of the Fio B (28%).
  close(r.monthlySaving, 350 - (350 - 365 * 0.3) * 0.28 * 0.6);
  assert.ok(r.payback > 2 && r.payback < 4, `${r.payback}`);
  assert.equal(fioBShare(2026), 0.6);
  assert.equal(fioBShare(2030), 1);
  assert.equal(sizeSolar({ consumption: 40, hsp: 5, connection: 'bi', moduleWp: 600, pr: 0.8, tariff: 1, fioBTariffShare: 0, simultaneity: 0, price: 0, startYear: 2026, tariffIncrease: 0, degradation: 0 }), null);
});

// ---- Lighting ----
test('lumen method', () => {
  close(roomIndex(5, 4, 2), 20 / 18);
  close(utilization(1, 'claro'), 0.58);
  close(utilization(1.125, 'claro'), 0.61);
  assert.deepEqual(layout(6, 6, 4), { rows: 2, cols: 3 });
  const r = lighting({ length: 5, width: 4, ceiling: 2.75, plane: 0.75, suspension: 0, lux: 500, finish: 'claro', upkeep: 'limpo', lumens: 2200, watts: 24, lampsPerLuminaire: 1 });
  // A = 20, h = 2, K = 1,11, U ≈ 0,607; Φ = 500 × 20 ÷ (0,607 × 0,8) ≈ 20.600 lm → 10 luminaires of 2.200 lm
  close(r.k, 1.111, 0.001);
  assert.equal(r.needed, 10);
  assert.ok(r.count >= r.needed);
  assert.ok(r.achievedLux >= 500);
  assert.equal(lighting({ length: 5, width: 4, ceiling: 0.7, plane: 0.75, suspension: 0, lux: 500, finish: 'claro', upkeep: 'limpo', lumens: 2200, watts: 24, lampsPerLuminaire: 1 }), null);
});

test('layout keeps few extra luminaires and even spacing', () => {
  assert.deepEqual(layout(10, 5, 4), { rows: 2, cols: 5 });
  assert.deepEqual(layout(4, 4, 4), { rows: 2, cols: 2 });
  assert.deepEqual(layout(1, 3, 3), { rows: 1, cols: 1 });
  const big = layout(23, 12, 8);
  assert.ok(big.rows * big.cols >= 23 && big.rows * big.cols <= 25, JSON.stringify(big));
});

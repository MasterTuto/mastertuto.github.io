import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BLOCK_PRESETS,
  MORTAR_MIXES,
  blockFace,
  blocksPerSquareMetre,
  bricks,
  mortarMaterials,
  mortarPerSquareMetre,
  openingsArea,
} from '../src/app/screens/tools/tijolos/bricks.logic.ts';
import {
  EXPOSURE_CLASSES,
  MIX_PRESETS,
  cementContent,
  concreteMaterials,
  durability,
  elementVolume,
} from '../src/app/screens/tools/concreto/concrete.logic.ts';
import {
  adhesiveRule,
  adhesiveType,
  groutPerSquareMetre,
  tiles,
  tilesPerSquareMetre,
} from '../src/app/screens/tools/piso/tiles.logic.ts';
import { CRITERIA, planStair, splitFlights, stairOptions } from '../src/app/screens/tools/escada/stairs.logic.ts';

const close = (actual, expected, tolerance = 0.01) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≉ ${expected}`);
const preset = (id) => BLOCK_PRESETS.find((item) => item.id === id);

// ---- Bricks and blocks ----
test('blocks per m² with a 1 cm joint', () => {
  close(blocksPerSquareMetre(blockFace(preset('cer-9x19x19')), 10), 25);
  close(blocksPerSquareMetre(blockFace(preset('con-14x19x39')), 10), 12.5);
  close(blocksPerSquareMetre(blockFace(preset('cer-14x19x29')), 10), 16.67);
  // Solid brick: half (face 19 × 5,7) and full (face 9 × 5,7, wall 19 cm thick).
  close(blocksPerSquareMetre(blockFace(preset('sol-half')), 10), 74.63);
  close(blocksPerSquareMetre(blockFace(preset('sol-full')), 10), 149.25);
  assert.equal(blockFace(preset('sol-full')).thickness, 19);
});

test('mortar of the joints per m²', () => {
  // 9 × 19 × 19 with 10 mm: 1 − 25 × 0,0361 = 0,0975 m² of joint × 0,09 m.
  close(mortarPerSquareMetre(blockFace(preset('cer-9x19x19')), 10), 0.008775, 1e-6);
  assert.equal(mortarPerSquareMetre(blockFace(preset('cer-9x19x19')), 0), 0);
});

test('wall with openings, waste and mortar materials', () => {
  const result = bricks({
    walls: [{ length: 4, height: 2.8 }, { length: 3, height: 2.8 }],
    openings: [{ width: 0.8, height: 2.1, count: 1 }, { width: 1.2, height: 1, count: 2 }],
    block: preset('cer-9x19x19'),
    jointMm: 10,
    wastePct: 5,
    mix: MORTAR_MIXES[0],
  });
  close(result.gross, 19.6);
  close(result.openings, 4.08);
  close(result.net, 15.52);
  close(result.exact, 388);
  assert.equal(result.total, 408);
  close(result.mortar, 15.52 * 0.008775 * 1.2, 1e-6);
  assert.ok(result.materials.cementBags > 0 && result.materials.limeBags > result.materials.cementBags);
});

test('openings never exceed the wall and invalid input returns null', () => {
  assert.equal(openingsArea([{ width: 1, height: 1, count: 2.7 }]), 2);
  const tooMany = bricks({ walls: [{ length: 1, height: 1 }], openings: [{ width: 2, height: 2, count: 1 }], block: preset('cer-9x19x19'), jointMm: 10, wastePct: 0, mix: MORTAR_MIXES[0] });
  assert.equal(tooMany.net, 0);
  assert.equal(bricks({ walls: [], openings: [], block: preset('cer-9x19x19'), jointMm: 10, wastePct: 0, mix: MORTAR_MIXES[0] }), null);
});

test('mortar 1:2:8 per m³: about 3,5 bags of cement and 7 of lime', () => {
  const materials = mortarMaterials(1, MORTAR_MIXES[0]);
  close(materials.cementBags, 3.47);
  close(materials.limeBags, 6.94);
  close(materials.sandCans, 55.56);
  assert.equal(mortarMaterials(0, MORTAR_MIXES[0]), null);
});

// ---- Concrete ----
test('element volumes', () => {
  close(elementVolume({ shape: 'slab', length: 4, width: 3, depth: 0.1, diameter: 0, count: 1 }), 1.2);
  close(elementVolume({ shape: 'beam', length: 3, width: 0.14, depth: 0.3, diameter: 0, count: 4 }), 0.504);
  close(elementVolume({ shape: 'pile', length: 0, width: 0, depth: 3, diameter: 0.25, count: 2 }), 0.2945, 1e-4);
  assert.equal(elementVolume({ shape: 'slab', length: 4, width: 3, depth: 0.1, diameter: 0, count: 0 }), 0);
});

test('1:2:3 is the ABCP mix: 4 cans of sand, 6 of gravel, ~1½ can of water per bag, ~7 bags/m³', () => {
  const mix = MIX_PRESETS[0];
  const materials = concreteMaterials(1, mix, false, 0);
  close(materials.perBag.sandCans, 4, 0.05);
  close(materials.perBag.gravelCans, 6, 0.05);
  close(materials.perBag.waterLitres, 27.5);
  close(materials.cementPerM3, 344, 2);
  close(materials.bags, 6.9, 0.1);
  // Moist sand swells: the same cans hold less sand, so the mix is richer.
  assert.ok(cementContent(mix, true) > cementContent(mix, false));
});

test('waste increases every material', () => {
  const base = concreteMaterials(2, MIX_PRESETS[0], false, 0);
  const waste = concreteMaterials(2, MIX_PRESETS[0], false, 10);
  close(waste.bags / base.bags, 1.1, 1e-9);
  close(waste.volume, 2.2);
  assert.equal(concreteMaterials(0, MIX_PRESETS[0], false, 0), null);
});

test('durability limits of NBR 6118 / NBR 12655', () => {
  assert.deepEqual(EXPOSURE_CLASSES.map((item) => item.maxWaterCement), [0.65, 0.6, 0.55, 0.45]);
  assert.deepEqual(EXPOSURE_CLASSES.map((item) => item.minCement), [260, 280, 320, 360]);
  const mix = MIX_PRESETS[0];
  const check = durability(mix, cementContent(mix), 2);
  assert.ok(check.waterOk && check.cementOk);
  assert.equal(durability(mix, cementContent(mix), 4).waterOk, false);
  assert.equal(durability(MIX_PRESETS[3], cementContent(MIX_PRESETS[3]), 1).cementOk, false);
});

// ---- Tiles ----
test('grout formula matches the manufacturers’ example', () => {
  // 30 × 30 cm, 8 mm thick, 3 mm joint: (600 / 90000) × 3 × 8 × 1,6 = 0,256 kg/m².
  close(groutPerSquareMetre(30, 30, 8, 3), 0.256, 1e-6);
  assert.equal(groutPerSquareMetre(30, 30, 8, 0), 0);
});

test('adhesive bands, double spreading and mortar type', () => {
  assert.equal(adhesiveRule(20 * 20).kgPerM2, 4);
  assert.equal(adhesiveRule(30 * 30).double, false);
  assert.equal(adhesiveRule(45 * 45).double, true);
  assert.equal(adhesiveRule(90 * 90).kgPerM2, 10);
  assert.equal(adhesiveType('floor-in', false, 900), 'AC-I');
  assert.equal(adhesiveType('floor-in', true, 3600), 'AC-II');
  assert.equal(adhesiveType('floor-out', true, 2025), 'AC-III');
  assert.equal(adhesiveType('wall-out', false, 400), 'AC-III');
});

test('boxes, tiles and materials for a 12 m² floor of 60 × 60 porcelain', () => {
  close(tilesPerSquareMetre(60, 60, 2), 2.76, 0.01);
  const result = tiles({ area: 12, tileLength: 60, tileWidth: 60, thicknessMm: 9, boxArea: 1.44, jointMm: 2, wastePct: 10, place: 'floor-in', porcelain: true });
  close(result.areaWithWaste, 13.2);
  assert.equal(result.boxes, 10);
  assert.equal(result.tiles, 40);
  assert.equal(result.adhesive.double, true);
  assert.equal(result.adhesiveType, 'AC-II');
  close(result.adhesiveKg, 105.6);
  assert.equal(result.adhesiveBags, 6);
  assert.ok(result.groutKg > 0 && result.groutKg < 2);
  assert.equal(tiles({ area: 0, tileLength: 60, tileWidth: 60, thicknessMm: 9, boxArea: 1.44, jointMm: 2, wastePct: 10, place: 'floor-in', porcelain: false }), null);
});

// ---- Stairs ----
test('Blondel options for a 2,88 m rise (NBR 9050)', () => {
  const options = stairOptions(288, 'nbr9050');
  assert.deepEqual(options.map((option) => option.risers), [16, 17, 18]);
  for (const option of options) {
    assert.ok(option.riser >= 16 && option.riser <= 18);
    assert.ok(option.tread >= 28 && option.tread <= 32);
    assert.ok(option.blondel >= 63 - 1e-9 && option.blondel <= 65 + 1e-9);
  }
  const plan = planStair({ rise: 288, space: 0, criterion: 'nbr9050', slab: 12 });
  assert.equal(plan.best.risers, 17);
  assert.equal(plan.best.treads, 16);
  assert.equal(plan.best.flights, 1);
  close(plan.best.riser, 16.94);
  close(plan.best.run, 16 * plan.best.tread);
});

test('tight space shortens the tread within the limits, or fails', () => {
  const fitted = planStair({ rise: 288, space: 460, criterion: 'nbr9050', slab: 12 });
  assert.ok(fitted.best.run <= 460 + 1e-9);
  assert.ok(fitted.best.tread >= 28);
  const none = planStair({ rise: 288, space: 300, criterion: 'nbr9050', slab: 12 });
  assert.equal(none.best, null);
  assert.ok(none.shortestRun > 300);
});

test('flights, landings and slab opening', () => {
  assert.deepEqual(splitFlights(22, 17, 320), [11, 11]);
  assert.deepEqual(splitFlights(10, 17, 320), [10]);
  const tall = planStair({ rise: 374, space: 0, criterion: 'nbr9050', slab: 12 });
  assert.equal(tall.best.flights, 2);
  assert.equal(tall.best.landing, 120);
  close(tall.best.totalRun, tall.best.run + 120);
  const plan = planStair({ rise: 280, space: 0, criterion: 'private', slab: 12 });
  close(plan.best.opening, Math.min(plan.best.totalRun, (222 * plan.best.tread) / plan.best.riser));
  assert.ok(CRITERIA.nbr9077.blondelMax === 64);
});

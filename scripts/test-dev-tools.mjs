import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatJson, jsonError, decodeJwt, numericDate, tokenTiming, MAX_INPUT_LENGTH } from '../src/app/screens/tools/dev-tools/dev-tools.logic.ts';

const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
const token = (payload, header = { alg: 'none', typ: 'JWT' }) => `${encode(header)}.${encode(payload)}.`;

test('formats nested JSON and keeps whitespace inside strings', () => {
  const source = '{"a":[1,{"text":"two  spaces, : and \\"quotes\\""}],"empty":{}}';
  const actual = formatJson(source);
  assert.deepEqual(JSON.parse(actual), JSON.parse(source));
  assert.ok(actual.includes('\n  "a": [\n    1,'));
  assert.ok(actual.includes('"empty": {}'));
  assert.ok(formatJson(source, '\t').includes('\n\t"a"'));
});
test('minifies without altering large numbers, duplicate keys, escapes or negative zero', () => {
  const source = '{ "id": 90071992547409931234, "n": -0, "n": 1e999, "x": "\\u0061" }';
  assert.equal(formatJson(source, ''), '{"id":90071992547409931234,"n":-0,"n":1e999,"x":"\\u0061"}');
});
test('accepts primitive JSON values', () => {
  for (const value of ['null', 'true', 'false', '42', '"hello"', '[]', '{}']) assert.equal(formatJson(value), value);
});
test('rejects malformed JSON, oversized input and excessive nesting', () => {
  for (const value of ['', '{"a":1,}', "{'a':1}", '// comment\n{}', '{"a":undefined}']) assert.throws(() => formatJson(value));
  assert.throws(() => formatJson(' '.repeat(MAX_INPUT_LENGTH + 1)), /million/);
  assert.throws(() => formatJson('['.repeat(201) + '0' + ']'.repeat(201)), /nesting/);
});
test('reports line and column from a parser position', () => {
  assert.match(jsonError('{\n  bad}', new Error('Unexpected token at position 4')), /Line 2, column 3/);
});
test('decodes Unicode JWT claims and accepts a Bearer prefix', () => {
  const payload = { name: 'José 日本語 🚀', aud: ['web', 'mobile'], exp: 2000 };
  assert.deepEqual(decodeJwt(` Bearer ${token(payload)} `).payload, payload);
  assert.equal(decodeJwt(token(payload)).header['alg'], 'none');
});
test('rejects wrong JWT part counts, bad encoding, invalid UTF-8 and non-object data', () => {
  for (const value of ['abc', 'a.b', 'a.b.c.d', '!!!!.e30.', `${encode([])}.e30.`, `e30.${encode(null)}.`, '_w.e30.', 'e30.e30.a']) assert.throws(() => decodeJwt(value));
  assert.throws(() => decodeJwt('a.b.c.d.e'), /encrypted JWE/);
  assert.throws(() => decodeJwt('a'.repeat(MAX_INPUT_LENGTH + 1)), /million/);
});
test('expiration changes exactly at exp; not-before changes exactly at nbf', () => {
  assert.match(tokenTiming({ exp: 100 }, 99), /in the future/);
  assert.match(tokenTiming({ exp: 100 }, 100), /^Expired/);
  assert.match(tokenTiming({ exp: 200, nbf: 100 }, 99), /^Not active yet/);
  assert.match(tokenTiming({ exp: 200, nbf: 100 }, 100), /in the future/);
});
test('distinguishes missing expiration from invalid timestamps', () => {
  assert.match(tokenTiming({}, 100), /^No expiration/);
  for (const exp of ['200', null, Number.POSITIVE_INFINITY, 1e20]) assert.match(tokenTiming({ exp }, 100), /^Invalid/);
  assert.equal(numericDate(0), '1970-01-01T00:00:00.000Z');
  assert.equal(numericDate(1.5), '1970-01-01T00:00:01.500Z');
  assert.equal(numericDate('100'), null);
});

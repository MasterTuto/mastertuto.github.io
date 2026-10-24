import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCommandSearch } from '../src/app/service/command-search.ts';
import { industries } from '../src/app/data/industries.data.ts';

const verbs = industries.map(page => ({ id: page.slug, title: page.name, description: page.intro, queries: page.queries, run: () => ({ message: '' }) }));
const search = createCommandSearch(verbs);

test('bounds empty and broad queries to three results', () => {
  assert.equal(search('').length, 3);
  assert.equal(search('   ').length, 3);
  assert.ok(search('site').length <= 3);
});
test('finds all twelve professions by their common search terms', () => {
  for (const page of industries) assert.equal(search(page.queries[0])[0]?.id, page.slug, page.queries[0]);
});
test('understands accents, typos and practical requests', () => {
  for (const [query, expected] of [['fotografo', 'fotografo'], ['fotógrafo', 'fotografo'], ['eletrisista', 'eletricista'], ['montador de moveis', 'montador-de-moveis'], ['agendar consulta', 'ginecologista'], ['pintar casa', 'pintor']]) {
    assert.equal(search(query)[0]?.id, expected, query);
  }
});
test('returns no results for unrelated input', () => {
  assert.deepEqual(search('zzzzzzzzzzzzzz'), []);
});

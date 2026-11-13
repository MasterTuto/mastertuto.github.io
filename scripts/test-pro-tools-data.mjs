import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proTools, toolSegments, allProTools, TOOLS_PER_SEGMENT, SEGMENTS_ON_PAGE, SEGMENTS_IN_MENU } from '../src/app/screens/tools/pro-tools/pro-tools.data.ts';
import { industries } from '../src/app/data/industries.data.ts';

test('every segment tool belongs to a registered segment group', () => {
  const grouped = toolSegments.flatMap((segment) => segment.tools.map((tool) => tool.slug));
  for (const tool of proTools) {
    assert.ok(tool.segment, `${tool.slug}: segment`);
    assert.ok(grouped.includes(tool.slug), `${tool.slug}: add '${tool.segment}' to SEGMENTS in pro-tools.data.ts`);
  }
});

test('segment groups point to existing segment pages and keep their order', () => {
  for (const segment of toolSegments) {
    assert.ok(industries.some((page) => page.slug === segment.slug), `${segment.slug}: /para page`);
    assert.ok(segment.tools.length > 0);
  }
});

test('tool slugs are unique and limits are sensible', () => {
  const slugs = allProTools.map((tool) => tool.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const limit of [TOOLS_PER_SEGMENT, SEGMENTS_ON_PAGE, SEGMENTS_IN_MENU]) assert.ok(Number.isInteger(limit) && limit > 0);
});

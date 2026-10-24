import Fuse from 'fuse.js';
import type { Verb } from './verb';

/** Shared bounded search used by the palette and independent of Angular. */
export function createCommandSearch(verbs: Verb[]): (query: string) => Verb[] {
  const fuse = new Fuse(verbs, {
    keys: [{ name: 'title', weight: 2 }, { name: 'queries', weight: 2 }, { name: 'description', weight: 1 }],
    threshold: 0.42,
    ignoreLocation: true,
    ignoreDiacritics: true,
  });
  return query => query.trim() ? fuse.search(query.trim(), { limit: 3 }).map(result => result.item) : verbs.slice(0, 3);
}

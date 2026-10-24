import { inject, Injectable } from '@angular/core';
import { createCommandSearch } from './command-search';
import { VERBS, Verb, VerbRecord } from './verb';

@Injectable({ providedIn: 'root' })
export class VerbRegistry {
  private readonly registrations = inject(VERBS, { optional: true }) ?? [];
  readonly byId: VerbRecord = this.buildRecord();

  private readonly verbs = Object.values(this.byId);
  private readonly find = createCommandSearch(this.verbs);

  search(query: string): Verb[] { return this.find(query); }

  private buildRecord(): VerbRecord {
    const result: VerbRecord = {};
    for (const registration of this.registrations) {
      for (const [id, verb] of Object.entries(registration)) {
        if (result[id]) throw new Error(`Verb "${id}" is registered more than once.`);
        if (verb.id !== id) throw new Error(`Verb key "${id}" does not match its id.`);
        result[id] = verb;
      }
    }
    return result;
  }
}

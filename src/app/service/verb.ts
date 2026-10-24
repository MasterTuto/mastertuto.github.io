import { InjectionToken } from '@angular/core';

export interface VerbResult {
  message: string;
  close?: boolean;
  actionSheet?: ActionSheet;
}

export interface ActionSheetAction {
  id: string;
  label: string;
  description?: string;
  selected?: boolean;
  run: () => VerbResult | Promise<VerbResult>;
}

export interface ActionSheet {
  title: string;
  description?: string;
  actions: ActionSheetAction[];
}

export interface Verb {
  id: string;
  title: string;
  description: string;
  queries: string[];
  run: () => VerbResult | Promise<VerbResult>;
}

export type VerbRecord = Record<string, Verb>;

/** Add a record with { provide: VERBS, multi: true, useFactory: ... }. */
export const VERBS = new InjectionToken<VerbRecord[]>('VERBS');

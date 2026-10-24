import type { Producer } from '../utils/type-utils';
import type { Translations } from './english';

export const translations: Record<string, Producer<Promise<Translations>>> = {
  en: () => import('./english').then((f) => f.englishTranslations),
  fr: () => import('./french').then((f) => f.frenchTranslations),
  de: () => import('./german').then((f) => f.germanTranslations),
  it: () => import('./italian').then((f) => f.italianTranslations),
  ja: () => import('./japanese').then((f) => f.japaneseTranslations),
  pt: () => import('./portuguese').then((f) => f.portugueseTranslations),
  ru: () => import('./russian').then((f) => f.russianTranslations),
  es: () => import('./spanish').then((f) => f.spanishTranslations),
};

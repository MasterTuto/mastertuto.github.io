import type { Producer } from '../utils/type-utils';
import type { Translations } from './english';

/** Site languages. Portuguese is the default; English is the only other one. */
export const translations: Record<string, Producer<Promise<Translations>>> = {
  pt: () => import('./portuguese').then((f) => f.portugueseTranslations),
  en: () => import('./english').then((f) => f.englishTranslations),
};

import { englishTranslations, Translations } from "./english";
import { frenchTranslations } from "./french";
import { germanTranslations } from "./german";
import { italianTranslations } from "./italian";
import { japaneseTranslations } from "./japanese";
import { portugueseTranslations } from "./portuguese";
import { russianTranslations } from "./russian";
import { spanishTranslations } from "./spanish";

export const translations: Record<string, Translations> = {
  "en": englishTranslations,
  "fr": frenchTranslations,
  "de": germanTranslations,
  "it": italianTranslations,
  "ja": japaneseTranslations,
  "pt": portugueseTranslations,
  "ru": russianTranslations,
  "es": spanishTranslations
};

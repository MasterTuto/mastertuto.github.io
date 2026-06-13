import { Injectable } from "@angular/core";
import { translations } from "../i18n/translations"
import { Translations } from "../i18n/english";

@Injectable({
  providedIn: "root"
})
export class TranslationLoader {

  load(lang: string): Translations {
    return translations[lang];
  }
}

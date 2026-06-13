import { inject, Pipe } from "@angular/core";
import { TranslationKeyChecker } from "src/app/i18n/english";
import { TranslateService } from "src/app/service/translate.service";

@Pipe({
  name: "translate"
})
export class TranslatePipe {
  private _translate = inject(TranslateService);

  transform<TranslationPath extends string>(key: TranslationKeyChecker<TranslationPath>, params?: any): string {
    return this._translate.translate(key, params);
  }
}

import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { TranslationLoader } from "./translation-loader.service";
import { TranslationKeyChecker } from "../i18n/english";

@Injectable({
  providedIn: "root"
})
export class TranslateService {
  private activatedRoute = inject(ActivatedRoute);
  private translationLoader = inject(TranslationLoader);

  translate<TranslationPath extends string>(key: TranslationKeyChecker<TranslationPath>, params?: any): string {
    const dict = this.translationLoader.load(this.currentLang ?? "en");
    const path = key.split(".");

    let result: any = dict;
    while (path.length > 0) {
      const part = path.shift()!;
      result = result[part];
    }

    if (typeof result === "string") {
      return result;
    }

    throw new Error(`Translation key "${key}" not found`);
  }

  get currentLang(): string | null {
    let params: Record<string, string> = {};
    let queue: ActivatedRouteSnapshot[] = [this.activatedRoute.root.snapshot];

    let i = 0;
    while (queue.length > 0) {
      const route = queue.shift()!;
      params = { ...params, ...route.params };
      queue.push(...route.children);
      i++;
    }

    return params["lang"] ?? null;
  }
}

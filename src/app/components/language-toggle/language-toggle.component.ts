import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';

import { BcsToggleOptionDirective } from '@bcs/components/toggle/toggle-option.directive';
import { BcsToggleComponent } from '@bcs/components/toggle/toggle.component';
import { LANGUAGE_NAMES, LanguageSwitchService, SiteLanguage } from 'src/app/service/language-switch.service';

/** Brazil ⇄ United States flags on the glass toggle. Switching reloads the page in the other language. */
@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsToggleComponent, BcsToggleOptionDirective],
})
export class LanguageToggleComponent {
  private languages = inject(LanguageSwitchService);

  protected readonly names = LANGUAGE_NAMES;
  protected readonly value = linkedSignal<string>(() => this.languages.current);

  protected change(language: string): void {
    this.value.set(language);
    // Let the knob finish rolling before the page reloads.
    setTimeout(() => this.languages.switchTo(language as SiteLanguage), 320);
  }
}

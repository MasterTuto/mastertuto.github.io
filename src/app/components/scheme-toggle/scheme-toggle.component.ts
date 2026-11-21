import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerMoon, tablerSun } from '@ng-icons/tabler-icons';

import { BcsToggleOptionDirective } from '@bcs/components/toggle/toggle-option.directive';
import { BcsToggleComponent } from '@bcs/components/toggle/toggle.component';
import { BcsColorScheme, BcsColorSchemeService } from '@bcs/services/color-scheme/color-scheme.service';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

/** Light ⇄ dark on the glass toggle. Hidden on pages that bring their own palette. */
@Component({
  selector: 'app-scheme-toggle',
  templateUrl: './scheme-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsToggleComponent, BcsToggleOptionDirective, NgIcon, TranslatePipe],
  providers: [provideIcons({ tablerSun, tablerMoon })],
})
export class SchemeToggleComponent {
  protected readonly scheme = inject(BcsColorSchemeService);

  protected change(value: string): void {
    this.scheme.scheme.set(value as BcsColorScheme);
  }
}

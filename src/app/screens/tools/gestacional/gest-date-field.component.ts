import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCalendar } from '@ng-icons/tabler-icons';

import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import { formatDateBR, fromIsoDate, parseDateBR, toIsoDate } from './gestational.logic';

/** Masked dd/mm/aaaa field with a native calendar behind the icon (an invisible date input over it). */
@Component({
  selector: 'app-gest-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskDirective, NgIconComponent],
  providers: [provideIcons({ tablerCalendar })],
  templateUrl: './gest-date-field.component.html',
})
export class GestDateFieldComponent {
  readonly value = model('');
  readonly inputId = input.required<string>();
  readonly label = input('');
  readonly invalid = computed(() => this.value().length === 10 && parseDateBR(this.value()) === null);
  readonly iso = computed(() => {
    const day = parseDateBR(this.value());
    return day === null ? '' : toIsoDate(day);
  });

  openPicker(event: Event): void {
    const el = event.target as HTMLInputElement & { showPicker?: () => void };
    try {
      el.showPicker?.();
    } catch {
      /* not allowed without a user gesture in some browsers */
    }
  }

  fromPicker(event: Event): void {
    const day = fromIsoDate((event.target as HTMLInputElement).value);
    if (day !== null) this.value.set(formatDateBR(day));
  }
}

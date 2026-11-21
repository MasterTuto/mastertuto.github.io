import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  name = input.required<string>();
  title = input<string>('');
  containerClass = input<string>('');

  className = computed(() => {
    let currentClass = 'flex flex-col';

    return `${currentClass} ${this.containerClass()}`;
  });
}

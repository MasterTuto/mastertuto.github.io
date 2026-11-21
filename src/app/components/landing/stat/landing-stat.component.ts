import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/** One number and what it means. */
@Component({
  selector: 'app-landing-stat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'landing-stat' },
  templateUrl: './landing-stat.component.html',
  styleUrl: './landing-stat.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingStatComponent {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}

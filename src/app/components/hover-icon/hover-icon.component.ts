import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-hover-icon',
  imports: [NgIconsModule],
  templateUrl: './hover-icon.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./hover-icon.component.scss'],
})
export class HoverIconComponent {
  icon = input.required<string>();
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hover-icon',
  templateUrl: './hover-icon.component.html',
  styleUrls: ['./hover-icon.component.scss']
})
export class HoverIconComponent {
  @Input() icon: string = "";
}

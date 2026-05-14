import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-hover-icon',
    templateUrl: './hover-icon.component.html',
    styleUrls: ['./hover-icon.component.scss'],
    standalone: false
})
export class HoverIconComponent {
  @Input() icon: string = "";
}

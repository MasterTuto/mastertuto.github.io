import { Component, input } from '@angular/core';

@Component({
    selector: 'app-social-icon',
    templateUrl: './social-icon.component.html',
    styleUrls: ['./social-icon.component.scss'],
    standalone: false
})
export class SocialIconComponent {
  icon = input.required<string>();
  url = input.required<string>();
  download = input<string>();
}

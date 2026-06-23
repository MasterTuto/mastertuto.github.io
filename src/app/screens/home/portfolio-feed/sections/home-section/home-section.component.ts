import { Component } from '@angular/core';

@Component({
    selector: 'app-home-section',
    templateUrl: './home-section.component.html',
    styleUrls: ['./home-section.component.scss'],
    standalone: false
})
export class HomeSectionComponent {
  yearsOfExperience = new Date().getFullYear() - 2020;;
}

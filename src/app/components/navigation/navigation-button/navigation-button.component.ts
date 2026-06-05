import { Component, computed, input, output } from '@angular/core';

@Component({
    selector: '[app-navigation-button]',
    templateUrl: './navigation-button.component.html',
    styleUrls: ['./navigation-button.component.scss'],
    standalone: false
})
export class NavigationButtonComponent {
  title = input.required<string>();
  href = input.required<string>();
  selected = input<boolean>(true);

  press = output();

  activeClass = computed(() => ({
    "text-green-500 border-l-green-500": this.selected(),
    "text-white border-l-transparent": !this.selected()
  }))

}

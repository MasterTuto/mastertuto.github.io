import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
    standalone: false
})
export class SectionComponent {
  name = input.required<string>();
  title = input<string>();
  containerClass = input<string>();

  className = computed(() => {
    let currentClass = "w-[94vw] min-h-dvh p-12 pt-0 flex flex-col max-md:px-0";

    if (this.containerClass() != null) {
      return `${currentClass} ${this.containerClass()}`
    }
    return currentClass;
  });
}

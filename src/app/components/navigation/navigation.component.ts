import { Component, afterNextRender, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { sections } from 'src/app/data/sections.data';
import { SectionStateService } from 'src/app/service/section-state.service';
import { SectionService } from 'src/app/service/section.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: false
})
export class NavigationComponent {
  sectionService = inject(SectionService);
  sectionStateService = inject(SectionStateService);

  selected = toSignal(this.sectionStateService.currentSection$);
  navItems = sections;

  constructor() {
    afterNextRender( () => {
      let hash = window.location.hash;
      this.navItems
        .forEach((item, index) => {
          if (item.href === hash) {
            this.sectionStateService.currentSection = index;
          }
        });
    })
  }

  changeSelectedSection(sectionIndex: number): void {
    this.sectionStateService.currentSection = sectionIndex;
  }
}

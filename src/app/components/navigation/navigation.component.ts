import { Component, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { sections } from 'src/app/data/sections.data';
import { SectionStateService } from 'src/app/service/section-state.service';
import { SectionService } from 'src/app/service/section.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  sectionService = inject(SectionService);
  sectionStateService = inject(SectionStateService);

  selected = 0;  
  navItems = sections;

  _unsubscribe = new Subject();

  ngOnInit(): void {
    this.sectionStateService.currentSection$.subscribe(
      (sectionIndex) => this.selected = sectionIndex
    );

    let hash = window.location.hash;
    this.navItems
      .forEach((item, index) => {
        if (item.href === hash) {
          this.sectionStateService.currentSection = index;
        }
      });
  }

  changeSelectedSection(sectionIndex: number): void {
    this.sectionStateService.currentSection = sectionIndex;
  }
}

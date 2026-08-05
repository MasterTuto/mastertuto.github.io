import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight } from '@ng-icons/tabler-icons';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

interface PortfolioItem {
  nameKey: string;
  descriptionKey: string;
  cover: string;
  url: string;
}

@Component({
    selector: 'app-projects-section',
    templateUrl: './projects-section.component.html',
    imports: [
      SectionComponent,
      TranslatePipe,
      NgIconComponent,
    ],
    providers: [
      provideIcons({
        tablerArrowRight,
      })
    ],
})
export class ProjectsSectionComponent {
  projects: PortfolioItem[] = [
    {
      nameKey: 'home.projects.items.1.name',
      descriptionKey: 'home.projects.items.1.description',
      cover: 'https://placehold.co/900x675/e9ebf8/646cfa?text=Projeto+01',
      url: '#projects',
    },
    {
      nameKey: 'home.projects.items.2.name',
      descriptionKey: 'home.projects.items.2.description',
      cover: 'https://placehold.co/900x675/f6f6f6/444a51?text=Projeto+02',
      url: '#projects',
    },
    {
      nameKey: 'home.projects.items.3.name',
      descriptionKey: 'home.projects.items.3.description',
      cover: 'https://placehold.co/900x675/dfe4ea/151c25?text=Projeto+03',
      url: '#projects',
    },
  ];
}

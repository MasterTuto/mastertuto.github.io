import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight } from '@ng-icons/tabler-icons';
import { DialogData } from 'src/app/components/@my/dialogs/dialog.model';
import { IframeDialogComponent } from 'src/app/components/@my/dialogs/iframe-dialog/iframe-dialog.component';
import { SectionComponent } from 'src/app/components/section/section.component';
import { electricianProjectTemplate } from 'src/app/data/projects/electrian.data';
import { dialog } from 'src/app/dunder/dialog.dunder';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { htmlToUrl } from 'src/app/utils/html';

interface PortfolioItem {
  nameKey: string;
  descriptionKey: string;
  cover: string;
  url: string;
  template: string;
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
  private showProjectDialog = dialog(IframeDialogComponent);

  projects: PortfolioItem[] = [
    {
      nameKey: 'home.projects.items.1.name',
      descriptionKey: 'home.projects.items.1.description',
      cover: 'assets/volt_wire.png',
      url: '#projects',
      template: electricianProjectTemplate,
    },
    {
      nameKey: 'home.projects.items.2.name',
      descriptionKey: 'home.projects.items.2.description',
      cover: 'https://placehold.co/900x675/f6f6f6/444a51?text=Projeto+02',
      url: '#projects',
      template: '<p>Template 2</p>',
    },
    {
      nameKey: 'home.projects.items.3.name',
      descriptionKey: 'home.projects.items.3.description',
      cover: 'https://placehold.co/900x675/dfe4ea/151c25?text=Projeto+03',
      url: '#projects',
      template: '<p>Template 3</p>',
    },
  ];

  openProject(index: number) {
    this.showProjectDialog.open({
      title: 'Eletricista VoxLux - Projeto 1',
      html: electricianProjectTemplate,
    },

      {
        height: '100dvh',
        width: '100dvw',
        margin: '0px',
      }
    );
  }
}

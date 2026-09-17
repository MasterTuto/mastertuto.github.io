import { Component, inject } from '@angular/core';
import { IframeDialogComponent } from 'src/app/components/@my/dialogs/iframe-dialog/iframe-dialog.component';
import { SectionComponent } from 'src/app/components/section/section.component';
import { electricianProjectTemplate } from 'src/app/data/projects/electrian.data';
import { dialog } from 'src/app/dunder/dialog.dunder';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';

interface PortfolioItem {
  nameKey: string;
  descriptionKey: string;
  cover: string;
  url?: string;
  template?: string;
}

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  imports: [SectionComponent, TranslatePipe],
})
export class ProjectsSectionComponent {
  private showProjectDialog = dialog(IframeDialogComponent);
  private translateService = inject(TranslateService);

  readonly projects: PortfolioItem[] = [
    {
      nameKey: 'showcase.jingleName',
      descriptionKey: 'showcase.jingleDescription',
      cover: 'assets/images/jingleia.png',
      url: 'https://jingle.ia.br/',
    },
    {
      nameKey: 'home.projects.items.1.name',
      descriptionKey: 'home.projects.items.1.description',
      cover: 'assets/volt_wire.png',
      template: electricianProjectTemplate,
    },
  ];

  openProject(project: PortfolioItem): void {
    if (!project.template && !project.url) return;
    this.showProjectDialog.open({
      title: this.translateService.translate(project.nameKey),
      html: project.template,
      url: project.url,
    }, {
      height: '100dvh',
      width: '100dvw',
      margin: '0px',
    });
  }
}

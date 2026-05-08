import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { projectsData } from 'src/app/data/projects.data';
import { Project } from 'src/app/model/project.model';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent {
  projects: Project[] = [];

  constructor() {
    this.projects = projectsData.map((p) => ({
      id: Math.random().toString(),
      ...p
    }));
  }

  trackById(_: number, project: Project) {
    return project.id;
  }
}

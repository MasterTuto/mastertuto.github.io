import { Component, computed, input } from '@angular/core';
import { Project, Status } from 'src/app/model/project.model';

@Component({
    selector: 'app-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss'],
    standalone: false
})
export class ProjectItemComponent {
  project = input.required<Project>();

  projectStatus = computed<(typeof this.statusIcons)[Status]>(() => this.statusIcons[this.project().status] ?? {});
  iconName = computed(() => this.projectStatus().iconName);
  iconColor = computed(() => this.projectStatus().iconColor);
  iconBorderColor = computed(() => {
    const borderColor = this.projectStatus().borderColor;
    return `border-2 bg-slate-900 rounded-full w-10 h-10 grid place-items-center ${borderColor}`;
  });
  containerClass = computed(() => {
    const { containerHoverColor } = this.projectStatus();
    return `rounded-xl border border-slate-600 p-4 flex flex-col transition-all group ${containerHoverColor}`;
  });
  statusText = computed(() => this.projectStatus().title);
  statusTextColor = computed(() => {
    const {backgroundColor} = this.projectStatus();
    return `text-slate-900 ${backgroundColor} rounded-full px-4 py-2 absolute left-0 transition-all duration-500 max-md:opacity-100 max-md:left-11 group-hover:left-11`;
  });

  private statusIcons = {
    in_progress: {
      iconName: 'tablerHourglass',
      title: 'In Progress',
      iconColor: 'text-orange-600',
      backgroundColor: 'bg-orange-600',
      borderColor: 'border-orange-600',
      containerHoverColor: 'hover:bg-orange-500/50'
    },
    abandoned: {
      iconName: 'tablerCircleX',
      title: 'Abandoned',
      iconColor: 'text-red-600',
      backgroundColor: 'bg-red-600',
      borderColor: 'border-red-600',
      containerHoverColor: 'hover:bg-red-500/50'
    },
    finished: {
      iconName: 'tablerCheck',
      title: 'Finished',
      iconColor: 'text-green-600',
      backgroundColor: 'bg-green-600',
      borderColor: 'border-green-600',
      containerHoverColor: 'hover:bg-green-500/50'
    },
  };
}

import { Component, computed, input } from '@angular/core';
import { JobExperience } from 'src/app/model/job.model';

@Component({
    selector: 'app-job-item',
    standalone: false,
    templateUrl: './job-item.component.html',
    styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent {
  job = input.required<JobExperience>();

  jobPeriod = computed(() => this.job().period);

  period = computed(() => {
    if (this.job().period == undefined) {
      return '';
    }

    const [initialDate, endDate] = this.job().period;

    const toStr = (date: Date) => date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    let formattedPeriod = `${toStr(initialDate)} - `;
    if (endDate) {
      formattedPeriod += toStr(endDate);
    } else {
      formattedPeriod += "Present";
    }

    return formattedPeriod;
  });
}

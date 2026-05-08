import { Component, Input, OnInit } from '@angular/core';
import { JobExperience } from 'src/app/model/job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {
  @Input() job!: JobExperience;
  @Input() index!: number;

  period: string = "";

  ngOnInit(): void {
    this.period = this.getPeriod();
  }

  private getPeriod(): string {
    if (this.job.period == undefined) {
      return '';
    }

    const [initialDate, endDate] = this.job.period;

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
  }
}

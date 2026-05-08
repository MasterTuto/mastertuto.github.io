import { Component, OnInit } from '@angular/core';
import { jobsData } from 'src/app/data/jobs.data';

@Component({
  selector: 'app-jobs-section',
  templateUrl: './jobs-section.component.html',
  styleUrls: ['./jobs-section.component.scss']
})
export class JobsSectionComponent {
  jobList = jobsData;

  trackByIndex(index: number) {
    return index;
  }
}

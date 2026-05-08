import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experiments } from 'src/app/data/experiments.data';
import { Experiment } from 'src/app/model/experiment.model';

@Component({
  selector: 'app-lab-section',
  templateUrl: './lab-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./lab-section.component.scss']
})
export class LabSectionComponent {
  lab = experiments;

  currentExperiment: Experiment = this.lab[0];

  get otherExperiments() {
    return this.lab.filter(experiment => 
      experiment.description !== this.currentExperiment.description
    )
  }
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { experiments } from 'src/app/data/experiments.data';
import { Experiment } from 'src/app/model/experiment.model';

@Component({
    selector: 'app-lab-section',
    templateUrl: './lab-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./lab-section.component.scss'],
    standalone: false
})
export class LabSectionComponent {
  lab = experiments;

  currentExperiment = signal<Experiment>(this.lab[0]);

   otherExperiments = computed(() =>
    this.lab.filter(experiment =>
      experiment.description !== this.currentExperiment().description
    )
  );
}

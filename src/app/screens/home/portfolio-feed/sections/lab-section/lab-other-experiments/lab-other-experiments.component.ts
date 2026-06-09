import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Experiment } from 'src/app/model/experiment.model';

@Component({
    selector: 'app-lab-other-experiments',
    templateUrl: './lab-other-experiments.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./lab-other-experiments.component.scss'],
    standalone: false
})
export class LabOtherExperimentsComponent {
  experiments = input<Experiment[]>([]);

  select = output<Experiment>();
}

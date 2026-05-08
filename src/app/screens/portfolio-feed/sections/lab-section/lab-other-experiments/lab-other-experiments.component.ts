import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiment } from 'src/app/model/experiment.model';

@Component({
  selector: 'app-lab-other-experiments',
  templateUrl: './lab-other-experiments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./lab-other-experiments.component.scss']
})
export class LabOtherExperimentsComponent {
  @Input() experiments!: Experiment[];

  @Output()
  select = new EventEmitter<Experiment>();

  selectExperiment(experiment: Experiment) {
    this.select.emit(experiment);
  }
}

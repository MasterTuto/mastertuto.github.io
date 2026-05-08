import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Experiment } from 'src/app/model/experiment.model';

@Component({
  selector: 'app-lab-item',
  templateUrl: './lab-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./lab-item.component.scss']
})
export class LabItemComponent {
  @Input() experiment: Experiment = {} as Experiment;
}

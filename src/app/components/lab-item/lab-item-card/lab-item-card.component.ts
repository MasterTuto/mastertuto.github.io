import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Experiment } from 'src/app/model/experiment.model';

@Component({
  selector: 'app-lab-item-card',
  templateUrl: './lab-item-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./lab-item-card.component.scss']
})
export class LabItemCardComponent {
  @Input() experiment: Experiment = {} as Experiment;
  @Input() distanceFromCenter: number = 0;

  numberOfStars!: any[];

  iconName: string = "";

  ngOnInit(): void {
    this.numberOfStars = new Array(this.experiment.interestingLevel);
    this.iconName = this.getIconName();
  }

  getIconName(): string {
    return this.experiment.icon;
  }

  responsiveClass(): Record<string, boolean> {
    return {
      "max-md:hidden": this.distanceFromCenter != 0,
    }
  }

}

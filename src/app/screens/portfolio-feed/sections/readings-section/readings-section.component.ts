import { Component } from '@angular/core';
import { readings } from 'src/app/data/readings.data';
import { Reading } from 'src/app/model/reading.model';

@Component({
  selector: 'app-readings-section',
  templateUrl: './readings-section.component.html',
  styleUrls: ['./readings-section.component.scss']
})
export class ReadingsSectionComponent {
  readings = readings;

  trackByUrl(index: number, reading: Reading): string {
    return reading.url;
  }

}

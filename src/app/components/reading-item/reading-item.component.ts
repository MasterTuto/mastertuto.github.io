import { Component, Input } from '@angular/core';
import { Reading } from 'src/app/model/reading.model';

@Component({
  selector: 'app-reading-item',
  templateUrl: './reading-item.component.html',
  styleUrls: ['./reading-item.component.scss']
})
export class ReadingItemComponent {
  @Input() reading: Reading = {} as Reading;
}

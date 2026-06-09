import { Component, input } from '@angular/core';
import { Reading } from 'src/app/model/reading.model';

@Component({
    selector: 'app-reading-item',
    templateUrl: './reading-item.component.html',
    styleUrls: ['./reading-item.component.scss'],
    standalone: false
})
export class ReadingItemComponent {
  reading = input.required<Reading>();
}

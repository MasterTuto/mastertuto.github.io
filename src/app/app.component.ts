import { Component } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePT);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowLeft, tablerTools } from '@ng-icons/tabler-icons';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, TranslatePipe],
  providers: [provideIcons({ tablerArrowLeft, tablerTools })],
})
export class ToolsComponent {}

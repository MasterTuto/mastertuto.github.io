import { CatalogLayoutComponent } from 'src/app/components/catalog-layout/catalog-layout.component';
import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerTools } from '@ng-icons/tabler-icons';
import { devTools } from './dev-tools/dev-tools.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, TranslatePipe, CatalogLayoutComponent, RouterLink],
  providers: [provideIcons({ tablerTools })],
})
export class ToolsComponent { readonly tools = devTools; }

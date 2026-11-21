import { InvPartyComponent } from './inv-party.component';
import { InvMetaComponent } from './inv-meta.component';
import { InvItemsComponent } from './inv-items.component';
import { InvTotalsComponent } from './inv-totals.component';
import { InvPayComponent } from './inv-pay.component';
import { InvNotesComponent } from './inv-notes.component';
import { InvLogoComponent } from './inv-logo.component';

/**
 * Building blocks shared by the document templates. They carry no styles of their own (encapsulation
 * None, plain class names); each template styles them under its root class, e.g. `.tpl-classic .ii th`.
 * Elements marked `data-keep` are never split across PDF pages.
 */
export const PARTS = [InvPartyComponent, InvMetaComponent, InvItemsComponent, InvTotalsComponent, InvPayComponent, InvNotesComponent, InvLogoComponent];

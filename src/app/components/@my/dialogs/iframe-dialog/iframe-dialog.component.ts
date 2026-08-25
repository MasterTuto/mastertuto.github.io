import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { tablerX } from "@ng-icons/tabler-icons";

import { Dialog, DIALOG_DATA, DIALOG_REF } from "../dialog.model";
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";

interface IframeDialogData {
  title: string;
  url?: string;
  html?: string;
}

interface IframeDialogOutput {
  url: string
}

@Component({
  selector: 'iframe-dialog',
  templateUrl: './iframe-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  providers: [
    provideIcons({
      tablerX,
    })
  ],
})
export class IframeDialogComponent extends Dialog<IframeDialogData, IframeDialogOutput> {
  private data = inject(DIALOG_DATA);
  private dialogRef = inject(DIALOG_REF);
  private sanitizer = inject(DomSanitizer);

  title = signal<string>('');

  url = signal<SafeResourceUrl>('');
  html = signal<SafeHtml>('');

  constructor() {
    super();
    this.title.set(this.data['title']);

    this.url.set(this.data['url'] ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data['url']) : '');
    this.html.set(this.data['html'] ? this.sanitizer.bypassSecurityTrustHtml(this.data['html']) : '');
  }

  close() {
    this.dialogRef.close(this.url() || this.html());
  }
}

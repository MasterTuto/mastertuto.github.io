import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, effect, inject, signal, viewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerDeviceFloppy, tablerEdit, tablerEye, tablerFileExport, tablerFileTypeDocx, tablerFileTypePdf, tablerLink, tablerPhoto,
  tablerPlus, tablerPrinter,
} from '@ng-icons/tabler-icons';

import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { useProToolSeo } from '../pro-tools/pro-tool-seo';
import { invoiceTool } from '../pro-tools/pro-tools.data';
import { InvoiceEditorComponent } from './editor/invoice-editor.component';
import { InvoiceHistoryComponent } from './editor/history.component';
import { PartyDialogComponent } from './editor/party-dialog.component';
import { InvoiceContentComponent, INVOICE_FAQ } from './invoice-content.component';
import { exportDocx, exportPdf, exportPng, printDocument } from './invoice.export';
import { shrinkDataUrl } from './invoice.image';
import { invoiceFileName } from './invoice.logic';
import { SHARE_PARAM, encodeShare } from './invoice.share';
import { InvoiceStore } from './invoice.store';
import type { Party, TemplateId } from './invoice.types';
import { buildDocView, type DocView } from './invoice.view';
import { InvoicePreviewComponent } from './preview/invoice-preview.component';
import { TemplateStripComponent } from './preview/template-strip.component';

type ExportKind = 'pdf' | 'docx' | 'png' | 'print' | 'link';

/**
 * Gerador de Invoice: editor (left) and live paper preview (right, sticky) on desktop; on phones an
 * "Editar | Visualizar" switch and a bottom bar with the total that hides while the keyboard is open.
 * Everything is stored in the browser; export libraries load on click.
 */
@Component({
  selector: 'app-invoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProToolFooterComponent, InvoiceEditorComponent, InvoiceHistoryComponent, PartyDialogComponent, InvoiceContentComponent,
    InvoicePreviewComponent, TemplateStripComponent, NgIconComponent,
  ],
  providers: [
    InvoiceStore,
    provideIcons({ tablerFileTypePdf, tablerFileTypeDocx, tablerPhoto, tablerPrinter, tablerLink, tablerDeviceFloppy, tablerPlus, tablerEye, tablerEdit, tablerFileExport }),
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
  host: {
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut()',
  },
})
export class InvoiceGeneratorComponent {
  readonly tool = invoiceTool;
  readonly store = inject(InvoiceStore);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly dialog = viewChild.required(PartyDialogComponent);
  private readonly exportSheet = viewChild<ElementRef<HTMLDialogElement>>('exportSheet');

  readonly doc = computed(() => buildDocView(this.store.invoice()));
  /** Thumbnails follow the document with a delay, so typing only re-renders one paper. */
  readonly thumbDoc = signal<DocView>(buildDocView(this.store.invoice()));
  readonly view = signal<'edit' | 'preview'>('edit');
  readonly typing = signal(false);
  readonly busy = signal<ExportKind | null>(null);
  readonly exports: { kind: ExportKind; label: string; icon: string; hint: string }[] = [
    { kind: 'pdf', label: 'PDF', icon: 'tablerFileTypePdf', hint: 'A4, pronto para enviar' },
    { kind: 'docx', label: 'Word', icon: 'tablerFileTypeDocx', hint: 'DOCX editável' },
    { kind: 'png', label: 'Imagem', icon: 'tablerPhoto', hint: 'PNG em alta resolução' },
    { kind: 'print', label: 'Imprimir', icon: 'tablerPrinter', hint: 'Só o documento' },
    { kind: 'link', label: 'Copiar link', icon: 'tablerLink', hint: 'Abre a invoice no navegador' },
  ];

  constructor() {
    useProToolSeo(this.tool, INVOICE_FAQ);
    let timer: ReturnType<typeof setTimeout> | undefined;
    effect(() => {
      const doc = this.doc();
      clearTimeout(timer);
      timer = setTimeout(() => this.thumbDoc.set(doc), 450);
    });
    afterNextRender(() => void this.store.init());
  }

  setView(view: 'edit' | 'preview'): void {
    this.view.set(view);
    this.host.querySelector('#inv-workspace')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  pickTemplate(template: TemplateId): void {
    this.store.update({ template });
    const emitter = this.store.emitters().find((p) => p.id === this.store.invoice().emitterId);
    if (emitter && emitter.template !== template) this.store.saveParty({ ...emitter, template }, false);
  }

  openParty(event: { party: Party | null; kind: Party['kind'] }): void {
    this.dialog().open(event.party, event.kind);
  }

  newInvoice(): void {
    this.store.newInvoice();
    this.store.notify('Nova invoice criada.');
  }

  openFromHistory(id: string): void {
    this.store.openFromHistory(id);
    this.setView('edit');
  }

  duplicateFromHistory(id: string): void {
    this.store.duplicateFromHistory(id);
    this.setView('edit');
  }

  openExportSheet(): void {
    this.exportSheet()?.nativeElement.showModal();
  }

  async run(kind: ExportKind): Promise<void> {
    if (this.busy()) return;
    this.exportSheet()?.nativeElement.close();
    const paper = this.host.querySelector<HTMLElement>('#inv-paper .inv-doc');
    if (!paper && kind !== 'link' && kind !== 'docx') {
      this.store.notify('O documento ainda está carregando. Tente de novo em um instante.');
      return;
    }
    this.busy.set(kind);
    const inv = this.store.invoice();
    const name = (ext: string) => invoiceFileName(inv.number, inv.client.name, ext);
    try {
      if (kind === 'link') {
        await this.copyLink();
        return;
      }
      if (!this.store.shared()) this.store.saveInvoice(true);
      const view = this.doc();
      if (kind === 'pdf') await exportPdf(paper!, name('pdf'), `${view.title} ${inv.number}`);
      if (kind === 'png') await exportPng(paper!, name('png'));
      if (kind === 'docx') await exportDocx(inv, view, name('docx'));
      if (kind === 'print') printDocument(paper!);
      if (kind !== 'print') this.store.notify(`${kind.toUpperCase()} baixado${this.store.shared() ? '' : ' e invoice salva no histórico'}.`);
    } catch (error) {
      console.error(error);
      this.store.notify('Não foi possível exportar agora. Tente de novo.');
    } finally {
      this.busy.set(null);
    }
  }

  private async copyLink(): Promise<void> {
    const inv = structuredClone(this.store.invoice());
    // Logos are kept only when small enough after re-encoding; the link must stay shareable.
    inv.emitter.logo = await shrinkDataUrl(inv.emitter.logo, 160, 9000);
    const payload = await encodeShare(inv);
    const url = `${location.origin}${location.pathname}#${SHARE_PARAM}=${payload}`;
    try {
      await navigator.clipboard.writeText(url);
      this.store.notify(inv.emitter.logo || !this.store.invoice().emitter.logo ? 'Link copiado. Quem abrir vê esta invoice.' : 'Link copiado (sem a logo, grande demais para o link).');
    } catch {
      window.prompt('Copie o link da invoice:', url);
    }
  }

  onFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const typing = target.matches('textarea, select, input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=color])');
    if (typing && !target.closest('dialog')) this.typing.set(true);
  }

  onFocusOut(): void {
    setTimeout(() => {
      const active = this.host.ownerDocument.activeElement as HTMLElement | null;
      if (!active?.matches('textarea, select, input:not([type=checkbox]):not([type=radio])')) this.typing.set(false);
    });
  }
}

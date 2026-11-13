import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { blankParty } from '../invoice.logic';
import { InvoiceStore } from '../invoice.store';
import type { Party } from '../invoice.types';
import { PartyFormComponent } from './party-form.component';

/** Full-screen sheet on phones, centered dialog on larger screens, to create or edit a profile or client. */
@Component({
  selector: 'app-party-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PartyFormComponent, FormFlowDirective],
  template: `
    <dialog #dialog class="sheet" (close)="onClose()" (cancel)="onClose()" [attr.aria-labelledby]="'party-dialog-title'">
      @if (draft(); as d) {
        <form method="dialog" class="flex h-full flex-col" (submit)="$event.preventDefault(); save()">
          <header class="sheet-head">
            <h2 id="party-dialog-title" class="text-lg font-semibold text-foreground">{{ title() }}</h2>
            <button type="button" class="pro-btn ghost !min-h-[40px] !px-3" (click)="close()" aria-label="Fechar">✕</button>
          </header>
          <div class="sheet-body" appFormFlow (flowDone)="save()" (keydown.enter)="$event.stopPropagation()">
            <app-party-form [party]="d" (partyChange)="draft.set($event)" [sections]="d.kind === 'emitter' ? ['identity', 'address', 'payment', 'brand', 'defaults'] : ['identity', 'address', 'defaults']" />
          </div>
          <footer class="sheet-foot">
            <button type="button" class="pro-btn ghost" (click)="close()">Cancelar</button>
            <button type="submit" class="pro-btn">Salvar</button>
          </footer>
        </form>
      }
    </dialog>
  `,
  styles: `
    .sheet { width: min(100vw, 680px); max-width: 100vw; height: min(100dvh, 860px); max-height: 100dvh; margin: auto; padding: 0; border: 0; border-radius: 1.25rem; background: rgb(250 250 250); color: inherit; box-shadow: 0 30px 80px -20px rgb(0 0 0 / .45); }
    .sheet::backdrop { background: rgb(21 28 37 / .5); backdrop-filter: blur(2px); }
    @media (max-width: 639px) { .sheet { width: 100vw; height: 100dvh; border-radius: 0; } }
    .sheet-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; border-bottom: 1px solid rgb(68 74 81 / .1); }
    .sheet-body { flex: 1; overflow-y: auto; padding: 1.25rem; overscroll-behavior: contain; }
    .sheet-foot { display: flex; justify-content: flex-end; gap: .5rem; padding: .75rem 1.25rem calc(.75rem + env(safe-area-inset-bottom)); border-top: 1px solid rgb(68 74 81 / .1); }
  `,
})
export class PartyDialogComponent {
  private readonly store = inject(InvoiceStore);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly form = viewChild(PartyFormComponent);
  readonly draft = signal<Party | null>(null);
  readonly title = signal('');
  private isNew = false;

  open(party: Party | null, kind: Party['kind'] = 'client'): void {
    this.isNew = !party;
    const draft = party ? structuredClone(party) : blankParty(kind);
    if (!party && kind === 'emitter') {
      // A second business starts with the defaults of the first.
      const first = this.store.emitters()[0];
      if (first) Object.assign(draft, { lang: first.lang, currency: first.currency, template: first.template, prefix: first.prefix });
    }
    this.draft.set(draft);
    this.title.set(
      party ? `Editar ${kind === 'emitter' ? 'perfil' : 'cliente'}` : kind === 'emitter' ? 'Novo perfil de emissor' : 'Novo cliente',
    );
    this.dialog().nativeElement.showModal();
    setTimeout(() => this.dialog().nativeElement.querySelector<HTMLInputElement>('input.pro-input')?.focus({ preventScroll: true }), 30);
  }

  save(): void {
    const draft = this.draft();
    if (!draft) return;
    if (!this.form()?.validate()) {
      this.dialog().nativeElement.querySelector<HTMLElement>('[aria-invalid=true]')?.focus();
      return;
    }
    this.store.saveParty(draft, true);
    this.store.notify(this.isNew ? `“${draft.name}” cadastrado.` : 'Alterações salvas.');
    this.close();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  onClose(): void {
    this.draft.set(null);
  }
}

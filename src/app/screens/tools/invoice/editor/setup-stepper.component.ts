import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { blankParty } from '../invoice.logic';
import { InvoiceStore } from '../invoice.store';
import type { Party } from '../invoice.types';
import { PartyFormComponent, type PartySection } from './party-form.component';

interface Step {
  title: string;
  hint: string;
  sections: PartySection[];
}

/**
 * First run: three short steps for the emitter's data (who, where, how you get paid), saved as the
 * default profile. The preview updates while typing. Enter moves through fields and then to the next step.
 */
@Component({
  selector: 'app-setup-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PartyFormComponent, FormFlowDirective],
  template: `
    <ol class="steps" aria-label="Etapas">
      @for (s of steps; track s.title; let i = $index) {
        <li [class.done]="i < step()" [class.current]="i === step()" [attr.aria-current]="i === step() ? 'step' : null">
          <button type="button" [disabled]="i > step()" (click)="go(i)"><span class="dot">{{ i < step() ? '✓' : i + 1 }}</span><span class="name">{{ s.title }}</span></button>
        </li>
      }
    </ol>
    <p class="mb-5 mt-4 text-sm leading-relaxed text-foreground-light">{{ steps[step()].hint }}</p>
    <div #flow appFormFlow (flowDone)="next()" (keydown.enter)="$event.stopPropagation()">
      <app-party-form [party]="draft()" (partyChange)="change($event)" [sections]="steps[step()].sections" [headings]="false" />
    </div>
    <div class="mt-6 flex flex-wrap items-center gap-2">
      @if (step() > 0) {
        <button type="button" class="pro-btn ghost" (click)="go(step() - 1)">Voltar</button>
      }
      <button type="button" class="pro-btn" (click)="next()">{{ step() === steps.length - 1 ? 'Concluir e salvar' : 'Continuar' }}</button>
      <button type="button" class="ml-auto text-sm font-medium text-foreground-light underline underline-offset-4" (click)="skip()">Pular por enquanto</button>
    </div>
  `,
  styles: `
    .steps { display: flex; gap: .25rem; counter-reset: s; }
    .steps li { position: relative; flex: 1; min-width: 0; }
    .steps li::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 3px; background: rgb(68 74 81 / .12); }
    .steps li.done::after, .steps li.current::after { background: #7a70e1; }
    .steps button { display: flex; width: 100%; align-items: center; gap: .5rem; min-height: 44px; padding-bottom: .5rem; color: #8e9095; font-size: .85rem; font-weight: 600; text-align: left; }
    .steps .current button, .steps .done button { color: #444a51; }
    .dot { display: grid; flex-shrink: 0; width: 1.6rem; height: 1.6rem; place-items: center; border-radius: 999px; background: rgb(68 74 81 / .1); font-size: .78rem; }
    .current .dot, .done .dot { background: #7a70e1; color: #fff; }
    .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    @media (max-width: 479px) { .steps li:not(.current) .name { display: none; } }
  `,
})
export class SetupStepperComponent {
  private readonly store = inject(InvoiceStore);
  private readonly flow = viewChild.required<ElementRef<HTMLElement>>('flow');
  private readonly form = viewChild(PartyFormComponent);

  readonly steps: Step[] = [
    { title: 'Quem emite', hint: 'Comece pelos dados do seu negócio. Eles ficam salvos só neste navegador e aparecem em todas as invoices.', sections: ['identity'] },
    { title: 'Endereço', hint: 'Digite o CEP e o endereço é preenchido sozinho. Pode pular se não quiser mostrar o endereço.', sections: ['address'] },
    { title: 'Recebimento', hint: 'Como o cliente paga você, e a sua marca. Tudo pode ser mudado depois em “Editar perfil”.', sections: ['payment', 'brand'] },
  ];
  readonly step = signal(0);
  readonly draft = signal<Party>(this.initial());

  private initial(): Party {
    const current = this.store.invoice().emitter;
    return current.name ? { ...current } : blankParty('emitter');
  }

  change(party: Party): void {
    this.draft.set(party);
    // Live preview of the profile being created.
    this.store.update({ emitter: party, template: party.template });
  }

  go(index: number): void {
    this.step.set(index);
    setTimeout(() => this.flow().nativeElement.querySelector<HTMLInputElement>('input.pro-input')?.focus({ preventScroll: true }));
  }

  next(): void {
    if (this.step() === 0 && !this.form()?.validate()) {
      this.flow().nativeElement.querySelector<HTMLElement>('[aria-invalid=true]')?.focus();
      return;
    }
    if (this.step() < this.steps.length - 1) {
      this.go(this.step() + 1);
      return;
    }
    const party = this.draft();
    this.store.saveParty(party, true);
    this.store.defaultEmitterId.set(party.id);
    this.store.onboarded.set(true);
    this.store.notify('Perfil salvo. Agora escolha o cliente e adicione os itens.');
  }

  skip(): void {
    this.store.onboarded.set(true);
  }
}

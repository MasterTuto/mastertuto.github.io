import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';
import qrcode from 'qrcode-generator';

import type { DocView, PartyView } from '../invoice.view';

/**
 * Building blocks shared by the document templates. They carry no styles of their own (encapsulation
 * None, plain class names); each template styles them under its root class, e.g. `.tpl-classic .ii th`.
 * Elements marked `data-keep` are never split across PDF pages.
 */

@Component({
  selector: 'inv-party',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ip' },
  template: `
    @if (label()) {
      <p class="ip-label">{{ label() }}</p>
    }
    <p class="ip-name">{{ party().name || placeholder() }}</p>
    @if (party().contact) {
      <p class="ip-line">{{ party().contact }}</p>
    }
    @if (party().taxId) {
      <p class="ip-line ip-tax">{{ party().taxId }}</p>
    }
    @for (line of party().lines; track $index) {
      <p class="ip-line">{{ line }}</p>
    }
    @if (party().email || party().phone) {
      <p class="ip-line ip-contact">
        {{ party().email }}@if (party().email && party().phone) {<span class="ip-sep"> · </span>}{{ party().phone }}
      </p>
    }
  `,
})
export class InvPartyComponent {
  readonly party = input.required<PartyView>();
  readonly label = input('');
  readonly placeholder = input('—');
}

@Component({
  selector: 'inv-meta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <dl class="im">
      @for (row of doc().meta; track row.label) {
        <div class="im-row">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value }}</dd>
        </div>
      }
    </dl>
  `,
})
export class InvMetaComponent {
  readonly doc = input.required<DocView>();
}

@Component({
  selector: 'inv-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (stack()) {
      <div class="ii ii-stack">
        @for (item of doc().items; track item.n) {
          <div class="ii-srow" data-keep>
            <div class="ii-sdesc">
              <span>{{ item.description || '—' }}</span>
              <span class="ii-sdetail">{{ item.qtyUnit }} × {{ item.unitPrice }}@if (item.discount) { <span> − {{ item.discount }}</span>}</span>
            </div>
            <span class="ii-amount">{{ item.amount }}</span>
          </div>
        } @empty {
          <p class="ii-empty">{{ emptyText() }}</p>
        }
      </div>
    } @else {
      <table class="ii">
        <thead>
          <tr>
            @if (numbered()) {
              <th class="ii-n">#</th>
            }
            <th class="ii-desc">{{ doc().t.description }}</th>
            <th class="ii-num">{{ doc().t.qty }}</th>
            <th class="ii-num">{{ doc().t.unitPrice }}</th>
            @if (doc().hasDiscount) {
              <th class="ii-num">{{ doc().t.discount }}</th>
            }
            <th class="ii-num">{{ doc().t.amount }}</th>
          </tr>
        </thead>
        <tbody>
          @for (item of doc().items; track item.n) {
            <tr data-keep>
              @if (numbered()) {
                <td class="ii-n">{{ item.n < 10 ? '0' + item.n : item.n }}</td>
              }
              <td class="ii-desc">{{ item.description || '—' }}</td>
              <td class="ii-num">{{ item.qtyUnit }}</td>
              <td class="ii-num">{{ item.unitPrice }}</td>
              @if (doc().hasDiscount) {
                <td class="ii-num">{{ item.discount || '—' }}</td>
              }
              <td class="ii-num ii-amount">{{ item.amount }}</td>
            </tr>
          } @empty {
            <tr>
              <td class="ii-empty" [attr.colspan]="6">{{ emptyText() }}</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
})
export class InvItemsComponent {
  readonly doc = input.required<DocView>();
  /** Two-line rows (description, then "qty × price") instead of a table. */
  readonly stack = input(false);
  readonly numbered = input(false);
  readonly emptyText = computed(() =>
    ({ pt: 'Adicione itens para vê-los aqui.', en: 'Add items to see them here.', es: 'Agregue ítems para verlos aquí.' })[this.doc().lang],
  );
}

@Component({
  selector: 'inv-totals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="it" data-keep>
      @for (row of doc().totals; track row.label) {
        <div class="it-row">
          <span>{{ row.label }}</span>
          <span class="it-value">{{ row.value }}</span>
        </div>
      }
      <div class="it-row it-total">
        <span>{{ totalLabel() || doc().t.total }}</span>
        <span class="it-value">{{ doc().total }}</span>
      </div>
    </div>
  `,
})
export class InvTotalsComponent {
  readonly doc = input.required<DocView>();
  readonly totalLabel = input('');
}

/** Payment rows and, for BRL with a valid PIX key, a QR code with the amount. */
@Component({
  selector: 'inv-pay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (doc().payment.length || doc().pix) {
      <div class="ipay" data-keep>
        @if (title()) {
          <p class="ipay-title">{{ doc().t.payment }}</p>
        }
        <div class="ipay-body">
          @if (doc().payment.length) {
            <dl class="ipay-rows">
              @for (row of doc().payment; track row.label) {
                <div class="ipay-row">
                  <dt>{{ row.label }}</dt>
                  <dd>{{ row.value }}</dd>
                </div>
              }
            </dl>
          }
          @if (qr(); as qr) {
            <figure class="ipay-qr">
              <svg [attr.viewBox]="'0 0 ' + qr.size + ' ' + qr.size" shape-rendering="crispEdges" role="img" [attr.aria-label]="doc().t.pixQr">
                <rect [attr.width]="qr.size" [attr.height]="qr.size" fill="#fff" />
                <path [attr.d]="qr.path" fill="#111" />
              </svg>
              <figcaption>{{ doc().t.pixQr }}</figcaption>
            </figure>
          }
        </div>
      </div>
    }
  `,
})
export class InvPayComponent {
  readonly doc = input.required<DocView>();
  readonly title = input(true);
  readonly qr = computed(() => {
    const payload = this.doc().pix;
    if (!payload) return null;
    const code = qrcode(0, 'M');
    code.addData(payload);
    code.make();
    const count = code.getModuleCount();
    const margin = 2;
    let path = '';
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (code.isDark(row, col)) path += `M${col + margin} ${row + margin}h1v1h-1z`;
      }
    }
    return { size: count + margin * 2, path };
  });
}

@Component({
  selector: 'inv-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (doc().notes) {
      <div class="in" data-keep>
        <p class="in-title">{{ doc().t.notes }}</p>
        <p class="in-text">{{ doc().notes }}</p>
      </div>
    }
    @if (doc().terms) {
      <div class="in" data-keep>
        <p class="in-title">{{ doc().t.terms }}</p>
        <p class="in-text">{{ doc().terms }}</p>
      </div>
    }
  `,
})
export class InvNotesComponent {
  readonly doc = input.required<DocView>();
}

@Component({
  selector: 'inv-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (doc().logo) {
      <img class="ilogo" [src]="doc().logo" alt="" />
    } @else if (monogram()) {
      <span class="ilogo ilogo-mono" aria-hidden="true">{{ initials() }}</span>
    }
  `,
})
export class InvLogoComponent {
  readonly doc = input.required<DocView>();
  /** Without a logo, show the initials of the business in a brand-colored square. */
  readonly monogram = input(false);
  readonly initials = computed(() =>
    (this.doc().emitter.name || '?')
      .split(/\s+/)
      .filter((word) => word.length > 2 || /^[A-Z]/.test(word))
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join(''),
  );
}

export const PARTS = [InvPartyComponent, InvMetaComponent, InvItemsComponent, InvTotalsComponent, InvPayComponent, InvNotesComponent, InvLogoComponent];

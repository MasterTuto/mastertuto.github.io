import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';
import qrcode from 'qrcode-generator';

import type { DocView } from '../invoice.view';

/** Payment rows and, for BRL with a valid PIX key, a QR code with the amount. */
@Component({
  selector: 'inv-pay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inv-pay.component.html',
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

import { Directive, inject, input, TemplateRef } from '@angular/core';

/**
 * Rich content for one `bcs-toggle` option (an icon, a flag, a picture):
 *
 *   <bcs-toggle [(value)]="mode" label="Theme">
 *     <ng-template bcsToggleOption="light" label="Light">…svg…</ng-template>
 *     <ng-template bcsToggleOption="dark" label="Dark">…svg…</ng-template>
 *   </bcs-toggle>
 */
@Directive({ selector: 'ng-template[bcsToggleOption]' })
export class BcsToggleOptionDirective {
  readonly value = input.required<string>({ alias: 'bcsToggleOption' });
  /** Accessible name of the option. */
  readonly label = input.required<string>();
  readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}

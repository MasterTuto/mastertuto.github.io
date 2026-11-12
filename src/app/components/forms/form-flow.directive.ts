import { Directive, ElementRef, inject, output } from '@angular/core';

import { flowFields, focusNextField } from './form-flow';

/**
 * Keyboard flow for a form or a group of fields, tuned for phones:
 * - Enter in an input moves to the next field instead of submitting; on the last one it closes the
 *   keyboard and emits `flowDone`. Textareas keep Enter for new lines (Ctrl/Cmd+Enter moves on).
 * - Each field gets `enterkeyhint` ("next", or "done" on the last) so the on-screen key says so.
 * Works with the mask directive, which advances on its own when a masked field is complete.
 */
@Directive({
  selector: '[appFormFlow]',
  host: {
    '(keydown.enter)': 'onEnter($any($event))',
    '(focusin)': 'onFocus($any($event))',
  },
})
export class FormFlowDirective {
  readonly flowDone = output<void>();
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  onEnter(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (event.isComposing || !(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    if (target instanceof HTMLTextAreaElement && !(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    if (!focusNextField(target)) this.flowDone.emit();
  }

  onFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLTextAreaElement || target.hasAttribute('enterkeyhint')) return;
    const fields = flowFields(this.host.nativeElement);
    if (!fields.includes(target)) return;
    target.setAttribute('enterkeyhint', fields[fields.length - 1] === target ? 'done' : 'next');
  }
}

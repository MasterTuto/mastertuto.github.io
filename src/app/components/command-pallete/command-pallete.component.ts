import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Verb, ActionSheet, ActionSheetAction, VerbResult } from 'src/app/service/verb';
import { VerbRegistry } from 'src/app/service/verb-registry.service';

@Component({
  selector: 'app-command-pallete',
  templateUrl: './command-pallete.component.html',
  styleUrl: './command-pallete.component.scss',
  host: { '(document:keydown)': 'onGlobalKeydown($event)', '(document:pointerdown)': 'onOutside($event)', '(focusout)': 'onFocusOut($event)' },
})
export class CommandPalleteComponent {
  private readonly registry = inject(VerbRegistry);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('commandInput');
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  readonly isOpen = signal(false);
  readonly query = signal('');
  readonly activeIndex = signal(0);
  readonly status = signal('');
  readonly busy = signal(false);
  readonly sheet = signal<ActionSheet | undefined>(undefined);
  readonly page = signal(0);
  readonly actions = computed(() => (this.sheet()?.actions ?? []).filter(a => (a.label + ' ' + a.description).toLocaleLowerCase().includes(this.query().toLocaleLowerCase())));
  readonly suggestions = computed(() => this.sheet() ? this.actions().slice(this.page() * 3, this.page() * 3 + 3) : this.registry.search(this.query()).slice(0, 3));
  open(): void { this.isOpen.set(true); setTimeout(() => this.input()?.nativeElement.focus()); }
  close(restoreFocus = true): void {
    this.isOpen.set(false); this.query.set(''); this.activeIndex.set(0); this.sheet.set(undefined); this.status.set(''); this.page.set(0);
    if (restoreFocus) this.trigger()?.nativeElement.focus();
  }
  onOutside(event: Event): void { if (this.isOpen() && !this.element.nativeElement.contains(event.target as Node)) this.close(false); }
  onFocusOut(event: FocusEvent): void { if (event.relatedTarget && !this.element.nativeElement.contains(event.relatedTarget as Node)) this.close(false); }
  onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); this.isOpen() ? this.close() : this.open(); }
    else if (event.key === 'Escape' && this.isOpen()) { event.preventDefault(); this.close(); }
  }
  onInput(event: Event): void { this.query.set((event.target as HTMLInputElement).value); this.activeIndex.set(0); this.page.set(0); this.status.set(''); }
  onInputKeydown(event: KeyboardEvent): void {
    const count = this.suggestions().length;
    if (count && ['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); this.activeIndex.update(i => (i + (event.key === 'ArrowDown' ? 1 : count - 1)) % count); }
  }
  onSubmit(event: Event): void { event.preventDefault(); const choice = this.suggestions()[this.activeIndex()]; if (choice) void this.choose(choice); }
  nextPage(): void { this.page.update(p => (p + 1) % Math.ceil(this.actions().length / 3)); this.activeIndex.set(0); }
  back(): void { this.sheet.set(undefined); this.query.set(''); this.page.set(0); this.activeIndex.set(0); this.input()?.nativeElement.focus(); }
  title(choice: Verb | ActionSheetAction): string { return 'title' in choice ? choice.title : choice.label; }
  async choose(choice: Verb | ActionSheetAction): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    try {
      const result: VerbResult = await choice.run();
      if (!this.isOpen()) return;
      this.status.set(result.message);
      if (result.actionSheet) { this.sheet.set(result.actionSheet); this.query.set(''); this.page.set(0); this.activeIndex.set(0); }
      if (result.close) this.close();
    } catch { this.status.set('Não foi possível executar. Tente novamente.'); }
    finally { this.busy.set(false); }
  }
}

/** Fields that take part in keyboard flow: text-like inputs, selects and textareas that can be edited. */
const FIELD_SELECTOR = [
  'input:not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=file])',
  'select',
  'textarea',
].join(',');

/** Editable, visible fields inside `root`, in document order. */
export function flowFields(root: ParentNode): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FIELD_SELECTOR)).filter(
    (el) =>
      !(el as HTMLInputElement).disabled &&
      !(el as HTMLInputElement).readOnly &&
      el.tabIndex !== -1 &&
      !el.closest('[data-flow-skip]') &&
      el.getClientRects().length > 0,
  );
}

/** Container used for flow: the closest `[appFormFlow]`, else the form, else the document. */
export function flowRoot(el: Element): ParentNode {
  return el.closest('[appFormFlow]') ?? el.closest('form') ?? el.ownerDocument;
}

/**
 * Moves focus to the field after `from`. Selects its text so typing replaces it. On the last field,
 * blurs (closing the on-screen keyboard) and returns false.
 */
export function focusNextField(from: HTMLElement): boolean {
  const fields = flowFields(flowRoot(from));
  const next = fields[fields.indexOf(from) + 1];
  if (!next) {
    from.blur();
    return false;
  }
  next.focus({ preventScroll: false });
  if (next instanceof HTMLInputElement && /^(text|tel|email|search|url|number|)$/.test(next.type)) {
    try {
      next.select();
    } catch {
      /* some input types do not support selection */
    }
  }
  return true;
}

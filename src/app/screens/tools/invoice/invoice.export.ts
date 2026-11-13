/**
 * Exports of the invoice paper. Browser only; every library is loaded with `import()` when the person
 * clicks, so none of them is in the page bundle.
 */
import type { Invoice } from './invoice.types';
import type { DocView } from './invoice.view';

const PAGE_W = 794;
const PAGE_H = 1123;

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/** Copies the paper into an off-screen, unscaled host (the preview may be scaled or hidden on phones). */
function stage(source: HTMLElement): { node: HTMLElement; cleanup: () => void } {
  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = `position:fixed;left:-20000px;top:0;width:${PAGE_W}px;pointer-events:none;z-index:-1;`;
  const node = source.cloneNode(true) as HTMLElement;
  host.appendChild(node);
  document.body.appendChild(host);
  return { node, cleanup: () => host.remove() };
}

async function render(node: HTMLElement, scale: number): Promise<HTMLCanvasElement> {
  const { domToCanvas } = await import('modern-screenshot');
  await document.fonts?.ready;
  return domToCanvas(node, {
    scale,
    width: PAGE_W,
    height: node.offsetHeight,
    backgroundColor: '#ffffff',
    timeout: 8000,
    // Web fonts come from Google's CSS; if it cannot be read the system fallback in the stack is used.
    fetch: { bypassingCache: false },
  });
}

export async function exportPng(source: HTMLElement, fileName: string): Promise<void> {
  const { node, cleanup } = stage(source);
  try {
    const canvas = await render(node, 2);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('png');
    downloadBlob(blob, fileName);
  } finally {
    cleanup();
  }
}

/**
 * Page breaks for a document of `height` px: each page ends at the top of the first block (`data-keep`)
 * that would be cut, unless that leaves the page almost empty.
 */
export function pageBreaks(height: number, blocks: { top: number; bottom: number }[], first = PAGE_H, next = PAGE_H): number[] {
  const breaks: number[] = [0];
  let start = 0;
  let capacity = first;
  while (height - start > capacity + 1) {
    const limit = start + capacity;
    let cut = limit;
    for (const block of blocks) {
      if (block.top < limit && block.bottom > limit && block.top > start + capacity * 0.3) cut = Math.min(cut, block.top);
    }
    breaks.push(Math.floor(cut));
    start = Math.floor(cut);
    capacity = next;
  }
  return breaks;
}

export async function exportPdf(source: HTMLElement, fileName: string, title: string): Promise<void> {
  const { node, cleanup } = stage(source);
  try {
    const height = Math.max(PAGE_H, node.offsetHeight);
    const top = node.getBoundingClientRect().top;
    const blocks = Array.from(node.querySelectorAll<HTMLElement>('[data-keep]')).map((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top - top, bottom: rect.bottom - top };
    });
    const margin = 36;
    const starts = pageBreaks(height, blocks, PAGE_H, PAGE_H - margin);
    const scale = Math.min(3, 15000 / height);
    const [{ jsPDF }, canvas] = await Promise.all([import('jspdf'), render(node, scale)]);
    const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
    pdf.setProperties({ title, creator: 'brenocs.dev.br · Gerador de Invoice' });
    const pageW = pdf.internal.pageSize.getWidth();
    const ptPerPx = pageW / PAGE_W;
    starts.forEach((start, index) => {
      const end = starts[index + 1] ?? height;
      const offset = index === 0 ? 0 : margin;
      const slice = document.createElement('canvas');
      slice.width = canvas.width;
      slice.height = Math.round((end - start + offset) * scale);
      const ctx = slice.getContext('2d')!;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, slice.width, slice.height);
      const sy = Math.round(start * scale);
      const sh = Math.min(canvas.height - sy, Math.round((end - start) * scale));
      // Continuation pages: stretch a pixel row from the top padding of the first block into the margin, so
      // side bands and backgrounds stay continuous.
      if (offset) ctx.drawImage(canvas, 0, Math.min(canvas.height - 1, sy + Math.round(4 * scale)), canvas.width, 1, 0, 0, canvas.width, Math.round(offset * scale));
      ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, Math.round(offset * scale), canvas.width, sh);
      if (index > 0) pdf.addPage('a4', 'portrait');
      pdf.addImage(slice.toDataURL('image/png'), 'PNG', 0, 0, pageW, (slice.height / scale) * ptPerPx, undefined, 'FAST');
    });
    downloadBlob(pdf.output('blob'), fileName);
  } finally {
    cleanup();
  }
}

const PRINT_STYLE_ID = 'inv-print-style';

/** Prints only the paper: a copy goes to a top-level host and everything else is hidden while printing. */
export function printDocument(source: HTMLElement): void {
  if (!document.getElementById(PRINT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = PRINT_STYLE_ID;
    style.textContent = `
      .inv-print-host { display: none; }
      @media print {
        @page { size: A4; margin: 0; }
        html, body { margin: 0 !important; padding: 0 !important; min-height: 0 !important; background: #fff !important; }
        body > *:not(.inv-print-host) { display: none !important; }
        .inv-print-host { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; margin: 0; }
        .inv-print-host .inv-doc { -webkit-print-color-adjust: exact; print-color-adjust: exact; zoom: .995; }
        .inv-print-host [data-keep] { break-inside: avoid; }
      }`;
    document.head.appendChild(style);
  }
  document.querySelectorAll('.inv-print-host').forEach((el) => el.remove());
  const host = document.createElement('div');
  host.className = 'inv-print-host';
  host.appendChild(source.cloneNode(true));
  document.body.appendChild(host);
  const done = () => {
    host.remove();
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
  setTimeout(done, 60_000);
}

export async function exportDocx(invoice: Invoice, view: DocView, fileName: string): Promise<void> {
  const { buildDocx } = await import('./invoice.docx');
  downloadBlob(await buildDocx(invoice, view), fileName);
}

/**
 * Word export: a structured, editable document (letterhead, parties, items table, totals, payment and
 * notes) in the brand color. Loaded on demand together with the `docx` library.
 */
import {
  AlignmentType, BorderStyle, Document, ImageRun, Packer, Paragraph, ShadingType, Table, TableCell, TableLayoutType,
  TableRow, TextRun, VerticalAlign, WidthType, type ITableCellOptions,
} from 'docx';

import type { Invoice } from './invoice.types';
import type { DocView, PartyView, Row } from './invoice.view';

const FONT = 'Calibri';
const GRAY = '6B7280';
const DARK = '111827';
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const hex = (color: string) => color.replace('#', '').toUpperCase();

const text = (value: string, opts: { bold?: boolean; size?: number; color?: string; italics?: boolean; caps?: boolean } = {}) =>
  new TextRun({ text: value, font: FONT, bold: opts.bold, italics: opts.italics, allCaps: opts.caps, size: (opts.size ?? 10) * 2, color: opts.color ?? DARK });

const para = (runs: TextRun[] | string, opts: { align?: (typeof AlignmentType)[keyof typeof AlignmentType]; after?: number; before?: number } = {}) =>
  new Paragraph({
    children: typeof runs === 'string' ? [text(runs)] : runs,
    alignment: opts.align,
    spacing: { after: opts.after ?? 40, before: opts.before ?? 0 },
  });

const label = (value: string, color = GRAY) => para([text(value, { size: 8, bold: true, color, caps: true })], { after: 60 });

function partyParagraphs(party: PartyView, title: string, brand: string): Paragraph[] {
  const out = [label(title, brand), para([text(party.name || '—', { bold: true, size: 11 })])];
  for (const line of [party.contact, party.taxId, ...party.lines, [party.email, party.phone].filter(Boolean).join(' · ')]) {
    if (line) out.push(para([text(line, { size: 9.5, color: '4B5563' })], { after: 20 }));
  }
  return out;
}

function cell(children: Paragraph[], opts: Partial<ITableCellOptions> = {}): TableCell {
  return new TableCell({ children, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: VerticalAlign.CENTER, ...opts });
}

async function logoRun(dataUrl: string): Promise<ImageRun | null> {
  if (!dataUrl) return null;
  try {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const scale = Math.min(170 / img.naturalWidth, 64 / img.naturalHeight, 1);
    // docx takes PNG/JPEG only: re-encode WebP/SVG logos as PNG.
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d')!.drawImage(img, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return null;
    return new ImageRun({
      type: 'png',
      data: new Uint8Array(await blob.arrayBuffer()),
      transformation: { width: Math.round(img.naturalWidth * scale), height: Math.round(img.naturalHeight * scale) },
    });
  } catch {
    return null;
  }
}

function rowsTable(rows: Row[], widths: [number, number], opts: { brand: string; ink: string; total?: Row } ): Table {
  const tableRows = rows.map(
    (row) =>
      new TableRow({
        children: [
          cell([para([text(row.label, { color: '4B5563' })])], { width: { size: widths[0], type: WidthType.DXA } }),
          cell([para([text(row.value)], { align: AlignmentType.RIGHT })], { width: { size: widths[1], type: WidthType.DXA } }),
        ],
      }),
  );
  if (opts.total) {
    const shading = { type: ShadingType.CLEAR, color: 'auto', fill: opts.brand };
    tableRows.push(
      new TableRow({
        children: [
          cell([para([text(opts.total.label, { bold: true, size: 12, color: opts.ink })])], { shading }),
          cell([para([text(opts.total.value, { bold: true, size: 12, color: opts.ink })], { align: AlignmentType.RIGHT })], { shading }),
        ],
      }),
    );
  }
  return new Table({ rows: tableRows, borders: NO_BORDERS, alignment: AlignmentType.RIGHT, layout: TableLayoutType.FIXED, columnWidths: widths });
}

export async function buildDocx(invoice: Invoice, view: DocView): Promise<Blob> {
  const t = view.t;
  const brand = hex(view.brand.color);
  const ink = hex(view.brand.ink);
  const soft = hex(view.brand.tint);
  const logo = await logoRun(view.logo);
  const fullWidth = 9638; // A4 width minus 2 cm margins, in twips.

  const header = new Table({
    width: { size: fullWidth, type: WidthType.DXA },
    columnWidths: [5400, 4238],
    layout: TableLayoutType.FIXED,
    borders: { ...NO_BORDERS, bottom: { style: BorderStyle.SINGLE, size: 18, color: brand } },
    rows: [
      new TableRow({
        children: [
          cell([...(logo ? [new Paragraph({ children: [logo], spacing: { after: 120 } })] : []), ...partyParagraphs(view.emitter, '', brand).slice(1)], {
            verticalAlign: VerticalAlign.TOP,
          }),
          cell(
            [
              para([text(view.title, { bold: true, size: 26, color: brand, caps: true })], { align: AlignmentType.RIGHT, after: 120 }),
              ...view.meta.map((row) =>
                para([text(`${row.label}  `, { size: 9.5, color: GRAY }), text(row.value, { size: 9.5, bold: true })], { align: AlignmentType.RIGHT, after: 20 }),
              ),
            ],
            { verticalAlign: VerticalAlign.TOP },
          ),
        ],
      }),
    ],
  });

  const parties = new Table({
    width: { size: fullWidth, type: WidthType.DXA },
    columnWidths: [4819, 4819],
    layout: TableLayoutType.FIXED,
    borders: NO_BORDERS,
    rows: [new TableRow({ children: [cell(partyParagraphs(view.emitter, t.from, brand)), cell(partyParagraphs(view.client, t.billTo, brand))].map((c) => c) })],
  });

  const cols = view.hasDiscount ? [4038, 1300, 1500, 1100, 1700] : [4738, 1400, 1700, 1800];
  const heads = [t.description, t.qty, t.unitPrice, ...(view.hasDiscount ? [t.discount] : []), t.amount];
  const headShading = { type: ShadingType.CLEAR, color: 'auto', fill: brand };
  const items = new Table({
    width: { size: fullWidth, type: WidthType.DXA },
    columnWidths: cols,
    layout: TableLayoutType.FIXED,
    borders: { ...NO_BORDERS, insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' }, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' } },
    rows: [
      new TableRow({
        tableHeader: true,
        children: heads.map((head, i) =>
          cell([para([text(head, { bold: true, size: 8.5, color: ink, caps: true })], { align: i ? AlignmentType.RIGHT : AlignmentType.LEFT })], {
            shading: headShading,
            width: { size: cols[i], type: WidthType.DXA },
          }),
        ),
      }),
      ...view.items.map(
        (item, index) =>
          new TableRow({
            cantSplit: true,
            children: [item.description || '—', item.qtyUnit, item.unitPrice, ...(view.hasDiscount ? [item.discount || '—'] : []), item.amount].map((value, i) =>
              cell([para([text(value, { bold: i === heads.length - 1 })], { align: i ? AlignmentType.RIGHT : AlignmentType.LEFT })], {
                width: { size: cols[i], type: WidthType.DXA },
                shading: index % 2 ? { type: ShadingType.CLEAR, color: 'auto', fill: soft } : undefined,
              }),
            ),
          }),
      ),
    ],
  });

  const children: (Paragraph | Table)[] = [header, para('', { after: 200 }), parties, para('', { after: 200 }), items, para('', { after: 160 })];
  children.push(rowsTable(view.totals, [2600, 1900], { brand, ink, total: { label: t.total, value: view.total } }));
  if (view.stamp) {
    const color = view.status === 'paid' ? '16A34A' : '9CA3AF';
    children.push(para([text(view.stamp, { bold: true, size: 20, color, caps: true })], { before: 240, align: AlignmentType.RIGHT }));
  }
  if (view.payment.length) {
    children.push(para('', { after: 120 }), label(t.payment, brand));
    for (const row of view.payment) children.push(para([text(`${row.label}: `, { color: GRAY }), text(row.value, { bold: true })], { after: 20 }));
    if (view.pix) {
      children.push(para([text('PIX copia e cola: ', { color: GRAY, size: 8 }), text(view.pix, { size: 8 })], { before: 80 }));
    }
  }
  if (view.notes) children.push(para('', { after: 80 }), label(t.notes, brand), ...view.notes.split('\n').map((line) => para([text(line, { color: '4B5563' })])));
  if (view.terms) children.push(para('', { after: 80 }), label(t.terms, brand), ...view.terms.split('\n').map((line) => para([text(line, { color: '4B5563' })])));
  children.push(para([text(t.thanks, { italics: true, color: GRAY })], { before: 360, align: AlignmentType.CENTER }));

  const doc = new Document({
    creator: view.emitter.name || 'Gerador de Invoice',
    title: `${view.title} ${invoice.number}`,
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [
      {
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1134, right: 1134 } } },
        children,
      },
    ],
  });
  return Packer.toBlob(doc);
}

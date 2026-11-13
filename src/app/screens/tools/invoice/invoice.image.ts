/** Browser-only image helpers for the logo. */

/** Reads an image file and returns a data URL no larger than `max` px on its longest side (PNG, or WebP when big). */
export async function resizeImage(file: File, max = 400): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Escolha um arquivo de imagem (PNG, JPG, SVG ou WebP).');
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    return drawScaled(img, max);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Re-encodes a data URL smaller (for share links). Returns '' when it cannot fit `maxChars`. */
export async function shrinkDataUrl(dataUrl: string, max: number, maxChars: number): Promise<string> {
  if (!dataUrl) return '';
  if (dataUrl.length <= maxChars) return dataUrl;
  try {
    const img = await loadImage(dataUrl);
    for (const size of [max, Math.round(max * 0.7), Math.round(max * 0.5)]) {
      const out = drawScaled(img, size, 'image/webp', 0.8);
      if (out.length <= maxChars) return out;
    }
  } catch {
    /* ignore */
  }
  return '';
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    img.src = src;
  });
}

function drawScaled(img: HTMLImageElement, max: number, type?: string, quality?: number): string {
  const w = img.naturalWidth || img.width || max;
  const h = img.naturalHeight || img.height || max;
  const scale = Math.min(1, max / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas indisponível.');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  if (type) return canvas.toDataURL(type, quality);
  const png = canvas.toDataURL('image/png');
  return png.length > 180_000 ? canvas.toDataURL('image/webp', 0.9) : png;
}

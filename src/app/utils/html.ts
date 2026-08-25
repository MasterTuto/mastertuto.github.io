export const WHATSAPP_NUMBER = "5577988667459";

export function createWhatsAppLink(message: string = ""): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function htmlToUrl(html: string): string {
  const bytes = new TextEncoder().encode(html);
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
  const b64Html = btoa(binString);
  return 'data:text/html;base64,' + b64Html;
}

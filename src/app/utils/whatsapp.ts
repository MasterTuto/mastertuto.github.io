export const WHATSAPP_NUMBER = "5577988667459";

export function createWhatsAppLink(message: string = ""): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

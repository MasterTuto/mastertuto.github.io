/**
 * Invoice ⇄ URL hash. JSON → deflate-raw (CompressionStream) → base64url, prefixed with "z"; where
 * compression is unavailable the JSON goes as plain base64url prefixed with "j".
 * Self-contained and Angular-free: tested by `scripts/test-invoice.mjs`.
 */

export const SHARE_PARAM = 'invoice';

export function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64UrlToBytes(text: string): Uint8Array {
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function pipe(bytes: Uint8Array, stream: GenericTransformStream): Promise<Uint8Array> {
  const response = new Response(new Blob([bytes as BlobPart]).stream().pipeThrough(stream as unknown as TransformStream<Uint8Array, Uint8Array>));
  return new Uint8Array(await response.arrayBuffer());
}

const canCompress = () => typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';

/** Encodes any JSON value for a URL hash. `compress: false` forces the plain fallback. */
export async function encodeShare(value: unknown, compress = true): Promise<string> {
  const json = new TextEncoder().encode(JSON.stringify(value));
  if (compress && canCompress()) {
    try {
      return 'z' + bytesToBase64Url(await pipe(json, new CompressionStream('deflate-raw')));
    } catch {
      /* fall through to plain */
    }
  }
  return 'j' + bytesToBase64Url(json);
}

/** Decodes a value made by `encodeShare`; throws on malformed input. */
export async function decodeShare(text: string): Promise<unknown> {
  const kind = text.charAt(0);
  const bytes = base64UrlToBytes(text.slice(1));
  if (kind === 'z') {
    if (!canCompress()) throw new Error('Este navegador não abre links compactados.');
    return JSON.parse(new TextDecoder().decode(await pipe(bytes, new DecompressionStream('deflate-raw'))));
  }
  if (kind === 'j') return JSON.parse(new TextDecoder().decode(bytes));
  throw new Error('Link de invoice inválido.');
}

/** Payload of `#invoice=…` in a location hash, or null. */
export function readShareHash(hash: string): string | null {
  const match = new RegExp(`(?:^#|&)${SHARE_PARAM}=([A-Za-z0-9_-]+)`).exec(hash ?? '');
  return match ? match[1] : null;
}

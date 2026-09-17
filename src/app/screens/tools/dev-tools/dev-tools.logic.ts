export const MAX_INPUT_LENGTH = 1_000_000;

export function formatJson(source: string, indent: string = '  '): string {
  if (source.length > MAX_INPUT_LENGTH) throw new Error('Please use JSON smaller than 1 million characters.');
  JSON.parse(source);
  // Keep the original lexemes: JSON.stringify would round large integers and remove duplicate keys.
  const tokens = source.match(/"(?:[^"\\]|\\.)*"|[^\s"{}\[\],:]+|[{}\[\],:]/g)!;
  if (!indent) return tokens.join('');
  let depth = 0;
  let output = '';
  const newline = () => '\n' + indent.repeat(depth);
  tokens.forEach((token, index) => {
    const previous = tokens[index - 1];
    const next = tokens[index + 1];
    if (token === '{' || token === '[') {
      output += token;
      depth++;
      if (depth > 200) throw new Error('JSON nesting exceeds the 200-level limit. Use a local editor for deeply nested data.');
      if (next !== '}' && next !== ']') output += newline();
    } else if (token === '}' || token === ']') {
      depth--;
      if (previous !== '{' && previous !== '[') output += newline();
      output += token;
    } else if (token === ',') output += ',' + newline();
    else if (token === ':') output += ': ';
    else output += token;
    if (output.length > 5_000_000) throw new Error('Formatted output exceeds 5 million characters. Try Minify or use a local editor.');
  });
  return output;
}

export function jsonError(source: string, error: unknown): string {
  const message = error instanceof Error ? error.message : 'Invalid JSON.';
  const match = message.match(/position (\d+)/i);
  const position = match ? Number(match[1]) : /unexpected end/i.test(message) ? source.length : null;
  if (position === null) return message;
  const preceding = source.slice(0, position).split('\n');
  return `Line ${preceding.length}, column ${preceding[preceding.length - 1].length + 1}: ${message}`;
}

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodePart(segment: string, label: string): Record<string, unknown> {
  if (!segment || !/^[A-Za-z0-9_-]+$/.test(segment) || segment.length % 4 === 1) {
    throw new Error(`${label} is not valid Base64URL.`);
  }
  try {
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')), c => c.charCodeAt(0));
    const value: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new Error(`${label} must contain a UTF-8 JSON object encoded as Base64URL.`);
  }
}

export function decodeJwt(source: string): DecodedJwt {
  if (source.length > MAX_INPUT_LENGTH) throw new Error('Please use a token smaller than 1 million characters.');
  const token = source.trim().replace(/^Bearer\s+/i, '');
  const parts = token.split('.');
  if (parts.length === 5) throw new Error('This looks like an encrypted JWE. This decoder supports three-part JWTs and cannot decrypt JWE.');
  if (parts.length !== 3) throw new Error('A JWT needs three dot-separated parts: header.payload.signature.');
  const header = decodePart(parts[0], 'Header');
  const payload = decodePart(parts[1], 'Payload');
  if (!/^[A-Za-z0-9_-]*$/.test(parts[2]) || parts[2].length % 4 === 1) throw new Error('Signature is not valid Base64URL.');
  return { header, payload, signature: parts[2] };
}

export function numericDate(value: unknown): string | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  const date = new Date(value * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function tokenTiming(payload: Record<string, unknown>, nowSeconds: number): string {
  const exp = payload['exp'];
  const nbf = payload['nbf'];
  if ((exp !== undefined && !numericDate(exp)) || (nbf !== undefined && !numericDate(nbf))) return 'Invalid time claim — exp and nbf must be numeric Unix timestamps in seconds.';
  if (typeof exp === 'number' && nowSeconds >= exp) return 'Expired — the exp timestamp has passed.';
  if (typeof nbf === 'number' && nowSeconds < nbf) return 'Not active yet — the nbf timestamp is in the future.';
  if (exp === undefined) return 'No expiration claim — this token does not declare exp.';
  return 'Expiration is in the future — signature and other claims remain unverified.';
}

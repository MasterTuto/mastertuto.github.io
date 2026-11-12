export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'failed';

/**
 * Shares a game result with the native share sheet when the device has one (phones), otherwise copies
 * `text` and `url` to the clipboard. Returns what happened so the caller can show "Copied!" feedback.
 * `url` defaults to the current page without query or hash.
 */
export async function shareResult(text: string, url?: string): Promise<ShareOutcome> {
  if (typeof window === 'undefined') return 'failed';
  const link = url ?? location.origin + location.pathname;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  if (coarse && typeof navigator.share === 'function') {
    try {
      await navigator.share({ text, url: link });
      return 'shared';
    } catch (error) {
      if ((error as DOMException)?.name === 'AbortError') return 'cancelled';
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${link}`);
    return 'copied';
  } catch {
    return 'failed';
  }
}

// ─── Link safety helpers ──────────────────────────────────────────────────────

/**
 * Returns true if the href is an absolute external URL (http/https/mailto/tel).
 * Internal hrefs (starting with "/", "#", or relative) return false.
 */
export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

/**
 * Returns true if the href is safe to render as an anchor destination.
 * Rejects javascript:, data:, vbscript:, and other potentially harmful schemes.
 */
export function isSafeHref(href: string): boolean {
  return !/^(javascript|data|vbscript):/i.test(href.trim());
}

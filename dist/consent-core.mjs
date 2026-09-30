// Bump this version whenever providers, purposes or categories materially change.
export const VERSION = '2026-09-30.1';
export const KEY = 'amplifyiq_consent';
export const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export const defaults = () => ({ necessary: true, functional: false, analytics: false, marketing: false });
export function createConsent(functional, now = Date.now()) {
  return { version: VERSION, timestamp: now, expiresAt: now + MAX_AGE,
    categories: { ...defaults(), functional: functional === true } };
}
export function parseConsent(raw, now = Date.now()) {
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== VERSION || !Number.isFinite(value.timestamp) || value.timestamp > now ||
      value.expiresAt !== value.timestamp + MAX_AGE || now >= value.expiresAt ||
      value.categories?.necessary !== true || typeof value.categories.functional !== 'boolean' ||
      value.categories.analytics !== false || value.categories.marketing !== false) return null;
    return value;
  } catch { return null; }
}

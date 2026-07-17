/**
 * Contact form API utility.
 * Submits form data to a Google Apps Script webhook.
 * Uses no-cors mode — opaque response means success is assumed
 * whenever no network error is thrown.
 */

const TIMEOUT_MS = 15_000;

export async function submitContactForm(payload) {
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  if (!url) {
    throw new Error('VITE_GOOGLE_SCRIPT_URL is not configured.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // no-cors returns opaque response — if we reach here, no network error occurred
    return { success: true };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw new Error('Network error. Please check your connection and try again.');
  } finally {
    clearTimeout(timeoutId);
  }
}

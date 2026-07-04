import { writable } from 'svelte/store';

export const toastMessage = writable<string | null>(null);
let timeout: ReturnType<typeof setTimeout> | null = null;

export function showToast(msg: string, duration = 3000) {
  toastMessage.set(msg);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => toastMessage.set(null), duration);
}

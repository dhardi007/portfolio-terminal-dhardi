import { writable } from 'svelte/store';

export type Lang = 'es' | 'en' | 'de';

export const lang = writable<Lang>('es');
export const langOrder: Lang[] = ['es', 'en', 'de'];

export function initLang() {
  const browserLang: Lang = navigator.language?.startsWith('de') ? 'de' : navigator.language?.startsWith('en') ? 'en' : 'es';
  const saved = (localStorage.getItem('terminal-lang') as Lang) || browserLang;
  lang.set(saved);
}

export function cycleLang() {
  lang.update(current => {
    const idx = langOrder.indexOf(current);
    const next = langOrder[(idx + 1) % langOrder.length];
    localStorage.setItem('terminal-lang', next);
    return next;
  });
}

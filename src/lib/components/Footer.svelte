<script lang="ts">
  import { lang } from '$lib/stores/lang.svelte';
  import { i18n, type Lang } from '$lib/i18n';

  let currentLang = $state<Lang>('es');
  lang.subscribe(v => currentLang = v);

  const t = (path: string) => {
    let v: any = i18n[currentLang];
    for (const k of path.split('.')) { if (v) v = v[k]; else return ''; }
    return v || '';
  };
</script>

<footer class="footer">
  <div class="footer__left">
    <span class="footer__mode">NORMAL</span>
    <span>index.svelte</span>
  </div>
  <div class="footer__right">
    <span>utf-8</span>
    <span>svelte</span>
    <span>1,1</span>
    <span>All</span>
    <span>
      <a href="https://dizzi1222.github.io/dhardi.dev" target="_blank" style="color:var(--accent-tertiary);text-decoration:underline">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:4px">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 13c-2.32 0-4.45-1.09-5.83-2.93l2.5-4.33C9.83 14.76 10.82 15 12 15c1.18 0 2.17-.24 3.33-.68l2.5 4.33C16.45 17.91 14.32 19 12 19z"/>
        </svg>
        {t('footer.commercial')}
      </a>
    </span>
  </div>
</footer>

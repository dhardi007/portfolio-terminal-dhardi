<script lang="ts">
  import { lang, cycleLang, type Lang } from '$lib/stores/lang.svelte';
  import { theme, toggleTheme } from '$lib/stores/theme.svelte';
  import { i18n } from '$lib/i18n';

  let currentTime = $state(new Date());
  let currentLang = $state<Lang>('es');
  let currentTheme = $state('dark');
  let mobileOpen = $state(false);

  lang.subscribe(v => currentLang = v);
  theme.subscribe(v => currentTheme = v);

  $effect(() => {
    const t = setInterval(() => currentTime = new Date(), 1000);
    return () => clearInterval(t);
  });

  const t = (path: string) => {
    let v: any = i18n[currentLang];
    for (const k of path.split('.')) { if (v) v = v[k]; else return ''; }
    return v || '';
  };

  function handleLang() { cycleLang(); }
  function handleTheme() { toggleTheme(); }
  function toggleMobile() { mobileOpen = !mobileOpen; }
</script>

<header class="header">
  <div class="header__left">
    <span class="header__prompt">❯</span>
    <span class="header__user glow-text">diego</span>
    <span class="header__path">@portfolio:~$</span>
  </div>
  <div class="header__right">
    <span class="available-badge">
      <span class="available-dot"></span>
      <span>{t('header.available')}</span>
    </span>
    <button class="header-btn" onclick={handleLang}>
      {currentLang.toUpperCase()}
    </button>
    <button class="header-btn" onclick={handleTheme}>
      {currentTheme === 'light' ? '☀' : '☾'}
    </button>
    <span>󰻀 arch</span>
    <span>󰍛 8GB</span>
    <span>{String(currentTime.getHours()).padStart(2, '0')}:{String(currentTime.getMinutes()).padStart(2, '0')}</span>
  </div>
  <button class="mobile-menu-btn" class:open={mobileOpen} onclick={toggleMobile} aria-label="Toggle menu">
    {mobileOpen ? '󰅮' : '󰅬'}
  </button>
</header>

{#if mobileOpen}
  <div id="mobile-menu" style="
    position:fixed;top:var(--header-height);left:0;right:0;
    background:var(--bg-secondary);border-bottom:2px solid var(--accent-secondary);
    padding:var(--gap-md);z-index:999;display:flex;flex-direction:column;gap:var(--gap-sm);
  ">
    <span class="available-badge"><span class="available-dot"></span>{t('header.available')}</span>
    <div style="display:flex;gap:var(--gap-sm)">
      <button class="header-btn" onclick={handleLang}>{currentLang.toUpperCase()}</button>
      <button class="header-btn" onclick={handleTheme}>{currentTheme === 'light' ? '☀' : '☾'}</button>
    </div>
    <div style="color:var(--text-dim);font-size:0.85rem">
      <span>󰻀 arch</span> <span style="margin-left:var(--gap-md)">󰍛 8GB</span>
      <span style="margin-left:var(--gap-md)">{String(currentTime.getHours()).padStart(2, '0')}:{String(currentTime.getMinutes()).padStart(2, '0')}</span>
    </div>
  </div>
{/if}

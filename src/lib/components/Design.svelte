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

  const designKeys = ['Figma', 'Google Stitch', 'Design System', 'Prototyping'];
  let popupText = $state('');
  let popupVisible = $state(false);
  let clickCount = $state(0);
  let popupId = $state(0);

  function showPopup() {
    const descs = designKeys
      .map(k => i18n[currentLang]?.tech?.[k])
      .filter(Boolean);
    if (!descs.length) return;
    let idx;
    do {
      idx = Math.floor(Math.random() * descs.length);
    } while (idx === popupId && descs.length > 1);
    popupId = idx;
    popupText = descs[idx];
    popupVisible = true;
    clickCount++;
    if (clickCount >= 5) {
      setTimeout(() => popupVisible = false, 4000);
      clickCount = 0;
    }
  }
</script>

<section class="section" id="design">
  <div class="window">
    <div class="window__titlebar">
      <div class="window__titlebar-dots">
        <span class="window__titlebar-dot window__titlebar-dot--close"></span>
        <span class="window__titlebar-dot"></span>
        <span class="window__titlebar-dot"></span>
      </div>
      <span>design_portfolio.sh</span>
    </div>
    <div class="window__content" style="position:relative">
      <h2 class="section__title">// {t('sectionTitles.design')}</h2>
      <div class="icon-grid">
        <div class="icon-grid__item" role="button" tabindex="0" onclick={showPopup} onkeydown={(e) => e.key === 'Enter' && showPopup()}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM4 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-8 0zM12 0v8h4a4 4 0 0 0 0-8h-4zM4 4a4 4 0 0 0 4 4h4V4a4 4 0 0 0-8 0zM4 12a4 4 0 0 0 4 4h4v-8H8a4 4 0 0 0-4 4z"/>
          </svg>
          <span class="icon-grid__label">{i18n[currentLang].design.figma}</span>
        </div>
        <div class="icon-grid__item" role="button" tabindex="0" onclick={showPopup} onkeydown={(e) => e.key === 'Enter' && showPopup()}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
          <span class="icon-grid__label">{i18n[currentLang].design.stitch}</span>
        </div>
        <div class="icon-grid__item" role="button" tabindex="0" onclick={showPopup} onkeydown={(e) => e.key === 'Enter' && showPopup()}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm0-8h18v2H3v-2z"/>
          </svg>
          <span class="icon-grid__label">{i18n[currentLang].design.ds}</span>
        </div>
        <div class="icon-grid__item" role="button" tabindex="0" onclick={showPopup} onkeydown={(e) => e.key === 'Enter' && showPopup()}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"/>
          </svg>
          <span class="icon-grid__label">{i18n[currentLang].design.proto}</span>
        </div>
      </div>
      <p style="margin-top:var(--gap-md);color:var(--text-muted);font-size:0.85rem">
        {i18n[currentLang].design.hint}
      </p>
      {#if popupVisible}
        <div class="design-popup" onclick={() => popupVisible = false}>
          <strong style="color:var(--accent-tertiary)">✧ {t('sectionTitles.design')}</strong>
          <p style="margin-top:var(--gap-xs);color:var(--text-primary);font-size:0.85rem;line-height:1.6">
            {popupText}
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .design-popup {
    position: absolute;
    bottom: var(--gap-lg);
    left: var(--gap-lg);
    right: var(--gap-lg);
    background: rgba(7,7,26,0.95);
    backdrop-filter: blur(8px);
    border: 1px solid var(--accent-secondary);
    border-radius: 6px;
    padding: var(--gap-md);
    z-index: 10;
    cursor: pointer;
    animation: popup-in 0.2s ease;
  }

  @keyframes popup-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>

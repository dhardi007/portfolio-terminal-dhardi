<script lang="ts">
  import { lang } from '$lib/stores/lang.svelte';
  import { i18n } from '$lib/i18n';
  import type { Lang } from '$lib/i18n';

  let currentLang = $state<Lang>('es');
  lang.subscribe(v => currentLang = v);

  const t = (path: string) => {
    let v: any = i18n[currentLang];
    for (const k of path.split('.')) { if (v) v = v[k]; else return ''; }
    return v || '';
  };

  const quotes = [
    '">_ "El único modo de hacer un gran trabajo es amar lo que haces." — Steve Jobs',
    '">_ "Primero resuelve el problema, luego escribe el código." — John Johnson',
    '">_ "Talk is cheap. Show me the code." — Linus Torvalds',
    '">_ "El software es un gran arte." — Jeff Atwood',
    '">_ "La simplicidad es la máxima sofisticación." — Leonardo da Vinci',
    '">_ "Código limpio siempre parece que fue escrito por alguien que se preocupa." — Robert C. Martin',
    '">_ "No es un bug, es una característica no documentada." — Anónimo',
    '">_ "Primero haz que funcione, luego haz que sea rápido." — Kent Beck'
  ];

  let displayText = $state('');
  let quoteIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  $effect(() => {
    const interval = setInterval(() => {
      const current = quotes[quoteIndex];
      if (isDeleting) {
        displayText = current.substring(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          charIndex = 0;
          quoteIndex = (quoteIndex + 1) % quotes.length;
        }
      } else {
        displayText = current.substring(0, charIndex++);
        if (charIndex > current.length) {
          isDeleting = true;
        }
      }
    }, isDeleting ? 25 : 40);
    return () => clearInterval(interval);
  });

  let hoverMessage = $state(false);
</script>

<section class="hero section" id="hero" style="margin-top:calc(var(--header-height) + var(--gap-lg))">
  <div class="window" style="max-width: 700px; margin: 0 auto">
    <div class="window__titlebar">
      <div class="window__titlebar-dots">
        <span class="window__titlebar-dot window__titlebar-dot--close"></span>
        <span class="window__titlebar-dot"></span>
        <span class="window__titlebar-dot"></span>
      </div>
      <span class="hero-filename" style="cursor:pointer">about_me.sh</span>
    </div>
    <div class="window__content" style="position:relative;overflow:hidden">
      <div class="hero-code-overlay"></div>
      <div style="display:flex;align-items:flex-start;gap:var(--gap-lg);flex-wrap:wrap">
        <div style="position:relative;flex-shrink:0"
          onmouseenter={() => hoverMessage = true}
          onmouseleave={() => hoverMessage = false}>
          <img
            src="/avatar.png"
            alt="Avatar"
            class="avatar"
            style="width:100px;height:100px;border-radius:8px;
              filter: blur(6px) grayscale(0.3);transition:filter 0.3s;object-fit:cover"
          />
          {#if hoverMessage}
            <div style="position:absolute;bottom:-40px;left:50%;transform:translateX(-50%);
              background:var(--bg-window);border:1px solid var(--accent-tertiary);
              padding:0.4rem 0.8rem;font-size:0.75rem;color:var(--accent-tertiary);
              white-space:nowrap;z-index:10">
              ? No sabía que te gustaba espiar...
            </div>
          {/if}
        </div>
        <div style="flex:1;min-width:200px">
          <h1 class="hero__name glow-text" style="font-size:2rem;margin-bottom:var(--gap-sm)">Diego Härdi</h1>
          <p class="hero__tagline" style="color:var(--text-muted);font-size:0.9rem;margin-bottom:var(--gap-md)">
            {t('hero.tagline')}
          </p>
          <div id="typewriter" class="hero__typewriter" style="color:var(--accent-tertiary);font-size:0.8rem;min-height:1.5rem">
            {displayText}
          </div>
          {#if displayText.length === 0}
            <span style="animation:blink 1s step-end infinite;color:var(--accent-tertiary);font-size:0.8rem">_</span>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="hero-hud" style="margin-top:var(--gap-md)">
    <span class="hud-key">h</span> <span class="hud-meta">←</span>
    <span class="hud-key">j</span> <span class="hud-meta">↓</span>
    <span class="hud-key">k</span> <span class="hud-meta">↑</span>
    <span class="hud-key">l</span> <span class="hud-meta">→</span>
    <span class="hud-sep">│</span>
    <span class="hud-key">gg</span> <span class="hud-meta">top</span>
    <span class="hud-sep">│</span>
    <span class="hud-key">G</span> <span class="hud-meta">bottom</span>
    <span class="hud-sep">│</span>
    <span class="hud-key">/</span> <span class="hud-meta">search</span>
  </div>
</section>

<script lang="ts">
  import { lang } from '$lib/stores/lang.svelte';
  import { i18n, type Lang } from '$lib/i18n';
  import { projectData } from '$lib/data/projects';
  import { showToast } from '$lib/stores/toast.svelte';

  let currentLang = $state<Lang>('es');
  lang.subscribe(v => currentLang = v);

  const t = (path: string) => {
    let v: any = i18n[currentLang];
    for (const k of path.split('.')) { if (v) v = v[k]; else return ''; }
    return v || '';
  };

  let modalProject = $state<typeof projectData[0] | null>(null);
  let clickCount = $state(0);

  function openProject(id: number) {
    const p = projectData.find(x => x.id === id);
    if (p) modalProject = p;
  }

  function closeModal() {
    modalProject = null;
  }

  const ghIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:4px"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

  function handleProjectClick(id: number) {
    clickCount++;
    if (clickCount === 3) {
      showToast('? Tan indeciso como siempre...');
      clickCount = 0;
    }
    openProject(id);
  }
</script>

<section class="section" id="projects">
  <h2 class="section__title">// {t('sectionTitles.projects')}</h2>
  <div class="tiling-container" style="padding:0">
    {#each projectData as p}
      <div class="window" data-project={p.id}
        role="button" tabindex="0"
        onclick={() => handleProjectClick(p.id)}
        onkeydown={(e) => { if (e.key === 'Enter') handleProjectClick(p.id); }}>
        <div class="window__titlebar">
          <div class="window__titlebar-dots">
            <span class="window__titlebar-dot window__titlebar-dot--close"></span>
            <span class="window__titlebar-dot"></span>
            <span class="window__titlebar-dot"></span>
          </div>
          <span>project_{String(p.id + 1).padStart(2, '0')}.json</span>
          <span style="margin-left:auto;font-size:0.7rem;opacity:0.6">▸ click</span>
        </div>
        <div class="window__content">
          <h3 style="color:var(--accent-tertiary)">
            {p.title}
            {#if p.isPrivate}
              <span class="tag">{t('projects.private')}</span>
            {/if}
          </h3>
          <p style="margin:var(--gap-sm) 0">
            {currentLang === 'en' && p.descEn ? p.descEn : p.desc}
          </p>
          <div style="display:flex;gap:var(--gap-xs);flex-wrap:wrap">
            {#each p.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          <button class="btn" style="margin-top:var(--gap-sm);width:100%;pointer-events:none">
            {ghIcon} {t('projects.open')}
          </button>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Project Modal -->
{#if modalProject}
  <div class="modal-overlay active">
    <div class="modal-backdrop" onclick={closeModal}></div>
    <div class="window modal-window">
      <div class="window__titlebar">
        <div class="window__titlebar-dots">
          <span class="window__titlebar-dot window__titlebar-dot--close"></span>
          <span class="window__titlebar-dot"></span>
          <span class="window__titlebar-dot"></span>
        </div>
        <span>project_{String(modalProject.id + 1).padStart(2, '0')}_preview.sh</span>
        <button class="modal-close-btn" onclick={closeModal}>✕</button>
      </div>
      <div class="window__content">
        <div style="text-align:center;font-size:3rem;padding:var(--gap-lg);background:var(--bg-tertiary);margin-bottom:var(--gap-md);color:var(--accent-tertiary)">
          {modalProject.image ? '📁' : '📊'}
        </div>
        <h3 style="color:var(--accent-tertiary);margin-top:var(--gap-md)">{modalProject.title}</h3>
        <div style="display:flex;gap:var(--gap-xs);flex-wrap:wrap;margin:var(--gap-sm) 0">
          {#each modalProject.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        <p style="margin:var(--gap-md) 0;color:var(--text-muted);line-height:1.7">
          {currentLang === 'en' && modalProject.descEn ? modalProject.descEn : modalProject.desc}
        </p>
        <div style="display:flex;gap:var(--gap-sm);flex-wrap:wrap;margin-top:var(--gap-lg)">
          {#if modalProject.nvimScreenshots}
            <a href={modalProject.code} target="_blank" class="btn">{ghIcon} Linux Config</a>
            <a href={modalProject.live} target="_blank" class="btn btn--filled">{ghIcon} WSL/Windows</a>
          {:else if modalProject.isPrivate}
            <a href={modalProject.backUrl} target="_blank" class="btn">{ghIcon} {t('projects.code')} · Backend</a>
            <a href={modalProject.frontUrl} target="_blank" class="btn btn--filled">{ghIcon} {t('projects.code')} · Frontend</a>
            <span class="tag" style="align-self:center">🔒 {t('projects.private')}</span>
          {:else}
            <a href={modalProject.code} target="_blank" class="btn">{ghIcon} {t('projects.code')}</a>
            <a href={modalProject.live} target="_blank" class="btn btn--filled">{ghIcon} {t('projects.live')}</a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

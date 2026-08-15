<script lang="ts">
  import { lang } from '$lib/stores/lang.svelte';
  import { i18n, type Lang } from '$lib/i18n';
  import { showToast } from '$lib/stores/toast.svelte';

  let currentLang = $state<Lang>('es');
  lang.subscribe(v => currentLang = v);

  const t = (path: string) => {
    let v: any = i18n[currentLang];
    for (const k of path.split('.')) { if (v) v = v[k]; else return ''; }
    return v || '';
  };

  let cvModalOpen = $state(false);
  let formName = $state('');
  let formEmail = $state('');
  let formMsg = $state('');
  let honeypot = $state('');
  let sending = $state(false);

  function openCV() {
    cvModalOpen = true;
    document.dispatchEvent(new CustomEvent('detail-open'));
  }
  function closeCV() {
    cvModalOpen = false;
    document.dispatchEvent(new CustomEvent('detail-close'));
  }

  function handleCvKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeCV();
  }

  $effect(() => {
    if (cvModalOpen) {
      document.addEventListener('keydown', handleCvKeydown);
      return () => document.removeEventListener('keydown', handleCvKeydown);
    }
  });

  async function handleSubmit() {
    if (sending) return;
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) {
      showToast(t('contact.form.validation.required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      showToast(t('contact.form.validation.email'));
      return;
    }
    sending = true;
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMsg, honeypot })
      });
      if (res.ok) {
        showToast(t('contact.form.status.success'));
        formName = ''; formEmail = ''; formMsg = ''; honeypot = '';
      } else {
        showToast(t('contact.form.status.errorSend'));
      }
    } catch {
      showToast(t('contact.form.status.errorConnection'));
    } finally {
      sending = false;
    }
  }
</script>

<section class="section" id="contact">
  <div class="window" style="max-width:600px;margin:0 auto">
    <div class="window__titlebar">
      <div class="window__titlebar-dots">
        <span class="window__titlebar-dot window__titlebar-dot--close"></span>
        <span class="window__titlebar-dot"></span>
        <span class="window__titlebar-dot"></span>
      </div>
      <span>contact.sh</span>
    </div>
    <div class="window__content">
      <h2 class="section__title">// {t('sectionTitles.contact')}</h2>
      <div class="terminal-line">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $GITHUB</span>
      </div>
      <div class="terminal-line__output">
        <a href="https://github.com/dizzi1222" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> github.com/dizzi1222
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $LINKEDIN</span>
      </div>
      <div class="terminal-line__output">
        <a href="https://www.linkedin.com/in/diego-samuel-h%C3%A4rdi-santana-3a4343428" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> linkedin.com/in/dizzi
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $TWITTER</span>
      </div>
      <div class="terminal-line__output">
        <a href="https://x.com/dizzi_ds" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> x.com/dizzi_ds
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $INSTAGRAM</span>
      </div>
      <div class="terminal-line__output">
        <a href="https://www.instagram.com/diego.sam042/" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 0 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg> @diego.sam042
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $DEVTO</span>
      </div>
      <div class="terminal-line__output">
<a href="https://dev.to/dizzi1222" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/></svg> dev.to/dizzi1222
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $TELEGRAM</span>
      </div>
      <div class="terminal-line__output">
        <a href="https://t.me/dizzi1222?text=Hola%20Diego%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> Telegram
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $WHATSAPP</span>
      </div>
      <div class="terminal-line__output">
        <a href="https://wa.me/18298216385?text=Hola%20Diego%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20contactarte" target="_blank">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">echo $EMAIL</span>
      </div>
      <div class="terminal-line__output">
        <a href="mailto:diegosamuel042@gmail.com">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#888" style="vertical-align:middle;margin-right:4px"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> diegosamuel042@gmail.com
        </a>
      </div>

      <div class="terminal-line" style="margin-top:var(--gap-md)">
        <span class="terminal-line__prompt">$</span>
        <span class="terminal-line__cmd">wget cv.pdf</span>
      </div>
      <div class="terminal-line__output">
        <button class="btn" onclick={openCV}>{t('contact.cv.view')}</button>
        <span style="color:var(--text-dim);font-size:0.8rem;margin-left:var(--gap-sm)">|</span>
        <a href="/cv.pdf" target="_blank">{t('contact.cv.download')}</a>
      </div>

      <!-- Contact Form -->
      <div style="margin-top:var(--gap-lg);padding-top:var(--gap-md);border-top:1px solid var(--text-dim)">
        <div class="terminal-line" style="margin-bottom:var(--gap-md)">
          <span class="terminal-line__prompt">$</span>
          <span class="terminal-line__cmd">./send_message.sh --to diego</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--gap-md)">
          <div>
            <span class="terminal-line__prompt" style="font-size:0.8rem">name@host:~$</span>
            <input
              type="text"
              bind:value={formName}
              placeholder={t('contact.form.namePlaceholder')}
              class="contact-input"
              aria-label={t('contact.form.namePlaceholder')}
            />
          </div>
          <div>
            <span class="terminal-line__prompt" style="font-size:0.8rem">email@host:~$</span>
            <input
              type="email"
              bind:value={formEmail}
              placeholder={t('contact.form.emailPlaceholder')}
              class="contact-input"
              aria-label={t('contact.form.emailLabel')}
            />
          </div>
          <div>
            <span class="terminal-line__prompt" style="font-size:0.8rem">msg@host:~$</span>
            <textarea
              bind:value={formMsg}
              placeholder={t('contact.form.messagePlaceholder')}
              class="contact-input contact-textarea"
              aria-label={t('contact.form.messageLabel')}
              rows="3"
            ></textarea>
          </div>

          <!-- Honeypot -->
          <div style="position:absolute;left:-9999px" aria-hidden="true">
            <input type="text" bind:value={honeypot} tabindex="-1" autocomplete="off" />
          </div>

          <button class="btn btn--filled" onclick={handleSubmit} disabled={sending} style="align-self:flex-start">
            {sending ? t('contact.form.sending') : t('contact.form.submit')}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CV Modal -->
{#if cvModalOpen}
  <div class="modal-overlay active">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="modal-backdrop" onclick={closeCV} role="presentation"></div>
    <div class="window modal-window" style="max-width:700px">
      <div class="window__titlebar">
        <div class="window__titlebar-dots">
          <span class="window__titlebar-dot window__titlebar-dot--close"></span>
          <span class="window__titlebar-dot"></span>
          <span class="window__titlebar-dot"></span>
        </div>
        <span>cv_preview.sh</span>
        <button class="modal-close-btn" onclick={closeCV}>✕</button>
      </div>
      <div class="window__content">
        <div style="text-align:center;padding:var(--gap-sm);background:var(--bg-tertiary);margin-bottom:var(--gap-md);border-radius:4px;max-height:250px;overflow:hidden">
          <img src="/modal-placeholder-cv.png" alt="CV Preview" style="max-width:100%;max-height:230px;object-fit:contain;border-radius:4px" />
        </div>
        <p style="margin:var(--gap-md) 0;color:var(--text-muted);line-height:1.7">
          {t('contact.cv.modalText')}
        </p>
        <div style="display:flex;gap:var(--gap-sm);flex-wrap:wrap">
          <a href="/cv.pdf" target="_blank" class="btn btn--filled">
            {t('contact.cv.downloadButton')}
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .contact-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--text-dim);
    color: var(--accent-tertiary);
    font-family: inherit;
    font-size: 0.85rem;
    padding: 0.3rem 0;
    outline: none;
    transition: border-color 0.2s;
  }

  .contact-input:focus {
    border-bottom-color: var(--accent-primary);
  }

  .contact-input::placeholder {
    color: var(--text-dim);
    opacity: 0.6;
  }

  .contact-textarea {
    resize: vertical;
    min-height: 3rem;
    line-height: 1.5;
  }
</style>

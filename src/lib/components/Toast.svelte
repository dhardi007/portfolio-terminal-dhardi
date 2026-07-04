<script lang="ts">
  import { toastMessage } from '$lib/stores/toast.svelte';

  let msg = $state<string | null>(null);
  toastMessage.subscribe(v => msg = v);
</script>

{#if msg}
  <div class="toast-notif show">{msg}</div>
{/if}

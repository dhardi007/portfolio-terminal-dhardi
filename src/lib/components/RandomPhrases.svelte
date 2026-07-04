<script lang="ts">
  const phrases = [
    "Pasen el name de la cancion: boa - Duvet",
    "Rob controla mi mente",
    "Proyeccion astral en 3... 2... 1...",
    "Missandei: Dracarys",
    "Guts y Casca tenian razon",
    "Louise abrio la puerta correcta",
    "Esa cerveza no era la culpable",
    "boa - Duvet en loop infinito",
    "Este portfolio corre en Svelte 5 Runes",
    "Hecho con 💖 y paciencia",
    "?Presionaste ? ya viste todo?",
    "Ctrl+Shift+I para ver el console.log easter egg"
  ];

  let visible = $state(false);
  let currentPhrase = $state(phrases[0]);

  $effect(() => {
    const show = setTimeout(() => { visible = true; }, 5000);
    const interval = setInterval(() => {
      currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    }, 8000);
    return () => { clearTimeout(show); clearInterval(interval); };
  });
</script>

<div class="floating-phrase" class:show={visible}>
  {currentPhrase}
</div>

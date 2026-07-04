export interface Project {
  id: number;
  title: string;
  desc: string;
  descEn: string;
  tags: string[];
  code: string;
  live: string;
  image?: string;
  isPrivate?: boolean;
  backUrl?: string;
  frontUrl?: string;
  nvimScreenshots?: string[];
}

export const projectData: Project[] = [
  {
    id: 0, title: 'Dashboard React',
    desc: 'Panel de administración con gráficos, calculadora, contador y TO-DO list. Todo construido con React y react-router-dom.',
    descEn: 'Admin panel with charts, calculator, counter and TO-DO list. Built with React and react-router-dom.',
    tags: ['React', 'Node.js', 'MongoDB'],
    code: 'https://github.com/dizzi1222/REACT-Diego-Dizzi-Dashboard',
    live: 'https://dhardi007.github.io/REACT-Diego-Dizzi-Dashboard/',
    image: 'assets/modal-tech-Dashboard-REACT.png'
  },
  {
    id: 1, title: 'Portfolio (dev.to)',
    desc: 'Portfolio profesional con Tailwind CSS, i18n en ES/EN/DE, modales interactivos, scroll-spy y temas claro/oscuro.',
    descEn: 'Professional portfolio with Tailwind CSS, i18n in ES/EN/DE, interactive modals, scroll-spy and light/dark themes.',
    tags: ['HTML', 'Tailwind', 'JavaScript'],
    code: 'https://github.com/dizzi1222/dhardi.dev',
    live: 'https://dizzi1222.github.io/dhardi.dev/',
    image: 'assets/modal-tech-devto.png'
  },
  {
    id: 2, title: 'Dotfiles Config',
    desc: 'Configuración completa de Arch Linux con Hyprland, Neovim (LazyVim), Kitty, Zsh, Waybar, EWW widgets y Rofi.',
    descEn: 'Complete Arch Linux configuration with Hyprland, Neovim (LazyVim), Kitty, Zsh, Waybar, EWW widgets and Rofi.',
    tags: ['Lua', 'Shell', 'YAML', 'Python'],
    code: 'https://github.com/dizzi1222/dotfiles-dizzi',
    live: 'https://github.com/dizzi1222/dotfiles-dizzi',
    image: 'assets/modal-tech-dotfiles.png'
  },
  {
    id: 3, title: 'PTD-Talento',
    desc: 'Marketplace de talento para Cincinnatus Institute. MVP completo con autenticación, catálogo, watch list, panel admin.',
    descEn: 'Talent marketplace for Cincinnatus Institute. Full MVP with auth, catalog, recruiter watch list, admin panel.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Figma'],
    code: 'https://github.com/Cincinnatus-Institute-of-Craftsmanship/ptd-talento-back',
    live: 'https://github.com/Cincinnatus-Institute-of-Craftsmanship/ptd-talento-front',
    image: 'assets/modal-tech-ptd-talento.png',
    isPrivate: true,
    backUrl: 'https://github.com/Cincinnatus-Institute-of-Craftsmanship/ptd-talento-back',
    frontUrl: 'https://github.com/Cincinnatus-Institute-of-Craftsmanship/ptd-talento-front'
  },
  {
    id: 4, title: 'Nvim · WSL + Linux',
    desc: 'Configuración universal de Neovim con LazyVim para Windows (WSL) y Linux (Hyprland). Sincronización multiplataforma.',
    descEn: 'Universal Neovim config with LazyVim for Windows (WSL) and Linux (Hyprland). Cross-platform sync.',
    tags: ['Lua', 'LazyVim', 'Neovim'],
    code: 'https://github.com/dizzi1222/nvim',
    live: 'https://github.com/dizzi1222/nvim-wsl',
    image: 'assets/modal-tech-nvim.png',
    nvimScreenshots: [
      'https://github.com/user-attachments/assets/9144215e-6156-43c3-beba-4cca7f431337',
      'https://github.com/user-attachments/assets/8adb6f60-bb35-4704-b4ab-12bd587f3992'
    ]
  },
  {
    id: 5, title: 'PCE-Agencia',
    desc: 'App de finanzas y viajes — gestión de presupuestos, planificación de itinerarios y seguimiento de gastos.',
    descEn: 'Finance and travel app — budget management, itinerary planning and expense tracking.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    code: 'https://github.com/dhardi007/PCE-Agencia',
    live: 'https://github.com/dhardi007/PCE-Agencia',
    image: 'assets/modal-tech-pce-agencia-reskyt.png'
  },
  {
    id: 6, title: 'Proyección Astral',
    desc: 'Página melancólica y romántica dedicada a una persona especial. Tipografía cuidada, atmósfera onírica.',
    descEn: 'Melancholic and romantic page dedicated to a special person. Careful typography, dreamlike atmosphere.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    code: 'https://github.com/dizzi1222/proyeccion-astral-disculpa',
    live: 'https://dizzi1222.github.io/proyeccion-astral-disculpa/',
    image: 'assets/modal-proyeccion-astral.png'
  }
];

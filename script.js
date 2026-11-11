/* ═══════════════════════════════════════════════
   XAOXAY — Public Website Script
   Dynamic Cards, Navigation, Smooth Scroll & Admin Redirection
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Default Items (Catálogo Completo v4.6) ──
  const DEFAULT_ITEMS = [
    // ── 01. Programas ──
    {
      id: 'prog-xaosuite',
      section: 'programas',
      title: 'XaoSuite (Centro Integral de Mantenimiento)',
      desc: 'Centro integral de diagnóstico, optimización y reparación para Windows. Incluye 10 herramientas portables y auto-actualización.',
      version: 'v4.6',
      platform: 'Windows 10/11, Portable',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XaoSuite.exe',
      url: 'descargas/XaoSuite.exe?v=4.6.1'
    },
    {
      id: 'prog-xaoextras',
      section: 'programas',
      title: 'XaoExtras (Suite Complementaria)',
      desc: 'Suite complementaria para Windows que reúne enfoque de estudio, apagado programado, optimizador gaming y escudo de privacidad.',
      version: 'v1.2',
      platform: 'Windows 10/11, Portable',
      icon: 'tool',
      downloadType: 'local',
      fileName: 'XaoExtras.exe',
      url: 'descargas/XaoExtras.exe?v=4.6.1'
    },
    {
      id: 'prog-xaofocus',
      section: 'programas',
      title: '🎯 XaoFocus (Modo Enfoque y Estudio)',
      desc: 'Temporizador Pomodoro con modo normal y estricto. Bloquea distracciones para maximizar tu estudio y concentración.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'window',
      downloadType: 'local',
      fileName: 'XaoFocus.exe',
      url: 'descargas/XaoFocus.exe?v=4.6.1'
    },
    {
      id: 'prog-xaosleep',
      section: 'programas',
      title: '🌙 XaoSleep (Apagado Inteligente y Red)',
      desc: 'Temporizador de apagado, reinicio o suspensión inteligente con monitor de descargas de red en tiempo real.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'window',
      downloadType: 'local',
      fileName: 'XaoSleep.exe',
      url: 'descargas/XaoSleep.exe?v=4.6.1'
    },
    {
      id: 'prog-xaogame',
      section: 'programas',
      title: '🎮 XaoGame (Optimizador Gaming y FPS)',
      desc: 'Optimizador gaming de alto rendimiento. Suspende tareas secundarias y libera memoria RAM para aumentar FPS.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'bolt',
      downloadType: 'local',
      fileName: 'XaoGame.exe',
      url: 'descargas/XaoGame.exe?v=4.6.1'
    },
    {
      id: 'prog-xaoguard',
      section: 'programas',
      title: '🛡️ XaoGuard (Escudo de Privacidad)',
      desc: 'Escudo de privacidad para Windows. Bloquea telemetría, rastreadores y servicios innecesarios con un solo clic.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XaoGuard.exe',
      url: 'descargas/XaoGuard.exe?v=4.6.1'
    },

    // ── 02. Herramientas ──
    {
      id: 'tool-xaoclean',
      section: 'herramientas',
      title: '🧹 XaoClean (Limpiador de Sistema)',
      desc: 'Limpiador profundo de temporales, registros obsoletos y cachés del sistema para liberar espacio en disco.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'tool',
      downloadType: 'local',
      fileName: 'XaoClean.exe',
      url: 'descargas/XaoClean.exe?v=4.6.1'
    },
    {
      id: 'tool-xaodoctor',
      section: 'herramientas',
      title: '🩺 XaoDoctor (Diagnóstico Integral)',
      desc: 'Diagnóstico completo del estado del hardware, memoria RAM, almacenamiento y salud general del sistema.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XaoDoctor.exe',
      url: 'descargas/XaoDoctor.exe?v=4.6.1'
    },
    {
      id: 'tool-xaofix',
      section: 'herramientas',
      title: '🔧 XaoFix (Reparador del Sistema)',
      desc: 'Reparador avanzado de Windows. Soluciona fallos críticos en Windows Update, SFC/DISM y registro.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'tool',
      downloadType: 'local',
      fileName: 'XaoFix.exe',
      url: 'descargas/XaoFix.exe?v=4.6.1'
    },
    {
      id: 'tool-xaonet',
      section: 'herramientas',
      title: '🌐 XaoNet (Optimizador de Red y DNS)',
      desc: 'Optimizador de conexiones de red. Limpia caché DNS, repara Winsock y mejora la estabilidad de tu conexión.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'bolt',
      downloadType: 'local',
      fileName: 'XaoNet.exe',
      url: 'descargas/XaoNet.exe?v=4.6.1'
    },
    {
      id: 'tool-xaooptic',
      section: 'herramientas',
      title: '⚡ XaoOptic (Rendimiento Visual)',
      desc: 'Ajustes de efectos visuales y rendimiento gráfico para maximizar la fluidez y velocidad de Windows.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'window',
      downloadType: 'local',
      fileName: 'XaoOptic.exe',
      url: 'descargas/XaoOptic.exe?v=4.6.1'
    },
    {
      id: 'tool-xaovault',
      section: 'herramientas',
      title: '🔐 XaoVault (Cifrado y Destructor Seguro)',
      desc: 'Cifrado seguro de datos confidenciales y destructor digital permanente de archivos sensibles (DoD).',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XaoVault.exe',
      url: 'descargas/XaoVault.exe?v=4.6.1'
    },
    {
      id: 'tool-xaohub',
      section: 'herramientas',
      title: '🎛️ XaoHub (Herramientas Administrativas)',
      desc: 'Panel de acceso rápido a herramientas administrativas ocultas de Windows y creador de puntos de restauración.',
      version: 'v1.0',
      platform: 'Windows 10/11, Portable',
      icon: 'tool',
      downloadType: 'local',
      fileName: 'XaoHub.exe',
      url: 'descargas/XaoHub.exe?v=4.6.1'
    },
    {
      id: 'tool-xaotoolbox',
      section: 'herramientas',
      title: '🚀 XaoToolbox (Suite Visual Todo en Uno)',
      desc: 'Suite gráfica en PowerShell inspirada en WinUtil: instalación de software, optimizaciones y modo gaming.',
      version: 'v1.2',
      platform: 'Windows 10/11, Portable',
      icon: 'terminal',
      downloadType: 'local',
      fileName: 'XaoToolbox.zip',
      url: 'descargas/XaoToolbox.zip?v=4.6.1'
    },
    {
      id: 'tool-xaoinstaller',
      section: 'herramientas',
      title: '📦 XaoInstaller (El Instalador Seguro)',
      desc: 'Instalador desatendido de software seguro: descarga e instala programas esenciales desde fuentes oficiales.',
      version: 'v1.2',
      platform: 'Windows 10/11, Portable',
      icon: 'terminal',
      downloadType: 'local',
      fileName: 'XaoInstaller.zip',
      url: 'descargas/XaoInstaller.zip?v=4.6.1'
    },
    {
      id: 'tool-xaoproblems',
      section: 'herramientas',
      title: '🛠️ XaoProblems (El Médico de tu PC)',
      desc: 'Reparador automatizado de emergencias en Windows: resuelve pantallas azules, cuelgues y fallos de red.',
      version: 'v1.2',
      platform: 'Windows 10/11, Portable',
      icon: 'terminal',
      downloadType: 'local',
      fileName: 'XaoProblems.zip',
      url: 'descargas/XaoProblems.zip?v=4.6.1'
    }
  ];

  const ICONS = {
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    window: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    tool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  };

  // ── State Management ──
  const STORAGE_KEY = 'xaoxay_items_v4';

  function getStoredItems() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 16) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    // Si no existe o tiene versión antigua, inicializar con el catálogo completo
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    } catch (e) {}
    return DEFAULT_ITEMS;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeUrl(url) {
    if (!url) return '#';
    const trimmed = String(url).trim();
    // Bloquear intentos de path traversal y diagonales invertidas
    if (trimmed.includes('..') || trimmed.includes('\\')) return '#';

    if (trimmed.startsWith('descargas/')) {
      const fileName = trimmed.slice('descargas/'.length);
      if (/^[a-zA-Z0-9_\-. ]+\.(exe|zip|msi|rar|7z)$/i.test(fileName)) {
        return escapeHtml(trimmed);
      }
      return '#';
    }

    if (trimmed.startsWith('https://') || trimmed.startsWith('#')) {
      return escapeHtml(trimmed);
    }
    return '#';
  }

  // ── Render Cards ──
  const programasGrid = document.getElementById('programasGrid');
  const herramientasGrid = document.getElementById('herramientasGrid');

  function renderCard(item) {
    const iconSvg = ICONS[item.icon] || ICONS.window;
    const metaTags = [];
    if (item.platform) {
      item.platform.split(',').forEach(tag => {
        const clean = tag.trim();
        if (clean) metaTags.push(`<span class="tag">${escapeHtml(clean)}</span>`);
      });
    }
    if (item.version) {
      metaTags.push(`<span class="tag">${escapeHtml(item.version)}</span>`);
    }

    const isLocal = item.downloadType === 'local';
    const downloadAttr = isLocal ? `download="${escapeHtml(item.fileName || '')}"` : `target="_blank" rel="noopener noreferrer"`;
    const btnText = 'Descargar';
    const href = sanitizeUrl(item.url);

    let actionButtons = `<a href="${href}" ${downloadAttr} class="btn btn--small btn--primary">${btnText}</a>`;
    if (isLocal && item.fileName && item.fileName.toLowerCase().endsWith('.exe')) {
      const zipName = item.fileName.replace(/\.exe$/i, '.zip');
      actionButtons = `
        <div class="card__actions-group">
          <a href="${href}" ${downloadAttr} class="btn btn--small btn--primary">Descargar .exe</a>
          <a href="descargas/${escapeHtml(zipName)}?v=4.6.1" download="${escapeHtml(zipName)}" class="btn btn--small btn--ghost">.zip</a>
        </div>
      `;
    }

    return `
      <article class="card" data-id="${escapeHtml(item.id)}">
        <div class="card__icon">${iconSvg}</div>
        <h3 class="card__title">${escapeHtml(item.title)}</h3>
        <p class="card__desc">${escapeHtml(item.desc)}</p>
        <div class="card__meta">${metaTags.join(' ')}</div>
        ${actionButtons}
      </article>
    `;
  }

  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

  let revealObserver;
  function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();
    const cards = document.querySelectorAll('.card');

    if (isTouchDevice) {
      // En celular revelar inmediatamente todas las tarjetas sin animación pesada para 120 FPS táctil
      cards.forEach((el) => el.classList.add('revealed'));
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    cards.forEach((el) => revealObserver.observe(el));
  }

  function renderAll() {
    // La página pública siempre muestra las tarjetas oficiales pre-renderizadas en index.html.
    // Limpiamos cualquier copia residual de localStorage para que TODOS los navegadores
    // (Chrome, Brave, Edge, celulares) muestren idéntico contenido sin desincronización.
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}

    setupRevealObserver();
  }


  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (navToggle && navList) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navList.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navList.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        navList.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking outside of mobile nav
    document.addEventListener('click', (e) => {
      if (navList.classList.contains('open') && !navList.contains(e.target) && !navToggle.contains(e.target)) {
        navList.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Unified High-Performance Scroll Engine (60/120 FPS Mobile Optimized) ──
  const scrollBar = document.getElementById('scrollBar');
  const heroContent = document.querySelector('.hero__content');
  const backToTop = document.getElementById('backToTop');
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  let isTicking = false;
  let isHeaderScrolled = false;
  let isBackToTopVisible = false;

  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        // Clamp to 0 to prevent negative scroll on iOS rubber-band overscroll
        const scrollY = Math.max(0, window.scrollY || window.pageYOffset);

        // 1. Tactical Laser Scroll Tracker (scaleX 0 -> 1)
        if (scrollBar) {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
            scrollBar.style.transform = `scaleX(${progress})`;
          }
        }

        // 2. Parallax solo en computadoras con mouse (desactivado en celulares para no trabar scroll táctil)
        if (!isTouchDevice && heroContent) {
          if (scrollY <= window.innerHeight) {
            const heroHeight = window.innerHeight * 0.75;
            heroContent.style.transform = `translateY(${scrollY * 0.28}px)`;
            heroContent.style.opacity = String(Math.max(1 - (scrollY / heroHeight), 0));
          } else if (heroContent.style.opacity !== '0') {
            heroContent.style.opacity = '0';
          }
        }

        // 3. Header Class Toggle (Cero reflows innecesarios: solo mutar DOM cuando cambia el estado)
        const shouldScroll = scrollY > 50;
        if (shouldScroll !== isHeaderScrolled) {
          isHeaderScrolled = shouldScroll;
          if (header) header.classList.toggle('scrolled', isHeaderScrolled);
        }

        // 4. Back to Top Tactical Button (solo mutar cuando cambia)
        const shouldShowTop = scrollY > 350;
        if (shouldShowTop !== isBackToTopVisible) {
          isBackToTopVisible = shouldShowTop;
          if (backToTop) backToTop.classList.toggle('visible', isBackToTopVisible);
        }

        isTicking = false;
      });
      isTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Active Nav Link Observer (Zero-Reflow IntersectionObserver) ──
  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach((section) => navObserver.observe(section));
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ── Initial Render ──
  renderAll();
})();

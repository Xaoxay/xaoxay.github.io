/* ═══════════════════════════════════════════════
   XAOXAY — Public Website Script
   Dynamic Cards, Navigation, Smooth Scroll & Admin Redirection
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Default Items ──
  // ── Default Items (Programas y Herramientas subidos) ──
  const DEFAULT_ITEMS = [
    // ── 01. Programas ──
    {
      id: 'prog-xaosuite',
      section: 'programas',
      title: 'XaoSuite',
      desc: 'Centro integral de diagnóstico, optimización y reparación para Windows. 10 herramientas portables y auto-actualización.',
      version: 'v4.5',
      platform: 'Windows, Portable',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XaoSuite.exe',
      url: 'descargas/XaoSuite.exe'
    },
    {
      id: 'prog-xaofocus',
      section: 'programas',
      title: 'XaoFocus',
      desc: 'Modo de máxima concentración. Bloquea distracciones, silencia avisos y activa filtro de confort visual para jornadas de trabajo intensas.',
      version: 'v1.0',
      platform: 'Windows, Portable',
      icon: 'bolt',
      downloadType: 'local',
      fileName: 'XaoFocus.exe',
      url: 'descargas/XaoFocus.exe'
    },
    {
      id: 'prog-xaosleep',
      section: 'programas',
      title: 'XaoSleep',
      desc: 'Temporizador inteligente de apagado y suspensión programada para Windows. Ligero, preciso y sin configuraciones complejas.',
      version: 'v1.0',
      platform: 'Windows, Portable',
      icon: 'window',
      downloadType: 'local',
      fileName: 'XaoSleep.exe',
      url: 'descargas/XaoSleep.exe'
    },
    {
      id: 'prog-xaoinstaller',
      section: 'programas',
      title: 'XaoInstaller',
      desc: 'Instalador y actualizador silencioso de software esencial para Windows en 1 solo clic mediante paquetes limpios y oficiales.',
      version: 'v1.0',
      platform: 'Windows, Portable',
      icon: 'file',
      downloadType: 'local',
      fileName: 'XaoInstaller.zip',
      url: 'descargas/XaoInstaller.zip'
    },
    // ── 02. Herramientas ──
    {
      id: 'tool-xaoextras',
      section: 'herramientas',
      title: 'XaoExtras',
      desc: 'Colección de utilidades y herramientas complementarias para Windows. Rápido, ligero y portable.',
      version: 'v1.0',
      platform: 'Windows, Portable',
      icon: 'tool',
      downloadType: 'local',
      fileName: 'XaoExtras.exe',
      url: 'descargas/XaoExtras.exe'
    },
    {
      id: 'tool-xaotoolbox',
      section: 'herramientas',
      title: 'XaoToolbox',
      desc: 'Suite gráfica integral de mantenimiento para Windows 10 y 11: optimizaciones de rendimiento, modo gaming y diagnóstico del equipo.',
      version: 'v1.0',
      platform: 'Windows, Portable',
      icon: 'terminal',
      downloadType: 'local',
      fileName: 'XaoToolbox.zip',
      url: 'descargas/XaoToolbox.zip'
    },
    {
      id: 'tool-xaoproblems',
      section: 'herramientas',
      title: 'XaoProblems',
      desc: 'Reparador automatizado para Windows. Soluciona pantallas azules, Windows Update trabado, archivos dañados DISM/SFC y fallos de red.',
      version: 'v1.0',
      platform: 'Windows, Portable',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XaoProblems.zip',
      url: 'descargas/XaoProblems.zip'
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
  const STORAGE_KEY = 'xaoxay_items';

  function getItems() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (parsed.length < DEFAULT_ITEMS.length || parsed.some(item => item.title === 'XaoManager' || item.id === 'prog-1')) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
            return DEFAULT_ITEMS;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
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
    // Block path traversal attempts and backslashes
    if (trimmed.includes('..') || trimmed.includes('\\')) return '#';

    if (trimmed.startsWith('descargas/')) {
      const fileName = trimmed.slice('descargas/'.length);
      if (/^[a-zA-Z0-9_\-.]+\.(exe|zip)$/i.test(fileName)) {
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
          <a href="descargas/${escapeHtml(zipName)}" download="${escapeHtml(zipName)}" class="btn btn--small btn--ghost">.zip</a>
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

  let revealObserver;
  function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();
    const cards = document.querySelectorAll('.card');

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    cards.forEach((el) => revealObserver.observe(el));
  }

  function renderAll() {
    const items = getItems();
    const progs = items.filter(i => i.section === 'programas');
    const tools = items.filter(i => i.section === 'herramientas');

    if (programasGrid) {
      if (progs.length === 0) {
        programasGrid.innerHTML = `<p style="grid-column:1/-1; color:var(--clr-text-muted); text-align:center; padding:2rem;">No hay programas disponibles en este momento.</p>`;
      } else {
        programasGrid.innerHTML = progs.map(renderCard).join('');
      }
    }

    if (herramientasGrid) {
      if (tools.length === 0) {
        herramientasGrid.innerHTML = `<p style="grid-column:1/-1; color:var(--clr-text-muted); text-align:center; padding:2rem;">No hay herramientas disponibles en este momento.</p>`;
      } else {
        herramientasGrid.innerHTML = tools.map(renderCard).join('');
      }
    }

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

  // ── Unified Tactical Scroll Engine ──
  const scrollBar = document.getElementById('scrollBar');
  const heroContent = document.querySelector('.hero__content');
  const backToTop = document.getElementById('backToTop');
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  let isTicking = false;

  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        // Clamp to 0 to prevent negative scroll on iOS rubber-band overscroll
        const scrollY = Math.max(0, window.scrollY || window.pageYOffset);
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 1. Tactical Laser Scroll Tracker (scaleX 0 -> 1)
        if (scrollBar && docHeight > 0) {
          const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
          scrollBar.style.transform = `scaleX(${progress})`;
        }

        // 2. Hero 3D Parallax Descent (only computed when visible in viewport)
        if (heroContent) {
          if (scrollY <= window.innerHeight) {
            const heroHeight = window.innerHeight * 0.75;
            heroContent.style.transform = `translateY(${scrollY * 0.28}px)`;
            heroContent.style.opacity = String(Math.max(1 - (scrollY / heroHeight), 0));
          } else if (heroContent.style.opacity !== '0') {
            heroContent.style.opacity = '0';
          }
        }

        // 3. Header Class Toggle (Zero-reflow style transition)
        if (header) {
          header.classList.toggle('scrolled', scrollY > 50);
        }

        // 4. Back to Top Tactical Button
        if (backToTop) {
          backToTop.classList.toggle('visible', scrollY > 350);
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

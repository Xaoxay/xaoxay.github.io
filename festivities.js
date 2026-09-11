/* ═══════════════════════════════════════════════
   XAOXAY — Festive Engine Script
   Interactive Holiday Decorator & Particle Engine
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  const STORAGE_KEY = 'xaoxay_festivity_settings';
  const OVERRIDE_KEY = 'xaoxay_visitor_festive_override';
  const BANNER_DISMISSED_KEY = 'xaoxay_festive_banner_dismissed';

  const DEFAULT_SETTINGS = {
    mode: 'auto',         // 'auto' | 'christmas' | 'halloween' | 'newyear' | 'valentine' | 'none'
    particles: true,      // Snow, bats, confetti, hearts
    lights: true,         // Garland under header
    hat: true,            // Santa hat / Jack-o-lantern on logo
    banner: true,         // Top greeting notice
    visitorWidget: true   // Floating widget for visitors
  };

  const HOLIDAY_DATA = {
    christmas: {
      id: 'christmas',
      name: 'Navidad',
      icon: '🎄',
      greeting: '¡Felices Fiestas y Próspero Año de parte de XAOXAY!',
      particleType: 'snow',
      bulbs: ['red', 'green', 'gold', 'blue']
    },
    halloween: {
      id: 'halloween',
      name: 'Halloween',
      icon: '🎃',
      greeting: '¡Feliz Noche de Brujas! Código oscuro y sin bugs.',
      particleType: 'bats',
      bulbs: ['orange', 'purple', 'orange', 'purple']
    },
    newyear: {
      id: 'newyear',
      name: 'Año Nuevo',
      icon: '🎆',
      greeting: '¡Feliz y Próspero Año Nuevo! Que el código compile a la primera.',
      particleType: 'confetti',
      bulbs: ['gold', 'blue', 'gold', 'blue']
    },
    valentine: {
      id: 'valentine',
      name: 'San Valentín',
      icon: '💘',
      greeting: '¡Feliz San Valentín! Pasión por el desarrollo y el software.',
      particleType: 'hearts',
      bulbs: ['red', 'gold', 'red', 'gold']
    },
    none: {
      id: 'none',
      name: 'Estándar',
      icon: '✖',
      greeting: '',
      particleType: 'none',
      bulbs: []
    }
  };

  // ── Santa Hat & Pumpkin SVGs ──
  const SANTA_HAT_SVG = `
    <svg viewBox="0 0 100 85" class="santa-hat-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M78 60 C65 20, 30 10, 15 35 C10 42, 5 45, 2 50 C25 45, 60 55, 82 62 Z" fill="#d90429"/>
      <path d="M78 60 C65 20, 30 10, 15 35 C20 40, 45 30, 78 60 Z" fill="#ef233c"/>
      <!-- Trim -->
      <path d="M-2 58 C15 52, 60 52, 88 64 C90 72, 80 75, 75 75 C50 70, 20 70, -2 72 C-6 66, -4 60, -2 58 Z" fill="#ffffff" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"/>
      <!-- Pompom -->
      <circle cx="10" cy="38" r="10" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))"/>
      <circle cx="8" cy="36" r="8" fill="#f8f9fa"/>
    </svg>
  `;

  const PUMPKIN_SVG = `
    <svg viewBox="0 0 100 90" class="pumpkin-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Stem -->
      <path d="M48 8 C48 2, 56 2, 55 18 C52 18, 48 14, 48 8 Z" fill="#2d6a4f"/>
      <!-- Pumpkin Body -->
      <ellipse cx="50" cy="52" rx="42" ry="32" fill="#ff6a00"/>
      <ellipse cx="32" cy="52" rx="26" ry="30" fill="#f77f00"/>
      <ellipse cx="68" cy="52" rx="26" ry="30" fill="#f77f00"/>
      <ellipse cx="50" cy="52" rx="20" ry="32" fill="#fcbf49"/>
      <!-- Eyes & Mouth (Glowing Jack) -->
      <polygon points="34,44 42,50 30,52" fill="#120204"/>
      <polygon points="66,44 70,52 58,50" fill="#120204"/>
      <polygon points="47,54 53,54 50,60" fill="#120204"/>
      <path d="M30 66 Q50 78 70 66 Q64 74 50 74 Q36 74 30 66 Z" fill="#120204"/>
    </svg>
  `;

  // ── Settings Management ──
  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn('Festivities: error loading settings', e);
    }
    return { ...DEFAULT_SETTINGS };
  }

  function saveSettings(newSettings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Festivities: error saving settings', e);
    }
    applyCurrentState();
  }

  // ── Calendar Date Detection ──
  function detectCalendarHoliday() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    // Año Nuevo: 29 Dic a 3 Ene
    if ((month === 12 && day >= 29) || (month === 1 && day <= 3)) {
      return 'newyear';
    }
    // Navidad: 1 Dic a 6 Ene (excluyendo Año Nuevo)
    if (month === 12 || (month === 1 && day <= 6)) {
      return 'christmas';
    }
    // Halloween: 15 Oct a 2 Nov
    if ((month === 10 && day >= 15) || (month === 11 && day <= 2)) {
      return 'halloween';
    }
    // San Valentín: 1 Feb a 16 Feb
    if (month === 2 && day >= 1 && day <= 16) {
      return 'valentine';
    }

    return 'none';
  }

  function getActiveHolidayId() {
    // Check visitor override first
    const visitorOverride = sessionStorage.getItem(OVERRIDE_KEY);
    if (visitorOverride && HOLIDAY_DATA[visitorOverride]) {
      return visitorOverride;
    }

    const settings = loadSettings();
    if (settings.mode === 'auto') {
      return detectCalendarHoliday();
    }
    return settings.mode || 'none';
  }

  // ── Canvas Particle System ──
  let canvas = null;
  let ctx = null;
  let particles = [];
  let animFrameId = null;
  let isRunning = false;
  let canvasParticleType = 'none';

  function initCanvas() {
    if (!canvas) {
      canvas = document.getElementById('festiveCanvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'festiveCanvas';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);
      }
      ctx = canvas.getContext('2d');
      window.addEventListener('resize', resizeCanvas, { passive: true });
    }
    resizeCanvas();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // 1. Snow Particles
  function createSnowFlakes(count) {
    const flakes = [];
    for (let i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.6,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        swayWidth: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.3
      });
    }
    return flakes;
  }

  // 2. Bat Particles (Halloween)
  function createBats(count) {
    const bats = [];
    for (let i = 0; i < count; i++) {
      bats.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 10,
        vx: (Math.random() * 1.2 + 0.8) * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.random() * 0.8 - 0.4,
        wingPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.4
      });
    }
    return bats;
  }

  // 3. Confetti Particles (New Year)
  function createConfetti(count) {
    const pieces = [];
    const colors = ['#ffd700', '#00f2fe', '#ff007f', '#ffffff', '#22c55e', '#a855f7'];
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 2 + 1,
        vx: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 6 - 3,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.08 + 0.02
      });
    }
    return pieces;
  }

  // 4. Hearts Particles (Valentine)
  function createHearts(count) {
    const hearts = [];
    for (let i = 0; i < count; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 10 + 8,
        vy: -(Math.random() * 1.2 + 0.6),
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.01,
        opacity: Math.random() * 0.5 + 0.35,
        color: Math.random() > 0.4 ? '#ff3366' : '#ff758c'
      });
    }
    return hearts;
  }

  function startParticles(type) {
    initCanvas();
    canvasParticleType = type;
    const isMobile = window.innerWidth < 768;

    if (type === 'snow') {
      particles = createSnowFlakes(isMobile ? 35 : 70);
    } else if (type === 'bats') {
      particles = createBats(isMobile ? 12 : 24);
    } else if (type === 'confetti') {
      particles = createConfetti(isMobile ? 30 : 60);
    } else if (type === 'hearts') {
      particles = createHearts(isMobile ? 16 : 32);
    } else {
      stopParticles();
      return;
    }

    if (!isRunning) {
      isRunning = true;
      animateParticles();
    }
  }

  function stopParticles() {
    isRunning = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    particles = [];
    canvasParticleType = 'none';
  }

  function drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, -d / 4);
    ctx.bezierCurveTo(-d / 2, -d, -d, -d / 3, 0, d / 2);
    ctx.bezierCurveTo(d, -d / 3, d / 2, -d, 0, -d / 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawBat(ctx, x, y, size, vx, wingPhase, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(vx > 0 ? 1 : -1, 1);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#1c1124';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1;

    const wing = Math.sin(wingPhase) * (size * 0.4);
    ctx.beginPath();
    // Body
    ctx.ellipse(0, 0, size * 0.3, size * 0.5, 0, 0, Math.PI * 2);
    // Left Wing
    ctx.moveTo(0, -size * 0.2);
    ctx.quadraticCurveTo(-size * 0.8, -size * 0.6 + wing, -size * 1.3, wing);
    ctx.quadraticCurveTo(-size * 0.6, size * 0.3 + wing, 0, size * 0.3);
    // Right Wing
    ctx.moveTo(0, -size * 0.2);
    ctx.quadraticCurveTo(size * 0.8, -size * 0.6 + wing, size * 1.3, wing);
    ctx.quadraticCurveTo(size * 0.6, size * 0.3 + wing, 0, size * 0.3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function animateParticles() {
    if (!isRunning || !ctx || !canvas) return;

    // Check reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stopParticles();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    if (canvasParticleType === 'snow') {
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayWidth;
        p.y += p.speed;

        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x > w + 10) p.x = -10;
        if (p.x < -10) p.x = w + 10;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (canvasParticleType === 'bats') {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.wingPhase += 0.22;

        if (p.vx > 0 && p.x > w + 40) p.x = -40;
        if (p.vx < 0 && p.x < -40) p.x = w + 40;
        if (p.y > h + 40) p.y = -40;
        if (p.y < -40) p.y = h + 40;

        drawBat(ctx, p.x, p.y, p.size, p.vx, p.wingPhase, p.opacity);
      }
    } else if (canvasParticleType === 'confetti') {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(1, Math.cos(p.tilt));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    } else if (canvasParticleType === 'hearts') {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * 0.8;

        if (p.y < -30) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }

        drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
      }
    }

    animFrameId = requestAnimationFrame(animateParticles);
  }

  // Auto-pause loop when page is hidden to save battery & CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    } else if (isRunning && !animFrameId) {
      animFrameId = requestAnimationFrame(animateParticles);
    }
  });

  // ── DOM Enhancements Injection ──

  // 1. Header Lights Garland
  function updateHeaderLights(holiday) {
    const existing = document.querySelector('.festive-lights-garland');
    if (existing) existing.remove();

    const settings = loadSettings();
    if (!settings.lights || holiday.id === 'none') return;

    const header = document.querySelector('.header') || document.getElementById('header');
    if (!header) return;

    const garland = document.createElement('div');
    garland.className = 'festive-lights-garland';
    garland.setAttribute('aria-hidden', 'true');

    const wire = document.createElement('div');
    wire.className = 'festive-wire';
    garland.appendChild(wire);

    const bulbCount = Math.max(12, Math.floor(window.innerWidth / 55));
    const colors = holiday.bulbs;

    for (let i = 0; i < bulbCount; i++) {
      const bulb = document.createElement('div');
      const color = colors[i % colors.length];
      bulb.className = `festive-bulb festive-bulb--${color}`;
      garland.appendChild(bulb);
    }

    header.appendChild(garland);
  }

  // 2. Santa Hat / Jack-o-lantern on Logo & Hero
  function updateLogoEmblem(holiday) {
    document.querySelectorAll('.festive-logo-hat, .festive-hero-hat, .festive-logo-pumpkin, .festive-hero-pumpkin').forEach(el => el.remove());

    const settings = loadSettings();
    if (!settings.hat || holiday.id === 'none') return;

    const logoX = document.querySelector('.logo .logo__x');
    const heroWrap = document.querySelector('.hero__logo-wrap');

    if (holiday.id === 'christmas') {
      if (logoX) {
        const hat = document.createElement('div');
        hat.className = 'festive-logo-hat';
        hat.setAttribute('aria-hidden', 'true');
        hat.innerHTML = SANTA_HAT_SVG;
        logoX.parentElement.appendChild(hat);
      }
      if (heroWrap) {
        const heroHat = document.createElement('div');
        heroHat.className = 'festive-hero-hat';
        heroHat.setAttribute('aria-hidden', 'true');
        heroHat.innerHTML = SANTA_HAT_SVG;
        heroWrap.appendChild(heroHat);
      }
    } else if (holiday.id === 'halloween') {
      if (logoX) {
        const p = document.createElement('div');
        p.className = 'festive-logo-pumpkin';
        p.setAttribute('aria-hidden', 'true');
        p.innerHTML = PUMPKIN_SVG;
        logoX.parentElement.appendChild(p);
      }
      if (heroWrap) {
        const heroP = document.createElement('div');
        heroP.className = 'festive-hero-pumpkin';
        heroP.setAttribute('aria-hidden', 'true');
        heroP.innerHTML = PUMPKIN_SVG;
        heroWrap.appendChild(heroP);
      }
    }
  }

  // 3. Top Greeting Banner
  function updateGreetingBanner(holiday) {
    const existing = document.querySelector('.festive-banner');
    if (existing) existing.remove();

    const settings = loadSettings();
    if (!settings.banner || holiday.id === 'none' || !holiday.greeting) return;

    // Check if dismissed in this session
    if (sessionStorage.getItem(BANNER_DISMISSED_KEY) === holiday.id) return;

    const banner = document.createElement('div');
    banner.className = 'festive-banner';
    banner.innerHTML = `
      <span class="festive-banner__icon">${holiday.icon}</span>
      <span class="festive-banner__text">${holiday.greeting}</span>
      <button class="festive-banner__close" aria-label="Cerrar aviso festivo">&times;</button>
    `;

    document.body.appendChild(banner);

    // Fade in
    requestAnimationFrame(() => banner.classList.add('visible'));

    banner.querySelector('.festive-banner__close').addEventListener('click', () => {
      banner.classList.remove('visible');
      sessionStorage.setItem(BANNER_DISMISSED_KEY, holiday.id);
      setTimeout(() => banner.remove(), 400);
    });
  }

  // 4. Visitor Interactive Floating Widget
  function updateVisitorWidget(holiday) {
    let widget = document.getElementById('festiveVisitorWidget');
    const settings = loadSettings();

    // In admin panel, we don't need the floating visitor widget
    if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('login.html')) {
      if (widget) widget.remove();
      return;
    }

    if (!settings.visitorWidget) {
      if (widget) widget.remove();
      return;
    }

    if (!widget) {
      widget = document.createElement('div');
      widget.id = 'festiveVisitorWidget';
      widget.className = 'festive-widget';
      widget.innerHTML = `
        <button class="festive-widget__toggle" id="festiveWidgetToggle" aria-label="Cambiar tema festivo" title="Decoración Festiva">
          <span id="festiveWidgetIcon">🎄</span>
          <span class="festive-widget__badge-dot"></span>
        </button>
        <div class="festive-widget__popover" id="festiveWidgetPopover">
          <div class="festive-widget__header">
            <span class="festive-widget__title">✨ Festividades</span>
            <small style="color:#777; font-size:0.75rem;">Decorá tu vista</small>
          </div>
          <div class="festive-widget__list">
            <button class="festive-widget__btn" data-holiday="auto">
              <span class="festive-widget__btn-icon">🤖</span> Automático (Fecha)
            </button>
            <button class="festive-widget__btn" data-holiday="christmas">
              <span class="festive-widget__btn-icon">🎄</span> Navidad
            </button>
            <button class="festive-widget__btn" data-holiday="halloween">
              <span class="festive-widget__btn-icon">🎃</span> Halloween
            </button>
            <button class="festive-widget__btn" data-holiday="newyear">
              <span class="festive-widget__btn-icon">🎆</span> Año Nuevo
            </button>
            <button class="festive-widget__btn" data-holiday="valentine">
              <span class="festive-widget__btn-icon">💘</span> San Valentín
            </button>
            <button class="festive-widget__btn" data-holiday="none">
              <span class="festive-widget__btn-icon">🚫</span> Sin Decoración
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(widget);

      const toggle = widget.querySelector('#festiveWidgetToggle');
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
          widget.classList.remove('open');
        }
      });

      widget.querySelectorAll('.festive-widget__btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = btn.dataset.holiday;
          if (chosen === 'auto') {
            sessionStorage.removeItem(OVERRIDE_KEY);
          } else {
            sessionStorage.setItem(OVERRIDE_KEY, chosen);
          }
          widget.classList.remove('open');
          applyCurrentState();
        });
      });
    }

    // Update active button & icon
    const activeId = getActiveHolidayId();
    const currentOverride = sessionStorage.getItem(OVERRIDE_KEY);
    const widgetIcon = widget.querySelector('#festiveWidgetIcon');
    if (widgetIcon) {
      widgetIcon.textContent = holiday.id !== 'none' ? holiday.icon : '✨';
    }

    widget.querySelectorAll('.festive-widget__btn').forEach(btn => {
      const match = currentOverride ? btn.dataset.holiday === currentOverride : (btn.dataset.holiday === (settings.mode === 'auto' ? 'auto' : activeId));
      btn.classList.toggle('active', match);
    });
  }

  // ── Main State Applier ──
  function applyCurrentState() {
    const holidayId = getActiveHolidayId();
    const holiday = HOLIDAY_DATA[holidayId] || HOLIDAY_DATA.none;
    const settings = loadSettings();

    // Set body data attribute for CSS theming
    if (holiday.id !== 'none') {
      document.body.setAttribute('data-festivity', holiday.id);
    } else {
      document.body.removeAttribute('data-festivity');
    }

    // Particles
    if (settings.particles && holiday.particleType !== 'none') {
      startParticles(holiday.particleType);
    } else {
      stopParticles();
    }

    // Injections
    updateHeaderLights(holiday);
    updateLogoEmblem(holiday);
    updateGreetingBanner(holiday);
    updateVisitorWidget(holiday);

    // Dispatch event for any other component (e.g. admin preview)
    window.dispatchEvent(new CustomEvent('festivities:changed', {
      detail: { holiday, settings }
    }));
  }

  // ── Public API for Admin Panel & Integrations ──
  window.Festivities = {
    HOLIDAYS: HOLIDAY_DATA,
    getSettings: loadSettings,
    saveSettings: saveSettings,
    getActiveHoliday: () => HOLIDAY_DATA[getActiveHolidayId()] || HOLIDAY_DATA.none,
    getCalendarHoliday: () => detectCalendarHoliday(),
    setVisitorOverride: (id) => {
      if (id === 'auto') sessionStorage.removeItem(OVERRIDE_KEY);
      else sessionStorage.setItem(OVERRIDE_KEY, id);
      applyCurrentState();
    },
    refresh: applyCurrentState
  };

  // ── Auto Initialization ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCurrentState);
  } else {
    applyCurrentState();
  }
})();

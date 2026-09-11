/* ═══════════════════════════════════════════════
   XAOXAY — Advanced Festive Engine Script
   Extreme Interactive Animations, Physics & Holiday Themes
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

  // ── High-Quality SVGs ──
  const SANTA_HAT_SVG = `
    <svg viewBox="0 0 100 85" class="santa-hat-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M78 60 C65 20, 30 10, 15 35 C10 42, 5 45, 2 50 C25 45, 60 55, 82 62 Z" fill="#d90429"/>
      <path d="M78 60 C65 20, 30 10, 15 35 C20 40, 45 30, 78 60 Z" fill="#ef233c"/>
      <path d="M-2 58 C15 52, 60 52, 88 64 C90 72, 80 75, 75 75 C50 70, 20 70, -2 72 C-6 66, -4 60, -2 58 Z" fill="#ffffff" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"/>
      <circle cx="10" cy="38" r="10" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))"/>
      <circle cx="8" cy="36" r="8" fill="#f8f9fa"/>
    </svg>
  `;

  const PUMPKIN_SVG = `
    <svg viewBox="0 0 100 90" class="pumpkin-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 8 C48 2, 56 2, 55 18 C52 18, 48 14, 48 8 Z" fill="#2d6a4f"/>
      <ellipse cx="50" cy="52" rx="42" ry="32" fill="#ff6a00"/>
      <ellipse cx="32" cy="52" rx="26" ry="30" fill="#f77f00"/>
      <ellipse cx="68" cy="52" rx="26" ry="30" fill="#f77f00"/>
      <ellipse cx="50" cy="52" rx="20" ry="32" fill="#fcbf49"/>
      <polygon points="34,44 42,50 30,52" fill="#120204"/>
      <polygon points="66,44 70,52 58,50" fill="#120204"/>
      <polygon points="47,54 53,54 50,60" fill="#120204"/>
      <path d="M30 66 Q50 78 70 66 Q64 74 50 74 Q36 74 30 66 Z" fill="#120204"/>
    </svg>
  `;

  const SNOW_CAP_SVG = `
    <svg viewBox="0 0 320 24" preserveAspectRatio="none" class="festive-snow-cap-svg">
      <defs>
        <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#e6f4fa"/>
          <stop offset="100%" stop-color="#bce3f7"/>
        </linearGradient>
      </defs>
      <path d="M0,0 L320,0 L320,7 Q304,17 288,9 Q274,23 260,11 Q244,14 230,8 Q214,20 198,10 Q182,12 170,22 Q156,10 142,8 Q126,19 112,11 Q94,14 80,21 Q66,10 52,8 Q36,18 20,10 Q10,14 0,7 Z" fill="url(#snowGrad)"/>
      <path d="M10,2 Q60,6 100,2 M145,2 Q200,6 250,2 M275,2 Q300,5 315,2" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.9"/>
    </svg>
  `;

  const CYBER_SLEIGH_SVG = `
    <svg viewBox="0 0 160 70" fill="none" class="cyber-sleigh-svg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="14" cy="44" rx="14" ry="5" fill="#00f2fe" filter="drop-shadow(0 0 8px #00f2fe)"/>
      <ellipse cx="6" cy="44" rx="6" ry="3" fill="#ffffff"/>
      <path d="M22,46 L130,46 Q148,46 156,36 Q158,32 152,30 L110,30 L95,18 L55,18 L48,30 L22,30 Z" fill="#140204" stroke="#ff1e38" stroke-width="2"/>
      <path d="M10,56 L140,56 Q156,56 160,42" stroke="#00f2fe" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 6px #00f2fe)"/>
      <line x1="45" y1="46" x2="40" y2="56" stroke="#00f2fe" stroke-width="2"/>
      <line x1="115" y1="46" x2="110" y2="56" stroke="#00f2fe" stroke-width="2"/>
      <circle cx="75" cy="14" r="8" fill="#ff1e38"/>
      <path d="M68,14 Q75,2 88,14 Z" fill="#ef233c"/>
      <circle cx="90" cy="14" r="2.5" fill="#ffffff"/>
      <rect x="74" y="12" width="7" height="3" rx="1.5" fill="#00f2fe" filter="drop-shadow(0 0 4px #00f2fe)"/>
      <rect x="30" y="24" width="14" height="14" rx="2" fill="#ffd700" stroke="#ff1e38" stroke-width="1.5"/>
      <rect x="46" y="20" width="16" height="16" rx="2" fill="#00cc66" stroke="#ffd700" stroke-width="1.5"/>
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

  // ── Canvas Particle & Sparkles Engine ──
  let canvas = null;
  let ctx = null;
  let particles = [];
  let sparkles = [];
  let animFrameId = null;
  let isRunning = false;
  let canvasParticleType = 'none';

  // Mouse interactivity variables
  let lastMouseX = -1000;
  let windForce = 0;

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
      setupMouseListeners();
    }
    resizeCanvas();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ── Cursor Trail & Click Burst Events ──
  function setupMouseListeners() {
    window.addEventListener('pointermove', (e) => {
      const holidayId = getActiveHolidayId();
      if (holidayId === 'none') return;
      const settings = loadSettings();
      if (!settings.particles) return;

      // Calculate wind reaction
      if (lastMouseX !== -1000) {
        const deltaX = e.clientX - lastMouseX;
        windForce = Math.max(-2.2, Math.min(2.2, windForce + deltaX * 0.04));
      }
      lastMouseX = e.clientX;

      // Spawn sparkle on move
      addSparkle(e.clientX, e.clientY, holidayId);
    }, { passive: true });

    window.addEventListener('pointerdown', (e) => {
      const holidayId = getActiveHolidayId();
      if (holidayId === 'none') return;
      const settings = loadSettings();
      if (!settings.particles) return;

      addClickBurst(e.clientX, e.clientY, holidayId);
    }, { passive: true });
  }

  function getSparkleColor(holidayId) {
    if (holidayId === 'christmas') {
      const c = ['#ffffff', '#00f2fe', '#ffd700', '#ff2233', '#10b981'];
      return c[Math.floor(Math.random() * c.length)];
    }
    if (holidayId === 'halloween') {
      const c = ['#ff6a00', '#a855f7', '#ffb703', '#ffffff'];
      return c[Math.floor(Math.random() * c.length)];
    }
    if (holidayId === 'newyear') {
      const c = ['#ffd700', '#ffffff', '#00f2fe', '#f59e0b'];
      return c[Math.floor(Math.random() * c.length)];
    }
    if (holidayId === 'valentine') {
      const c = ['#ff3366', '#ff758c', '#ffffff', '#fb7185'];
      return c[Math.floor(Math.random() * c.length)];
    }
    return '#ffffff';
  }

  function addSparkle(x, y, holidayId) {
    if (sparkles.length > 75) return; // Cap to keep silky 60fps
    sparkles.push({
      x: x + (Math.random() * 8 - 4),
      y: y + (Math.random() * 8 - 4),
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 1.5 + 0.4,
      size: Math.random() * 4 + 2,
      alpha: 0.95,
      decay: Math.random() * 0.035 + 0.025,
      color: getSparkleColor(holidayId),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15
    });
  }

  function addClickBurst(x, y, holidayId) {
    const count = holidayId === 'newyear' ? 24 : 14;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
      const speed = Math.random() * 4 + 2;
      sparkles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4.5 + 2.5,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        color: getSparkleColor(holidayId),
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25
      });
    }
  }

  function drawStar(ctx, x, y, size, color, alpha, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 2;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(0, -size);
      ctx.quadraticCurveTo(size * 0.18, -size * 0.18, size, 0);
      ctx.rotate(Math.PI / 2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ── Particle Generators ──
  function createSnowFlakes(count) {
    const flakes = [];
    for (let i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1.2,
        speed: Math.random() * 1.4 + 0.6,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        swayWidth: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.65 + 0.3
      });
    }
    return flakes;
  }

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
      particles = createSnowFlakes(isMobile ? 35 : 75);
    } else if (type === 'bats') {
      particles = createBats(isMobile ? 12 : 24);
    } else if (type === 'confetti') {
      particles = createConfetti(isMobile ? 30 : 65);
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
    sparkles = [];
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
    ctx.ellipse(0, 0, size * 0.3, size * 0.5, 0, 0, Math.PI * 2);
    ctx.moveTo(0, -size * 0.2);
    ctx.quadraticCurveTo(-size * 0.8, -size * 0.6 + wing, -size * 1.3, wing);
    ctx.quadraticCurveTo(-size * 0.6, size * 0.3 + wing, 0, size * 0.3);
    ctx.moveTo(0, -size * 0.2);
    ctx.quadraticCurveTo(size * 0.8, -size * 0.6 + wing, size * 1.3, wing);
    ctx.quadraticCurveTo(size * 0.6, size * 0.3 + wing, 0, size * 0.3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function animateParticles() {
    if (!isRunning || !ctx || !canvas) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stopParticles();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // Wind damping
    windForce *= 0.96;

    // 1. Base Particles
    if (canvasParticleType === 'snow') {
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayWidth + windForce;
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
        p.x += p.vx + windForce * 0.5;
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
        p.x += Math.sin(p.swayAngle) * 0.8 + windForce * 0.5;

        if (p.y < -30) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }

        drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
      }
    }

    // 2. Cursor Sparkles & Burst Particles
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.04; // gentle gravity
      s.rot += s.rotSpeed;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparkles.splice(i, 1);
      } else {
        drawStar(ctx, s.x, s.y, s.size, s.color, s.alpha, s.rot);
      }
    }

    animFrameId = requestAnimationFrame(animateParticles);
  }

  // Auto-pause loop when page is hidden
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

  // 3. Snow-Caps & Icicles on Cards
  function updateCardDecorations(holiday) {
    document.querySelectorAll('.festive-card-snowcap').forEach(el => el.remove());

    if (holiday.id === 'christmas') {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const cap = document.createElement('div');
        cap.className = 'festive-card-snowcap';
        cap.setAttribute('aria-hidden', 'true');
        cap.innerHTML = SNOW_CAP_SVG;
        card.appendChild(cap);
      });
    }
  }

  // 4. Cyber-Sleigh / Drone Flyby in Hero
  function updateHeroCyberSleigh(holiday) {
    const existing = document.querySelector('.cyber-sleigh-wrap');
    if (existing) existing.remove();

    if (holiday.id === 'christmas') {
      const hero = document.querySelector('.hero') || document.getElementById('inicio');
      if (hero) {
        const wrap = document.createElement('div');
        wrap.className = 'cyber-sleigh-wrap';
        wrap.setAttribute('aria-hidden', 'true');
        wrap.innerHTML = `<div class="cyber-sleigh">${CYBER_SLEIGH_SVG}</div>`;
        hero.appendChild(wrap);
      }
    }
  }

  // 5. Halloween Spooky Peeking Eyes
  function updateHalloweenSpookyEyes(holiday) {
    document.querySelectorAll('.festive-spooky-eyes').forEach(el => el.remove());

    if (holiday.id === 'halloween') {
      const sections = document.querySelectorAll('.section');
      sections.forEach((sec, idx) => {
        if (idx > 1) return;
        const eyes = document.createElement('div');
        eyes.className = 'festive-spooky-eyes';
        eyes.style.top = '30px';
        eyes.style.right = idx === 0 ? '45px' : 'auto';
        eyes.style.left = idx === 1 ? '45px' : 'auto';
        eyes.setAttribute('aria-hidden', 'true');
        eyes.innerHTML = `<div class="festive-spooky-eye"></div><div class="festive-spooky-eye"></div>`;
        sec.style.position = 'relative';
        sec.appendChild(eyes);
      });
    }
  }

  // 6. Top Greeting Banner
  function updateGreetingBanner(holiday) {
    const existing = document.querySelector('.festive-banner');
    if (existing) existing.remove();

    const settings = loadSettings();
    if (!settings.banner || holiday.id === 'none' || !holiday.greeting) return;

    if (sessionStorage.getItem(BANNER_DISMISSED_KEY) === holiday.id) return;

    const banner = document.createElement('div');
    banner.className = 'festive-banner';
    banner.innerHTML = `
      <span class="festive-banner__icon">${holiday.icon}</span>
      <span class="festive-banner__text">${holiday.greeting}</span>
      <button class="festive-banner__close" aria-label="Cerrar aviso festivo">&times;</button>
    `;

    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('visible'));

    banner.querySelector('.festive-banner__close').addEventListener('click', () => {
      banner.classList.remove('visible');
      sessionStorage.setItem(BANNER_DISMISSED_KEY, holiday.id);
      setTimeout(() => banner.remove(), 400);
    });
  }

  // 7. Visitor Interactive Floating Widget
  function updateVisitorWidget(holiday) {
    let widget = document.getElementById('festiveVisitorWidget');
    const settings = loadSettings();

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

    // Injections & Advanced Decorations
    updateHeaderLights(holiday);
    updateLogoEmblem(holiday);
    updateGreetingBanner(holiday);
    updateVisitorWidget(holiday);
    updateCardDecorations(holiday);
    updateHeroCyberSleigh(holiday);
    updateHalloweenSpookyEyes(holiday);

    // Dispatch event for any other component (e.g. admin preview)
    window.dispatchEvent(new CustomEvent('festivities:changed', {
      detail: { holiday, settings }
    }));
  }

  // Watch for dynamic card rerenders (e.g. from script.js)
  const observer = new MutationObserver(() => {
    const holidayId = getActiveHolidayId();
    if (holidayId === 'christmas') {
      const cardsWithoutCap = document.querySelectorAll('.card:not(:has(.festive-card-snowcap))');
      cardsWithoutCap.forEach(card => {
        const cap = document.createElement('div');
        cap.className = 'festive-card-snowcap';
        cap.setAttribute('aria-hidden', 'true');
        cap.innerHTML = SNOW_CAP_SVG;
        card.appendChild(cap);
      });
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
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

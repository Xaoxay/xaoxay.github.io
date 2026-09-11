/* ═══════════════════════════════════════════════
   XAOXAY — Advanced Festive Engine Script
   Extreme Interactive Animations, Sleigh, Snow & Pixel Art
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

  // ── Symmetrically Centered Santa Hat SVG ──
  const SANTA_HAT_SVG = `
    <svg viewBox="0 0 100 80" class="santa-hat-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Red Hat Cone -->
      <path d="M18 56 C24 20, 52 10, 76 26 C84 32, 88 40, 86 52 C70 54, 30 54, 18 56 Z" fill="#d90429"/>
      <path d="M22 54 C30 24, 52 16, 72 28 C56 34, 34 43, 22 54 Z" fill="#ef233c"/>
      <!-- Symmetrically Centered White Fur Brim (Centered at x=50) -->
      <rect x="12" y="54" width="76" height="18" rx="9" fill="#ffffff" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"/>
      <ellipse cx="50" cy="63" rx="35" ry="7" fill="#f8f9fa"/>
      <!-- Fluffy White Pompom on right tip -->
      <circle cx="86" cy="38" r="9" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))"/>
      <circle cx="84" cy="36" r="7.5" fill="#f8f9fa"/>
    </svg>
  `;

  // ── Symmetrically Centered Pumpkin SVG ──
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

  // ── Puffy Snowcap & Hanging Icicles SVG ──
  const SNOW_CAP_SVG = `
    <svg viewBox="0 0 320 24" preserveAspectRatio="none" class="festive-snow-cap-svg">
      <defs>
        <linearGradient id="icicleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#e0f2fe"/>
          <stop offset="100%" stop-color="#bae6fd"/>
        </linearGradient>
      </defs>
      <path d="M0,0 L320,0 L320,6 Q304,18 288,9 Q274,24 260,11 Q244,14 230,8 Q214,21 198,10 Q182,12 170,23 Q156,10 142,8 Q126,20 112,11 Q94,14 80,22 Q66,10 52,8 Q36,19 20,10 Q10,14 0,6 Z" fill="url(#icicleGrad)"/>
      <path d="M10,2 Q60,5 100,2 M145,2 Q200,5 250,2 M275,2 Q300,4 315,2" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.95"/>
    </svg>
  `;

  // ── Flying Santa Sleigh with Reindeer SVG ──
  const SLEIGH_SVG = `
    <svg viewBox="0 0 280 70" fill="none" class="festive-sleigh-sky-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Reindeer 1 (Leader - Rudolph) -->
      <g transform="translate(195, 8)">
        <path d="M26,8 L35,-4 M30,2 L38,0" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="18" cy="22" rx="14" ry="8" fill="#8d5b4c"/>
        <path d="M26,20 L32,10 L36,12 L30,24 Z" fill="#8d5b4c"/>
        <circle cx="37" cy="11" r="3.5" fill="#ff2233" filter="drop-shadow(0 0 8px #ff2233)"/>
        <path d="M10,28 L5,40 M15,28 L13,42 M24,28 L28,42 M28,28 L34,38" stroke="#714234" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M8,22 L30,20" stroke="#ffd700" stroke-width="2"/>
        <circle cx="18" cy="21" r="2.5" fill="#ffd700"/>
      </g>
      <!-- Reindeer 2 -->
      <g transform="translate(125, 12)">
        <path d="M26,8 L35,-4 M30,2 L38,0" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="18" cy="22" rx="14" ry="8" fill="#7a4b3d"/>
        <path d="M26,20 L32,10 L36,12 L30,24 Z" fill="#7a4b3d"/>
        <circle cx="37" cy="11" r="2.5" fill="#120204"/>
        <path d="M10,28 L5,40 M15,28 L13,42 M24,28 L28,42 M28,28 L34,38" stroke="#603529" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M8,22 L30,20" stroke="#ffd700" stroke-width="2"/>
        <circle cx="18" cy="21" r="2.5" fill="#ffd700"/>
      </g>
      <!-- Golden Reins -->
      <path d="M68,32 Q100,40 135,30 M135,30 Q170,38 205,26" stroke="#ffd700" stroke-width="1.8" stroke-dasharray="3 2"/>
      <!-- Sleigh Body & Santa -->
      <g transform="translate(0, 10)">
        <path d="M8,46 L78,46 Q90,46 94,34" stroke="#00f2fe" stroke-width="3.5" stroke-linecap="round" filter="drop-shadow(0 0 10px #00f2fe)"/>
        <line x1="24" y1="36" x2="20" y2="46" stroke="#00f2fe" stroke-width="2.5"/>
        <line x1="62" y1="36" x2="58" y2="46" stroke="#00f2fe" stroke-width="2.5"/>
        <path d="M12,38 L72,38 Q82,38 86,28 Q88,20 76,20 L55,20 L45,10 L22,10 L16,22 L10,22 Z" fill="#d90429" stroke="#ffd700" stroke-width="1.8"/>
        <!-- Santa Head -->
        <circle cx="48" cy="8" r="7.5" fill="#ffccd5"/>
        <path d="M42,10 Q48,22 54,10 Z" fill="#ffffff"/>
        <path d="M42,7 Q48,-3 56,7 Z" fill="#ef233c"/>
        <circle cx="58" cy="7" r="2.5" fill="#ffffff"/>
        <path d="M52,12 Q64,4 68,8" stroke="#d90429" stroke-width="3" stroke-linecap="round"/>
        <circle cx="69" cy="8" r="3" fill="#ffffff"/>
        <!-- Golden Gift in Sleigh -->
        <ellipse cx="26" cy="16" rx="12" ry="10" fill="#b08968" stroke="#8d5b4c"/>
        <rect x="21" y="8" width="9" height="9" rx="2" fill="#ffd700" stroke="#ff2233" stroke-width="1.5"/>
      </g>
    </svg>
  `;

  // ── 3D Gift Box SVG ──
  const GIFT_BOX_SVG = `
    <svg viewBox="0 0 60 60" fill="none" class="gift-box-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Box Body -->
      <rect x="10" y="22" width="40" height="32" rx="4" fill="#d90429" stroke="#ffd700" stroke-width="2" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"/>
      <!-- Lid -->
      <rect x="6" y="16" width="48" height="10" rx="3" fill="#ef233c" stroke="#ffd700" stroke-width="2"/>
      <!-- Vertical Ribbon -->
      <rect x="26" y="16" width="8" height="38" fill="#ffd700"/>
      <!-- Horizontal Ribbon -->
      <rect x="10" y="34" width="40" height="8" fill="#ffd700"/>
      <!-- Bow loops on top -->
      <path d="M30,16 C20,4 12,12 28,16 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      <path d="M30,16 C40,4 48,12 32,16 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      <circle cx="30" cy="16" r="3.5" fill="#f59e0b"/>
    </svg>
  `;

  // ── Retro 8-Bit Pixel Art Christmas Tree SVG ──
  const PIXEL_XMAS_TREE_SVG = `
    <svg viewBox="0 0 32 36" class="pixel-tree-svg" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect x="15" y="0" width="2" height="2" fill="#ffd700"/>
      <rect x="14" y="2" width="4" height="2" fill="#ffd700"/>
      <rect x="14" y="4" width="4" height="2" fill="#00cc66"/>
      <rect x="12" y="6" width="8" height="2" fill="#00cc66"/>
      <rect x="10" y="8" width="12" height="2" fill="#00994c"/>
      <rect x="13" y="6" width="2" height="2" fill="#ff2233" class="px-light-red"/>
      <rect x="17" y="8" width="2" height="2" fill="#ffd700" class="px-light-gold"/>
      <rect x="11" y="10" width="10" height="2" fill="#00cc66"/>
      <rect x="9" y="12" width="14" height="2" fill="#00cc66"/>
      <rect x="7" y="14" width="18" height="2" fill="#00994c"/>
      <rect x="5" y="16" width="22" height="2" fill="#008040"/>
      <rect x="8" y="12" width="2" height="2" fill="#00f2fe" class="px-light-blue"/>
      <rect x="16" y="14" width="2" height="2" fill="#ff2233" class="px-light-red"/>
      <rect x="22" y="16" width="2" height="2" fill="#ffd700" class="px-light-gold"/>
      <rect x="8" y="18" width="16" height="2" fill="#00cc66"/>
      <rect x="6" y="20" width="20" height="2" fill="#00cc66"/>
      <rect x="4" y="22" width="24" height="2" fill="#00994c"/>
      <rect x="2" y="24" width="28" height="2" fill="#008040"/>
      <rect x="6" y="22" width="2" height="2" fill="#ffd700" class="px-light-gold"/>
      <rect x="13" y="24" width="2" height="2" fill="#00f2fe" class="px-light-blue"/>
      <rect x="20" y="22" width="2" height="2" fill="#ff2233" class="px-light-red"/>
      <rect x="13" y="26" width="6" height="6" fill="#8d5b4c"/>
      <rect x="11" y="32" width="10" height="2" fill="#714234"/>
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

  // ── Rich Canvas Particle & Sparkles Engine ──
  let canvas = null;
  let ctx = null;
  let particles = [];
  let sparkles = [];
  let animFrameId = null;
  let isRunning = false;
  let canvasParticleType = 'none';

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

  function setupMouseListeners() {
    window.addEventListener('pointermove', (e) => {
      const holidayId = getActiveHolidayId();
      if (holidayId === 'none') return;
      const settings = loadSettings();
      if (!settings.particles) return;

      if (lastMouseX !== -1000) {
        const deltaX = e.clientX - lastMouseX;
        windForce = Math.max(-2.2, Math.min(2.2, windForce + deltaX * 0.04));
      }
      lastMouseX = e.clientX;

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
    if (sparkles.length > 80) return;
    sparkles.push({
      x: x + (Math.random() * 10 - 5),
      y: y + (Math.random() * 10 - 5),
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 1.5 + 0.3,
      size: Math.random() * 4 + 2.5,
      alpha: 0.95,
      decay: Math.random() * 0.035 + 0.025,
      color: getSparkleColor(holidayId),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15
    });
  }

  function addClickBurst(x, y, holidayId) {
    const count = holidayId === 'newyear' ? 26 : 16;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
      const speed = Math.random() * 4.5 + 2;
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
        r: Math.random() * 4 + 1.8,
        speed: Math.random() * 1.5 + 0.7,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        swayWidth: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.4 + 0.6,
        isPixel: Math.random() > 0.85
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
      particles = createSnowFlakes(isMobile ? 55 : 120);
    } else if (type === 'bats') {
      particles = createBats(isMobile ? 12 : 24);
    } else if (type === 'confetti') {
      particles = createConfetti(isMobile ? 35 : 75);
    } else if (type === 'hearts') {
      particles = createHearts(isMobile ? 18 : 36);
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

    windForce *= 0.96;

    // 1. Base Snowflakes & Particles
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

        if (p.isPixel) {
          // Pixel snowflake
          ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
        } else {
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
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
      s.vy += 0.04;
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

  // 2. Perfectly Centered Santa Hat / Pumpkin on Logos
  function updateLogoEmblem(holiday) {
    document.querySelectorAll('.festive-logo-hat, .festive-hero-hat, .festive-logo-pumpkin, .festive-hero-pumpkin').forEach(el => el.remove());

    const settings = loadSettings();
    if (!settings.hat || holiday.id === 'none') return;

    const logoX = document.querySelector('.logo .logo__x');
    const heroWrap = document.querySelector('.hero__logo-wrap');

    if (holiday.id === 'christmas') {
      if (logoX) {
        logoX.style.position = 'relative';
        logoX.style.display = 'inline-block';
        const hat = document.createElement('div');
        hat.className = 'festive-logo-hat';
        hat.setAttribute('aria-hidden', 'true');
        hat.innerHTML = SANTA_HAT_SVG;
        logoX.appendChild(hat);
      }
      if (heroWrap) {
        heroWrap.style.position = 'relative';
        const heroHat = document.createElement('div');
        heroHat.className = 'festive-hero-hat';
        heroHat.setAttribute('aria-hidden', 'true');
        heroHat.innerHTML = SANTA_HAT_SVG;
        heroWrap.appendChild(heroHat);
      }
    } else if (holiday.id === 'halloween') {
      if (logoX) {
        logoX.style.position = 'relative';
        logoX.style.display = 'inline-block';
        const p = document.createElement('div');
        p.className = 'festive-logo-pumpkin';
        p.setAttribute('aria-hidden', 'true');
        p.innerHTML = PUMPKIN_SVG;
        logoX.appendChild(p);
      }
      if (heroWrap) {
        heroWrap.style.position = 'relative';
        const heroP = document.createElement('div');
        heroP.className = 'festive-hero-pumpkin';
        heroP.setAttribute('aria-hidden', 'true');
        heroP.innerHTML = PUMPKIN_SVG;
        heroWrap.appendChild(heroP);
      }
    }
  }

  // 3. Snow-Caps on Cards (Programas & Herramientas)
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

  // 4. Flying Sleigh with Reindeer Across Screen
  function updateFlyingSleigh(holiday) {
    const existing = document.querySelector('.festive-sleigh-sky');
    if (existing) existing.remove();

    if (holiday.id === 'christmas') {
      const sleigh = document.createElement('div');
      sleigh.className = 'festive-sleigh-sky';
      sleigh.setAttribute('aria-hidden', 'true');
      sleigh.innerHTML = SLEIGH_SVG;
      document.body.appendChild(sleigh);
    }
  }

  // 5. Interactive Gift Boxes Across Screen
  function updateGiftBoxes(holiday) {
    document.querySelectorAll('.festive-gift-item').forEach(el => el.remove());

    if (holiday.id === 'christmas') {
      // 1. Hero Gift
      const hero = document.querySelector('.hero') || document.getElementById('inicio');
      if (hero) {
        const giftHero = document.createElement('div');
        giftHero.className = 'festive-gift-item festive-gift-hero';
        giftHero.title = '¡Abrir regalo navideño!';
        giftHero.innerHTML = GIFT_BOX_SVG;
        hero.appendChild(giftHero);
        giftHero.addEventListener('click', (e) => {
          triggerGiftOpen(giftHero, e.clientX, e.clientY);
        });
      }

      // 2. Programas Section Gift
      const progTitle = document.querySelector('#programas .section__title');
      if (progTitle) {
        const giftProg = document.createElement('span');
        giftProg.className = 'festive-gift-item festive-gift-section';
        giftProg.title = '¡Abrir sorpresa!';
        giftProg.innerHTML = GIFT_BOX_SVG;
        progTitle.appendChild(giftProg);
        giftProg.addEventListener('click', (e) => {
          e.stopPropagation();
          triggerGiftOpen(giftProg, e.clientX, e.clientY);
        });
      }

      // 3. Herramientas Section Gift
      const toolTitle = document.querySelector('#herramientas .section__title');
      if (toolTitle) {
        const giftTool = document.createElement('span');
        giftTool.className = 'festive-gift-item festive-gift-section';
        giftTool.title = '¡Abrir sorpresa!';
        giftTool.innerHTML = GIFT_BOX_SVG;
        toolTitle.appendChild(giftTool);
        giftTool.addEventListener('click', (e) => {
          e.stopPropagation();
          triggerGiftOpen(giftTool, e.clientX, e.clientY);
        });
      }
    }
  }

  function triggerGiftOpen(element, x, y) {
    addClickBurst(x, y, 'christmas');
    addClickBurst(x, y, 'newyear');

    const wishes = [
      '🎁 ¡Felicidades! Que tu código nunca crashee y compile a la primera.',
      '🎄 ¡Felices Fiestas! 100% optimizado y sin bugs para el nuevo año.',
      '⚡ ¡Regalo XAOXAY: Diagnóstico y velocidad al máximo para tu PC!',
      '✨ ¡Que todos tus proyectos alcancen el éxito en 2027!'
    ];
    const wish = wishes[Math.floor(Math.random() * wishes.length)];

    let toast = document.createElement('div');
    toast.className = 'festive-banner visible';
    toast.style.top = '120px';
    toast.innerHTML = `<span class="festive-banner__icon">🎁</span><span>${wish}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // 6. Retro 8-Bit Pixel Art Mascot
  function updatePixelArtMascot(holiday) {
    const existing = document.querySelector('.festive-pixel-mascot');
    if (existing) existing.remove();

    if (holiday.id === 'christmas') {
      const heroContent = document.querySelector('.hero__content');
      if (heroContent) {
        const mascot = document.createElement('div');
        mascot.className = 'festive-pixel-mascot';
        mascot.title = 'Árbol navideño 8-bit';
        mascot.innerHTML = PIXEL_XMAS_TREE_SVG;
        heroContent.appendChild(mascot);
      }
    }
  }

  // 7. Top Greeting Banner
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

  // 8. Visitor Interactive Floating Widget
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

    // Injections & Decorations
    updateHeaderLights(holiday);
    updateLogoEmblem(holiday);
    updateGreetingBanner(holiday);
    updateVisitorWidget(holiday);
    updateCardDecorations(holiday);
    updateFlyingSleigh(holiday);
    updateGiftBoxes(holiday);
    updatePixelArtMascot(holiday);

    window.dispatchEvent(new CustomEvent('festivities:changed', {
      detail: { holiday, settings }
    }));
  }

  // Watch for dynamic card rerenders (e.g. from script.js)
  const cardObserver = new MutationObserver(() => {
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
    cardObserver.observe(document.body, { childList: true, subtree: true });
  }

  // ── Public API ──
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCurrentState);
  } else {
    applyCurrentState();
  }
})();

/**
 * ==============================================================================
 * FESTIVITIES AUTO (Universal Zero-Config Festive Engine)
 * ==============================================================================
 * An autonomous, plug-and-play festive decoration engine.
 * Just import this single script on ANY website:
 *   <script src="festivities-auto.js"></script>
 *
 * Features:
 *  - 100% Zero-Config: Injects its own CSS styles and DOM elements automatically.
 *  - Semantic Niche Detection: Auto-detects if the site is a burger/restaurant,
 *    tech, fashion, or general site, and drops contextual items (e.g. pixel burgers & fries).
 *  - Element Heuristics: Finds the brand logo, navigation bar, and product/menu cards.
 *  - Background Light/Dark Adaptation: Adjusts contrast dynamically.
 *  - 60 FPS Canvas Snowfall & Scenic Snowy Mountains Backdrop.
 *  - Safe & Non-destructive: pointer-events: none, non-blocking.
 * ==============================================================================
 */

(function () {
  'use strict';

  // Prevent multiple executions
  if (window.__FESTIVITIES_AUTO_INITIALIZED__) return;
  window.__FESTIVITIES_AUTO_INITIALIZED__ = true;

  console.log('%c[Festivities Auto]%c Initializing universal festive engine...', 'color: #ff3366; font-weight: bold;', 'color: #00f0ff;');

  // ── SVGs DEFINITIONS ──

  const SANTA_HAT_SVG = `
    <svg viewBox="0 0 100 80" class="festive-auto-hat-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 60 C 25 15, 65 10, 80 42 C 85 52, 75 60, 68 60 Z" fill="#e11d48"/>
      <path d="M16 58 C 28 20, 62 16, 76 44" stroke="#be123c" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M68 38 C 76 34, 86 42, 85 52 C 84 57, 80 60, 75 60" fill="#be123c"/>
      <circle cx="86" cy="54" r="9" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
      <circle cx="84" cy="52" r="7" fill="#f8fafc"/>
      <rect x="6" y="54" width="72" height="20" rx="10" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"/>
      <rect x="9" y="56" width="66" height="16" rx="8" fill="#f1f5f9"/>
      <circle cx="16" cy="64" r="5" fill="#e2e8f0" opacity="0.5"/>
      <circle cx="36" cy="64" r="6" fill="#e2e8f0" opacity="0.5"/>
      <circle cx="56" cy="64" r="5" fill="#e2e8f0" opacity="0.5"/>
      <circle cx="70" cy="64" r="4" fill="#e2e8f0" opacity="0.5"/>
    </svg>
  `;

  const CARD_SNOW_SVG = `
    <svg viewBox="0 0 400 36" class="festive-auto-card-snow-svg" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="autoCardSnowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="70%" stop-color="#e0f2fe"/>
          <stop offset="100%" stop-color="#bae6fd"/>
        </linearGradient>
        <filter id="autoSnowGlow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0, 180, 255, 0.4)"/>
        </filter>
      </defs>
      <path d="M0,18
               Q 25,6 50,15 T 100,12 T 150,16 T 200,10 T 250,16 T 300,12 T 350,15 T 400,18
               L 400,24
               Q 375,32 355,22 T 310,34 T 270,22 T 230,36 T 190,22 T 150,34 T 110,22 T 70,36 T 30,22 T 0,26 Z"
            fill="url(#autoCardSnowGrad)" filter="url(#autoSnowGlow)"/>
      <!-- Icicles -->
      <polygon points="45,20 48,34 52,20" fill="#ffffff" opacity="0.9"/>
      <polygon points="125,18 128,35 132,18" fill="#ffffff" opacity="0.9"/>
      <polygon points="215,18 219,36 223,18" fill="#ffffff" opacity="0.9"/>
      <polygon points="325,18 329,33 333,18" fill="#ffffff" opacity="0.9"/>
    </svg>
  `;

  const MOUNTAINS_SVG = `
    <svg viewBox="0 0 1440 600" class="festive-auto-mountains-svg" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="autoSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#020713" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#07172d" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#040b17" stop-opacity="0.98"/>
        </linearGradient>
        <linearGradient id="autoAuroraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(16, 185, 129, 0)"/>
          <stop offset="25%" stop-color="rgba(16, 185, 129, 0.45)"/>
          <stop offset="50%" stop-color="rgba(6, 182, 212, 0.6)"/>
          <stop offset="75%" stop-color="rgba(139, 92, 246, 0.45)"/>
          <stop offset="100%" stop-color="rgba(139, 92, 246, 0)"/>
        </linearGradient>
        <linearGradient id="autoDistPeak" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#091830" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="autoMidPeak" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#050e1c" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="autoForeHill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0e2442" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#030710" stop-opacity="0.98"/>
        </linearGradient>
      </defs>

      <!-- Aurora Wave -->
      <path d="M0,220 Q 360,90 720,200 T 1440,160 L 1440,380 L 0,380 Z" fill="url(#autoAuroraGrad)" opacity="0.65" class="festive-auto-aurora"/>

      <!-- Distant Snow Peaks -->
      <g>
        <polygon points="40,460 220,150 420,460" fill="url(#autoDistPeak)"/>
        <polygon points="220,150 180,220 215,205 235,225 260,205 220,150" fill="#ffffff"/>
        
        <polygon points="280,480 510,120 740,480" fill="url(#autoDistPeak)"/>
        <polygon points="510,120 440,220 490,200 520,230 570,190 510,120" fill="#ffffff"/>

        <polygon points="620,490 920,85 1220,490" fill="url(#autoDistPeak)"/>
        <polygon points="920,85 840,205 890,185 930,225 980,175 1020,215 920,85" fill="#ffffff"/>

        <polygon points="1060,480 1280,160 1480,480" fill="url(#autoDistPeak)"/>
        <polygon points="1280,160 1220,240 1270,220 1300,245 1350,210 1280,160" fill="#ffffff"/>
      </g>

      <!-- Midground Craggy Ridges -->
      <g>
        <path d="M-40,540 L120,290 L320,450 L480,270 L720,540 Z" fill="url(#autoMidPeak)"/>
        <polygon points="120,290 80,350 115,340 135,360 170,330 120,290" fill="#ffffff"/>
        <polygon points="480,270 430,340 470,325 500,350 540,320 480,270" fill="#ffffff"/>

        <path d="M680,560 L880,250 L1080,430 L1260,260 L1480,560 Z" fill="url(#autoMidPeak)"/>
        <polygon points="880,250 820,320 865,305 895,330 940,300 880,250" fill="#ffffff"/>
        <polygon points="1260,260 1200,330 1245,315 1275,340 1320,310 1260,260" fill="#ffffff"/>
      </g>

      <!-- Foreground Snowy Hills with Pines -->
      <g>
        <path d="M0,600 L0,490 Q240,430 540,480 T 1100,460 Q1300,440 1440,480 L1440,600 Z" fill="url(#autoForeHill)"/>
        <path d="M0,490 Q240,430 540,480 T 1100,460 Q1300,440 1440,480" stroke="#bae6fd" stroke-width="3" fill="none" opacity="0.8"/>

        <!-- Pine Trees -->
        <g transform="translate(80, 440) scale(0.85)">
          <polygon points="20,0 5,30 35,30" fill="#040b14"/>
          <polygon points="20,18 2,52 38,52" fill="#040b14"/>
          <polygon points="20,38 -2,75 42,75" fill="#040b14"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g transform="translate(600, 450) scale(0.8)">
          <polygon points="20,0 5,30 35,30" fill="#040b14"/>
          <polygon points="20,18 2,52 38,52" fill="#040b14"/>
          <polygon points="20,38 -2,75 42,75" fill="#040b14"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g transform="translate(1250, 440) scale(0.9)">
          <polygon points="20,0 5,30 35,30" fill="#040b14"/>
          <polygon points="20,18 2,52 38,52" fill="#040b14"/>
          <polygon points="20,38 -2,75 42,75" fill="#040b14"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </g>
    </svg>
  `;

  const SLEIGH_SVG = `
    <svg viewBox="0 0 240 90" class="festive-auto-sleigh-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Reindeer Rudolph -->
      <g transform="translate(150, 15)">
        <path d="M25 35 C20 20, 35 15, 45 22 C55 28, 52 40, 42 45 Z" fill="#8B4513"/>
        <path d="M42 22 C48 12, 60 10, 58 18 C55 22, 48 24, 45 25" stroke="#5c2c16" stroke-width="2" stroke-linecap="round"/>
        <!-- Red Glowing Nose -->
        <circle cx="56" cy="24" r="4.5" fill="#ff1e38" filter="drop-shadow(0 0 6px #ff0033)"/>
        <!-- Reindeer body & legs -->
        <ellipse cx="20" cy="45" rx="20" ry="12" fill="#8B4513"/>
        <line x1="8" y1="55" x2="2" y2="72" stroke="#8B4513" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="16" y1="56" x2="14" y2="72" stroke="#6d340d" stroke-width="3" stroke-linecap="round"/>
        <line x1="28" y1="55" x2="35" y2="70" stroke="#8B4513" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="33" y1="55" x2="42" y2="68" stroke="#6d340d" stroke-width="3" stroke-linecap="round"/>
      </g>
      <!-- Reins -->
      <path d="M100 45 Q125 55 160 48" stroke="#ffd700" stroke-width="1.8" stroke-dasharray="3 2" fill="none"/>
      <!-- Sleigh -->
      <g transform="translate(10, 20)">
        <path d="M10 50 Q45 65 85 48 C92 45, 96 38, 90 32 L82 32 C78 24, 60 22, 50 30 L22 30 C15 30, 8 38, 10 50 Z" fill="#dc2626"/>
        <path d="M10 50 Q45 65 85 48" stroke="#ffd700" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <!-- Sleigh Runners -->
        <path d="M5 64 L85 64 C95 64, 100 56, 102 50" stroke="#f1f5f9" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <line x1="25" y1="55" x2="25" y2="64" stroke="#ffd700" stroke-width="2.5"/>
        <line x1="70" y1="52" x2="70" y2="64" stroke="#ffd700" stroke-width="2.5"/>
        <!-- Santa in Sleigh -->
        <circle cx="50" cy="22" r="9" fill="#fca5a5"/>
        <path d="M42 22 Q50 32 58 22" fill="#ffffff"/>
        <circle cx="58" cy="20" r="2" fill="#ef4444"/>
        <path d="M43 16 C46 6, 56 6, 60 14 Z" fill="#dc2626"/>
        <circle cx="61" cy="14" r="2.5" fill="#ffffff"/>
      </g>
    </svg>
  `;

  // ── DROPPED GIFT ICONS BY NICHE ──

  // 1. Food / Burger Niche Items (Burger, Fries, Drink)
  const ITEM_BURGER_SVG = `
    <svg viewBox="0 0 36 36" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
      <!-- Top Bun -->
      <path d="M5 16 C5 8, 31 8, 31 16 Z" fill="#f59e0b"/>
      <!-- Sesame seeds -->
      <ellipse cx="12" cy="12" rx="1" ry="0.6" fill="#fef3c7"/>
      <ellipse cx="18" cy="10" rx="1" ry="0.6" fill="#fef3c7"/>
      <ellipse cx="24" cy="12" rx="1" ry="0.6" fill="#fef3c7"/>
      <!-- Lettuce -->
      <path d="M4 17 Q9 20 14 17 Q19 20 24 17 Q29 20 32 17 L31 19 L5 19 Z" fill="#22c55e"/>
      <!-- Melted Cheddar -->
      <path d="M6 19 L30 19 L28 23 L22 21 L16 24 L10 21 Z" fill="#eab308"/>
      <!-- Patty -->
      <rect x="5" y="21" width="26" height="5" rx="2.5" fill="#78350f"/>
      <!-- Bottom Bun -->
      <path d="M7 26 L29 26 C29 29, 26 31, 18 31 C10 31, 7 29, 7 26 Z" fill="#d97706"/>
    </svg>
  `;

  const ITEM_FRIES_SVG = `
    <svg viewBox="0 0 36 36" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
      <!-- Fries Box -->
      <polygon points="9,16 27,16 24,33 12,33" fill="#dc2626"/>
      <circle cx="18" cy="24" r="4" fill="#ffd700"/>
      <!-- Crispy Golden Fries -->
      <line x1="12" y1="16" x2="11" y2="6" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <line x1="15" y1="16" x2="14" y2="4" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="16" x2="18" y2="3" stroke="#fbbf24" stroke-width="3.2" stroke-linecap="round"/>
      <line x1="21" y1="16" x2="22" y2="5" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="16" x2="25" y2="8" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;

  // 2. Classic Wrapped Presents (Universal)
  const ITEM_GIFT_RED_SVG = `
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
      <rect x="5" y="11" width="22" height="18" rx="2" fill="#dc2626"/>
      <rect x="3" y="8" width="26" height="5" rx="1.5" fill="#ef4444"/>
      <rect x="14" y="8" width="4" height="21" fill="#ffd700"/>
      <rect x="5" y="17" width="22" height="4" fill="#ffd700"/>
      <ellipse cx="13" cy="6" rx="3.5" ry="2.5" fill="#ffd700"/>
      <ellipse cx="19" cy="6" rx="3.5" ry="2.5" fill="#ffd700"/>
      <circle cx="16" cy="7" r="1.5" fill="#f59e0b"/>
    </svg>
  `;

  const ITEM_GIFT_GOLD_SVG = `
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
      <rect x="5" y="11" width="22" height="18" rx="2" fill="#d97706"/>
      <rect x="3" y="8" width="26" height="5" rx="1.5" fill="#f59e0b"/>
      <rect x="14" y="8" width="4" height="21" fill="#06b6d4"/>
      <rect x="5" y="17" width="22" height="4" fill="#06b6d4"/>
      <ellipse cx="13" cy="6" rx="3.5" ry="2.5" fill="#06b6d4"/>
      <ellipse cx="19" cy="6" rx="3.5" ry="2.5" fill="#06b6d4"/>
      <circle cx="16" cy="7" r="1.5" fill="#0891b2"/>
    </svg>
  `;

  // ── AUTONOMOUS CSS STYLES INJECTION ──

  function injectStyles() {
    if (document.getElementById('festive-auto-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'festive-auto-styles';
    styleEl.textContent = `
      /* Canvas & Mountains Viewport Layers */
      .festive-auto-canvas {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 999 !important;
      }

      .festive-auto-mountains-backdrop {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 0 !important;
        overflow: hidden !important;
      }

      .festive-auto-mountains-svg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 68vh;
        min-height: 420px;
        display: block;
      }

      .festive-auto-aurora {
        animation: autoAuroraWave 8s ease-in-out infinite alternate;
      }

      @keyframes autoAuroraWave {
        0%   { opacity: 0.35; transform: translateY(0); }
        50%  { opacity: 0.75; transform: translateY(-8px) scaleY(1.1); }
        100% { opacity: 0.45; transform: translateY(4px); }
      }

      /* Hanging Nav Lights with Wind Sway */
      .festive-auto-lights-garland {
        position: absolute;
        bottom: -16px;
        left: 0;
        width: 100%;
        height: 24px;
        pointer-events: none;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        overflow: visible;
        animation: autoGarlandSway 4.5s ease-in-out infinite alternate;
        transform-origin: top center;
      }

      @keyframes autoGarlandSway {
        0%   { transform: rotate(-0.6deg) translateY(0); }
        50%  { transform: rotate(0.4deg) translateY(1.5px); }
        100% { transform: rotate(-0.3deg) translateY(-0.8px); }
      }

      .festive-auto-bulb {
        width: 10px;
        height: 14px;
        border-radius: 50% 50% 45% 45%;
        position: relative;
        transform-origin: top center;
      }

      .festive-auto-bulb::before {
        content: '';
        position: absolute;
        top: -4px;
        left: 3px;
        width: 4px;
        height: 4px;
        background: #334155;
        border-radius: 1px;
      }

      .festive-auto-bulb:nth-child(even) {
        animation: autoBulbSwayEven 3s ease-in-out infinite alternate;
      }
      .festive-auto-bulb:nth-child(odd) {
        animation: autoBulbSwayOdd 3.4s ease-in-out infinite alternate;
      }

      @keyframes autoBulbSwayEven {
        0%   { transform: rotate(-8deg); }
        100% { transform: rotate(8deg); }
      }
      @keyframes autoBulbSwayOdd {
        0%   { transform: rotate(7deg); }
        100% { transform: rotate(-7deg); }
      }

      .festive-bulb-red    { background: #ff1e38; box-shadow: 0 0 10px #ff1e38; }
      .festive-bulb-green  { background: #10b981; box-shadow: 0 0 10px #10b981; }
      .festive-bulb-gold   { background: #ffd700; box-shadow: 0 0 10px #ffd700; }
      .festive-bulb-blue   { background: #00f0ff; box-shadow: 0 0 10px #00f0ff; }
      .festive-bulb-purple { background: #d946ef; box-shadow: 0 0 10px #d946ef; }

      /* Santa Hat on Logo */
      .festive-auto-hat-wrapper {
        position: absolute !important;
        top: -24px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 46px !important;
        height: 38px !important;
        pointer-events: none !important;
        z-index: 50 !important;
        animation: autoHatBob 3.5s ease-in-out infinite alternate;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.45));
      }

      @keyframes autoHatBob {
        0%   { transform: translateX(-50%) translateY(0) rotate(-2deg); }
        100% { transform: translateX(-50%) translateY(-2px) rotate(2deg); }
      }

      .festive-auto-hat-svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* Snow Overlay on Cards */
      .festive-auto-card-snow-overlay {
        position: absolute !important;
        top: -12px !important;
        left: 0 !important;
        width: 100% !important;
        height: 24px !important;
        pointer-events: none !important;
        z-index: 20 !important;
        overflow: visible !important;
      }

      .festive-auto-card-snow-svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* Sleigh Across the Sky */
      .festive-auto-sleigh-sky {
        position: fixed !important;
        top: 14vh;
        left: -320px;
        width: 250px;
        height: 95px;
        pointer-events: none !important;
        z-index: 995 !important;
        animation: autoSleighFly 22s linear infinite;
      }

      @keyframes autoSleighFly {
        0% {
          transform: translateX(0) translateY(0) rotate(1deg);
          opacity: 0;
        }
        4% {
          opacity: 1;
        }
        48% {
          transform: translateX(calc(50vw + 160px)) translateY(-18px) rotate(-1deg);
          opacity: 1;
        }
        94% {
          opacity: 1;
        }
        100% {
          transform: translateX(calc(100vw + 450px)) translateY(12px) rotate(1deg);
          opacity: 0;
        }
      }

      .festive-auto-sleigh-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
      }

      /* Dropped Presents Animation */
      .festive-auto-dropped-item {
        position: fixed !important;
        pointer-events: none !important;
        z-index: 996 !important;
        animation: autoDropAndSpin 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }

      @keyframes autoDropAndSpin {
        0% {
          opacity: 1;
          transform: translateY(0) scale(0.65) rotate(0deg);
        }
        70% {
          opacity: 0.95;
          transform: translateY(68vh) scale(1) rotate(220deg);
        }
        100% {
          opacity: 0;
          transform: translateY(85vh) scale(0.9) rotate(360deg);
        }
      }

      /* Light Theme Adaptations (if the host website has a light/white background) */
      body.festive-auto-light-theme .festive-auto-mountains-backdrop {
        opacity: 0.35 !important;
      }
      body.festive-auto-light-theme .festive-auto-bulb {
        opacity: 0.95;
      }
    `;

    document.head.appendChild(styleEl);
  }

  // ── INTELLIGENT SEMANTIC NICHE DETECTION ──

  function detectNiche() {
    const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
    const textCorpus = (document.title + ' ' + metaDesc + ' ' + (document.body ? document.body.innerText.slice(0, 4000) : '')).toLowerCase();

    if (/burger|hamburguesa|smash|papas|fries|comida|restaurant|gastronomia|taco|sushi|cerveza|menu|combo|bebida|alimentos/i.test(textCorpus)) {
      return 'food';
    }
    if (/software|developer|coding|programador|dev|computadora|tech|hardware|cloud|ingenier|fullstack/i.test(textCorpus)) {
      return 'tech';
    }
    if (/ropa|moda|tienda|fashion|indumentaria|shoes|zapatos|boutique|accesorios/i.test(textCorpus)) {
      return 'fashion';
    }
    return 'general';
  }

  // ── LIGHT / DARK THEME BACKGROUND DETECTION ──

  function detectAndApplyTheme() {
    const bg = window.getComputedStyle(document.body).backgroundColor;
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum > 0.55) {
        document.body.classList.add('festive-auto-light-theme');
        return 'light';
      }
    }
    return 'dark';
  }

  // ── DOM ELEMENT HEURISTICS ──

  function findLogoElement() {
    const selectors = [
      'header [class*="logo"]', 'nav [class*="logo"]',
      'header [id*="logo"]', 'nav [id*="logo"]',
      'header [class*="brand"]', 'nav [class*="brand"]',
      'header img', 'nav img',
      '.navbar-brand', '.site-logo', '.brand-logo',
      'header h1', 'nav h1'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 15 && rect.height > 15) return el;
      }
    }
    return null;
  }

  function findNavElement() {
    const selectors = ['header', 'nav', '[role="banner"]', '.navbar', '.site-header', '#header'];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) return el;
    }
    return null;
  }

  function findCardElements() {
    const selectors = [
      '[class*="card"]', '[class*="product"]', '[class*="item"]',
      '[class*="menu-item"]', '[class*="combo"]', 'article',
      '.grid > div', '.menu-grid > div'
    ];
    for (const sel of selectors) {
      const elements = Array.from(document.querySelectorAll(sel)).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 140 && rect.height > 120 && el.offsetParent !== null;
      });
      if (elements.length >= 2) return elements;
    }
    return [];
  }

  // ── 60 FPS CANVAS SNOW ENGINE ──

  let canvasAnimId = null;
  let wind = 0;
  let targetWind = 0;

  function initSnowCanvas() {
    let canvas = document.getElementById('festiveAutoCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'festiveAutoCanvas';
      canvas.className = 'festive-auto-canvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      targetWind = ((e.clientX / width) - 0.5) * 3;
    });

    const flakes = [];
    const FLAKE_COUNT = Math.min(100, Math.floor(width / 15));

    for (let i = 0; i < FLAKE_COUNT; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.8 + 1,
        speedY: Math.random() * 1.5 + 0.7,
        speedX: (Math.random() - 0.5) * 0.8,
        swaySpeed: Math.random() * 0.03 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    function renderSnow() {
      ctx.clearRect(0, 0, width, height);
      wind += (targetWind - wind) * 0.04;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swayOffset += f.swaySpeed;
        f.x += Math.sin(f.swayOffset) * 0.7 + wind + f.speedX;
        f.y += f.speedY;

        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width + 10) f.x = -10;
        if (f.x < -10) f.x = width + 10;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
        ctx.fill();
      }

      canvasAnimId = requestAnimationFrame(renderSnow);
    }

    renderSnow();
  }

  // ── INJECT SCENIC MOUNTAINS ──

  function injectMountains() {
    if (document.getElementById('festiveAutoMountains')) return;
    const div = document.createElement('div');
    div.id = 'festiveAutoMountains';
    div.className = 'festive-auto-mountains-backdrop';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = MOUNTAINS_SVG;
    document.body.prepend(div);
  }

  // ── ATTACH HAT TO LOGO ──

  function attachLogoHat(logoEl) {
    if (!logoEl || logoEl.querySelector('.festive-auto-hat-wrapper')) return;

    // Ensure logo has relative positioning so hat is absolute to it
    const pos = window.getComputedStyle(logoEl).position;
    if (pos === 'static') {
      logoEl.style.position = 'relative';
    }

    const hatWrapper = document.createElement('div');
    hatWrapper.className = 'festive-auto-hat-wrapper';
    hatWrapper.setAttribute('aria-hidden', 'true');
    hatWrapper.innerHTML = SANTA_HAT_SVG;
    logoEl.appendChild(hatWrapper);
  }

  // ── ATTACH LIGHTS TO NAV ──

  function attachNavLights(navEl) {
    if (!navEl || navEl.querySelector('.festive-auto-lights-garland')) return;

    const pos = window.getComputedStyle(navEl).position;
    if (pos === 'static') {
      navEl.style.position = 'relative';
    }

    const garland = document.createElement('div');
    garland.className = 'festive-auto-lights-garland';
    garland.setAttribute('aria-hidden', 'true');

    const colors = ['red', 'gold', 'green', 'blue', 'purple'];
    const bulbCount = Math.max(12, Math.floor(navEl.clientWidth / 55) || 16);

    for (let i = 0; i < bulbCount; i++) {
      const bulb = document.createElement('div');
      const c = colors[i % colors.length];
      bulb.className = `festive-auto-bulb festive-bulb-${c}`;
      garland.appendChild(bulb);
    }

    navEl.appendChild(garland);
  }

  // ── ATTACH SNOW TO CARDS ──

  function attachCardsSnow(cards) {
    cards.forEach((card) => {
      if (card.querySelector('.festive-auto-card-snow-overlay')) return;

      const pos = window.getComputedStyle(card).position;
      if (pos === 'static') {
        card.style.position = 'relative';
      }

      // Ensure visible overflow so snow crest pops out nicely
      card.style.overflow = 'visible';

      const snowEl = document.createElement('div');
      snowEl.className = 'festive-auto-card-snow-overlay';
      snowEl.setAttribute('aria-hidden', 'true');
      snowEl.innerHTML = CARD_SNOW_SVG;
      card.prepend(snowEl);
    });
  }

  // ── FLYING SANTA SLEIGH & NICHE ITEM DROPS ──

  function initSleigh(niche) {
    if (document.getElementById('festiveAutoSleigh')) return;

    const sleigh = document.createElement('div');
    sleigh.id = 'festiveAutoSleigh';
    sleigh.className = 'festive-auto-sleigh-sky';
    sleigh.setAttribute('aria-hidden', 'true');
    sleigh.innerHTML = SLEIGH_SVG;
    document.body.appendChild(sleigh);

    // Pick item pool based on detected niche
    const foodItems = [ITEM_BURGER_SVG, ITEM_FRIES_SVG, ITEM_GIFT_RED_SVG, ITEM_GIFT_GOLD_SVG];
    const defaultItems = [ITEM_GIFT_RED_SVG, ITEM_GIFT_GOLD_SVG];
    const itemPool = (niche === 'food') ? foodItems : defaultItems;

    let dropCount = 0;
    setInterval(() => {
      const rect = sleigh.getBoundingClientRect();
      // Drop while visible in screen view
      if (rect.left > 80 && rect.right < window.innerWidth - 80) {
        dropPresent(rect.left + 50, rect.top + 50, itemPool[dropCount % itemPool.length]);
        dropCount++;
      }
    }, 2400);
  }

  function dropPresent(x, y, svgHtml) {
    const item = document.createElement('div');
    item.className = 'festive-auto-dropped-item';
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.innerHTML = svgHtml;
    document.body.appendChild(item);

    setTimeout(() => {
      if (item.parentNode) item.parentNode.removeChild(item);
    }, 4100);
  }

  // ── MAIN RUNTIME ──

  function start() {
    injectStyles();
    injectMountains();
    initSnowCanvas();

    const theme = detectAndApplyTheme();
    const niche = detectNiche();

    console.log(`%c[Festivities Auto]%c Niche Detected: "%c${niche.toUpperCase()}%c" | Theme: ${theme}`, 
      'color: #ff3366; font-weight: bold;', 'color: #94a3b8;', 
      'color: #ffd700; font-weight: bold;', 'color: #94a3b8;'
    );

    // DOM Heuristics
    const logoEl = findLogoElement();
    if (logoEl) {
      attachLogoHat(logoEl);
      console.log('[Festivities Auto] Logo located and festive hat attached:', logoEl);
    }

    const navEl = findNavElement();
    if (navEl) {
      attachNavLights(navEl);
      console.log('[Festivities Auto] Nav bar located and garland lights attached:', navEl);
    }

    const cards = findCardElements();
    if (cards.length > 0) {
      attachCardsSnow(cards);
      console.log(`[Festivities Auto] Located ${cards.length} product/menu cards and attached snow.`);
    }

    // Launch flying sleigh with contextual items
    initSleigh(niche);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

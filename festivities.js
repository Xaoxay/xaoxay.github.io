/* ═══════════════════════════════════════════════
   XAOXAY — Complete Festive Engine Script
   Christmas, New Year, Valentine & Halloween Systems
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  const STORAGE_KEY = 'xaoxay_festivity_settings';
  const OVERRIDE_KEY = 'xaoxay_visitor_festive_override';
  const BANNER_DISMISSED_KEY = 'xaoxay_festive_banner_dismissed';

  const DEFAULT_SETTINGS = {
    mode: 'auto',         // 'auto' | 'christmas' | 'halloween' | 'newyear' | 'valentine' | 'none'
    particles: true,      // Snow, fireworks, flames, hearts
    lights: true,         // Garland under header with wind movement
    hat: true,            // Theme emblem on logo
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
      particleType: 'flames',
      bulbs: ['orange', 'purple', 'green', 'purple']
    },
    newyear: {
      id: 'newyear',
      name: 'Año Nuevo',
      icon: '🎆',
      greeting: '¡Feliz y Próspero Año Nuevo! Que el código compile a la primera.',
      particleType: 'fireworks',
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

  // ── SVGs ──

  // 0. Christmas Snowy Mountains Backdrop SVG
  const CHRISTMAS_MOUNTAINS_SVG = `
    <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYBottom slice" class="festive-mountains-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#040914" stop-opacity="0.85"/>
          <stop offset="45%" stop-color="#091b34" stop-opacity="0.88"/>
          <stop offset="85%" stop-color="#0e284c" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="#0a1d37" stop-opacity="0.96"/>
        </linearGradient>
        <linearGradient id="auroraGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(0, 242, 254, 0)"/>
          <stop offset="25%" stop-color="rgba(0, 242, 254, 0.22)"/>
          <stop offset="50%" stop-color="rgba(0, 255, 128, 0.28)"/>
          <stop offset="75%" stop-color="rgba(0, 242, 254, 0.18)"/>
          <stop offset="100%" stop-color="rgba(0, 242, 254, 0)"/>
        </linearGradient>
        <linearGradient id="distPeakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e0f2fe"/>
          <stop offset="25%" stop-color="#7dd3fc"/>
          <stop offset="65%" stop-color="#193354"/>
          <stop offset="100%" stop-color="#0b172a"/>
        </linearGradient>
        <linearGradient id="midPeakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="20%" stop-color="#bae6fd"/>
          <stop offset="60%" stop-color="#12253f"/>
          <stop offset="100%" stop-color="#07101c"/>
        </linearGradient>
        <linearGradient id="foreHillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a3554"/>
          <stop offset="40%" stop-color="#0c1b2d"/>
          <stop offset="100%" stop-color="#040810"/>
        </linearGradient>
      </defs>

      <!-- Aurora Waves -->
      <path d="M0,180 Q360,90 720,160 T1440,110 L1440,320 L0,320 Z" fill="url(#auroraGrad)" opacity="0.75" class="aurora-wave"/>
      <path d="M0,140 Q400,220 800,130 T1440,180 L1440,320 L0,320 Z" fill="url(#auroraGrad)" opacity="0.5" class="aurora-wave" style="animation-delay: -4s;"/>

      <!-- Distant Majestic Peaks -->
      <g class="mountains-distant" opacity="0.88">
        <polygon points="40,460 220,150 420,460" fill="url(#distPeakGrad)"/>
        <polygon points="220,150 180,220 215,205 235,225 260,205 220,150" fill="#ffffff"/>
        <path d="M220,150 L220,300 L260,340" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>

        <polygon points="280,480 510,120 740,480" fill="url(#distPeakGrad)"/>
        <polygon points="510,120 440,220 490,200 520,230 570,190 510,120" fill="#ffffff" filter="drop-shadow(0 0 10px rgba(224,242,254,0.8))"/>
        <path d="M510,120 L495,270 L540,330" stroke="rgba(255,255,255,0.7)" stroke-width="2.5"/>

        <polygon points="620,490 920,85 1220,490" fill="url(#distPeakGrad)"/>
        <polygon points="920,85 840,205 890,185 930,225 980,175 1020,215 920,85" fill="#ffffff" filter="drop-shadow(0 0 14px rgba(224,242,254,0.9))"/>
        <path d="M920,85 L900,245 L960,335 L930,425" stroke="rgba(255,255,255,0.8)" stroke-width="3"/>

        <polygon points="1060,480 1280,160 1480,480" fill="url(#distPeakGrad)"/>
        <polygon points="1280,160 1220,240 1270,220 1300,245 1350,210 1280,160" fill="#ffffff"/>
      </g>

      <!-- Midground Craggy Ridges -->
      <g class="mountains-midground">
        <path d="M-40,540 L120,290 L320,450 L480,270 L720,540 Z" fill="url(#midPeakGrad)"/>
        <polygon points="120,290 80,350 115,340 135,360 170,330 120,290" fill="#ffffff"/>
        <polygon points="480,270 430,340 470,325 500,350 540,320 480,270" fill="#ffffff"/>

        <path d="M680,560 L880,250 L1080,430 L1260,260 L1480,560 Z" fill="url(#midPeakGrad)"/>
        <polygon points="880,250 820,320 865,305 895,330 940,300 880,250" fill="#ffffff"/>
        <polygon points="1260,260 1200,330 1245,315 1275,340 1320,310 1260,260" fill="#ffffff"/>
      </g>

      <!-- Foreground Snowy Hills with Dusted Pines -->
      <g class="mountains-foreground">
        <path d="M0,600 L0,490 Q240,430 540,480 T1100,460 Q1300,440 1440,480 L1440,600 Z" fill="url(#foreHillGrad)"/>
        <path d="M0,490 Q240,430 540,480 T1100,460 Q1300,440 1440,480" stroke="#bae6fd" stroke-width="3.5" fill="none" opacity="0.85"/>

        <!-- Pines Left -->
        <g transform="translate(60, 430) scale(0.9)">
          <polygon points="20,0 5,30 35,30" fill="#040a12"/>
          <polygon points="20,18 2,52 38,52" fill="#040a12"/>
          <polygon points="20,38 -2,75 42,75" fill="#040a12"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g transform="translate(110, 445) scale(0.75)">
          <polygon points="20,0 5,30 35,30" fill="#040a12"/>
          <polygon points="20,18 2,52 38,52" fill="#040a12"/>
          <polygon points="20,38 -2,75 42,75" fill="#040a12"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>

        <!-- Pines Center -->
        <g transform="translate(560, 450) scale(0.85)">
          <polygon points="20,0 5,30 35,30" fill="#040a12"/>
          <polygon points="20,18 2,52 38,52" fill="#040a12"/>
          <polygon points="20,38 -2,75 42,75" fill="#040a12"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g transform="translate(610, 465) scale(0.7)">
          <polygon points="20,0 5,30 35,30" fill="#040a12"/>
          <polygon points="20,18 2,52 38,52" fill="#040a12"/>
          <polygon points="20,38 -2,75 42,75" fill="#040a12"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>

        <!-- Pines Right -->
        <g transform="translate(1220, 440) scale(0.95)">
          <polygon points="20,0 5,30 35,30" fill="#040a12"/>
          <polygon points="20,18 2,52 38,52" fill="#040a12"/>
          <polygon points="20,38 -2,75 42,75" fill="#040a12"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <g transform="translate(1280, 455) scale(0.8)">
          <polygon points="20,0 5,30 35,30" fill="#040a12"/>
          <polygon points="20,18 2,52 38,52" fill="#040a12"/>
          <polygon points="20,38 -2,75 42,75" fill="#040a12"/>
          <path d="M20,0 L13,15 M20,18 L9,36 M20,38 L5,58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      </g>
    </svg>
  `;

  // 1. Santa Hat (Centered at x=50)
  const SANTA_HAT_SVG = `
    <svg viewBox="0 0 100 80" class="santa-hat-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 56 C24 20, 52 10, 76 26 C84 32, 88 40, 86 52 C70 54, 30 54, 18 56 Z" fill="#d90429"/>
      <path d="M22 54 C30 24, 52 16, 72 28 C56 34, 34 43, 22 54 Z" fill="#ef233c"/>
      <rect x="12" y="54" width="76" height="18" rx="9" fill="#ffffff" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"/>
      <ellipse cx="50" cy="63" rx="35" ry="7" fill="#f8f9fa"/>
      <circle cx="86" cy="38" r="9" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))"/>
      <circle cx="84" cy="36" r="7.5" fill="#f8f9fa"/>
    </svg>
  `;

  // 2. Snowcap with Hanging Icicles for Cards
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

  // 3. Flying Sleigh with Rudolph & Santa
  const SLEIGH_SVG = `
    <svg viewBox="0 0 280 70" fill="none" class="festive-sleigh-sky-svg" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(195, 8)">
        <path d="M26,8 L35,-4 M30,2 L38,0" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="18" cy="22" rx="14" ry="8" fill="#8d5b4c"/>
        <path d="M26,20 L32,10 L36,12 L30,24 Z" fill="#8d5b4c"/>
        <circle cx="37" cy="11" r="3.5" fill="#ff2233" filter="drop-shadow(0 0 8px #ff2233)"/>
        <path d="M10,28 L5,40 M15,28 L13,42 M24,28 L28,42 M28,28 L34,38" stroke="#714234" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M8,22 L30,20" stroke="#ffd700" stroke-width="2"/>
        <circle cx="18" cy="21" r="2.5" fill="#ffd700"/>
      </g>
      <g transform="translate(125, 12)">
        <path d="M26,8 L35,-4 M30,2 L38,0" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="18" cy="22" rx="14" ry="8" fill="#7a4b3d"/>
        <path d="M26,20 L32,10 L36,12 L30,24 Z" fill="#7a4b3d"/>
        <circle cx="37" cy="11" r="2.5" fill="#120204"/>
        <path d="M10,28 L5,40 M15,28 L13,42 M24,28 L28,42 M28,28 L34,38" stroke="#603529" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M8,22 L30,20" stroke="#ffd700" stroke-width="2"/>
        <circle cx="18" cy="21" r="2.5" fill="#ffd700"/>
      </g>
      <path d="M68,32 Q100,40 135,30 M135,30 Q170,38 205,26" stroke="#ffd700" stroke-width="1.8" stroke-dasharray="3 2"/>
      <g transform="translate(0, 10)">
        <path d="M8,46 L78,46 Q90,46 94,34" stroke="#00f2fe" stroke-width="3.5" stroke-linecap="round" filter="drop-shadow(0 0 10px #00f2fe)"/>
        <line x1="24" y1="36" x2="20" y2="46" stroke="#00f2fe" stroke-width="2.5"/>
        <line x1="62" y1="36" x2="58" y2="46" stroke="#00f2fe" stroke-width="2.5"/>
        <path d="M12,38 L72,38 Q82,38 86,28 Q88,20 76,20 L55,20 L45,10 L22,10 L16,22 L10,22 Z" fill="#d90429" stroke="#ffd700" stroke-width="1.8"/>
        <circle cx="48" cy="8" r="7.5" fill="#ffccd5"/>
        <path d="M42,10 Q48,22 54,10 Z" fill="#ffffff"/>
        <path d="M42,7 Q48,-3 56,7 Z" fill="#ef233c"/>
        <circle cx="58" cy="7" r="2.5" fill="#ffffff"/>
        <path d="M52,12 Q64,4 68,8" stroke="#d90429" stroke-width="3" stroke-linecap="round"/>
        <circle cx="69" cy="8" r="3" fill="#ffffff"/>
        <rect x="21" y="8" width="10" height="10" rx="2" fill="#ffd700" stroke="#ff2233" stroke-width="1.5"/>
        <rect x="32" y="12" width="8" height="8" rx="2" fill="#00f2fe" stroke="#ffffff" stroke-width="1.2"/>
      </g>
    </svg>
  `;

  // 4. Gift Box SVG
  const GIFT_BOX_SVG = `
    <svg viewBox="0 0 60 60" fill="none" class="gift-box-svg" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="22" width="40" height="32" rx="4" fill="#d90429" stroke="#ffd700" stroke-width="2" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"/>
      <rect x="6" y="16" width="48" height="10" rx="3" fill="#ef233c" stroke="#ffd700" stroke-width="2"/>
      <rect x="26" y="16" width="8" height="38" fill="#ffd700"/>
      <rect x="10" y="34" width="40" height="8" fill="#ffd700"/>
      <path d="M30,16 C20,4 12,12 28,16 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      <path d="M30,16 C40,4 48,12 32,16 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      <circle cx="30" cy="16" r="3.5" fill="#f59e0b"/>
    </svg>
  `;

  // 5. Pixel Art Christmas Tree
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

  // 6. Toasting Champagne Glasses SVG
  const TOASTING_GLASSES_SVG = `
    <svg viewBox="0 0 160 120" class="toasting-glasses-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="champagneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff9c4"/>
          <stop offset="40%" stop-color="#ffd54f"/>
          <stop offset="100%" stop-color="#ffb300"/>
        </linearGradient>
      </defs>
      <g class="clink-sparkle">
        <circle cx="80" cy="35" r="7" fill="#ffffff" filter="drop-shadow(0 0 8px #ffd700)"/>
        <path d="M80 15 L80 55 M60 35 L100 35 M66 21 L94 49 M66 49 L94 21" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="80" cy="35" r="14" stroke="#ffffff" stroke-width="1.5" opacity="0.7" stroke-dasharray="3 3"/>
      </g>
      <g class="flute-left">
        <path d="M48 85 L48 110 M32 110 L64 110" stroke="#bae6fd" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
        <path d="M36 25 C36 25, 34 65, 48 85 C62 65, 60 25, 60 25 Z" fill="rgba(255,255,255,0.08)" stroke="#bae6fd" stroke-width="2"/>
        <path d="M38 42 C38 42, 36 64, 48 80 C60 64, 58 42, 58 42 Z" fill="url(#champagneGrad)"/>
        <ellipse cx="48" cy="42" rx="10" ry="3.5" fill="#fffbe6"/>
        <circle cx="46" cy="68" r="1.5" fill="#ffffff" opacity="0.9" class="champagne-bubble cb1"/>
        <circle cx="50" cy="55" r="1.8" fill="#ffffff" opacity="0.9" class="champagne-bubble cb2"/>
        <circle cx="45" cy="47" r="1.2" fill="#ffffff" opacity="0.9" class="champagne-bubble cb3"/>
        <path d="M40 30 C39 45, 42 65, 47 76" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>
      </g>
      <g class="flute-right">
        <path d="M112 85 L112 110 M96 110 L128 110" stroke="#bae6fd" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
        <path d="M100 25 C100 25, 98 65, 112 85 C126 65, 124 25, 124 25 Z" fill="rgba(255,255,255,0.08)" stroke="#bae6fd" stroke-width="2"/>
        <path d="M102 42 C102 42, 100 64, 112 80 C124 64, 122 42, 122 42 Z" fill="url(#champagneGrad)"/>
        <ellipse cx="112" cy="42" rx="10" ry="3.5" fill="#fffbe6"/>
        <circle cx="114" cy="66" r="1.5" fill="#ffffff" opacity="0.9" class="champagne-bubble cb1"/>
        <circle cx="110" cy="54" r="1.8" fill="#ffffff" opacity="0.9" class="champagne-bubble cb2"/>
        <circle cx="115" cy="46" r="1.2" fill="#ffffff" opacity="0.9" class="champagne-bubble cb3"/>
        <path d="M104 30 C103 45, 106 65, 111 76" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>
      </g>
    </svg>
  `;

  // 7. New Year Gala Top Hat Logo SVG
  const NEWYEAR_LOGO_SVG = `
    <svg viewBox="0 0 80 70" class="newyear-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(15, 6)">
        <ellipse cx="25" cy="46" rx="26" ry="8" fill="#ffd700" stroke="#fffae0" stroke-width="1.5" filter="drop-shadow(0 0 6px rgba(255,215,0,0.85))"/>
        <path d="M12 44 L14 16 L36 16 L38 44 Z" fill="#14141e" stroke="#ffd700" stroke-width="1.8"/>
        <rect x="13" y="36" width="24" height="6" fill="#ffd700"/>
        <ellipse cx="25" cy="16" rx="11" ry="4" fill="#ffd700"/>
        <circle cx="20" cy="24" r="1.5" fill="#00f2fe"/>
        <circle cx="26" cy="28" r="1.8" fill="#ffffff"/>
        <circle cx="31" cy="23" r="1.5" fill="#ffd700"/>
      </g>
    </svg>
  `;

  // 8. Flying Cupid SVG
  const CUPID_SVG = `
    <svg viewBox="0 0 140 100" class="cupid-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="14" rx="15" ry="4" stroke="#ffd700" stroke-width="2.5" fill="none" filter="drop-shadow(0 0 6px #ffd700)"/>
      <path class="cupid-wing cupid-wing--left" d="M52 38 C35 15, 15 22, 10 38 C8 48, 22 55, 48 48 Z" fill="#ffffff" stroke="#ffccd5" stroke-width="1.5" filter="drop-shadow(0 0 6px rgba(255,255,255,0.7))"/>
      <path class="cupid-wing cupid-wing--right" d="M68 36 C80 12, 102 18, 108 34 C112 46, 95 54, 72 46 Z" fill="#ffffff" stroke="#ffccd5" stroke-width="1.5" filter="drop-shadow(0 0 6px rgba(255,255,255,0.7))"/>
      <circle cx="65" cy="30" r="13" fill="#ffe0bd"/>
      <path d="M56 38 C56 38, 52 64, 65 66 C78 64, 74 38, 74 38 Z" fill="#ffd1a9"/>
      <path d="M54 54 C58 50, 72 50, 76 54 C74 65, 56 65, 54 54 Z" fill="#ffffff" opacity="0.95"/>
      <circle cx="61" cy="30" r="1.8" fill="#5c3d2e"/>
      <circle cx="69" cy="30" r="1.8" fill="#5c3d2e"/>
      <path d="M63 35 Q65 37 67 35" stroke="#e06d75" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <circle cx="58" cy="32" r="2.2" fill="#ff758c" opacity="0.7"/>
      <circle cx="72" cy="32" r="2.2" fill="#ff758c" opacity="0.7"/>
      <path d="M78 28 Q96 46 82 68" stroke="#ffd700" stroke-width="3" stroke-linecap="round" fill="none" filter="drop-shadow(0 0 4px #ffd700)"/>
      <line x1="78" y1="28" x2="82" y2="68" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
      <line x1="60" y1="48" x2="104" y2="48" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M104 48 C104 45, 110 42, 113 46 C115 48, 115 50, 113 52 C110 55, 104 52, 104 48 Z" fill="#ff0055" filter="drop-shadow(0 0 6px #ff0055)"/>
      <path d="M58 45 L62 48 L58 51 M62 45 L66 48 L62 51" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

  // 9. Chocolate Box Card Decoration
  const CHOCOLATE_BOX_CARD_HTML = `
    <div class="festive-card-bonbon-ribbon" aria-hidden="true">
      <div class="bonbon-ribbon-stripe"></div>
      <div class="bonbon-ribbon-bow">
        <svg viewBox="0 0 50 32" class="bonbon-bow-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 16 C12 6, 2 12, 10 20 C18 28, 24 18, 25 16 Z" fill="#d90429" stroke="#ffd700" stroke-width="1.2"/>
          <path d="M25 16 C38 6, 48 12, 40 20 C32 28, 26 18, 25 16 Z" fill="#d90429" stroke="#ffd700" stroke-width="1.2"/>
          <path d="M22 18 L16 30 L22 26 L26 30 L24 18 Z" fill="#c1121f"/>
          <path d="M28 18 L34 30 L28 26 L24 30 L26 18 Z" fill="#c1121f"/>
          <path d="M25 19 C25 19, 21 15, 21 13 C21 11, 23 9, 25 11 C27 9, 29 11, 29 13 C29 15, 25 19, 25 19 Z" fill="#ffd700" filter="drop-shadow(0 0 3px #ffd700)"/>
        </svg>
      </div>
      <div class="bonbon-trio">
        <div class="bonbon bonbon--heart" title="Bombón corazón chocolate oscuro">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 21 C12 21 3 14 3 8.5 C3 5 5.5 3 8.5 3 C10.5 3 11.5 4 12 5 C12.5 4 13.5 3 15.5 3 C18.5 3 21 5 21 8.5 C21 14 12 21 12 21 Z" fill="#3d140e" stroke="#662217" stroke-width="1.5"/><ellipse cx="8" cy="7" rx="2" ry="1" fill="rgba(255,255,255,0.4)"/></svg>
        </div>
        <div class="bonbon bonbon--gold" title="Trufa real con envoltura dorada">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#ffd700" stroke="#b45309" stroke-width="1.2"/><path d="M8 7 L12 12 L16 7 M7 14 L12 12 L17 14" stroke="#fffae0" stroke-width="1" opacity="0.85"/></svg>
        </div>
        <div class="bonbon bonbon--swirl" title="Trufa chocolate blanco y fresa">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#fff5f5" stroke="#fecdd3" stroke-width="1.2"/><path d="M6 12 Q12 7 18 12 Q12 17 6 12" stroke="#ff0055" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="12" cy="12" r="1.5" fill="#ff0055"/></svg>
        </div>
      </div>
    </div>
  `;

  // 10. Heart Bonbon Box (Interactive Clickable Item)
  const BONBON_BOX_SVG = `
    <svg viewBox="0 0 60 60" fill="none" class="bonbon-box-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 52 C30 52, 8 36, 8 20 C8 11, 16 6, 23 8 C27 9, 29 12, 30 14 C31 12, 33 9, 37 8 C44 6, 52 11, 52 20 C52 36, 30 52, 30 52 Z" fill="#c1121f" stroke="#ffd700" stroke-width="2" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))"/>
      <path d="M30 48 C30 48, 12 34, 12 21 C12 14, 18 9, 24 11 C27 12, 29 14, 30 16 C31 14, 33 12, 36 11 C42 9, 48 14, 48 21 C48 34, 30 48, 30 48 Z" fill="#d90429"/>
      <path d="M12 28 Q30 34 48 28" stroke="#ffd700" stroke-width="3" fill="none"/>
      <path d="M30 14 L30 48" stroke="#ffd700" stroke-width="3"/>
      <circle cx="30" cy="30" r="4.5" fill="#ffd700" filter="drop-shadow(0 0 4px #ffd700)"/>
      <ellipse cx="25" cy="28" rx="4" ry="2.5" fill="#ffd700" transform="rotate(-25 25 28)"/>
      <ellipse cx="35" cy="28" rx="4" ry="2.5" fill="#ffd700" transform="rotate(25 35 28)"/>
    </svg>
  `;

  // 11. Winged Cupid Heart Logo SVG
  const VALENTINE_LOGO_SVG = `
    <svg viewBox="0 0 80 60" class="valentine-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 30 C18 14, 4 20, 2 32 C8 38, 22 36, 30 32 Z" fill="#ffffff" stroke="#ffccd5" stroke-width="1.2" filter="drop-shadow(0 0 5px rgba(255,105,180,0.6))"/>
      <path d="M50 30 C62 14, 76 20, 78 32 C72 38, 58 36, 50 32 Z" fill="#ffffff" stroke="#ffccd5" stroke-width="1.2" filter="drop-shadow(0 0 5px rgba(255,105,180,0.6))"/>
      <path d="M40 46 C40 46, 26 36, 26 26 C26 20, 30 16, 35 16 C38 16, 39 18, 40 19 C41 18, 42 16, 45 16 C50 16, 54 20, 54 26 C54 36, 40 46, 40 46 Z" fill="#ff0055" filter="drop-shadow(0 0 8px #ff0055)"/>
      <line x1="18" y1="44" x2="62" y2="18" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="62,18 57,22 59,25" fill="#ffd700"/>
    </svg>
  `;

  // 12. Flaming Pumpkin
  const FLAMING_PUMPKIN_SVG = `
    <svg viewBox="0 0 110 100" class="flaming-pumpkin-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#ff3300"/>
          <stop offset="40%" stop-color="#ff9900"/>
          <stop offset="70%" stop-color="#ffff00"/>
          <stop offset="100%" stop-color="#00ff66"/>
        </linearGradient>
      </defs>
      <g class="fire-tongues">
        <path d="M25,60 Q15,35 30,20 Q35,40 45,15 Q55,45 65,10 Q70,40 85,25 Q95,45 85,65 Z" fill="url(#flameGrad)" opacity="0.85"/>
        <path d="M35,65 Q28,45 40,30 Q48,50 58,25 Q68,52 75,32 Q82,50 78,65 Z" fill="#ffff33" opacity="0.9"/>
      </g>
      <g transform="translate(5, 12)">
        <ellipse cx="50" cy="54" rx="40" ry="30" fill="#ff6a00"/>
        <ellipse cx="32" cy="54" rx="25" ry="28" fill="#f77f00"/>
        <ellipse cx="68" cy="54" rx="25" ry="28" fill="#f77f00"/>
        <ellipse cx="50" cy="54" rx="19" ry="30" fill="#ff9e00"/>
        <path d="M48,22 C48,15 56,15 54,26 Z" fill="#2d6a4f"/>
        <polygon points="34,44 42,50 30,52" fill="#00ff66" filter="drop-shadow(0 0 4px #00ff66)"/>
        <polygon points="66,44 70,52 58,50" fill="#00ff66" filter="drop-shadow(0 0 4px #00ff66)"/>
        <polygon points="47,54 53,54 50,60" fill="#ffff00"/>
        <path d="M28,66 Q50,82 72,66 Q64,74 50,74 Q36,74 28,66 Z" fill="#00ff66" filter="drop-shadow(0 0 6px #00ff66)"/>
        <polygon points="36,68 40,73 44,68" fill="#120204"/>
        <polygon points="56,68 60,73 64,68" fill="#120204"/>
      </g>
      <circle cx="28" cy="18" r="2.5" fill="#00ff66" class="fire-spark sp1"/>
      <circle cx="62" cy="8" r="3" fill="#ffff00" class="fire-spark sp2"/>
      <circle cx="82" cy="22" r="2.2" fill="#ff9900" class="fire-spark sp3"/>
    </svg>
  `;

  // 13. Jason Voorhees Hockey Mask SVG
  const JASON_MASK_SVG = `
    <svg viewBox="0 0 80 90" class="jason-mask-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="46" rx="32" ry="40" fill="#e8e4d9" stroke="#b0a898" stroke-width="2" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.7))"/>
      <polygon points="40,22 34,14 46,14" fill="#c1121f"/>
      <polygon points="20,44 26,48 18,52" fill="#c1121f"/>
      <polygon points="60,44 54,48 62,52" fill="#c1121f"/>
      <ellipse cx="28" cy="38" rx="7" ry="5.5" fill="#0d0d0d"/>
      <ellipse cx="52" cy="38" rx="7" ry="5.5" fill="#0d0d0d"/>
      <g fill="#2b2b2b">
        <circle cx="36" cy="52" r="1.6"/> <circle cx="44" cy="52" r="1.6"/>
        <circle cx="32" cy="58" r="1.6"/> <circle cx="40" cy="58" r="1.6"/> <circle cx="48" cy="58" r="1.6"/>
        <circle cx="34" cy="64" r="1.6"/> <circle cx="40" cy="64" r="1.6"/> <circle cx="46" cy="64" r="1.6"/>
        <circle cx="36" cy="70" r="1.6"/> <circle cx="44" cy="70" r="1.6"/>
      </g>
    </svg>
  `;

  // 14. Ghostface Scream Mask SVG
  const GHOSTFACE_MASK_SVG = `
    <svg viewBox="0 0 80 100" class="ghostface-mask-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,90 C8,40 18,10 40,8 C62,10 72,40 68,90 Z" fill="#0a0a0c" stroke="#1f1f24" stroke-width="2"/>
      <path d="M20,40 C18,22 28,16 40,16 C52,16 62,22 60,40 C58,62 54,82 40,84 C26,82 22,62 20,40 Z" fill="#f8f9fa" filter="drop-shadow(0 0 8px rgba(255,255,255,0.4))"/>
      <ellipse cx="31" cy="38" rx="6" ry="10" fill="#050505" transform="rotate(-10 31 38)"/>
      <ellipse cx="49" cy="38" rx="6" ry="10" fill="#050505" transform="rotate(10 49 38)"/>
      <ellipse cx="38" cy="52" rx="1.5" ry="3" fill="#1a1a1a"/>
      <ellipse cx="42" cy="52" rx="1.5" ry="3" fill="#1a1a1a"/>
      <ellipse cx="40" cy="68" rx="5.5" ry="14" fill="#050505"/>
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
    const month = now.getMonth() + 1;
    const day = now.getDate();

    if ((month === 12 && day >= 29) || (month === 1 && day <= 3)) return 'newyear';
    if (month === 12 || (month === 1 && day <= 6)) return 'christmas';
    if ((month === 10 && day >= 15) || (month === 11 && day <= 2)) return 'halloween';
    if (month === 2 && day >= 1 && day <= 16) return 'valentine';

    return 'none';
  }

  function getActiveHolidayId() {
    const visitorOverride = sessionStorage.getItem(OVERRIDE_KEY);
    if (visitorOverride && HOLIDAY_DATA[visitorOverride]) return visitorOverride;
    const settings = loadSettings();
    if (settings.mode === 'auto') return detectCalendarHoliday();
    return settings.mode || 'none';
  }

  // ── Rich Canvas Particle, Fireworks & Flames Engine ──
  let canvas = null;
  let ctx = null;
  let particles = [];
  let sparkles = [];
  let fireworkRockets = [];
  let fireworkSparks = [];
  let flameParticles = [];
  let lastRocketSpawn = 0;
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
      if (holidayId === 'newyear') {
        explodeFirework(e.clientX, e.clientY);
      }
    }, { passive: true });
  }

  function getSparkleColor(holidayId) {
    if (holidayId === 'christmas') {
      const c = ['#ffffff', '#00f2fe', '#ffd700', '#ff2233', '#10b981'];
      return c[Math.floor(Math.random() * c.length)];
    }
    if (holidayId === 'halloween') {
      const c = ['#00ff66', '#ff6a00', '#a855f7', '#ffff00', '#76ff03'];
      return c[Math.floor(Math.random() * c.length)];
    }
    if (holidayId === 'newyear') {
      const c = ['#ffd700', '#ffffff', '#00f2fe', '#f59e0b', '#c084fc'];
      return c[Math.floor(Math.random() * c.length)];
    }
    if (holidayId === 'valentine') {
      const c = ['#ff0055', '#ff4d6d', '#ffd700', '#ffffff', '#ff758c'];
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
    const count = holidayId === 'newyear' ? 28 : (holidayId === 'valentine' ? 20 : 16);
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

  // ── Fireworks Physics Engine ──
  const FIREWORK_COLORS = ['#ffd700', '#00f2fe', '#ff0055', '#22c55e', '#ffffff', '#c084fc', '#f59e0b', '#38bdf8'];

  function getRandomFireworkColor() {
    return FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
  }

  function launchFirework(startX, startY, targetX, targetY, color) {
    if (fireworkRockets.length > 5) return;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const speed = Math.random() * 3 + 13;
    const angle = Math.atan2(dy, dx);

    fireworkRockets.push({
      x: startX,
      y: startY,
      targetY: targetY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: color || getRandomFireworkColor(),
      trail: []
    });
  }

  function explodeFirework(x, y, color) {
    const count = Math.floor(Math.random() * 25 + 50);
    const mainColor = color || getRandomFireworkColor();
    const secondaryColor = getRandomFireworkColor();
    const isMultiColor = Math.random() > 0.35;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.2 + 1.8;
      fireworkSparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: isMultiColor && Math.random() > 0.5 ? secondaryColor : mainColor,
        size: Math.random() * 2.8 + 1.6,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        gravity: 0.065,
        friction: 0.965,
        flicker: Math.random() > 0.3
      });
    }
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

  function createFlamesAndBats(count) {
    flameParticles = [];
    const flamesCount = Math.floor(count * 1.5);
    const flameColors = ['#00ff66', '#10b981', '#ff6a00', '#ffd600', '#a855f7'];

    for (let i = 0; i < flamesCount; i++) {
      flameParticles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 2.2 + 1.2),
        size: Math.random() * 6 + 3,
        color: flameColors[Math.floor(Math.random() * flameColors.length)],
        alpha: Math.random() * 0.5 + 0.5,
        decay: Math.random() * 0.015 + 0.008,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.04 + 0.02
      });
    }

    const bats = [];
    for (let i = 0; i < 14; i++) {
      bats.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.6),
        size: Math.random() * 8 + 10,
        vx: (Math.random() * 1.2 + 0.8) * (Math.random() > 0.5 ? 1 : -1),
        vy: Math.random() * 0.8 - 0.4,
        wingPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.4
      });
    }
    return bats;
  }

  function createHearts(count) {
    const hearts = [];
    const colors = ['#ff0055', '#ff4d6d', '#ffd700', '#ff758c', '#ffffff'];
    for (let i = 0; i < count; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 12 + 8,
        vy: -(Math.random() * 1.3 + 0.6),
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.025 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.03,
        opacity: Math.random() * 0.5 + 0.45,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return hearts;
  }

  function startParticles(type) {
    initCanvas();
    canvasParticleType = type;
    const isMobile = window.innerWidth < 768;

    particles = [];
    sparkles = [];
    fireworkRockets = [];
    fireworkSparks = [];
    flameParticles = [];

    if (type === 'snow') {
      particles = createSnowFlakes(Math.floor(window.innerWidth / 6));
    } else if (type === 'flames' || type === 'bats') {
      particles = createFlamesAndBats(Math.floor(window.innerWidth / 15));
    } else if (type === 'fireworks') {
      for (let i = 0; i < Math.floor(window.innerWidth / 15); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          w: Math.random() * 4 + 2,
          h: Math.random() * 4 + 2,
          vy: Math.random() * 0.8 + 0.4,
          vx: Math.random() * 0.6 - 0.3,
          color: Math.random() > 0.4 ? '#ffd700' : '#00f2fe',
          alpha: Math.random() * 0.6 + 0.3
        });
      }
    } else if (type === 'hearts') {
      particles = createHearts(Math.floor(window.innerWidth / 15));
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
    fireworkRockets = [];
    fireworkSparks = [];
    flameParticles = [];
    canvasParticleType = 'none';
  }

  function drawHeart(ctx, x, y, size, color, opacity, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 1.5;
    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, -d / 4);
    ctx.bezierCurveTo(-d / 2, -d, -d, -d / 3, 0, d / 2);
    ctx.bezierCurveTo(d, -d / 3, d / 2, -d, 0, -d / 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
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

  function drawBat(ctx, x, y, size, vx, wingPhase, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(vx > 0 ? 1 : -1, 1);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#0a140d';
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 1.2;

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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    windForce *= 0.96;

    // 1. SNOWFALL (Christmas)
    if (canvasParticleType === 'snow') {
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * p.swayWidth + windForce;
        p.y += p.speed;

        if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
        if (p.x > w + 10) p.x = -10;
        if (p.x < -10) p.x = w + 10;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        if (p.isPixel) {
          ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
        } else {
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 2. FLAMES & EMBERS (Halloween)
    else if (canvasParticleType === 'flames' || canvasParticleType === 'bats') {
      for (let i = 0; i < flameParticles.length; i++) {
        const fp = flameParticles[i];
        fp.swayAngle += fp.swaySpeed;
        fp.x += Math.sin(fp.swayAngle) * 1.2 + fp.vx;
        fp.y += fp.vy;
        fp.alpha -= fp.decay;

        if (fp.alpha <= 0 || fp.y < -20) {
          fp.y = h + 20;
          fp.x = Math.random() * w;
          fp.alpha = Math.random() * 0.5 + 0.5;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, fp.alpha);
        ctx.fillStyle = fp.color;
        ctx.shadowColor = fp.color;
        ctx.shadowBlur = fp.size * 2;
        ctx.beginPath();
        ctx.arc(fp.x, fp.y, fp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
    }

    // 3. FIREWORKS (New Year)
    else if (canvasParticleType === 'fireworks') {
      const now = performance.now();
      if (now - lastRocketSpawn > (Math.random() * 900 + 1100)) {
        lastRocketSpawn = now;
        const startX = Math.random() * (w * 0.8) + (w * 0.1);
        const targetX = startX + (Math.random() * 80 - 40);
        const targetY = Math.random() * (h * 0.38) + (h * 0.1);
        launchFirework(startX, h + 10, targetX, targetY);
      }

      for (let i = fireworkRockets.length - 1; i >= 0; i--) {
        const r = fireworkRockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.05;

        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8 * (t / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = (t / r.trail.length) * 0.6;
          ctx.fill();
          ctx.restore();
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();

        if (r.y <= r.targetY || r.vy >= 0) {
          explodeFirework(r.x, r.y, r.color);
          fireworkRockets.splice(i, 1);
        }
      }

      for (let i = fireworkSparks.length - 1; i >= 0; i--) {
        const s = fireworkSparks[i];
        s.vx *= s.friction;
        s.vy = s.vy * s.friction + s.gravity;
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          fireworkSparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.flicker && Math.random() > 0.4 ? s.alpha * 0.6 : s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size * 2.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += p.vx + windForce * 0.4;
        if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.restore();
      }
    }

    // 4. FLOATING HEARTS (Valentine)
    else if (canvasParticleType === 'hearts') {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.swayAngle += p.swaySpeed;
        p.pulseAngle += p.pulseSpeed;
        p.x += Math.sin(p.swayAngle) * 0.8 + windForce * 0.5;

        if (p.y < -30) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }

        const scale = 1 + Math.sin(p.pulseAngle) * 0.15;
        drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, scale);
      }
    }

    // Cursor Sparkles & Burst Particles
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

  // 0. Christmas Snowy Mountains Backdrop
  function updateChristmasMountains(holiday) {
    const existing = document.getElementById('festiveMountainsBackdrop');
    if (existing) existing.remove();

    if (holiday.id === 'christmas') {
      const backdrop = document.createElement('div');
      backdrop.id = 'festiveMountainsBackdrop';
      backdrop.className = 'festive-mountains-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      backdrop.innerHTML = CHRISTMAS_MOUNTAINS_SVG;
      document.body.prepend(backdrop);
    }
  }

  // 1. Header Lights Garland with Wind Sway in ALL Styles
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
      bulb.style.animationDelay = `${(i * 0.18) % 1.6}s`;
      garland.appendChild(bulb);
    }

    header.appendChild(garland);
  }

  // 2. Logo Emblem Centered on Logos
  function updateLogoEmblem(holiday) {
    document.querySelectorAll('.festive-logo-hat, .festive-hero-hat, .festive-logo-pumpkin, .festive-hero-pumpkin, .festive-logo-newyear, .festive-hero-newyear, .festive-logo-valentine, .festive-hero-valentine').forEach(el => el.remove());

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
        p.innerHTML = FLAMING_PUMPKIN_SVG;
        logoX.appendChild(p);
      }
      if (heroWrap) {
        heroWrap.style.position = 'relative';
        const heroP = document.createElement('div');
        heroP.className = 'festive-hero-pumpkin';
        heroP.setAttribute('aria-hidden', 'true');
        heroP.innerHTML = FLAMING_PUMPKIN_SVG;
        heroWrap.appendChild(heroP);
      }
    } else if (holiday.id === 'newyear') {
      if (logoX) {
        logoX.style.position = 'relative';
        logoX.style.display = 'inline-block';
        const ny = document.createElement('div');
        ny.className = 'festive-logo-newyear';
        ny.setAttribute('aria-hidden', 'true');
        ny.innerHTML = NEWYEAR_LOGO_SVG;
        logoX.appendChild(ny);
      }
      if (heroWrap) {
        heroWrap.style.position = 'relative';
        const heroNy = document.createElement('div');
        heroNy.className = 'festive-hero-newyear';
        heroNy.setAttribute('aria-hidden', 'true');
        heroNy.innerHTML = NEWYEAR_LOGO_SVG;
        heroWrap.appendChild(heroNy);
      }
    } else if (holiday.id === 'valentine') {
      if (logoX) {
        logoX.style.position = 'relative';
        logoX.style.display = 'inline-block';
        const v = document.createElement('div');
        v.className = 'festive-logo-valentine';
        v.setAttribute('aria-hidden', 'true');
        v.innerHTML = VALENTINE_LOGO_SVG;
        logoX.appendChild(v);
      }
      if (heroWrap) {
        heroWrap.style.position = 'relative';
        const heroV = document.createElement('div');
        heroV.className = 'festive-hero-valentine';
        heroV.setAttribute('aria-hidden', 'true');
        heroV.innerHTML = VALENTINE_LOGO_SVG;
        heroWrap.appendChild(heroV);
      }
    }
  }

  // 3. Card Decorations (Snowcaps, Chocolate Box Bonbons)
  function updateCardDecorations(holiday) {
    document.querySelectorAll('.festive-card-snowcap, .festive-card-bonbon-ribbon, .festive-card-halloween-web').forEach(el => el.remove());

    const cards = document.querySelectorAll('.card');

    if (holiday.id === 'christmas') {
      cards.forEach(card => {
        const cap = document.createElement('div');
        cap.className = 'festive-card-snowcap';
        cap.setAttribute('aria-hidden', 'true');
        cap.innerHTML = SNOW_CAP_SVG;
        card.appendChild(cap);
      });
    } else if (holiday.id === 'valentine') {
      cards.forEach(card => {
        const wrap = document.createElement('div');
        wrap.innerHTML = CHOCOLATE_BOX_CARD_HTML;
        card.appendChild(wrap.firstElementChild);
      });
    }
  }

  // 4. Sky Flyers (Santa Sleigh dropping gifts & Cupid)
  let santaGiftDropTimer = null;

  function updateSkyFlyer(holiday) {
    const existingSleigh = document.querySelector('.festive-sleigh-sky');
    if (existingSleigh) existingSleigh.remove();
    const existingCupid = document.querySelector('.festive-cupid-sky');
    if (existingCupid) existingCupid.remove();
    if (santaGiftDropTimer) {
      clearInterval(santaGiftDropTimer);
      santaGiftDropTimer = null;
    }

    if (holiday.id === 'christmas') {
      const sleigh = document.createElement('div');
      sleigh.className = 'festive-sleigh-sky';
      sleigh.setAttribute('aria-hidden', 'true');
      sleigh.innerHTML = SLEIGH_SVG;
      document.body.appendChild(sleigh);

      santaGiftDropTimer = setInterval(() => {
        if (!document.body.contains(sleigh)) return;
        const rect = sleigh.getBoundingClientRect();
        if (rect.right > 50 && rect.left < window.innerWidth - 50) {
          dropSantaGift(rect.left + 50, rect.top + 30);
        }
      }, 3600);
    } else if (holiday.id === 'valentine') {
      const cupid = document.createElement('div');
      cupid.className = 'festive-cupid-sky';
      cupid.setAttribute('aria-hidden', 'true');
      cupid.innerHTML = CUPID_SVG;
      document.body.appendChild(cupid);
    }
  }

  function dropSantaGift(startX, startY) {
    const gift = document.createElement('div');
    gift.className = 'festive-dropped-gift';
    gift.style.left = `${startX}px`;
    gift.style.top = `${startY}px`;
    gift.innerHTML = GIFT_BOX_SVG;
    document.body.appendChild(gift);

    setTimeout(() => {
      if (document.body.contains(gift)) {
        addClickBurst(startX + 15, window.innerHeight - 80, 'christmas');
        gift.remove();
      }
    }, 4000);
  }

  // 5. Interactive Celebrations & Mascots Across Screen
  function updateInteractiveCelebrations(holiday) {
    document.querySelectorAll('.festive-gift-item, .festive-cheers-item, .festive-bonbon-item, .festive-horror-item').forEach(el => el.remove());

    const hero = document.querySelector('.hero') || document.getElementById('inicio');
    const progTitle = document.querySelector('#programas .section__title');
    const toolTitle = document.querySelector('#herramientas .section__title');

    // ── CHRISTMAS ──
    if (holiday.id === 'christmas') {
      if (hero) {
        const giftHero = document.createElement('div');
        giftHero.className = 'festive-gift-item festive-gift-hero';
        giftHero.title = '¡Abrir regalo navideño!';
        giftHero.innerHTML = GIFT_BOX_SVG;
        hero.appendChild(giftHero);
        giftHero.addEventListener('click', (e) => triggerGreetingToast('christmas', giftHero, e.clientX, e.clientY));
      }
      if (progTitle) {
        const giftProg = document.createElement('span');
        giftProg.className = 'festive-gift-item festive-gift-section';
        giftProg.title = '¡Abrir sorpresa!';
        giftProg.innerHTML = GIFT_BOX_SVG;
        progTitle.appendChild(giftProg);
        giftProg.addEventListener('click', (e) => { e.stopPropagation(); triggerGreetingToast('christmas', giftProg, e.clientX, e.clientY); });
      }
      if (toolTitle) {
        const giftTool = document.createElement('span');
        giftTool.className = 'festive-gift-item festive-gift-section';
        giftTool.title = '¡Abrir sorpresa!';
        giftTool.innerHTML = GIFT_BOX_SVG;
        toolTitle.appendChild(giftTool);
        giftTool.addEventListener('click', (e) => { e.stopPropagation(); triggerGreetingToast('christmas', giftTool, e.clientX, e.clientY); });
      }
    }

    // ── NEW YEAR (Copas Brindando) ──
    else if (holiday.id === 'newyear') {
      if (hero) {
        const cheersHero = document.createElement('div');
        cheersHero.className = 'festive-cheers-item festive-cheers-hero';
        cheersHero.title = '¡Brindar por el Año Nuevo!';
        cheersHero.innerHTML = TOASTING_GLASSES_SVG;
        hero.appendChild(cheersHero);
        cheersHero.addEventListener('click', (e) => {
          explodeFirework(e.clientX, e.clientY);
          triggerGreetingToast('newyear', cheersHero, e.clientX, e.clientY);
        });
      }
      if (progTitle) {
        const cheersProg = document.createElement('span');
        cheersProg.className = 'festive-cheers-item festive-cheers-section';
        cheersProg.title = '¡Brindar!';
        cheersProg.innerHTML = TOASTING_GLASSES_SVG;
        progTitle.appendChild(cheersProg);
        cheersProg.addEventListener('click', (e) => {
          e.stopPropagation();
          explodeFirework(e.clientX, e.clientY);
          triggerGreetingToast('newyear', cheersProg, e.clientX, e.clientY);
        });
      }
      if (toolTitle) {
        const cheersTool = document.createElement('span');
        cheersTool.className = 'festive-cheers-item festive-cheers-section';
        cheersTool.title = '¡Brindar!';
        cheersTool.innerHTML = TOASTING_GLASSES_SVG;
        toolTitle.appendChild(cheersTool);
        cheersTool.addEventListener('click', (e) => {
          e.stopPropagation();
          explodeFirework(e.clientX, e.clientY);
          triggerGreetingToast('newyear', cheersTool, e.clientX, e.clientY);
        });
      }
    }

    // ── VALENTINE (Caja de Bombones) ──
    else if (holiday.id === 'valentine') {
      if (hero) {
        const bonbonHero = document.createElement('div');
        bonbonHero.className = 'festive-bonbon-item festive-bonbon-hero';
        bonbonHero.title = '¡Abrir caja de bombones!';
        bonbonHero.innerHTML = BONBON_BOX_SVG;
        hero.appendChild(bonbonHero);
        bonbonHero.addEventListener('click', (e) => triggerGreetingToast('valentine', bonbonHero, e.clientX, e.clientY));
      }
      if (progTitle) {
        const bonbonProg = document.createElement('span');
        bonbonProg.className = 'festive-bonbon-item festive-bonbon-section';
        bonbonProg.title = '¡Bombón sorpresa!';
        bonbonProg.innerHTML = BONBON_BOX_SVG;
        progTitle.appendChild(bonbonProg);
        bonbonProg.addEventListener('click', (e) => { e.stopPropagation(); triggerGreetingToast('valentine', bonbonProg, e.clientX, e.clientY); });
      }
      if (toolTitle) {
        const bonbonTool = document.createElement('span');
        bonbonTool.className = 'festive-bonbon-item festive-bonbon-section';
        bonbonTool.title = '¡Bombón sorpresa!';
        bonbonTool.innerHTML = BONBON_BOX_SVG;
        toolTitle.appendChild(bonbonTool);
        bonbonTool.addEventListener('click', (e) => { e.stopPropagation(); triggerGreetingToast('valentine', bonbonTool, e.clientX, e.clientY); });
      }
    }

    // ── HALLOWEEN (Calabaza en llamas y Máscaras de terror) ──
    else if (holiday.id === 'halloween') {
      if (hero) {
        const pumpkinHero = document.createElement('div');
        pumpkinHero.className = 'festive-horror-item festive-pumpkin-flame';
        pumpkinHero.title = '¡Cuidado con la calabaza en llamas!';
        pumpkinHero.innerHTML = FLAMING_PUMPKIN_SVG;
        hero.appendChild(pumpkinHero);
        pumpkinHero.addEventListener('click', (e) => triggerGreetingToast('halloween', pumpkinHero, e.clientX, e.clientY));
      }
      if (progTitle) {
        const maskProg = document.createElement('span');
        maskProg.className = 'festive-horror-item festive-mask-section';
        maskProg.title = 'Máscara de Jason Voorhees';
        maskProg.innerHTML = JASON_MASK_SVG;
        progTitle.appendChild(maskProg);
        maskProg.addEventListener('click', (e) => { e.stopPropagation(); triggerGreetingToast('halloween', maskProg, e.clientX, e.clientY); });
      }
      if (toolTitle) {
        const maskTool = document.createElement('span');
        maskTool.className = 'festive-horror-item festive-mask-section';
        maskTool.title = 'Máscara de Ghostface';
        maskTool.innerHTML = GHOSTFACE_MASK_SVG;
        toolTitle.appendChild(maskTool);
        maskTool.addEventListener('click', (e) => { e.stopPropagation(); triggerGreetingToast('halloween', maskTool, e.clientX, e.clientY); });
      }
    }
  }

  function triggerGreetingToast(theme, element, x, y) {
    addClickBurst(x, y, theme);

    const toasts = {
      christmas: [
        '🎁 ¡Felicidades! Que tu código nunca crashee y compile a la primera.',
        '🎄 ¡Felices Fiestas! 100% optimizado y sin bugs para el nuevo año.',
        '⚡ ¡Regalo XAOXAY: Diagnóstico y velocidad al máximo para tu PC!',
        '✨ ¡Que todos tus proyectos alcancen el éxito en 2027!'
      ],
      newyear: [
        '🥂 ¡Salud! ¡Brindamos por código limpio, 0 bugs y proyectos exitosos!',
        '🍾 ¡Por un próspero año nuevo! Rendimiento al 100% y cero caídas.',
        '🎆 ¡Que este año todas tus soluciones compilen a la primera!',
        '✨ ¡Salud y felicidad! Gracias por formar parte de XAOXAY.'
      ],
      valentine: [
        '🍫 ¡Caja abierta! Sos el CSS de mi HTML: sin vos nada tiene estilo.',
        '💖 Si fueras un commit, nunca te haría rebase: sos perfecto tal como sos.',
        '💘 Mi amor por el buen código tiene uptime del 99.999% garantizado.',
        '💌 Te quiero más que a un build exitoso sin warnings.'
      ],
      halloween: [
        '🎃 ¡Cuidado! Un bug no resuelto ha vuelto de entre los muertos...',
        '🩸 404: Tu código no fue encontrado en el cementerio de Git.',
        '💀 ¡Pánico en el kernel! Pero XaoSuite lo repara todo al instante.',
        '🦇 ¡Código oscuro, terminal verde y rendimiento monstruoso!'
      ]
    };

    const list = toasts[theme] || toasts.christmas;
    const msg = list[Math.floor(Math.random() * list.length)];

    let toast = document.createElement('div');
    toast.className = 'festive-banner visible';
    toast.style.top = '120px';
    const icon = theme === 'newyear' ? '🥂' : (theme === 'valentine' ? '🍫' : (theme === 'halloween' ? '🎃' : '🎁'));
    toast.innerHTML = `<span class="festive-banner__icon">${icon}</span><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // 6. Mascots
  function updateFestiveMascot(holiday) {
    const existing = document.querySelector('.festive-pixel-mascot');
    if (existing) existing.remove();

    const heroContent = document.querySelector('.hero__content');
    if (!heroContent) return;

    if (holiday.id === 'christmas') {
      const mascot = document.createElement('div');
      mascot.className = 'festive-pixel-mascot';
      mascot.title = 'Árbol navideño 8-bit';
      mascot.innerHTML = PIXEL_XMAS_TREE_SVG;
      heroContent.appendChild(mascot);
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
      const popover = widget.querySelector('#festiveWidgetPopover');

      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        widget.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
          widget.classList.remove('open');
        }
      });

      popover.querySelectorAll('.festive-widget__btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = btn.dataset.holiday;
          if (selected === 'auto') {
            sessionStorage.removeItem(OVERRIDE_KEY);
          } else {
            sessionStorage.setItem(OVERRIDE_KEY, selected);
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

    if (holiday.id !== 'none') {
      document.body.setAttribute('data-festivity', holiday.id);
    } else {
      document.body.removeAttribute('data-festivity');
    }

    if (settings.particles && holiday.particleType !== 'none') {
      startParticles(holiday.particleType);
    } else {
      stopParticles();
    }

    updateChristmasMountains(holiday);
    updateHeaderLights(holiday);
    updateLogoEmblem(holiday);
    updateGreetingBanner(holiday);
    updateVisitorWidget(holiday);
    updateCardDecorations(holiday);
    updateSkyFlyer(holiday);
    updateInteractiveCelebrations(holiday);
    updateFestiveMascot(holiday);

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
    } else if (holidayId === 'valentine') {
      const cardsWithoutRibbon = document.querySelectorAll('.card:not(:has(.festive-card-bonbon-ribbon))');
      cardsWithoutRibbon.forEach(card => {
        const wrap = document.createElement('div');
        wrap.innerHTML = CHOCOLATE_BOX_CARD_HTML;
        card.appendChild(wrap.firstElementChild);
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

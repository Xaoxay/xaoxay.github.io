/* ═══════════════════════════════════════════════
   XAOXAY — Admin Dashboard Controller
   Authentication, Program CRUD, Live Preview & Export
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Keys & Constants ──
  const STORAGE_KEY = 'xaoxay_items_v4';
  const CATEGORIES_KEY = 'xaoxay_custom_categories';
  const PIN_KEY = 'xaoxay_pin';
  const AUTH_KEY = 'xaoxay_admin_token';
  const DEFAULT_PIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';

  const DEFAULT_CATEGORIES = [
    {
      id: 'programas',
      name: 'Programas',
      desc: 'Suites y aplicaciones completas para potenciar y optimizar tu PC.'
    },
    {
      id: 'herramientas',
      name: 'Herramientas',
      desc: 'Utilidades especializadas y scripts de mantenimiento listos para usar.'
    }
  ];

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
      url: 'descargas/XaoSuite.exe'
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
      url: 'descargas/XaoExtras.exe'
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
      url: 'descargas/XaoFocus.exe'
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
      url: 'descargas/XaoSleep.exe'
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
      url: 'descargas/XaoGame.exe'
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
      url: 'descargas/XaoGuard.exe'
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
      url: 'descargas/XaoClean.exe'
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
      url: 'descargas/XaoDoctor.exe'
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
      url: 'descargas/XaoFix.exe'
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
      url: 'descargas/XaoNet.exe'
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
      url: 'descargas/XaoOptic.exe'
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
      url: 'descargas/XaoVault.exe'
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
      url: 'descargas/XaoHub.exe'
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
      url: 'descargas/XaoToolbox.zip'
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
      url: 'descargas/XaoInstaller.zip'
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

  // ── Cryptographic helper ──
  async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getStoredPinHash() {
    return localStorage.getItem(PIN_KEY) || DEFAULT_PIN_HASH;
  }

  // ── Auth Guard ──
  const currentToken = sessionStorage.getItem(AUTH_KEY);
  if (!currentToken || currentToken !== getStoredPinHash()) {
    window.location.replace('login.html');
    return;
  }

  // ── Toast Notification System ──
  function showToast(message, type = 'success') {
    let container = document.getElementById('adminToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'adminToastContainer';
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `admin-toast admin-toast--${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('admin-toast--hide');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ── Storage Operations ──
  function getItems() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 16) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error al leer de localStorage:', e);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    } catch (e) {
      console.error('Error al inicializar localStorage:', e);
    }
    return DEFAULT_ITEMS;
  }

  function saveItems(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
      showToast('Error al guardar en el almacenamiento local: ' + e.message, 'error');
      return;
    }
    renderAll();
  }

  // ── Category System Operations ──
  function slugifyCategory(str) {
    return str
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'categoria';
  }

  function getCategories() {
    let custom = [];
    try {
      const stored = localStorage.getItem(CATEGORIES_KEY);
      if (stored) {
        custom = JSON.parse(stored);
      }
    } catch (e) {
      custom = [];
    }

    const map = new Map();
    DEFAULT_CATEGORIES.forEach(c => map.set(c.id.toLowerCase(), { ...c }));

    if (Array.isArray(custom)) {
      custom.forEach(c => {
        if (c && c.id) {
          map.set(c.id.toLowerCase(), {
            id: c.id.toLowerCase(),
            name: c.name || c.id,
            desc: c.desc || `Software y descargas de ${c.name || c.id}.`
          });
        }
      });
    }

    // Auto-detectar secciones de items que no figuren en categories
    const items = getItems();
    items.forEach(item => {
      const secId = (item.section || 'programas').trim().toLowerCase();
      if (secId && !map.has(secId)) {
        const displayName = secId.charAt(0).toUpperCase() + secId.slice(1);
        map.set(secId, {
          id: secId,
          name: displayName,
          desc: `Colección de aplicaciones y utilidades de ${displayName}.`
        });
      }
    });

    return Array.from(map.values());
  }

  function saveCategories(cats) {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
    } catch (e) {
      console.error('Error al guardar categorías en localStorage:', e);
    }
  }

  function getCategoryById(id) {
    const cleanId = (id || 'programas').trim().toLowerCase();
    const found = getCategories().find(c => c.id.toLowerCase() === cleanId);
    if (found) return found;
    const name = cleanId.charAt(0).toUpperCase() + cleanId.slice(1);
    return { id: cleanId, name, desc: `Colección de ${name} y utilidades.` };
  }

  function addOrUpdateCategory(newCat) {
    const cats = getCategories();
    const cleanId = (newCat.id || slugifyCategory(newCat.name)).toLowerCase();
    const idx = cats.findIndex(c => c.id.toLowerCase() === cleanId);
    const catObj = {
      id: cleanId,
      name: newCat.name.trim(),
      desc: (newCat.desc || '').trim() || `Colección de ${newCat.name.trim()} y utilidades.`
    };
    if (idx !== -1) {
      cats[idx] = catObj;
    } else {
      cats.push(catObj);
    }
    saveCategories(cats);
    return catObj;
  }

  function deleteCategory(catId) {
    const cleanId = (catId || '').toLowerCase();
    if (cleanId === 'programas' || cleanId === 'herramientas') return false;
    const cats = getCategories().filter(c => c.id.toLowerCase() !== cleanId);
    saveCategories(cats);
    return true;
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

  // ── DOM References ──
  const topbarTabs = document.querySelectorAll('.topbar-tab');
  const dashboardTabs = document.querySelectorAll('.dashboard-tab');
  const logoutBtn = document.getElementById('logoutBtn');
  const btnAddNewSoftware = document.getElementById('btnAddNewSoftware');

  // Metrics & Counters
  const programsCounter = document.getElementById('programsCounter');
  const metricPrograms = document.getElementById('metricPrograms');
  const metricTools = document.getElementById('metricTools');
  const metricTotal = document.getElementById('metricTotal');

  // Filters & Search
  const filterTabsContainer = document.getElementById('filterTabsContainer');
  const searchInput = document.getElementById('searchInput');
  const softwareListContainer = document.getElementById('softwareListContainer');

  // Form elements
  const softwareForm = document.getElementById('softwareForm');
  const editSoftwareId = document.getElementById('editSoftwareId');
  const formHeaderTitle = document.getElementById('formHeaderTitle');
  const titleInput = document.getElementById('titleInput');
  const sectionInput = document.getElementById('sectionInput');
  const btnToggleNewCat = document.getElementById('btnToggleNewCat');
  const newCategoryInlineBox = document.getElementById('newCategoryInlineBox');
  const inlineCatNameInput = document.getElementById('inlineCatNameInput');
  const inlineCatDescInput = document.getElementById('inlineCatDescInput');
  const btnConfirmInlineCat = document.getElementById('btnConfirmInlineCat');
  const btnCancelInlineCat = document.getElementById('btnCancelInlineCat');
  const descInput = document.getElementById('descInput');
  const versionInput = document.getElementById('versionInput');
  const platformInput = document.getElementById('platformInput');
  const iconInput = document.getElementById('iconInput');
  const downloadOriginRadios = document.querySelectorAll('input[name="downloadOrigin"]');
  const groupLocalFile = document.getElementById('groupLocalFile');
  const groupExternalUrl = document.getElementById('groupExternalUrl');
  const fileNameInput = document.getElementById('fileNameInput');
  const helperFilePicker = document.getElementById('helperFilePicker');
  const urlInput = document.getElementById('urlInput');
  const cancelFormBtn = document.getElementById('cancelFormBtn');
  const submitSoftwareBtn = document.getElementById('submitSoftwareBtn');

  // Live Preview Elements
  const previewIcon = document.getElementById('previewIcon');
  const previewTitle = document.getElementById('previewTitle');
  const previewDesc = document.getElementById('previewDesc');
  const previewMeta = document.getElementById('previewMeta');
  const previewButtons = document.getElementById('previewButtons');

  // Settings & Category Manager Elements
  const updatePinForm = document.getElementById('updatePinForm');
  const newPinInput = document.getElementById('newPinInput');
  const pinAlert = document.getElementById('pinAlert');
  const categoriesManagerList = document.getElementById('categoriesManagerList');
  const newCategoryManagerForm = document.getElementById('newCategoryManagerForm');
  const manageCatNameInput = document.getElementById('manageCatNameInput');
  const manageCatDescInput = document.getElementById('manageCatDescInput');
  const btnExportHtml = document.getElementById('btnExportHtml');
  const btnExportJson = document.getElementById('btnExportJson');
  const btnResetPrograms = document.getElementById('btnResetPrograms');

  // ── State ──
  let activeFilter = 'all';
  let searchQuery = '';

  // ── Category Dropdown & Inline Creator ──
  function populateCategorySelect(selectedId) {
    if (!sectionInput) return;
    const categories = getCategories();
    const targetId = (selectedId || (categories[0] ? categories[0].id : 'programas')).toLowerCase();

    let optionsHtml = categories.map((cat, idx) => {
      const paddedNum = String(idx + 1).padStart(2, '0');
      const isSel = cat.id.toLowerCase() === targetId ? 'selected' : '';
      return `<option value="${escapeHtml(cat.id)}" ${isSel}>${paddedNum}. ${escapeHtml(cat.name)}</option>`;
    }).join('');

    optionsHtml += `<option value="__new__">➕ Crear nueva categoría...</option>`;
    sectionInput.innerHTML = optionsHtml;

    if (newCategoryInlineBox) {
      newCategoryInlineBox.style.display = 'none';
    }
  }

  if (sectionInput) {
    sectionInput.addEventListener('change', () => {
      if (sectionInput.value === '__new__') {
        if (newCategoryInlineBox) {
          newCategoryInlineBox.style.display = 'block';
          if (inlineCatNameInput) {
            inlineCatNameInput.value = '';
            inlineCatNameInput.focus();
          }
        }
      } else {
        if (newCategoryInlineBox) newCategoryInlineBox.style.display = 'none';
      }
    });
  }

  if (btnToggleNewCat) {
    btnToggleNewCat.addEventListener('click', () => {
      if (!newCategoryInlineBox) return;
      const isOpen = newCategoryInlineBox.style.display !== 'none';
      newCategoryInlineBox.style.display = isOpen ? 'none' : 'block';
      if (!isOpen && inlineCatNameInput) {
        inlineCatNameInput.focus();
      }
    });
  }

  if (btnCancelInlineCat) {
    btnCancelInlineCat.addEventListener('click', () => {
      if (newCategoryInlineBox) newCategoryInlineBox.style.display = 'none';
      if (sectionInput && sectionInput.value === '__new__') {
        const cats = getCategories();
        sectionInput.value = cats[0] ? cats[0].id : 'programas';
      }
    });
  }

  if (btnConfirmInlineCat) {
    btnConfirmInlineCat.addEventListener('click', () => {
      const name = inlineCatNameInput ? inlineCatNameInput.value.trim() : '';
      if (!name) {
        alert('Por favor escribí el nombre de la categoría.');
        if (inlineCatNameInput) inlineCatNameInput.focus();
        return;
      }
      const slug = slugifyCategory(name);
      const desc = inlineCatDescInput ? inlineCatDescInput.value.trim() : '';
      addOrUpdateCategory({
        id: slug,
        name: name,
        desc: desc || `Colección de ${name} y utilidades.`
      });

      populateCategorySelect(slug);
      renderSoftwareList();
      renderCategoriesManager();
      showToast(`✓ Categoría "${name}" creada y seleccionada.`, 'success');
      if (inlineCatNameInput) inlineCatNameInput.value = '';
      if (inlineCatDescInput) inlineCatDescInput.value = '';
    });
  }

  if (newCategoryManagerForm) {
    newCategoryManagerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = manageCatNameInput ? manageCatNameInput.value.trim() : '';
      if (!name) return;
      const slug = slugifyCategory(name);
      const desc = manageCatDescInput ? manageCatDescInput.value.trim() : '';

      addOrUpdateCategory({
        id: slug,
        name: name,
        desc: desc || `Colección de ${name} y utilidades.`
      });

      populateCategorySelect(sectionInput ? sectionInput.value : slug);
      renderSoftwareList();
      renderCategoriesManager();
      showToast(`✓ Categoría "${name}" agregada exitosamente.`, 'success');
      newCategoryManagerForm.reset();
    });
  }

  // ── Render Category Manager in Settings ──
  function renderCategoriesManager() {
    if (!categoriesManagerList) return;
    const items = getItems();
    const categories = getCategories();

    categoriesManagerList.innerHTML = categories.map((cat, idx) => {
      const paddedIndex = String(idx + 1).padStart(2, '0');
      const count = items.filter(i => (i.section || '').toLowerCase() === cat.id.toLowerCase()).length;
      const isDefault = cat.id === 'programas' || cat.id === 'herramientas';

      return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--clr-surface-alt, #161616); border: 1px solid var(--clr-border, #2a2a2a); border-radius: 8px; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
            <span style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: var(--clr-accent, #e01020); background: rgba(224, 16, 32, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">${paddedIndex}</span>
            <div>
              <div style="font-weight: 600; font-size: 0.95rem; color: var(--clr-text); display: flex; align-items: center; gap: 0.5rem;">
                ${escapeHtml(cat.name)}
                <span style="font-size: 0.75rem; color: var(--clr-text-muted); font-weight: normal;">(id: <code>${escapeHtml(cat.id)}</code>)</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--clr-text-muted); margin-top: 0.15rem;">
                ${escapeHtml(cat.desc || 'Sin descripción')}
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span class="pill-badge" style="font-size: 0.75rem;">${count} software</span>
            <button type="button" class="admin-btn admin-btn--ghost admin-btn--sm btn-edit-category" data-id="${escapeHtml(cat.id)}" title="Editar nombre o descripción">
              ✏️ Editar
            </button>
            ${!isDefault ? `
              <button type="button" class="admin-btn admin-btn--ghost admin-btn--sm btn-delete-category" data-id="${escapeHtml(cat.id)}" style="color: #ff4444;" title="Eliminar categoría">
                🗑️
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Listeners para editar categoría
    categoriesManagerList.querySelectorAll('.btn-edit-category').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.id;
        const cat = getCategoryById(catId);
        const newName = prompt(`Modificar nombre de categoría "${cat.name}":`, cat.name);
        if (newName === null) return;
        const trimmedName = newName.trim();
        if (!trimmedName) {
          alert('El nombre no puede estar vacío.');
          return;
        }
        const newDesc = prompt(`Modificar descripción para "${trimmedName}":`, cat.desc || '');
        if (newDesc === null) return;

        addOrUpdateCategory({ id: cat.id, name: trimmedName, desc: newDesc.trim() });
        populateCategorySelect(sectionInput ? sectionInput.value : null);
        renderSoftwareList();
        renderCategoriesManager();
        showToast(`✓ Categoría "${trimmedName}" actualizada.`, 'success');
      });
    });

    // Listeners para eliminar categoría
    categoriesManagerList.querySelectorAll('.btn-delete-category').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.dataset.id;
        const cat = getCategoryById(catId);
        const assignedItems = items.filter(i => (i.section || '').toLowerCase() === catId.toLowerCase());
        if (assignedItems.length > 0) {
          alert(`No se puede eliminar la categoría "${cat.name}" porque tiene ${assignedItems.length} software asignado(s). Cambiales la categoría primero desde la lista.`);
          return;
        }
        if (confirm(`¿Seguro que deseás eliminar la categoría "${cat.name}"?`)) {
          deleteCategory(catId);
          populateCategorySelect();
          renderSoftwareList();
          renderCategoriesManager();
          showToast(`✓ Categoría "${cat.name}" eliminada.`, 'success');
        }
      });
    });
  }

  // ── Tab Navigation ──
  function switchTab(tabId) {
    topbarTabs.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    dashboardTabs.forEach(tab => {
      tab.classList.toggle('active', tab.id === tabId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  topbarTabs.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      if (tabBtn.dataset.tab === 'tab-add' && !editSoftwareId.value) {
        resetSoftwareForm();
      }
      switchTab(tabBtn.dataset.tab);
    });
  });

  if (btnAddNewSoftware) {
    btnAddNewSoftware.addEventListener('click', () => {
      resetSoftwareForm();
      switchTab('tab-add');
      setTimeout(() => titleInput.focus(), 150);
    });
  }

  // ── Logout ──
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Cerrar sesión del panel de administración?')) {
        sessionStorage.removeItem(AUTH_KEY);
        window.location.replace('login.html');
      }
    });
  }

  // ── Search Handler ──
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderSoftwareList();
    });
  }

  // ── Radio Toggle: Local vs External ──
  downloadOriginRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'local') {
        groupLocalFile.style.display = 'block';
        groupExternalUrl.style.display = 'none';
      } else {
        groupLocalFile.style.display = 'none';
        groupExternalUrl.style.display = 'block';
      }
      updateLivePreview();
    });
  });

  // Helper file picker to auto-populate file name
  if (helperFilePicker && fileNameInput) {
    helperFilePicker.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        fileNameInput.value = e.target.files[0].name;
        updateLivePreview();
      }
    });
  }

  // ── Live Preview Synchronizer ──
  function updateLivePreview() {
    const titleVal = titleInput.value.trim() || 'Nombre del Software';
    const descVal = descInput.value.trim() || 'Descripción de tu programa o herramienta que verá el usuario...';
    const iconKey = iconInput.value || 'shield';
    const selectedIconSvg = ICONS[iconKey] || ICONS.window;

    previewTitle.textContent = titleVal;
    previewDesc.textContent = descVal;
    previewIcon.innerHTML = selectedIconSvg;

    // Tags
    const tagsHtml = [];
    if (platformInput.value.trim()) {
      platformInput.value.split(',').forEach(tag => {
        const clean = tag.trim();
        if (clean) tagsHtml.push(`<span class="tag">${escapeHtml(clean)}</span>`);
      });
    } else {
      tagsHtml.push(`<span class="tag">Windows</span>`);
    }

    if (versionInput.value.trim()) {
      tagsHtml.push(`<span class="tag">${escapeHtml(versionInput.value.trim())}</span>`);
    } else {
      tagsHtml.push(`<span class="tag">v1.0</span>`);
    }
    previewMeta.innerHTML = tagsHtml.join(' ');

    // Download buttons
    const isLocal = document.querySelector('input[name="downloadOrigin"]:checked').value === 'local';
    const fName = fileNameInput.value.trim();
    const extUrl = urlInput.value.trim();

    if (isLocal) {
      if (fName && fName.toLowerCase().endsWith('.exe')) {
        const zipName = fName.replace(/\.exe$/i, '.zip');
        previewButtons.innerHTML = `
          <a href="descargas/${escapeHtml(fName)}" class="btn btn--small btn--primary" target="_blank">Descargar .exe</a>
          <a href="descargas/${escapeHtml(zipName)}" class="btn btn--small btn--ghost" target="_blank">.zip</a>
        `;
      } else {
        const label = fName ? `Descargar (${fName})` : 'Descargar Archivo';
        previewButtons.innerHTML = `
          <a href="descargas/${escapeHtml(fName || '#')}" class="btn btn--small btn--primary" target="_blank">${escapeHtml(label)}</a>
        `;
      }
    } else {
      previewButtons.innerHTML = `
        <a href="${sanitizeUrl(extUrl)}" class="btn btn--small btn--primary" target="_blank" rel="noopener noreferrer">Ir a Descarga Externa</a>
      `;
    }
  }

  // Bind live preview on all inputs
  [
    titleInput,
    sectionInput,
    descInput,
    versionInput,
    platformInput,
    iconInput,
    fileNameInput,
    urlInput
  ].forEach(input => {
    if (input) {
      input.addEventListener('input', updateLivePreview);
      input.addEventListener('change', updateLivePreview);
    }
  });

  // ── Render Cards in Admin List ──
  function renderSoftwareList() {
    const items = getItems();
    const categories = getCategories();

    // Actualizar métricas
    const progs = items.filter(i => (i.section || '').toLowerCase() === 'programas');
    const tools = items.filter(i => (i.section || '').toLowerCase() === 'herramientas');

    if (programsCounter) programsCounter.textContent = items.length;
    if (metricPrograms) metricPrograms.textContent = progs.length;
    if (metricTools) metricTools.textContent = tools.length;
    if (metricTotal) metricTotal.textContent = items.length;

    // Renderizar botones de filtro dinámicos con todas las categorías
    if (filterTabsContainer) {
      let tabsHtml = `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">Todos <span class="badge">${items.length}</span></button>`;
      categories.forEach(cat => {
        const catCount = items.filter(i => (i.section || '').toLowerCase() === cat.id.toLowerCase()).length;
        const isActive = activeFilter === cat.id;
        tabsHtml += `<button class="filter-btn ${isActive ? 'active' : ''}" data-filter="${escapeHtml(cat.id)}">${escapeHtml(cat.name)} <span class="badge">${catCount}</span></button>`;
      });
      filterTabsContainer.innerHTML = tabsHtml;

      filterTabsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeFilter = btn.dataset.filter;
          renderSoftwareList();
        });
      });
    }

    // Filtrar
    let filtered = items;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(i => (i.section || '').toLowerCase() === activeFilter.toLowerCase());
    }
    if (searchQuery) {
      filtered = filtered.filter(i =>
        i.title.toLowerCase().includes(searchQuery) ||
        i.desc.toLowerCase().includes(searchQuery) ||
        (i.fileName && i.fileName.toLowerCase().includes(searchQuery))
      );
    }

    if (filtered.length === 0) {
      softwareListContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: var(--clr-surface); border: 1px dashed var(--clr-border); border-radius: var(--radius);">
          <p style="color: var(--clr-text-muted); font-size: 1.1rem; margin-bottom: 1rem;">No se encontraron programas en esta vista.</p>
          <button type="button" class="admin-btn admin-btn--primary" id="btnEmptyAdd">
            ➕ Agregar el primer software
          </button>
        </div>
      `;
      const btnEmptyAdd = document.getElementById('btnEmptyAdd');
      if (btnEmptyAdd) {
        btnEmptyAdd.addEventListener('click', () => {
          resetSoftwareForm();
          switchTab('tab-add');
        });
      }
      return;
    }

    softwareListContainer.innerHTML = filtered.map(item => {
      const iconSvg = ICONS[item.icon] || ICONS.window;
      const cat = getCategoryById(item.section);
      const isProg = (item.section || '').toLowerCase() === 'programas';
      const sectionBadgeClass = isProg ? 'pill-badge--accent' : 'pill-badge';
      const sectionName = cat.name;

      const isLocal = item.downloadType === 'local';
      const targetPath = isLocal ? `descargas/${item.fileName}` : item.url;

      return `
        <article class="dash-card" data-id="${escapeHtml(item.id)}">
          <div class="dash-card__header">
            <div class="dash-card__icon-box">
              ${iconSvg}
            </div>
            <div class="dash-card__badges">
              <span class="pill-badge ${sectionBadgeClass}">${escapeHtml(sectionName)}</span>
              ${item.version ? `<span class="pill-badge">${escapeHtml(item.version)}</span>` : ''}
              ${item.platform ? `<span class="pill-badge">${escapeHtml(item.platform)}</span>` : ''}
            </div>
          </div>

          <div>
            <h3 class="dash-card__title">${escapeHtml(item.title)}</h3>
            <p class="dash-card__desc">${escapeHtml(item.desc)}</p>
          </div>

          <div class="dash-card__download-info" title="${escapeHtml(targetPath)}">
            <span>${isLocal ? '📂' : '🌐'}</span>
            <code>${escapeHtml(targetPath)}</code>
          </div>

          <div class="dash-card__actions">
            <a href="${sanitizeUrl(targetPath)}" download="${escapeHtml(item.fileName || '')}" class="admin-btn admin-btn--ghost admin-btn--sm" title="Probar descarga de este archivo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Descargar</span>
            </a>
            <button type="button" class="admin-btn admin-btn--ghost admin-btn--sm btn-edit-software" data-id="${escapeHtml(item.id)}" title="Modificar datos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span>Editar</span>
            </button>
            <button type="button" class="admin-btn admin-btn--danger-ghost admin-btn--sm btn-delete-software" data-id="${escapeHtml(item.id)}" title="Eliminar de la web" style="margin-left: auto;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners
    softwareListContainer.querySelectorAll('.btn-edit-software').forEach(btn => {
      btn.addEventListener('click', () => editSoftware(btn.dataset.id));
    });

    softwareListContainer.querySelectorAll('.btn-delete-software').forEach(btn => {
      btn.addEventListener('click', () => deleteSoftware(btn.dataset.id));
    });
  }

  // ── Form Reset / Prepare ──
  function resetSoftwareForm() {
    softwareForm.reset();
    editSoftwareId.value = '';
    formHeaderTitle.textContent = 'Agregar Nuevo Software';
    populateCategorySelect();
    if (newCategoryInlineBox) newCategoryInlineBox.style.display = 'none';
    submitSoftwareBtn.innerHTML = `<span>💾 Guardar y Publicar</span>`;
    cancelFormBtn.style.display = 'none';

    groupLocalFile.style.display = 'block';
    groupExternalUrl.style.display = 'none';
    const localRadio = document.querySelector('input[name="downloadOrigin"][value="local"]');
    if (localRadio) localRadio.checked = true;

    updateLivePreview();
  }

  if (cancelFormBtn) {
    cancelFormBtn.addEventListener('click', () => {
      resetSoftwareForm();
      switchTab('tab-list');
    });
  }

  // ── Edit Software ──
  function editSoftware(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    editSoftwareId.value = item.id;
    formHeaderTitle.textContent = `Editar Software: ${item.title}`;
    titleInput.value = item.title;
    populateCategorySelect(item.section);
    descInput.value = item.desc;
    versionInput.value = item.version || '';
    platformInput.value = item.platform || '';
    iconInput.value = item.icon || 'shield';

    const isLocal = item.downloadType === 'local';
    const originRadio = document.querySelector(`input[name="downloadOrigin"][value="${isLocal ? 'local' : 'external'}"]`);
    if (originRadio) originRadio.checked = true;

    if (isLocal) {
      groupLocalFile.style.display = 'block';
      groupExternalUrl.style.display = 'none';
      fileNameInput.value = item.fileName || '';
      urlInput.value = '';
    } else {
      groupLocalFile.style.display = 'none';
      groupExternalUrl.style.display = 'block';
      urlInput.value = item.url || '';
      fileNameInput.value = '';
    }

    submitSoftwareBtn.innerHTML = `<span>💾 Guardar Cambios</span>`;
    cancelFormBtn.style.display = 'inline-flex';

    updateLivePreview();
    switchTab('tab-add');
  }

  // ── Delete Software ──
  function deleteSoftware(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (confirm(`¿Estás seguro de que querés eliminar "${item.title}"? Esta acción lo quitará de tu web.`)) {
      const filtered = items.filter(i => i.id !== id);
      saveItems(filtered);
      if (editSoftwareId.value === id) {
        resetSoftwareForm();
      }
      showToast(`✓ "${item.title}" eliminado correctamente.`, 'success');
    }
  }

  // ── Submit Software Form ──
  if (softwareForm) {
    softwareForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const items = getItems();
      const currentId = editSoftwareId.value;
      const isLocal = document.querySelector('input[name="downloadOrigin"]:checked').value === 'local';

      let fName = fileNameInput.value.trim();
      let uVal = urlInput.value.trim();

      if (isLocal) {
        fName = fName.replace(/^descargas[/\\]+/, '').trim();
        if (!fName || !/^[a-zA-Z0-9_\-. ]+\.(exe|zip|msi|rar|7z)$/i.test(fName) || fName.includes('..')) {
          alert('Nombre de archivo inválido. Debe terminar en una extensión válida (.exe, .zip, .msi, .rar, .7z) y contener caracteres válidos.');
          fileNameInput.focus();
          return;
        }
        uVal = `descargas/${fName}`;
      } else {
        if (!uVal || !/^https:\/\//i.test(uVal)) {
          alert('Por favor ingresá una dirección URL segura que comience con https://');
          urlInput.focus();
          return;
        }
      }

      let sec = sectionInput ? sectionInput.value : 'programas';
      if (sec === '__new__') {
        const customName = inlineCatNameInput ? inlineCatNameInput.value.trim() : '';
        if (!customName) {
          alert('Por favor ingresá un nombre para la nueva categoría.');
          if (inlineCatNameInput) inlineCatNameInput.focus();
          return;
        }
        const slug = slugifyCategory(customName);
        const customDesc = inlineCatDescInput ? inlineCatDescInput.value.trim() : '';
        addOrUpdateCategory({ id: slug, name: customName, desc: customDesc || `Colección de ${customName} y utilidades.` });
        sec = slug;
      }

      const softwareItem = {
        id: currentId || `item-${Date.now()}`,
        section: sec,
        title: titleInput.value.trim(),
        desc: descInput.value.trim(),
        version: versionInput.value.trim(),
        platform: platformInput.value.trim(),
        icon: iconInput.value,
        downloadType: isLocal ? 'local' : 'external',
        fileName: isLocal ? fName : '',
        url: uVal
      };

      let isEdit = false;
      if (currentId) {
        const idx = items.findIndex(i => i.id === currentId);
        if (idx !== -1) {
          items[idx] = softwareItem;
          isEdit = true;
        } else {
          items.unshift(softwareItem);
        }
      } else {
        items.unshift(softwareItem);
      }

      saveItems(items);
      resetSoftwareForm();
      switchTab('tab-list');
      showToast(
        isEdit 
          ? `✓ Cambios guardados para "${softwareItem.title}".` 
          : `✓ "${softwareItem.title}" agregado y publicado correctamente.`,
        'success'
      );
    });
  }

  // ── Settings: Cambiar PIN ──
  if (updatePinForm) {
    updatePinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPin = newPinInput.value.trim();
      if (newPin.length < 4) {
        pinAlert.style.color = '#ff4444';
        pinAlert.textContent = '❌ El PIN debe tener al menos 4 caracteres.';
        return;
      }

      const newHash = await hashString(newPin);
      localStorage.setItem(PIN_KEY, newHash);
      sessionStorage.setItem(AUTH_KEY, newHash);

      newPinInput.value = '';
      pinAlert.style.color = '#22c55e';
      pinAlert.textContent = '✓ ¡PIN actualizado correctamente! Esta será tu nueva clave.';
      setTimeout(() => { pinAlert.textContent = ''; }, 4000);
    });
  }

  // ── Settings: Resetear Valores de Prueba ──
  if (btnResetPrograms) {
    btnResetPrograms.addEventListener('click', () => {
      if (confirm('¿Restablecer los programas por defecto (XaoSuite y XaoExtras)? Se perderán cambios no exportados.')) {
        saveItems(DEFAULT_ITEMS);
        resetSoftwareForm();
        showToast('✓ Se restablecieron los programas originales por defecto.', 'success');
      }
    });
  }

  // ── Settings: Exportar Respaldo JSON ──
  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      const items = getItems();
      const jsonStr = JSON.stringify(items, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `xaoxay_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('✓ Respaldo JSON descargado.', 'success');
    });
  }

  // ── Settings: Exportar index.html para GitHub Pages ──
  function generateIndexCard(item) {
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
    const href = sanitizeUrl(item.url);

    let actionButtons = `<a href="${href}" ${downloadAttr} class="btn btn--small btn--primary">Descargar</a>`;
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
        <!-- Card ${escapeHtml(item.title)} -->
        <article class="card" data-id="${escapeHtml(item.id)}">
          <div class="card__icon">${iconSvg}</div>
          <h3 class="card__title">${escapeHtml(item.title)}</h3>
          <p class="card__desc">${escapeHtml(item.desc)}</p>
          <div class="card__meta">
            ${metaTags.join('\n            ')}
          </div>
          ${actionButtons}
        </article>`;
  }

  // ── Generador Universal de index.html con Soporte Multicategoría ──
  function buildFullIndexHtml(templateHtml, items, categories) {
    let html = templateHtml;

    // Obtener categorías activas (que tengan software o sean programas/herramientas)
    const activeCats = [];
    const usedIds = new Set();

    categories.forEach(cat => {
      const catItems = items.filter(i => (i.section || '').toLowerCase() === cat.id.toLowerCase());
      if (catItems.length > 0 || cat.id === 'programas' || cat.id === 'herramientas') {
        activeCats.push({ ...cat, items: catItems });
        usedIds.add(cat.id.toLowerCase());
      }
    });

    // Detectar items con categoría no registrada aún
    items.forEach(item => {
      const secId = (item.section || 'programas').toLowerCase();
      if (!usedIds.has(secId)) {
        const catName = secId.charAt(0).toUpperCase() + secId.slice(1);
        const catItems = items.filter(i => (i.section || '').toLowerCase() === secId);
        activeCats.push({
          id: secId,
          name: catName,
          desc: `Colección de ${catName} y utilidades.`,
          items: catItems
        });
        usedIds.add(secId);
      }
    });

    // 1. Generar secciones HTML completas
    const sectionsHtml = activeCats.map((cat, idx) => {
      const paddedIndex = String(idx + 1).padStart(2, '0');
      const isAlt = idx % 2 !== 0;
      const altClass = isAlt ? ' section--alt' : '';
      const cardsHtml = (cat.items || []).map(generateIndexCard).join('\n');

      return `
  <!-- ══════════════ ${paddedIndex}. ${escapeHtml(cat.name.toUpperCase())} ══════════════ -->
  <section class="section${altClass}" id="${escapeHtml(cat.id)}">
    <div class="container">
      <h2 class="section__title"><span class="section__title-accent">${paddedIndex}.</span> ${escapeHtml(cat.name)}</h2>
      <p class="section__desc">${escapeHtml(cat.desc || '')}</p>

      <div class="cards-grid" id="${escapeHtml(cat.id)}Grid">
${cardsHtml}
      </div>
    </div>
  </section>`;
    }).join('\n');

    // Inyectar secciones en el HTML
    if (html.includes('<!-- START:CATALOG_SECTIONS -->') && html.includes('<!-- END:CATALOG_SECTIONS -->')) {
      html = html.replace(
        /<!-- START:CATALOG_SECTIONS -->[\s\S]*?<!-- END:CATALOG_SECTIONS -->/,
        `<!-- START:CATALOG_SECTIONS -->\n${sectionsHtml}\n  <!-- END:CATALOG_SECTIONS -->`
      );
    } else {
      html = html.replace(
        /(<!-- ══════════════ (?:01\.\s*)?PROGRAMAS ══════════════ -->[\s\S]*?)(?=\s*<!-- ══════════════ FOOTER ══════════════ -->)/,
        `<!-- START:CATALOG_SECTIONS -->\n${sectionsHtml}\n  <!-- END:CATALOG_SECTIONS -->\n\n  `
      );
    }

    // 2. Generar ítems de navegación para el navbar
    const navItemsHtml = activeCats.map(cat => {
      return `        <li><a href="#${escapeHtml(cat.id)}" class="nav__link">${escapeHtml(cat.name)}</a></li>`;
    }).join('\n');

    if (html.includes('<!-- START:NAV_ITEMS -->') && html.includes('<!-- END:NAV_ITEMS -->')) {
      html = html.replace(
        /<!-- START:NAV_ITEMS -->[\s\S]*?<!-- END:NAV_ITEMS -->/,
        `<!-- START:NAV_ITEMS -->\n${navItemsHtml}\n        <!-- END:NAV_ITEMS -->`
      );
    } else {
      html = html.replace(
        /(<li><a href="#inicio"[^>]*>Inicio<\/a><\/li>)[\s\S]*?(?=\s*<li>\s*<a href="https:\/\/github\.com\/Xaoxay")/i,
        `$1\n        <!-- START:NAV_ITEMS -->\n${navItemsHtml}\n        <!-- END:NAV_ITEMS -->`
      );
    }

    // Cache-bust
    html = html.replace(/script\.js\?v=[\d\.]+/g, `script.js?v=${Date.now()}`);

    return html;
  }

  if (btnExportHtml) {
    btnExportHtml.addEventListener('click', async () => {
      try {
        btnExportHtml.disabled = true;
        btnExportHtml.textContent = '⏳ Generando index.html...';

        const res = await fetch('index.html');
        if (!res.ok) throw new Error('No se pudo leer index.html');
        let htmlText = await res.text();

        htmlText = buildFullIndexHtml(htmlText, getItems(), getCategories());

        const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        btnExportHtml.textContent = '✓ ¡index.html Descargado!';
        showToast('✓ index.html generado y descargado correctamente.', 'success');
        setTimeout(() => {
          btnExportHtml.disabled = false;
          btnExportHtml.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Descargar index.html Actualizado</span>
          `;
        }, 2500);
      } catch (err) {
        console.error('Error al exportar index.html:', err);
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
          alert('Aviso: Si estás abriendo el panel directamente como archivo (file://), el navegador bloquea la lectura automática de index.html por seguridad.\n\nPara exportarlo, podés abrir la carpeta con Visual Studio Code (usando Live Server o un servidor local) o usar el botón "Descargar Respaldo JSON".');
        } else {
          alert('Ocurrió un error al generar index.html: ' + err.message);
        }
        btnExportHtml.disabled = false;
        btnExportHtml.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Descargar index.html Actualizado</span>
        `;
      }
    });
  }

  // ══════════════════════════════════════════════
  // GITHUB 1-CLICK PUSH ENGINE (REST API)
  // ══════════════════════════════════════════════
  const GITHUB_TOKEN_KEY = 'xaoxay_git_token';
  const GITHUB_REPO_KEY = 'xaoxay_git_repo';
  const GITHUB_BRANCH_KEY = 'xaoxay_git_branch';
  const DEFAULT_REPO = 'Xaoxay/xaoxay.github.io';
  const DEFAULT_BRANCH = 'main';

  const gitConfigForm = document.getElementById('gitConfigForm');
  const gitTokenInput = document.getElementById('gitTokenInput');
  const btnToggleGitToken = document.getElementById('btnToggleGitToken');
  const btnTestGitToken = document.getElementById('btnTestGitToken');
  const gitRepoInput = document.getElementById('gitRepoInput');
  const gitBranchInput = document.getElementById('gitBranchInput');
  const btnPushToGit = document.getElementById('btnPushToGit');
  const btnQuickGitPush = document.getElementById('btnQuickGitPush');
  const gitStatusAlert = document.getElementById('gitStatusAlert');

  function getGitConfig() {
    let token = (localStorage.getItem(GITHUB_TOKEN_KEY) || '').trim();
    token = token.replace(/^["']|["']$/g, '').trim();
    if (token.toLowerCase().startsWith('bearer ')) token = token.slice(7).trim();
    else if (token.toLowerCase().startsWith('token ')) token = token.slice(6).trim();

    return {
      token: token,
      repo: (localStorage.getItem(GITHUB_REPO_KEY) || DEFAULT_REPO).trim(),
      branch: (localStorage.getItem(GITHUB_BRANCH_KEY) || DEFAULT_BRANCH).trim()
    };
  }

  function initGitSettingsUI() {
    const config = getGitConfig();
    if (gitTokenInput) gitTokenInput.value = config.token;
    if (gitRepoInput) gitRepoInput.value = config.repo;
    if (gitBranchInput) gitBranchInput.value = config.branch;
  }

  if (btnToggleGitToken && gitTokenInput) {
    btnToggleGitToken.addEventListener('click', () => {
      if (gitTokenInput.type === 'password') {
        gitTokenInput.type = 'text';
        btnToggleGitToken.textContent = '🙈';
      } else {
        gitTokenInput.type = 'password';
        btnToggleGitToken.textContent = '👁️';
      }
    });
  }

  async function testGitHubToken() {
    const raw = gitTokenInput ? gitTokenInput.value.trim() : '';
    let token = raw.replace(/^["']|["']$/g, '').trim();
    if (token.toLowerCase().startsWith('bearer ')) token = token.slice(7).trim();
    else if (token.toLowerCase().startsWith('token ')) token = token.slice(6).trim();

    const repo = gitRepoInput ? (gitRepoInput.value.trim() || DEFAULT_REPO) : DEFAULT_REPO;

    if (!token) {
      if (gitStatusAlert) {
        gitStatusAlert.style.color = '#ff4444';
        gitStatusAlert.textContent = '⚠️ Ingresá o pegá un Token primero para probar la conexión.';
      }
      showToast('⚠️ Ingresá un Token primero', 'error');
      if (gitTokenInput) gitTokenInput.focus();
      return;
    }

    if (btnTestGitToken) {
      btnTestGitToken.disabled = true;
      btnTestGitToken.textContent = '⏳ Probando...';
    }
    if (gitStatusAlert) {
      gitStatusAlert.style.color = 'var(--clr-text-muted)';
      gitStatusAlert.textContent = '⏳ Verificando token con GitHub API...';
    }

    try {
      const authValue = token.startsWith('github_pat_') ? `Bearer ${token}` : `token ${token}`;
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': authValue,
          'Accept': 'application/vnd.github+json'
        }
      });

      if (userRes.status === 401) {
        throw new Error('Token inválido o expirado (401 Bad credentials). Asegurate de copiar el token completo generado en GitHub (empieza con "ghp_" o "github_pat_") y no tu contraseña personal de la cuenta.');
      }
      if (!userRes.ok) {
        const errData = await userRes.json().catch(() => ({}));
        throw new Error(`Error en GitHub API (${userRes.status}): ${errData.message || userRes.statusText}`);
      }

      const user = await userRes.json();

      // Probar acceso al repositorio
      const repoRes = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          'Authorization': authValue,
          'Accept': 'application/vnd.github+json'
        }
      });

      if (repoRes.status === 404) {
        throw new Error(`Token autenticado como @${user.login}, pero no se encontró el repo "${repo}". Verificá el nombre o que el token tenga permiso "repo".`);
      }
      if (!repoRes.ok) {
        const repoErr = await repoRes.json().catch(() => ({}));
        throw new Error(`Error en repositorio (${repoRes.status}): ${repoErr.message || repoRes.statusText}`);
      }

      const repoData = await repoRes.json();
      const canPush = repoData.permissions ? (repoData.permissions.push || repoData.permissions.admin) : true;

      if (canPush) {
        localStorage.setItem(GITHUB_TOKEN_KEY, token);
        if (gitStatusAlert) {
          gitStatusAlert.style.color = '#22c55e';
          gitStatusAlert.textContent = `✓ ¡Conexión exitosa! Autenticado como @${user.login} con permisos de escritura en ${repo}. Ya podés hacer Push.`;
        }
        showToast(`✓ Token verificado para @${user.login}`, 'success');
      } else {
        if (gitStatusAlert) {
          gitStatusAlert.style.color = '#eab308';
          gitStatusAlert.textContent = `⚠️ Autenticado como @${user.login}, pero tu Token NO tiene permiso de escritura ("push") en ${repo}. Creá un token nuevo marcando el permiso "repo".`;
        }
        showToast('⚠️ Falta permiso "repo" en el token', 'error');
      }
    } catch (err) {
      console.error('Error al probar token:', err);
      if (gitStatusAlert) {
        gitStatusAlert.style.color = '#ff4444';
        gitStatusAlert.textContent = `❌ ${err.message}`;
      }
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      if (btnTestGitToken) {
        btnTestGitToken.disabled = false;
        btnTestGitToken.textContent = '🔍 Probar Token';
      }
    }
  }

  if (btnTestGitToken) {
    btnTestGitToken.addEventListener('click', testGitHubToken);
  }

  if (gitConfigForm) {
    gitConfigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const token = gitTokenInput ? gitTokenInput.value.trim() : '';
      const repo = gitRepoInput ? (gitRepoInput.value.trim() || DEFAULT_REPO) : DEFAULT_REPO;
      const branch = gitBranchInput ? (gitBranchInput.value.trim() || DEFAULT_BRANCH) : DEFAULT_BRANCH;

      localStorage.setItem(GITHUB_TOKEN_KEY, token);
      localStorage.setItem(GITHUB_REPO_KEY, repo);
      localStorage.setItem(GITHUB_BRANCH_KEY, branch);

      if (gitStatusAlert) {
        gitStatusAlert.style.color = '#22c55e';
        gitStatusAlert.textContent = '✓ Configuración de GitHub guardada correctamente.';
        setTimeout(() => { gitStatusAlert.textContent = ''; }, 4000);
      }
      showToast('✓ Token y repositorio de GitHub guardados.', 'success');
    });
  }

  async function getLatestFileSha(repo, branch, filePath, headers) {
    try {
      const commitUrl = `https://api.github.com/repos/${repo}/commits/${branch}?_nocache=${Date.now()}`;
      const commitRes = await fetch(commitUrl, { headers });
      if (!commitRes.ok) return null;
      const commitData = await commitRes.json();
      const treeSha = commitData.commit && commitData.commit.tree && commitData.commit.tree.sha;
      if (!treeSha) return null;

      const treeUrl = `https://api.github.com/repos/${repo}/git/trees/${treeSha}?_nocache=${Date.now()}`;
      const treeRes = await fetch(treeUrl, { headers });
      if (!treeRes.ok) return null;
      const treeData = await treeRes.json();
      const fileEntry = (treeData.tree || []).find(item => item.path === filePath);
      return fileEntry ? fileEntry.sha : null;
    } catch (e) {
      console.warn('Fallo al obtener SHA fresco:', e);
      return null;
    }
  }

  async function executeGitHubPush() {
    // Sincronizar automáticamente valores del formulario de ajustes si fueron editados en pantalla
    if (gitTokenInput && gitTokenInput.value.trim()) {
      localStorage.setItem(GITHUB_TOKEN_KEY, gitTokenInput.value.trim());
    }
    if (gitRepoInput && gitRepoInput.value.trim()) {
      localStorage.setItem(GITHUB_REPO_KEY, gitRepoInput.value.trim());
    }
    if (gitBranchInput && gitBranchInput.value.trim()) {
      localStorage.setItem(GITHUB_BRANCH_KEY, gitBranchInput.value.trim());
    }

    const config = getGitConfig();
    if (!config.token) {
      showToast('⚠️ Ingresá tu Token de GitHub en Ajustes para activar el Push', 'error');
      switchTab('tab-settings');
      setTimeout(() => {
        if (gitTokenInput) gitTokenInput.focus();
      }, 250);
      return;
    }

    const repo = config.repo;
    const branch = config.branch;
    const token = config.token;

    const setButtonsLoading = (isLoading, text) => {
      const btns = [btnPushToGit, btnQuickGitPush].filter(Boolean);
      btns.forEach(btn => {
        btn.disabled = isLoading;
        if (isLoading) {
          if (!btn.dataset.origHtml) {
            btn.dataset.origHtml = btn.innerHTML;
          }
          btn.innerHTML = `<span>⏳ ${text || 'Subiendo a GitHub...'}</span>`;
        } else if (btn.dataset.origHtml) {
          btn.innerHTML = btn.dataset.origHtml;
          delete btn.dataset.origHtml;
        }
      });
    };

    try {
      setButtonsLoading(true, 'Conectando con GitHub...');
      if (gitStatusAlert) {
        gitStatusAlert.style.color = 'var(--clr-text-muted)';
        gitStatusAlert.textContent = '⏳ Leyendo index.html desde GitHub API...';
      }

      let cleanToken = token.replace(/^["']|["']$/g, '').trim();
      if (cleanToken.toLowerCase().startsWith('bearer ')) cleanToken = cleanToken.slice(7).trim();
      else if (cleanToken.toLowerCase().startsWith('token ')) cleanToken = cleanToken.slice(6).trim();

      const authValue = cleanToken.startsWith('github_pat_') ? `Bearer ${cleanToken}` : `token ${cleanToken}`;

      const headers = {
        'Authorization': authValue,
        'Accept': 'application/vnd.github+json'
      };

      // 1. Obtener index.html y su SHA actual (forzar no-cache mediante timestamp unico)
      const fileUrl = `https://api.github.com/repos/${repo}/contents/index.html?ref=${branch}&_nocache=${Date.now()}`;
      const getRes = await fetch(fileUrl, { headers });

      if (getRes.status === 401 || getRes.status === 403) {
        const errJson = await getRes.json().catch(() => ({}));
        const detail = errJson.message ? ` (${errJson.message})` : '';
        throw new Error(`Token inválido o sin permisos suficientes${detail}. Si pusiste tu contraseña personal, GitHub no la acepta: creá un Token de Acceso Personal (PAT) con el enlace de Ajustes marcando el permiso "repo".`);
      }
      if (getRes.status === 404) {
        throw new Error(`No se encontró el repositorio o archivo en: ${repo} (rama: ${branch})`);
      }
      if (!getRes.ok) {
        throw new Error(`Error en GitHub API (${getRes.status}): ${getRes.statusText}`);
      }

      const fileData = await getRes.json();
      let currentSha = fileData.sha;

      // 2. Decodificar contenido de forma segura con UTF-8
      const rawBase64 = fileData.content.replace(/\s/g, '');
      let htmlText = decodeURIComponent(escape(atob(rawBase64)));

      // 3. Reemplazar dinámicamente todas las categorías y secciones en index.html
      setButtonsLoading(true, 'Generando cambios...');
      htmlText = buildFullIndexHtml(htmlText, getItems(), getCategories());

      // 4. Codificar a Base64 compatible con emojis y tildes UTF-8
      const updatedContentBase64 = btoa(unescape(encodeURIComponent(htmlText)));

      // 5. Enviar PUT a GitHub para crear el commit
      setButtonsLoading(true, 'Creando Commit y Push...');
      const commitMessage = `feat(admin): actualizar catálogo y categorías desde panel web [${new Date().toLocaleDateString('es-AR')}]`;

      let putRes = await fetch(`https://api.github.com/repos/${repo}/contents/index.html`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: commitMessage,
          content: updatedContentBase64,
          sha: currentSha,
          branch: branch
        })
      });

      // Si hay conflicto de versión (409 Conflict), consultar el SHA del commit actual de la rama y reintentar
      if (putRes.status === 409) {
        if (gitStatusAlert) {
          gitStatusAlert.textContent = '⏳ Sincronizando con última versión de GitHub...';
        }
        const freshSha = await getLatestFileSha(repo, branch, 'index.html', headers);
        if (freshSha && freshSha !== currentSha) {
          currentSha = freshSha;
          putRes = await fetch(`https://api.github.com/repos/${repo}/contents/index.html`, {
            method: 'PUT',
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: commitMessage,
              content: updatedContentBase64,
              sha: currentSha,
              branch: branch
            })
          });
        }
      }

      if (!putRes.ok) {
        const errJson = await putRes.json().catch(() => ({}));
        throw new Error(errJson.message || `Error al guardar commit (${putRes.status})`);
      }

      const putData = await putRes.json();
      const shortSha = (putData.commit && putData.commit.sha) ? putData.commit.sha.slice(0, 7) : 'OK';

      if (gitStatusAlert) {
        gitStatusAlert.style.color = '#22c55e';
        gitStatusAlert.textContent = `✓ ¡Push completado con éxito! Commit: ${shortSha}. En ~1 minuto se reflejará en la web.`;
      }
      showToast('🚀 ¡Git Push exitoso! Tus cambios ya están en GitHub.', 'success');

      // Animación de éxito momentánea en botones y restauración limpia
      [btnPushToGit, btnQuickGitPush].filter(Boolean).forEach(btn => {
        btn.innerHTML = `<span>✓ ¡Subido a GitHub!</span>`;
      });
      setTimeout(() => {
        setButtonsLoading(false);
      }, 3500);

    } catch (err) {
      console.error('Error al hacer push a GitHub:', err);
      if (gitStatusAlert) {
        gitStatusAlert.style.color = '#ff4444';
        gitStatusAlert.textContent = `❌ ${err.message}`;
      }
      showToast(`Error de Push: ${err.message}`, 'error');
      setButtonsLoading(false);
    }
  }

  if (btnPushToGit) {
    btnPushToGit.addEventListener('click', executeGitHubPush);
  }
  if (btnQuickGitPush) {
    btnQuickGitPush.addEventListener('click', executeGitHubPush);
  }

  initGitSettingsUI();

  // ══════════════════════════════════════════════
  // FESTIVITIES & HOLIDAY DECORATOR CONTROLLER
  // ══════════════════════════════════════════════
  const topbarFestiveBadge = document.getElementById('topbarFestiveBadge');
  const btnSaveFestivities = document.getElementById('btnSaveFestivities');
  const festiveThemeCards = document.querySelectorAll('.festive-theme-card');
  const toggleParticles = document.getElementById('toggleParticles');
  const toggleLights = document.getElementById('toggleLights');
  const toggleHat = document.getElementById('toggleHat');
  const toggleBanner = document.getElementById('toggleBanner');
  const toggleVisitorWidget = document.getElementById('toggleVisitorWidget');

  // Simulation preview elements
  const festiveSimHeader = document.getElementById('festiveSimHeader');
  const festiveSimLogoX = document.getElementById('festiveSimLogoX');
  const festiveSimLights = document.getElementById('festiveSimLights');
  const festiveSimBanner = document.getElementById('festiveSimBanner');
  const festiveSimBannerIcon = document.getElementById('festiveSimBannerIcon');
  const festiveSimBannerText = document.getElementById('festiveSimBannerText');
  const festiveSimTag = document.getElementById('festiveSimTag');
  const festiveSimTitle = document.getElementById('festiveSimTitle');
  const festiveSimDesc = document.getElementById('festiveSimDesc');

  let selectedFestiveMode = 'auto';

  function getEffectiveHolidayId(mode) {
    if (mode === 'auto') {
      return (window.Festivities && window.Festivities.getCalendarHoliday) ? window.Festivities.getCalendarHoliday() : 'none';
    }
    return mode;
  }

  function updateFestiveBadge() {
    if (!topbarFestiveBadge || !window.Festivities) return;
    const settings = window.Festivities.getSettings();
    const effective = getEffectiveHolidayId(settings.mode);
    const holidayInfo = window.Festivities.HOLIDAYS[effective] || { name: 'Normal', icon: '✖' };

    if (settings.mode === 'auto') {
      topbarFestiveBadge.textContent = effective !== 'none' ? `Auto: ${holidayInfo.name}` : 'Auto';
      topbarFestiveBadge.style.borderColor = effective !== 'none' ? '#22c55e' : 'var(--clr-border)';
    } else if (settings.mode === 'none') {
      topbarFestiveBadge.textContent = 'Off';
      topbarFestiveBadge.style.borderColor = 'var(--clr-border)';
    } else {
      topbarFestiveBadge.textContent = holidayInfo.name;
      topbarFestiveBadge.style.borderColor = 'var(--clr-accent)';
    }
  }

  function updateLiveSimulator() {
    if (!window.Festivities) return;

    const effectiveId = getEffectiveHolidayId(selectedFestiveMode);
    const holiday = window.Festivities.HOLIDAYS[effectiveId] || window.Festivities.HOLIDAYS.none;

    const showLights = toggleLights && toggleLights.checked && holiday.id !== 'none';
    const showHat = toggleHat && toggleHat.checked && holiday.id !== 'none';
    const showBanner = toggleBanner && toggleBanner.checked && holiday.id !== 'none' && holiday.greeting;

    // 1. Lights simulation
    if (festiveSimLights) {
      festiveSimLights.innerHTML = '';
      if (showLights) {
        const bulbs = holiday.bulbs || ['red', 'green', 'gold', 'blue'];
        for (let i = 0; i < 14; i++) {
          const b = document.createElement('div');
          const color = bulbs[i % bulbs.length];
          b.className = `festive-bulb festive-bulb--${color} festive-sim-bulb`;
          festiveSimLights.appendChild(b);
        }
        festiveSimLights.style.display = 'flex';
      } else {
        festiveSimLights.style.display = 'none';
      }
    }

    // 2. Hat / emblem simulation
    if (festiveSimLogoX) {
      const existingHat = festiveSimLogoX.parentElement.querySelector('.festive-logo-hat, .festive-logo-pumpkin');
      if (existingHat) existingHat.remove();

      if (showHat) {
        const wrap = document.createElement('div');
        if (holiday.id === 'christmas') {
          wrap.className = 'festive-logo-hat';
          wrap.innerHTML = `<svg viewBox="0 0 100 85" fill="none"><path d="M78 60 C65 20, 30 10, 15 35 C10 42, 5 45, 2 50 C25 45, 60 55, 82 62 Z" fill="#d90429"/><path d="M78 60 C65 20, 30 10, 15 35 C20 40, 45 30, 78 60 Z" fill="#ef233c"/><path d="M-2 58 C15 52, 60 52, 88 64 C90 72, 80 75, 75 75 C50 70, 20 70, -2 72 C-6 66, -4 60, -2 58 Z" fill="#ffffff"/><circle cx="10" cy="38" r="10" fill="#ffffff"/></svg>`;
          wrap.style.top = '-10px';
          wrap.style.left = '-6px';
          festiveSimLogoX.parentElement.appendChild(wrap);
        } else if (holiday.id === 'halloween') {
          wrap.className = 'festive-logo-pumpkin';
          wrap.innerHTML = `<svg viewBox="0 0 100 90" fill="none"><ellipse cx="50" cy="52" rx="42" ry="32" fill="#ff6a00"/><polygon points="34,44 42,50 30,52" fill="#000"/><polygon points="66,44 70,52 58,50" fill="#000"/><path d="M30 66 Q50 78 70 66 Q64 74 50 74 Q36 74 30 66 Z" fill="#000"/></svg>`;
          wrap.style.top = '-10px';
          wrap.style.left = '-4px';
          wrap.style.width = '18px';
          wrap.style.height = '18px';
          festiveSimLogoX.parentElement.appendChild(wrap);
        }
      }
    }

    // 3. Banner simulation
    if (festiveSimBanner) {
      if (showBanner) {
        festiveSimBanner.style.display = 'flex';
        if (festiveSimBannerIcon) festiveSimBannerIcon.textContent = holiday.icon;
        if (festiveSimBannerText) festiveSimBannerText.textContent = holiday.greeting;
      } else {
        festiveSimBanner.style.display = 'none';
      }
    }

    // 4. Information card simulation
    if (festiveSimTitle) {
      if (selectedFestiveMode === 'auto') {
        festiveSimTitle.textContent = `Automático (${holiday.name})`;
        festiveSimDesc.textContent = holiday.id !== 'none'
          ? `Detectado por el calendario actual (${holiday.name}). Los efectos están listos para 60 FPS.`
          : 'En esta fecha no hay festividad configurada por calendario. El sitio luce su estilo cyberpunk clásico.';
      } else if (selectedFestiveMode === 'none') {
        festiveSimTitle.textContent = 'Estándar Desactivado';
        festiveSimDesc.textContent = 'La página se visualiza con su interfaz oscura táctica original sin adornos festivos.';
      } else {
        festiveSimTitle.textContent = `${holiday.icon} ${holiday.name}`;
        festiveSimDesc.textContent = `Modo fijado permanentemente. La web mostrará ${holiday.name} independientemente de la fecha del año.`;
      }
    }

    if (festiveSimTag) {
      festiveSimTag.textContent = holiday.id !== 'none' ? `Temática: ${holiday.name}` : 'Temática Estándar';
    }

    // 5. Card festive simulation (snow-cap & border)
    const simCard = document.querySelector('.festive-sim-card');
    if (simCard) {
      const existingCap = simCard.querySelector('.festive-card-snowcap');
      if (existingCap) existingCap.remove();

      simCard.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      simCard.style.boxShadow = 'none';

      if (holiday.id === 'christmas') {
        simCard.style.borderColor = '#ff1e38';
        simCard.style.boxShadow = '0 0 15px rgba(255, 30, 56, 0.35)';
        const cap = document.createElement('div');
        cap.className = 'festive-card-snowcap';
        cap.innerHTML = `<svg viewBox="0 0 320 24" preserveAspectRatio="none" style="width:100%;height:18px;display:block;fill:#ffffff;"><path d="M0,0 L320,0 L320,7 Q304,17 288,9 Q274,23 260,11 Q244,14 230,8 Q214,20 198,10 Q182,12 170,22 Q156,10 142,8 Q126,19 112,11 Q94,14 80,21 Q66,10 52,8 Q36,18 20,10 Q10,14 0,7 Z" fill="#ffffff"/></svg>`;
        simCard.prepend(cap);
      } else if (holiday.id === 'halloween') {
        simCard.style.borderColor = '#00ff66';
        simCard.style.boxShadow = '0 0 15px rgba(0, 255, 102, 0.4)';
      } else if (holiday.id === 'newyear') {
        simCard.style.borderColor = '#ffd700';
        simCard.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
      } else if (holiday.id === 'valentine') {
        simCard.style.borderColor = '#ff0055';
        simCard.style.boxShadow = '0 0 15px rgba(255, 0, 85, 0.4)';
      }
    }
  }

  function initFestivitiesAdmin() {
    if (!window.Festivities) return;

    const settings = window.Festivities.getSettings();
    selectedFestiveMode = settings.mode || 'auto';

    // Set active card
    festiveThemeCards.forEach(card => {
      card.classList.toggle('active', card.dataset.mode === selectedFestiveMode);
    });

    // Set switches
    if (toggleParticles) toggleParticles.checked = !!settings.particles;
    if (toggleLights) toggleLights.checked = !!settings.lights;
    if (toggleHat) toggleHat.checked = !!settings.hat;
    if (toggleBanner) toggleBanner.checked = !!settings.banner;
    if (toggleVisitorWidget) toggleVisitorWidget.checked = !!settings.visitorWidget;

    // Click on theme cards
    festiveThemeCards.forEach(card => {
      card.addEventListener('click', () => {
        festiveThemeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedFestiveMode = card.dataset.mode;
        updateLiveSimulator();
      });
    });

    // Toggle listeners for instant live simulation update
    [toggleParticles, toggleLights, toggleHat, toggleBanner, toggleVisitorWidget].forEach(toggle => {
      if (toggle) {
        toggle.addEventListener('change', updateLiveSimulator);
      }
    });

    // Save button
    if (btnSaveFestivities) {
      btnSaveFestivities.addEventListener('click', () => {
        const newSettings = {
          mode: selectedFestiveMode,
          particles: toggleParticles ? toggleParticles.checked : true,
          lights: toggleLights ? toggleLights.checked : true,
          hat: toggleHat ? toggleHat.checked : true,
          banner: toggleBanner ? toggleBanner.checked : true,
          visitorWidget: toggleVisitorWidget ? toggleVisitorWidget.checked : true
        };

        window.Festivities.saveSettings(newSettings);
        updateFestiveBadge();
        showToast('✓ ¡Decoración festiva guardada y aplicada con éxito!', 'success');
      });
    }

    updateFestiveBadge();
    updateLiveSimulator();
  }

  // ── Global Render ──
  function renderAll() {
    populateCategorySelect();
    renderSoftwareList();
    renderCategoriesManager();
    updateLivePreview();
    updateFestiveBadge();
  }

  // Iniciar
  renderAll();
  initFestivitiesAdmin();
})();

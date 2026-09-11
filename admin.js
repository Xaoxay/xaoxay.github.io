/* ═══════════════════════════════════════════════
   XAOXAY — Admin Dashboard Controller
   Authentication, Program CRUD, Live Preview & Export
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Keys & Constants ──
  const STORAGE_KEY = 'xaoxay_items';
  const PIN_KEY = 'xaoxay_pin';
  const AUTH_KEY = 'xaoxay_admin_token';
  const DEFAULT_PIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'; // SHA-256 de '1234'

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
        if (Array.isArray(parsed)) {
          // Si contiene datos de prueba obsoletos de versiones antiguas, migrar una sola vez
          if (parsed.some(i => i.title === 'XaoManager' || i.id === 'prog-1')) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
            return DEFAULT_ITEMS;
          }
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
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const softwareListContainer = document.getElementById('softwareListContainer');

  // Form elements
  const softwareForm = document.getElementById('softwareForm');
  const editSoftwareId = document.getElementById('editSoftwareId');
  const formHeaderTitle = document.getElementById('formHeaderTitle');
  const titleInput = document.getElementById('titleInput');
  const sectionInput = document.getElementById('sectionInput');
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

  // Settings Elements
  const updatePinForm = document.getElementById('updatePinForm');
  const newPinInput = document.getElementById('newPinInput');
  const pinAlert = document.getElementById('pinAlert');
  const btnExportHtml = document.getElementById('btnExportHtml');
  const btnExportJson = document.getElementById('btnExportJson');
  const btnResetPrograms = document.getElementById('btnResetPrograms');

  // ── State ──
  let activeFilter = 'all';
  let searchQuery = '';

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

  // ── Filter & Search Handlers ──
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderSoftwareList();
    });
  });

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

    // Actualizar métricas
    const progs = items.filter(i => i.section === 'programas');
    const tools = items.filter(i => i.section === 'herramientas');

    if (programsCounter) programsCounter.textContent = items.length;
    if (metricPrograms) metricPrograms.textContent = progs.length;
    if (metricTools) metricTools.textContent = tools.length;
    if (metricTotal) metricTotal.textContent = items.length;

    // Filtrar
    let filtered = items;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(i => i.section === activeFilter);
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
      const isProg = item.section === 'programas';
      const sectionBadgeClass = isProg ? 'pill-badge--accent' : 'pill-badge';
      const sectionName = isProg ? '01. Programa' : '02. Herramienta';

      const isLocal = item.downloadType === 'local';
      const targetPath = isLocal ? `descargas/${item.fileName}` : item.url;

      return `
        <article class="dash-card" data-id="${escapeHtml(item.id)}">
          <div class="dash-card__header">
            <div class="dash-card__icon-box">
              ${iconSvg}
            </div>
            <div class="dash-card__badges">
              <span class="pill-badge ${sectionBadgeClass}">${sectionName}</span>
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
    sectionInput.value = item.section;
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

      const softwareItem = {
        id: currentId || `item-${Date.now()}`,
        section: sectionInput.value,
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

  if (btnExportHtml) {
    btnExportHtml.addEventListener('click', async () => {
      try {
        btnExportHtml.disabled = true;
        btnExportHtml.textContent = '⏳ Generando index.html...';

        const res = await fetch('index.html');
        if (!res.ok) throw new Error('No se pudo leer index.html');
        let htmlText = await res.text();

        const items = getItems();
        const progs = items.filter(i => i.section === 'programas');
        const tools = items.filter(i => i.section === 'herramientas');

        const progsCardsHtml = progs.map(generateIndexCard).join('\n');
        const toolsCardsHtml = tools.map(generateIndexCard).join('\n');

        htmlText = htmlText.replace(
          /(<div class="cards-grid" id="programasGrid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/,
          `$1\n${progsCardsHtml}\n      $2`
        );
        htmlText = htmlText.replace(
          /(<div class="cards-grid" id="herramientasGrid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/,
          `$1\n${toolsCardsHtml}\n      $2`
        );

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
    renderSoftwareList();
    updateLivePreview();
    updateFestiveBadge();
  }

  // Iniciar
  renderAll();
  initFestivitiesAdmin();
})();

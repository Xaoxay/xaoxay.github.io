/* ═══════════════════════════════════════════════
   XAOXAY — Script
   Nav, Dynamic Cards, Password Protected Admin Menu
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Default Items ──
  const DEFAULT_ITEMS = [
    {
      id: 'prog-1',
      section: 'programas',
      title: 'XaoManager',
      desc: 'Gestor de archivos rápido y liviano con interfaz dark. Organiza todo en segundos.',
      version: 'v2.1',
      platform: 'Windows',
      icon: 'window',
      downloadType: 'local',
      fileName: 'XaoManager.exe',
      url: 'descargas/XaoManager.exe'
    },
    {
      id: 'prog-2',
      section: 'programas',
      title: 'CodeXtract',
      desc: 'Extrae snippets de código de cualquier proyecto y los organiza automáticamente.',
      version: 'v1.4',
      platform: 'Cross-platform',
      icon: 'terminal',
      downloadType: 'local',
      fileName: 'CodeXtract.zip',
      url: 'descargas/CodeXtract.zip'
    },
    {
      id: 'prog-3',
      section: 'programas',
      title: 'XShield',
      desc: 'Scanner de seguridad para tu red local. Detecta vulnerabilidades al instante.',
      version: 'v3.0',
      platform: 'Windows',
      icon: 'shield',
      downloadType: 'local',
      fileName: 'XShield.exe',
      url: 'descargas/XShield.exe'
    },
    {
      id: 'tool-1',
      section: 'herramientas',
      title: 'NetProbe',
      desc: 'Escanea puertos y servicios de cualquier IP. Rápido y preciso.',
      version: 'v1.0',
      platform: 'CLI, Python',
      icon: 'bolt',
      downloadType: 'local',
      fileName: 'netprobe.py',
      url: 'descargas/netprobe.py'
    },
    {
      id: 'tool-2',
      section: 'herramientas',
      title: 'AutoConf',
      desc: 'Configura tu entorno de desarrollo con un solo comando. Plugins, paths, themes.',
      version: 'v2.0',
      platform: 'Bash, PowerShell',
      icon: 'tool',
      downloadType: 'local',
      fileName: 'autoconf.ps1',
      url: 'descargas/autoconf.ps1'
    },
    {
      id: 'tool-3',
      section: 'herramientas',
      title: 'PixelSnap',
      desc: 'Captura pantalla, recorta y comparte al instante. Shortcuts personalizables.',
      version: 'Portable',
      platform: 'Windows',
      icon: 'file',
      downloadType: 'local',
      fileName: 'PixelSnap.exe',
      url: 'descargas/PixelSnap.exe'
    }
  ];

  const ICONS = {
    window: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    tool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  };

  // ── State Management ──
  const STORAGE_KEY = 'xaoxay_items';
  const PIN_KEY = 'xaoxay_pin';
  const AUTH_KEY = 'xaoxay_auth';

  function getItems() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return DEFAULT_ITEMS;
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderAll();
  }

  // Default SHA-256 hash for '1234'
  const DEFAULT_PIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';

  async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getPinHash() {
    return localStorage.getItem(PIN_KEY) || DEFAULT_PIN_HASH;
  }

  async function setPin(newPin) {
    const hashed = await hashString(newPin);
    localStorage.setItem(PIN_KEY, hashed);
  }

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function setAuthenticated(status) {
    if (status) {
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
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
    // Only allow secure schemes and relative download path (prevents javascript: XSS attacks)
    if (
      trimmed.startsWith('descargas/') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('#')
    ) {
      return escapeHtml(trimmed);
    }
    return '#';
  }

  // ── Render Grids ──
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
    const btnText = item.section === 'programas' ? 'Descargar' : 'Descargar';
    const href = sanitizeUrl(item.url);

    return `
      <article class="card" data-id="${escapeHtml(item.id)}">
        <div class="card__icon">${iconSvg}</div>
        <h3 class="card__title">${escapeHtml(item.title)}</h3>
        <p class="card__desc">${escapeHtml(item.desc)}</p>
        <div class="card__meta">${metaTags.join(' ')}</div>
        <a href="${href}" ${downloadAttr} class="btn btn--small btn--primary">${btnText}</a>
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
        programasGrid.innerHTML = `<p style="grid-column:1/-1; color:var(--clr-text-muted); text-align:center; padding:2rem;">Aún no agregaste programas. Hacé clic en el candado abajo para agregar el primero.</p>`;
      } else {
        programasGrid.innerHTML = progs.map(renderCard).join('');
      }
    }

    if (herramientasGrid) {
      if (tools.length === 0) {
        herramientasGrid.innerHTML = `<p style="grid-column:1/-1; color:var(--clr-text-muted); text-align:center; padding:2rem;">Aún no agregaste herramientas. Hacé clic en el candado abajo para agregar la primera.</p>`;
      } else {
        herramientasGrid.innerHTML = tools.map(renderCard).join('');
      }
    }

    setupRevealObserver();
    renderManagerList();
  }

  // ── Render Admin Manager List ──
  const itemsManagerList = document.getElementById('itemsManagerList');
  const itemsCountBadge = document.getElementById('itemsCountBadge');

  function renderManagerList() {
    const items = getItems();
    if (itemsCountBadge) itemsCountBadge.textContent = items.length;
    if (!itemsManagerList) return;

    if (items.length === 0) {
      itemsManagerList.innerHTML = `<p style="color:var(--clr-text-muted); text-align:center; padding:1.5rem;">No hay elementos cargados todavía.</p>`;
      return;
    }

    itemsManagerList.innerHTML = items.map(item => {
      const iconSvg = ICONS[item.icon] || ICONS.window;
      const sectionName = item.section === 'programas' ? 'Programa' : 'Herramienta';
      const fileInfo = item.downloadType === 'local' ? `descargas/${item.fileName}` : item.url;

      return `
        <div class="manager-item">
          <div class="manager-item__info">
            <div class="manager-item__icon">${iconSvg}</div>
            <div class="manager-item__details">
              <h4>${escapeHtml(item.title)} <span class="tag" style="margin-left:4px;">${sectionName}</span></h4>
              <p title="${escapeHtml(fileInfo)}">${escapeHtml(item.desc.substring(0, 60))}${item.desc.length > 60 ? '...' : ''} &bull; <code>${escapeHtml(item.fileName || 'Enlace externo')}</code></p>
            </div>
          </div>
          <div class="manager-item__actions">
            <button type="button" class="btn btn--small btn--ghost edit-item-btn" data-id="${escapeHtml(item.id)}">✏️ Editar</button>
            <button type="button" class="btn btn--small btn--danger-outline delete-item-btn" data-id="${escapeHtml(item.id)}">🗑️</button>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    itemsManagerList.querySelectorAll('.edit-item-btn').forEach(btn => {
      btn.addEventListener('click', () => editItem(btn.dataset.id));
    });
    itemsManagerList.querySelectorAll('.delete-item-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteItem(btn.dataset.id));
    });
  }

  // ── Admin Modal Elements ──
  const adminBtn = document.getElementById('adminBtn');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminPanelModal = document.getElementById('adminPanelModal');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminPinInput = document.getElementById('adminPinInput');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const cancelLoginBtn = document.getElementById('cancelLoginBtn');
  const loginBackdrop = document.getElementById('loginBackdrop');

  const closePanelModal = document.getElementById('closePanelModal');
  const panelBackdrop = document.getElementById('panelBackdrop');
  const logoutAdminBtn = document.getElementById('logoutAdminBtn');

  function openAdmin() {
    if (isAuthenticated()) {
      openPanel();
    } else {
      openLogin();
    }
  }

  function openLogin() {
    adminLoginModal.classList.add('active');
    adminLoginModal.setAttribute('aria-hidden', 'false');
    adminPinInput.value = '';
    loginErrorMsg.textContent = '';
    setTimeout(() => adminPinInput.focus(), 150);
  }

  function closeLogin() {
    adminLoginModal.classList.remove('active');
    adminLoginModal.setAttribute('aria-hidden', 'true');
  }

  function openPanel() {
    closeLogin();
    adminPanelModal.classList.add('active');
    adminPanelModal.setAttribute('aria-hidden', 'false');
    renderManagerList();
  }

  function closePanel() {
    adminPanelModal.classList.remove('active');
    adminPanelModal.setAttribute('aria-hidden', 'true');
    resetItemForm();
  }

  if (adminBtn) adminBtn.addEventListener('click', openAdmin);
  if (closeLoginModal) closeLoginModal.addEventListener('click', closeLogin);
  if (cancelLoginBtn) cancelLoginBtn.addEventListener('click', closeLogin);
  if (loginBackdrop) loginBackdrop.addEventListener('click', closeLogin);

  if (closePanelModal) closePanelModal.addEventListener('click', closePanel);
  if (panelBackdrop) panelBackdrop.addEventListener('click', closePanel);

  // Keyboard shortcut: Ctrl + Alt + X
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.altKey && (e.key === 'x' || e.key === 'X')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
      e.preventDefault();
      openAdmin();
    }
    if (e.key === 'Escape') {
      closeLogin();
      closePanel();
    }
  });

  // URL Hash trigger
  if (window.location.hash === '#admin') {
    openAdmin();
  }

  // Triple click on logo triggers admin
  const logo = document.querySelector('.logo');
  let logoClicks = 0;
  let logoTimer;
  if (logo) {
    logo.addEventListener('click', (e) => {
      logoClicks++;
      clearTimeout(logoTimer);
      if (logoClicks >= 3) {
        e.preventDefault();
        logoClicks = 0;
        openAdmin();
      } else {
        logoTimer = setTimeout(() => { logoClicks = 0; }, 600);
      }
    });
  }

  // Login Submit
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredPin = adminPinInput.value.trim();
      const enteredHash = await hashString(enteredPin);
      const actualHash = getPinHash();

      if (enteredHash === actualHash) {
        setAuthenticated(true);
        loginErrorMsg.textContent = '';
        openPanel();
      } else {
        loginErrorMsg.textContent = '❌ PIN incorrecto. Intentá nuevamente.';
        adminPinInput.select();
      }
    });
  }

  // Logout
  if (logoutAdminBtn) {
    logoutAdminBtn.addEventListener('click', () => {
      setAuthenticated(false);
      closePanel();
    });
  }

  // ── Tabs Switching ──
  const panelTabs = document.querySelectorAll('.panel-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  function activateTab(tabId) {
    panelTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
  }

  panelTabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  // ── Radio Toggle: Local vs External ──
  const downloadTypeRadios = document.querySelectorAll('input[name="downloadType"]');
  const localFileInputGroup = document.getElementById('localFileInputGroup');
  const externalUrlGroup = document.getElementById('externalUrlGroup');

  downloadTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'local') {
        localFileInputGroup.style.display = 'block';
        externalUrlGroup.style.display = 'none';
      } else {
        localFileInputGroup.style.display = 'none';
        externalUrlGroup.style.display = 'block';
      }
    });
  });

  // Local file picker helper
  const localFilePicker = document.getElementById('localFilePicker');
  const itemFileName = document.getElementById('itemFileName');

  if (localFilePicker && itemFileName) {
    localFilePicker.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        itemFileName.value = e.target.files[0].name;
      }
    });
  }

  // ── Form Add/Edit Item ──
  const itemForm = document.getElementById('itemForm');
  const itemId = document.getElementById('itemId');
  const itemTitle = document.getElementById('itemTitle');
  const itemSection = document.getElementById('itemSection');
  const itemDesc = document.getElementById('itemDesc');
  const itemVersion = document.getElementById('itemVersion');
  const itemPlatform = document.getElementById('itemPlatform');
  const itemIcon = document.getElementById('itemIcon');
  const itemUrl = document.getElementById('itemUrl');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const saveItemBtn = document.getElementById('saveItemBtn');

  function resetItemForm() {
    if (!itemForm) return;
    itemForm.reset();
    itemId.value = '';
    saveItemBtn.textContent = '💾 Guardar y Publicar';
    cancelEditBtn.style.display = 'none';
    localFileInputGroup.style.display = 'block';
    externalUrlGroup.style.display = 'none';
    const localRadio = document.querySelector('input[name="downloadType"][value="local"]');
    if (localRadio) localRadio.checked = true;
  }

  if (cancelEditBtn) cancelEditBtn.addEventListener('click', resetItemForm);

  function editItem(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    itemId.value = item.id;
    itemTitle.value = item.title;
    itemSection.value = item.section;
    itemDesc.value = item.desc;
    itemVersion.value = item.version || '';
    itemPlatform.value = item.platform || '';
    itemIcon.value = item.icon || 'window';

    const isLocal = item.downloadType === 'local';
    const radioToSelect = document.querySelector(`input[name="downloadType"][value="${isLocal ? 'local' : 'external'}"]`);
    if (radioToSelect) radioToSelect.checked = true;

    if (isLocal) {
      localFileInputGroup.style.display = 'block';
      externalUrlGroup.style.display = 'none';
      itemFileName.value = item.fileName || '';
      itemUrl.value = '';
    } else {
      localFileInputGroup.style.display = 'none';
      externalUrlGroup.style.display = 'block';
      itemUrl.value = item.url || '';
      itemFileName.value = '';
    }

    saveItemBtn.textContent = '💾 Actualizar Elemento';
    cancelEditBtn.style.display = 'inline-flex';
    activateTab('tab-add');
  }

  function deleteItem(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (confirm(`¿Estás seguro de que querés eliminar "${item.title}"?`)) {
      const filtered = items.filter(i => i.id !== id);
      saveItems(filtered);
      if (itemId.value === id) resetItemForm();
    }
  }

  if (itemForm) {
    itemForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const items = getItems();
      const editingId = itemId.value;
      const checkedRadio = document.querySelector('input[name="downloadType"]:checked');
      const isLocal = checkedRadio ? checkedRadio.value === 'local' : true;

      let fileNameVal = itemFileName.value.trim();
      let urlVal = itemUrl.value.trim();

      if (isLocal) {
        if (!fileNameVal) {
          alert('Por favor ingresá el nombre del archivo en descargas/ (ej: mi-programa.exe)');
          itemFileName.focus();
          return;
        }
        // Normalize filename if user typed "descargas/..."
        if (fileNameVal.startsWith('descargas/')) {
          fileNameVal = fileNameVal.replace('descargas/', '');
        }
        urlVal = `descargas/${fileNameVal}`;
      } else {
        if (!urlVal) {
          alert('Por favor ingresá la URL directa del programa');
          itemUrl.focus();
          return;
        }
      }

      const itemData = {
        id: editingId || `item-${Date.now()}`,
        section: itemSection.value,
        title: itemTitle.value.trim(),
        desc: itemDesc.value.trim(),
        version: itemVersion.value.trim(),
        platform: itemPlatform.value.trim(),
        icon: itemIcon.value,
        downloadType: isLocal ? 'local' : 'external',
        fileName: fileNameVal,
        url: urlVal
      };

      if (editingId) {
        const index = items.findIndex(i => i.id === editingId);
        if (index !== -1) items[index] = itemData;
      } else {
        items.unshift(itemData); // Add to beginning
      }

      saveItems(items);
      resetItemForm();
      activateTab('tab-list');
    });
  }

  // ── Change PIN Form ──
  const changePinForm = document.getElementById('changePinForm');
  const newPinInput = document.getElementById('newPinInput');
  const pinSuccessMsg = document.getElementById('pinSuccessMsg');

  if (changePinForm) {
    changePinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const val = newPinInput.value.trim();
      if (val.length < 4) {
        alert('El PIN debe tener al menos 4 caracteres.');
        return;
      }
      await setPin(val);
      newPinInput.value = '';
      pinSuccessMsg.textContent = '✓ ¡PIN actualizado con éxito!';
      setTimeout(() => { pinSuccessMsg.textContent = ''; }, 3000);
    });
  }

  // ── Reset to Defaults ──
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', () => {
      if (confirm('¿Restablecer los 6 programas de muestra originales? Tus cambios se borrarán.')) {
        saveItems(DEFAULT_ITEMS);
        resetItemForm();
      }
    });
  }

  // ── Export index.html ──
  const exportHtmlBtn = document.getElementById('exportHtmlBtn');
  if (exportHtmlBtn) {
    exportHtmlBtn.addEventListener('click', () => {
      // Clone entire document
      const docClone = document.documentElement.cloneNode(true);

      // Re-populate grids in clone with current items
      const items = getItems();
      const progs = items.filter(i => i.section === 'programas');
      const tools = items.filter(i => i.section === 'herramientas');

      const cloneProgsGrid = docClone.querySelector('#programasGrid');
      const cloneToolsGrid = docClone.querySelector('#herramientasGrid');

      if (cloneProgsGrid) cloneProgsGrid.innerHTML = progs.map(renderCard).join('');
      if (cloneToolsGrid) cloneToolsGrid.innerHTML = tools.map(renderCard).join('');

      const htmlContent = '<!DOCTYPE html>\n' + docClone.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
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
  }

  // ── Active Nav Link on Scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const setActiveLink = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });

  // ── Header bg opacity on scroll ──
  const header = document.getElementById('header');
  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.85)';
    }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });

  // ── Initial Render ──
  renderAll();
})();

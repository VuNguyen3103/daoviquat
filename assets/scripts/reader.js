/* ============================================================
   ĐÀO VỊ QUẤT — Reader JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── State ── */
  const state = {
    fontSize:    parseInt(localStorage.getItem('dvq_fontSize')    || '18'),
    lineHeight:  parseFloat(localStorage.getItem('dvq_lineHeight') || '1.85'),
    theme:       localStorage.getItem('dvq_theme') || 'light',
  };

  /* ── DOM refs ── */
  const body        = document.querySelector('.reader-body');
  const progressBar = document.getElementById('progressFill');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const fontSizeSlider   = document.getElementById('fontSizeSlider');
  const lineHeightSlider = document.getElementById('lineHeightSlider');
  const fontSizeDisplay   = document.getElementById('fontSizeDisplay');
  const lineHeightDisplay = document.getElementById('lineHeightDisplay');
  const themeBtns   = document.querySelectorAll('.theme-btn');

  /* ── Apply saved settings ── */
  function applySettings() {
    document.documentElement.style.setProperty('--reader-font-size', state.fontSize + 'px');
    document.documentElement.style.setProperty('--reader-line-height', state.lineHeight);
    body?.setAttribute('data-theme', state.theme === 'light' ? '' : state.theme);

    if (fontSizeSlider)   { fontSizeSlider.value = state.fontSize; updateSliderBg(fontSizeSlider, 14, 24); }
    if (lineHeightSlider) { lineHeightSlider.value = state.lineHeight; updateSliderBg(lineHeightSlider, 1.4, 2.2); }
    if (fontSizeDisplay)   fontSizeDisplay.textContent   = state.fontSize + 'px';
    if (lineHeightDisplay) lineHeightDisplay.textContent = state.lineHeight;

    themeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === state.theme);
    });
  }

  function updateSliderBg(slider, min, max) {
    const pct = ((slider.value - min) / (max - min)) * 100;
    slider.style.setProperty('--pct', pct + '%');
    slider.style.background = `linear-gradient(90deg, #C4647A ${pct}%, #F9D4E2 ${pct}%)`;
  }

  /* ── Settings toggle ── */
  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsPanel.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
        settingsPanel.classList.remove('open');
      }
    });
  }

  /* ── Font size ── */
  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', () => {
      state.fontSize = parseInt(fontSizeSlider.value);
      document.documentElement.style.setProperty('--reader-font-size', state.fontSize + 'px');
      if (fontSizeDisplay) fontSizeDisplay.textContent = state.fontSize + 'px';
      localStorage.setItem('dvq_fontSize', state.fontSize);
      updateSliderBg(fontSizeSlider, 14, 24);
    });
  }

  /* ── Line height ── */
  if (lineHeightSlider) {
    lineHeightSlider.addEventListener('input', () => {
      state.lineHeight = parseFloat(lineHeightSlider.value);
      document.documentElement.style.setProperty('--reader-line-height', state.lineHeight);
      if (lineHeightDisplay) lineHeightDisplay.textContent = state.lineHeight;
      localStorage.setItem('dvq_lineHeight', state.lineHeight);
      updateSliderBg(lineHeightSlider, 1.4, 2.2);
    });
  }

  /* ── Theme ── */
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.theme = btn.dataset.theme;
      body?.setAttribute('data-theme', state.theme === 'light' ? '' : state.theme);
      localStorage.setItem('dvq_theme', state.theme);
      themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === state.theme));
    });
  });

  /* ── Scroll progress ── */
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const doc     = document.documentElement;
      const total   = doc.scrollHeight - doc.clientHeight;
      const current = window.scrollY;
      progressBar.style.width = (total > 0 ? (current / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ── Init ── */
  applySettings();

});

(() => {
  'use strict';

  const setPressed = (button, active) => {
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  };

  document.querySelectorAll('.comparison-card input[type="range"]').forEach(slider => {
    const frame = slider.closest('.comparison-frame');
    const reference = frame.querySelector('.label-left').textContent;
    const updateDivider = () => {
      frame.style.setProperty('--split', `${slider.value}%`);
      slider.setAttribute('aria-valuetext', `${slider.value}% ${reference} visible`);
    };
    slider.addEventListener('input', updateDivider);
    updateDivider();
  });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const comparisonCards = [...document.querySelectorAll('.comparison-card[data-group]')];
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const group = button.dataset.filter;
      filterButtons.forEach(item => setPressed(item, item === button));
      comparisonCards.forEach(card => { card.hidden = group !== 'all' && card.dataset.group !== group; });
    });
  });

  const copyButton = document.getElementById('copy-citation');
  const bibtex = document.getElementById('bibtex');
  const copyStatus = document.getElementById('copy-status');
  if (copyButton && bibtex && copyStatus) {
    const originalButtonMarkup = copyButton.innerHTML;
    let resetTimer;
    const selectCitation = () => {
      const range = document.createRange();
      range.selectNodeContents(bibtex);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };
    const copyFallback = () => {
      const field = document.createElement('textarea');
      field.value = bibtex.textContent;
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(field);
      field.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* Offer manual selection below. */ }
      field.remove();
      copyButton.focus();
      return copied;
    };
    copyButton.addEventListener('click', async () => {
      window.clearTimeout(resetTimer);
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(bibtex.textContent);
          copied = true;
        } catch { /* Browser clipboard policy may require the legacy fallback. */ }
      }
      if (!copied) copied = copyFallback();
      if (copied) {
        copyButton.textContent = 'Copied!';
        copyStatus.textContent = 'BibTeX citation copied to clipboard.';
      } else {
        selectCitation();
        copyButton.textContent = 'Citation selected';
        copyStatus.textContent = 'The citation is selected. Press Command+C on Mac or Ctrl+C on Windows to copy it.';
      }
      resetTimer = window.setTimeout(() => { copyButton.innerHTML = originalButtonMarkup; }, 2400);
    });
  }

  const video = document.getElementById('overview-video');
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && video) video.pause();
  });
})();

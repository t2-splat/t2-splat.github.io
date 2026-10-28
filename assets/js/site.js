(() => {
  'use strict';
  // Set this to the verified public code repository when the release is ready.
  const publicCodeUrl = '';
  if (publicCodeUrl) {
    const link = document.getElementById('code-link');
    link.href = publicCodeUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    document.getElementById('code-label').textContent = 'Code';
    const status = document.getElementById('code-status');
    const resource = document.createElement('a');
    resource.href = publicCodeUrl;
    resource.target = '_blank';
    resource.rel = 'noopener';
    resource.innerHTML = '<span><strong>Code &amp; installation</strong><small>Official implementation on GitHub</small></span><span aria-hidden="true">↗</span>';
    status.replaceWith(resource);
  }

  document.querySelectorAll('.comparison-frame input').forEach(input => {
    const update = () => {
      input.closest('.comparison-frame').style.setProperty('--split', `${input.value}%`);
      input.setAttribute('aria-valuetext', `${input.value}% left image visible`);
    };
    input.addEventListener('input', update);
    update();
  });

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('[data-group]').forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.group !== button.dataset.filter;
      });
    });
  });

  const budgets = {
    100: { faces: '2.7M', psnr: '25.68', lpips: '0.15', ssim: '0.818', note: 'The full configuration balances geometric detail and appearance quality.' },
    50: { faces: '1.4M', psnr: '25.38', lpips: '0.17', ssim: '0.801', note: 'Higher PSNR and SSIM, and lower LPIPS, than MeshSplatting (7.3M faces) on Garden.' },
    10: { faces: '0.3M', psnr: '23.93', lpips: '0.30', ssim: '0.697', note: 'A more compact mesh, with lower rendering quality than the larger configurations and MeshSplatting.' }
  };
  document.querySelectorAll('[data-budget]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.budget;
      const budget = budgets[key];
      document.querySelectorAll('[data-budget]').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      ['faces', 'psnr', 'lpips', 'ssim', 'note'].forEach(field => {
        document.getElementById(`budget-${field}`).textContent = budget[field];
      });
      document.getElementById('budget-bar').style.width = `${key}%`;
    });
  });

  document.getElementById('copy-citation').addEventListener('click', async event => {
    const button = event.currentTarget;
    const text = document.getElementById('bibtex').textContent;
    const status = document.getElementById('copy-status');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        button.focus();
        if (!copied) throw new Error('Copy unavailable');
      }
      button.textContent = 'Copied!';
      status.textContent = 'BibTeX citation copied to clipboard.';
      window.setTimeout(() => { button.textContent = 'Copy citation'; }, 2200);
    } catch {
      status.textContent = 'Please select the citation text and copy it manually.';
      button.textContent = 'Select text to copy';
    }
  });

  // Avoid unnecessary playback and network use: the video starts only on request.
  const video = document.getElementById('overview-video');
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
})();

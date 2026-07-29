(function () {
  const dataEl = document.getElementById('photo-gallery-data');
  const grid = document.getElementById('photo-grid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');

  if (!dataEl || !grid || !lightbox || !lbImg || !lbCaption) return;

  const hero = document.querySelector('.gyear-feature');
  const heroImg = document.getElementById('gyear-hero-img');
  if (hero && heroImg) {
    const match = heroImg.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    const heroSrc = match ? match[1] : '';
    if (heroSrc) {
      const tester = new Image();
      tester.onerror = () => hero.classList.add('no-image');
      tester.src = heroSrc;
    }
  }

  const PHOTOS = new Function(`return (${dataEl.textContent.trim()})`)();
  let current = 0;

  PHOTOS.forEach((photo, index) => {
    const btn = document.createElement('button');
    btn.className = 'photo-item' + (index === 0 ? ' span-2x2' : '');
    btn.setAttribute('data-path', photo.src);

    const num = document.createElement('span');
    num.className = 'photo-item__num';
    num.textContent = String(index + 1).padStart(2, '0');

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      btn.classList.add('img-missing');
    });

    const caption = document.createElement('span');
    caption.className = 'photo-caption';
    caption.textContent = photo.caption;

    btn.appendChild(num);
    btn.appendChild(img);
    btn.appendChild(caption);
    btn.addEventListener('click', () => open(index));
    grid.appendChild(btn);
  });

  function open(index) {
    current = index;
    render();
    lightbox.classList.add('is-open');
  }

  function render() {
    lbImg.src = PHOTOS[current].src;
    lbImg.alt = PHOTOS[current].caption;
    lbCaption.textContent = PHOTOS[current].caption;
  }

  function close() {
    lightbox.classList.remove('is-open');
  }

  function next() {
    current = (current + 1) % PHOTOS.length;
    render();
  }

  function prev() {
    current = (current - 1 + PHOTOS.length) % PHOTOS.length;
    render();
  }

  document.getElementById('lb-close')?.addEventListener('click', close);
  document.getElementById('lb-next')?.addEventListener('click', next);
  document.getElementById('lb-prev')?.addEventListener('click', prev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

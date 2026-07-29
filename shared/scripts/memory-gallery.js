(function () {
  const dataEl = document.getElementById('memory-gallery-data');
  const grid = document.getElementById('memory-grid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');

  if (!dataEl || !grid || !lightbox || !lbImg || !lbCaption) return;

  const PHOTOS = new Function(`return (${dataEl.textContent.trim()})`)();
  const CYCLE_MS = 2400;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groups = [];
  PHOTOS.forEach((photo, index) => {
    const last = groups[groups.length - 1];
    if (last && last.activity === photo.activity) {
      last.indexes.push(index);
    } else {
      groups.push({ activity: photo.activity, indexes: [index], span: photo.span });
    }
  });

  groups.forEach((group) => {
    const tile = document.createElement('button');
    tile.className = 'memory-tile' + (group.span ? ' ' + group.span : '');
    tile.setAttribute('data-start', group.indexes[0]);

    const stack = document.createElement('div');
    stack.className = 'memory-tile__stack';

    group.indexes.forEach((photoIndex, i) => {
      const img = document.createElement('img');
      img.src = PHOTOS[photoIndex].src;
      img.alt = PHOTOS[photoIndex].alt;
      img.loading = 'lazy';
      if (i === 0) img.classList.add('is-active');
      stack.appendChild(img);
    });

    const shade = document.createElement('div');
    shade.className = 'memory-tile__shade';

    const label = document.createElement('span');
    label.className = 'memory-tile__label';
    label.textContent = PHOTOS[group.indexes[0]].caption;

    tile.appendChild(stack);
    tile.appendChild(shade);

    if (group.indexes.length > 1) {
      const dots = document.createElement('div');
      dots.className = 'memory-tile__dots';
      group.indexes.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('is-active');
        dots.appendChild(dot);
      });
      tile.appendChild(dots);

      if (!reduceMotion) {
        let active = 0;
        setInterval(() => {
          const imgs = stack.querySelectorAll('img');
          const dotEls = dots.querySelectorAll('span');
          imgs[active].classList.remove('is-active');
          dotEls[active].classList.remove('is-active');
          active = (active + 1) % imgs.length;
          imgs[active].classList.add('is-active');
          dotEls[active].classList.add('is-active');
        }, CYCLE_MS);
      }
    }

    tile.appendChild(label);
    tile.addEventListener('click', () => open(parseInt(tile.getAttribute('data-start'), 10)));
    grid.appendChild(tile);
  });

  let current = 0;

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

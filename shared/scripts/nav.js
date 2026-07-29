(function () {
  const nav = document.querySelector('#site-nav');
  if (!nav) return;

  const pageKey = nav.getAttribute('data-page') || 'inicio';
  const root = nav.getAttribute('data-root') || '';
  const assetRoot = nav.getAttribute('data-assets') || `${root}../assets`;

  const links = [
    { key: 'inicio', href: 'index.html', label: 'Inicio' },
    { key: 'historia', href: 'historia.html', label: 'Historia' },
    { key: 'divisiones', href: 'divisiones.html', label: 'Divisiones' },
    { key: 'proyectos', href: 'proyectos.html', label: 'Proyectos' },
    { key: 'eventos', href: 'eventos.html', label: 'Eventos' },
    { key: 'noticias', href: 'noticias.html', label: 'Noticias' },
    { key: 'galeria', href: 'galeria.html', label: 'Galería' },
    { key: 'nosotros', href: 'nosotros.html', label: 'Nosotros' },
    { key: 'nasa', href: 'nasa.html', label: 'NASA' }
  ];

  const socials = [
    {
      href: 'https://www.instagram.com/aessunicauca',
      label: 'Instagram',
      icon: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"></circle>
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"></circle>
        </svg>`
    },
    {
      href: 'https://www.youtube.com/@capituloestudiantilaess-ie4622',
      label: 'YouTube',
      icon: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21.6 7.6a2.9 2.9 0 0 0-2-2c-1.8-.5-7.6-.5-7.6-.5s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30.3 30.3 0 0 0 2 12a30.3 30.3 0 0 0 .4 4.4 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30.3 30.3 0 0 0 22 12a30.3 30.3 0 0 0-.4-4.4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
          <path d="m10 9 5 3-5 3V9Z" fill="currentColor"></path>
        </svg>`
    },
    {
      href: 'https://www.linkedin.com/in/aess-unicauca-25a0161a9',
      label: 'LinkedIn',
      icon: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="9" width="3.2" height="10" fill="currentColor"></rect>
          <circle cx="5.6" cy="5.8" r="1.8" fill="currentColor"></circle>
          <path d="M10 9h3v1.7h.1c.4-.8 1.5-2 3.7-2 4 0 4.7 2.6 4.7 6V19h-3.2v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V19H10V9Z" fill="currentColor"></path>
        </svg>`
    },
    {
      href: 'https://github.com/aessunicauca',
      label: 'GitHub',
      icon: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.8.8.1-.6.3-1 .6-1.3-2.2-.3-4.6-1.1-4.6-5a3.8 3.8 0 0 1 1-2.6 3.5 3.5 0 0 1 .1-2.6s.8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1a3.5 3.5 0 0 1 .1 2.6 3.8 3.8 0 0 1 1 2.6c0 3.9-2.4 4.7-4.7 5 .3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor"></path>
        </svg>`
    }
  ];

  const menuMarkup = links
    .map((link) => {
      const isActive = link.key === pageKey;
      return `<a href="${root}${link.href}"${isActive ? ' class="active"' : ''}>${link.label}</a>`;
    })
    .join('');

  const socialsMarkup = socials
    .map((social) => `
      <a href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${social.label}" title="${social.label}">
        ${social.icon}
      </a>
    `)
    .join('');

  nav.innerHTML = `
    <div class="logo">
      <img src="${assetRoot}/images/logos/logo2circ.png" alt="AESS Unicauca">
    </div>

    <button class="nav-toggle" id="navToggle" type="button" aria-label="Abrir menú" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-links" id="navLinks">
      <div class="menu">${menuMarkup}</div>

      <div class="socials">
        ${socialsMarkup}
      </div>
    </div>
  `;

  const navToggle = nav.querySelector('#navToggle');
  const navLinks = nav.querySelector('#navLinks');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.menu a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const resetInitialScroll = () => {
    if (window.location.hash) return;

    const scrollContainers = document.querySelectorAll('.main-content--scroll');
    const rootScroller = document.scrollingElement || document.documentElement || document.body;

    window.scrollTo(0, 0);
    if (rootScroller) {
      rootScroller.scrollTop = 0;
      rootScroller.scrollLeft = 0;
    }

    scrollContainers.forEach((container) => {
      container.scrollTop = 0;
      container.scrollLeft = 0;
    });
  };

  const scheduleInitialResets = () => {
    resetInitialScroll();
    requestAnimationFrame(resetInitialScroll);
    setTimeout(resetInitialScroll, 0);
    setTimeout(resetInitialScroll, 120);
    setTimeout(resetInitialScroll, 350);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInitialResets, { once: true });
  } else {
    scheduleInitialResets();
  }

  window.addEventListener('load', scheduleInitialResets, { once: true });
  window.addEventListener('pageshow', scheduleInitialResets);
})();

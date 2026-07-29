(function () {
  const nav = document.querySelector('#site-nav');
  if (!nav) return;

  const pageKey = nav.getAttribute('data-page') || 'inicio';
  const currentPath = window.location.pathname.replace(/\\/g, '/');

  function toRelative(targetPath) {
    const currentDir = currentPath.replace(/\/[^/]+$/, '/').replace(/^\/+|\/+$/g, '');
    const currentSegments = currentDir ? currentDir.split('/') : [];
    const targetAbs = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
    const targetSegments = targetAbs.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

    let i = 0;
    while (i < currentSegments.length && i < targetSegments.length && currentSegments[i] === targetSegments[i]) {
      i += 1;
    }

    const up = Math.max(0, currentSegments.length - i);
    const down = targetSegments.slice(i);
    const prefix = '../'.repeat(up);

    return `${prefix}${down.join('/')}`;
  }

  const links = [
    { key: 'inicio', href: 'pages/index.html', label: 'Inicio' },
    { key: 'historia', href: 'pages/historia.html', label: 'Historia' },
    { key: 'divisiones', href: 'pages/divisiones.html', label: 'Divisiones' },
    { key: 'proyectos', href: 'pages/proyectos.html', label: 'Proyectos' },
    { key: 'eventos', href: 'pages/eventos.html', label: 'Eventos' },
    { key: 'noticias', href: 'pages/noticias.html', label: 'Noticias' },
    { key: 'galeria', href: 'pages/galeria.html', label: 'Galería' },
    { key: 'nosotros', href: 'pages/nosotros.html', label: 'Nosotros' },
    { key: 'nasa', href: 'pages/nasa.html', label: 'NASA' }
  ];

  const menuMarkup = links
    .map((link) => {
      const isActive = link.key === pageKey;
      return `<a href="${toRelative(link.href)}"${isActive ? ' class="active"' : ''}>${link.label}</a>`;
    })
    .join('');

  nav.innerHTML = `
    <div class="logo">
      <img src="${toRelative('assets/images/logos/logo2circ.png')}" alt="AESS Unicauca">
    </div>

    <button class="nav-toggle" id="navToggle" type="button" aria-label="Abrir menú" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-links" id="navLinks">
      <div class="menu">${menuMarkup}</div>

      <div class="socials">
        <a href="https://www.instagram.com/aessunicauca" target="_blank" rel="noopener noreferrer">IG</a>
        <a href="https://www.youtube.com/@capituloestudiantilaess-ie4622" target="_blank" rel="noopener noreferrer">YT</a>
        <a href="https://www.linkedin.com/in/aess-unicauca-25a0161a9" target="_blank" rel="noopener noreferrer">Ln</a>
        <a href="https://github.com/aessunicauca" target="_blank" rel="noopener noreferrer">GH</a>
      </div>
    </div>
  `;
})();

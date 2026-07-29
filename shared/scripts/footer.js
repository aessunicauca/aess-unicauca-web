(function () {
  let footer = document.querySelector('#site-footer');

  if (!footer) {
    footer = document.createElement('footer');
    footer.id = 'site-footer';
    document.body.appendChild(footer);
  }

  footer.className = 'footer';

  const root = footer.getAttribute('data-root')
    || document.querySelector('#site-nav')?.getAttribute('data-root')
    || '';

  const assetRoot = footer.getAttribute('data-assets') || `${root}../assets`;

  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-about">
        <img src="${assetRoot}/images/logos/logo2circ.png" alt="AESS Unicauca">
        <h3>IEEE AESS Universidad del Cauca</h3>
        <p>
          Capítulo estudiantil dedicado al desarrollo de proyectos
          aeroespaciales, investigación, divulgación científica
          e innovación tecnológica.
        </p>
      </div>

      <div class="footer-column">
        <h4>CAPÍTULO</h4>
        <a href="${root}historia.html">Historia</a>
        <a href="${root}nosotros.html">Nosotros</a>
        <a href="${root}divisiones.html">Divisiones</a>
        <a href="${root}galeria.html">Galería</a>
      </div>

      <div class="footer-column">
        <h4>EVENTOS</h4>
        <a href="https://siaunicauca.github.io/hidrochallenge">Hidrochallenge y Semana del Espacio</a>
        <a href="${root}nasa.html">NASA Space Apps</a>
        <a href="https://siaunicauca.github.io/sia">Semillero de Ingeniería Aeroespacial</a>
      </div>

      <div class="footer-column">
        <h4>REDES</h4>
        <a href="https://www.instagram.com/aessunicauca?igsh=MTlrM3R5d21tOTlj&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="http://www.youtube.com/@capituloestudiantilaess-ie4622" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.linkedin.com/in/aess-unicauca-25a0161a9" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/aessunicauca" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>

    <div class="footer-middle">
      <a href="#">Política de privacidad</a>
      <a href="#">Contacto</a>
      <a href="https://ieee-aess.org/" target="_blank" rel="noopener noreferrer">IEEE AESS Global</a>
      <a href="https://www.unicauca.edu.co/" target="_blank" rel="noopener noreferrer">Universidad del Cauca</a>
      <a href="http://ieee.unicauca.edu.co/" target="_blank" rel="noopener noreferrer">Rama IEEE Universidad del Cauca</a>
    </div>

    <div class="footer-bottom">
      <span>&copy; 2019 - 2026 IEEE AESS Universidad del Cauca</span>
      <span>Aerospace Engineering &amp; Space Systems</span>
    </div>

    <div class="footer-bar">
      &bull; EDITORA DE LA PÁGINA: SARAH CABEZA, JHOJAN OROZCO, ANDRÉS MUÑOZ &bull; ADVISOR IEEE AESS UNICAUCA: HERNÁN TOBAR &bull; WEB MASTER:
    </div>
  `;
})();

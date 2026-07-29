# AESS Unicauca Web

Sitio web oficial del Capítulo Estudiantil IEEE AESS Unicauca.

Este proyecto está organizado como un sitio estático con HTML, CSS y JavaScript vanilla. Durante la reorganización reciente se centralizaron los estilos en `styles/` y los scripts reutilizables en `shared/` para que el proyecto sea más legible, escalable y fácil de mantener.

## Estructura del proyecto

```text
aess-unicauca-web/
├── assets/
│   ├── icons/
│   └── images/
│       ├── carruselvert/
│       ├── eventos/
│       ├── galeria/
│       ├── historia/
│       ├── lideres/
│       ├── logos/
│       ├── nasa/
│       ├── noticias/
│       └── proyectos/
├── pages/
│   ├── index.html
│   ├── historia.html
│   ├── divisiones.html
│   ├── proyectos.html
│   ├── eventos.html
│   ├── noticias.html
│   ├── galeria.html
│   ├── nosotros.html
│   ├── nasa.html
│   ├── galery/
│   │   ├── g2020.html
│   │   ├── g2021.html
│   │   ├── g2022.html
│   │   ├── g2023.html
│   │   ├── g2024.html
│   │   └── g2025.html
│   ├── history/
│   │   ├── 2020.html
│   │   ├── 2021.html
│   │   ├── 2022.html
│   │   ├── 2023.html
│   │   ├── 2024.html
│   │   └── 2025.html
│   └── nasaspace/
│       ├── nasa2021.html
│       ├── nasa2022.html
│       ├── nasa2023.html
│       ├── nasa2024.html
│       └── nasa2025.html
├── shared/
│   └── scripts/
│       ├── nav.js
│       ├── timeline.js
│       ├── memory-gallery.js
│       └── photo-gallery.js
├── styles/
│   ├── main.css
│   ├── core.css
│   └── pages/
│       ├── divisiones.css
│       ├── galeria.css
│       ├── history.css
│       ├── nasa.css
│       ├── noticias.css
│       └── proyectos.css
├── index.html
└── README.md
```

## Cómo funciona la navegación

La raíz del proyecto tiene un `index.html` que redirige a `pages/index.html`.

Las páginas principales dentro de `pages/` usan un nav compartido renderizado por:

- [shared/scripts/nav.js](C:\Users\asdru\OneDrive\Desktop\aess-unicauca-web\shared\scripts\nav.js)

Las páginas anidadas, como:

- `pages/galery/*.html`
- `pages/history/*.html`
- `pages/nasaspace/*.html`

también usan el mismo nav compartido, pero pasando `data-root="../"` para corregir rutas relativas.

## Organización de estilos

El proyecto ya no usa un único `style.css` gigante en la raíz. Ahora los estilos están centralizados así:

- [styles/main.css](C:\Users\asdru\OneDrive\Desktop\aess-unicauca-web\styles\main.css): punto de entrada único
- [styles/core.css](C:\Users\asdru\OneDrive\Desktop\aess-unicauca-web\styles\core.css): estilos compartidos globales
- [styles/pages/](C:\Users\asdru\OneDrive\Desktop\aess-unicauca-web\styles\pages): estilos por área o sección

### Convención actual

- Todo HTML debe enlazar únicamente `styles/main.css`
- Los estilos globales o reutilizables deben ir a `core.css`
- Los estilos propios de una sección deben ir a `styles/pages/*.css`
- Si un bloque crece demasiado o empieza a repetirse, conviene fragmentarlo en más módulos

## Organización de scripts compartidos

Los scripts reutilizables se movieron a `shared/scripts/`.

### Scripts actuales

- `nav.js`
  - renderiza el menú lateral
  - marca la página activa
  - dibuja los iconos de redes sociales
  - controla la apertura/cierre en móvil

- `timeline.js`
  - controla el comportamiento de la línea de tiempo donde aplica

- `memory-gallery.js`
  - construye el mosaico de galerías anuales en `pages/galery/`
  - agrupa fotos por actividad
  - rota imágenes con transición suave
  - abre lightbox

- `photo-gallery.js`
  - construye la galería tipo mosaico de páginas NASA
  - genera tarjetas, numeración y lightbox

## Cómo editar cada parte del sitio

### 1. Páginas principales

Archivos:

- `pages/index.html`
- `pages/historia.html`
- `pages/divisiones.html`
- `pages/proyectos.html`
- `pages/eventos.html`
- `pages/noticias.html`
- `pages/galeria.html`
- `pages/nosotros.html`
- `pages/nasa.html`

Aquí se edita el contenido general de cada sección.

### 2. Galerías por año

Archivos:

- `pages/galery/g2020.html`
- `pages/galery/g2021.html`
- `pages/galery/g2022.html`
- `pages/galery/g2023.html`
- `pages/galery/g2024.html`
- `pages/galery/g2025.html`

Cada una contiene:

- el contenido editorial del año
- un bloque de datos con las fotos

Ese bloque se ve así:

```html
<script id="memory-gallery-data" type="text/plain">
[
  { src: '../../assets/images/galeria/g2020/fund.jpeg', alt: '...', caption: '...', activity: '...', span: 'span-2x2' }
]
</script>
```

Importante:

- `src` debe apuntar a un archivo real en `assets/images/galeria/...`
- `span` es opcional
- `activity` se usa para agrupar fotos que rotan en una misma tarjeta

### 3. Galerías NASA

Archivos:

- `pages/nasaspace/nasa2021.html`
- `pages/nasaspace/nasa2022.html`
- `pages/nasaspace/nasa2023.html`
- `pages/nasaspace/nasa2024.html`
- `pages/nasaspace/nasa2025.html`

Estas páginas usan un bloque similar:

```html
<script id="photo-gallery-data" type="text/plain">
[
  { src: '../../assets/images/nasa/n2021/prin.jpeg', alt: '...', caption: '...' }
]
</script>
```

Ese bloque es procesado por `shared/scripts/photo-gallery.js`.

### 4. Historia anual

Archivos:

- `pages/history/2020.html`
- `pages/history/2021.html`
- `pages/history/2022.html`
- `pages/history/2023.html`
- `pages/history/2024.html`
- `pages/history/2025.html`

Comparten nav y estilos comunes, pero el contenido sigue siendo propio de cada año.

## Galería: detalles importantes

La galería fue una de las áreas más reorganizadas.

### Galería principal

Archivo:

- [pages/galeria.html](C:\Users\asdru\OneDrive\Desktop\aess-unicauca-web\pages\galeria.html)

Muestra las portadas por año usando tarjetas con `background-image`.

### Galerías anuales

Archivos:

- `pages/galery/g2020.html` a `g2025.html`

Usan:

- `memory-gallery.js`
- estilos en `styles/pages/galeria.css`

### Corrección aplicada recientemente

Se corrigió un bug donde las imágenes no aparecían porque el loader interpretaba mal el bloque de datos cuando empezaba con salto de línea. El parser compartido ahora evalúa el contenido correctamente envolviéndolo como expresión.

## Reglas de mantenimiento recomendadas

### CSS

- no volver a crear un `style.css` monolítico en raíz
- no duplicar `<link rel="stylesheet">` en una misma página
- si una regla solo aplica a una sección, moverla a `styles/pages/`

### JS

- si un script se repite en dos o más páginas, moverlo a `shared/scripts/`
- evitar lógica inline larga dentro del HTML
- preferir bloques de datos pequeños en HTML + loader compartido, en vez de duplicar lógica completa

### Assets

- usar nombres consistentes y evitar mezclar mayúsculas/minúsculas innecesariamente
- verificar que cada `src` o `background-image` apunte a un archivo existente
- si se reemplaza una imagen, mantener la ruta cuando sea posible para no romper referencias

## Cómo probar cambios localmente

Como es un sitio estático, puedes abrir:

- `index.html`

o entrar directamente a:

- `pages/index.html`

Si haces cambios en CSS o JS:

- recarga con `Ctrl + F5`

Si una galería no aparece:

1. revisar que el archivo exista en `assets/images/...`
2. revisar la ruta en el bloque `memory-gallery-data` o `photo-gallery-data`
3. revisar que el script compartido correspondiente siga enlazado

## Estado actual de la arquitectura

A fecha de miércoles 29 de julio de 2026, el proyecto quedó con esta base:

- estilos centralizados en `styles/`
- scripts compartidos centralizados en `shared/scripts/`
- navegación reutilizable
- galerías anuales con loader compartido
- galerías NASA con loader compartido

## Mejoras futuras recomendadas

Si se sigue escalando el sitio, los siguientes pasos recomendados son:

1. mover los datos de galerías a archivos dedicados dentro de `shared/data/`
2. corregir de forma global problemas de codificación de caracteres (`Galería`, `menú`, etc.)
3. separar aún más `core.css` en módulos como:
   - `base/`
   - `layout/`
   - `components/`
4. documentar una guía de nombres para imágenes y contenido anual

## Nota

Actualmente todavía existen algunos textos con problemas de codificación heredados del contenido original. No afectan la estructura del proyecto, pero sí conviene corregirlos en una pasada de limpieza editorial.

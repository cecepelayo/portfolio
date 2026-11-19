/* ══════════════════════════════════════════════════
   PORTFOLIO EN PDF
   Construye las páginas 16:9 a partir de la web:
   · los sobres (tinta, imágenes) se leen de ../index.html;
   · los textos, de I18N (../assets/js/i18n.js), en el idioma de ?lang=es|en;
   · «Sobre mí», Servicios y Contacto se copian de la web y se traducen.
   Lo propio del PDF es la selección y el orden de proyectos (SELECTION), su numeración (01, 02…)
   y unos pocos textos (PRINT), entre ellos la ficha breve de «Sobre mí».
   Imágenes: por defecto se usan los webp de la web y, al terminar, se anota en <html data-shots>
   el tamaño de cada marco. build.sh prepara con eso una copia de cada foto desde su original
   (prepare_images.py) y vuelve a construir con ?img=print, que usa esas copias de print/img/.
   Al terminar marca <html data-ready> para que build.sh sepa que puede imprimir.
══════════════════════════════════════════════════ */
const PARAMS = new URLSearchParams(location.search);
const LANG = PARAMS.get('lang') === 'en' ? 'en' : 'es';
const PRINT_IMAGES = PARAMS.get('img') === 'print';
const SITE = 'https://cecemellaman.vercel.app/';
const SITE_LABEL = 'cecemellaman.vercel.app';

const PRINT = {
  es: {
    kicker: 'Portfolio 2026', footer: 'Cecilia Pelayo · Portfolio', video: 'Ver el vídeo en la web', web: 'Web',
    facts: [
      ['Estudios', ['Grado en Diseño Multimedia y Gráfico · UDIT · 2022 – actualidad']],
      ['Experiencia', [
        'Becaria de Diseño Gráfico · Plenergy · 2025',
        'Logotipo e ilustración · Coordinación de Trasplantes, Hospital Universitario de Toledo · 2026'
      ]],
      ['Busco', ['Prácticas o primer empleo · Madrid / remoto']],
      ['Idiomas', ['Español nativo · Inglés B2 (Cambridge B2 First)']]
    ]
  },
  en: {
    kicker: 'Portfolio 2026', footer: 'Cecilia Pelayo · Portfolio', video: 'Watch the video on the website', web: 'Website',
    facts: [
      ['Education', ['Bachelor’s Degree in Multimedia and Graphic Design · UDIT · 2022–present']],
      ['Experience', [
        'Graphic Design Intern · Plenergy · 2025',
        'Logo and illustration · Transplant Coordination Unit, Hospital Universitario de Toledo · 2026'
      ]],
      ['Looking for', ['Internship or first job · Madrid / remote']],
      ['Languages', ['Spanish (native) · English B2 (Cambridge B2 First)']]
    ]
  }
};

// Herramientas que el PDF añade a la línea «Trabajo con» de la web
const EXTRA_TOOLS = ['HTML', 'CSS', 'JavaScript'];
// Servicios de la web que no salen en el PDF
const DROP_SERVICES = ['ink-foto'];

// Proyectos del PDF, en orden: el primero es el Nº 01. Imagen principal y galería con los nombres
// de archivo de su carpeta de assets/img. Por defecto cada imagen llena su marco y se recorta lo
// que sobra alrededor del centro. Por imagen se puede fijar (opcional):
// · focus: punto que se conserva al recortar, en % horizontal y vertical;
// · contain: la imagen entra entera, sin recorte, sobre el fondo CSS indicado, del mismo color que
//   el fondo de la foto para que no se vean franjas (para piezas verticales o con texto al borde)
const WHITE = '#fff';
const SELECTION = [
  { key: 'buna',       lead: 'cover', gallery: ['1', '2', '3'] },
  { key: 'fireball',   lead: 'cover', gallery: ['2', '3', '4', '5'],
    focus: { cover: [50, 30] }, contain: { 2: WHITE } },
  { key: 'bear',       lead: 'cover', gallery: ['1', '2', '3'] },
  // Portada apaisada con el rótulo a todo el ancho: entra entera; arriba y abajo siguen los
  // colores de sus bordes superior e inferior
  { key: 'axon',       lead: 'cover', gallery: ['1', '3', '6', '7'],
    contain: { cover: 'linear-gradient(#202425 0 50%, #505050 50% 100%)' } },
  // «box» repetía la caja de sardinillas de «2»: en su lugar, el desplegado plano de los mejillones
  { key: 'cata',       lead: '1',     gallery: ['2', '3', 'cover'], contain: { cover: WHITE } },
  { key: 'olatuak',    lead: '1',     gallery: ['cover', '4', '5', '8'], contain: { cover: WHITE } },
  { key: 'neil',       lead: '2',     gallery: ['1', '5', '4', '9'] },
  { key: 'colores',    lead: 'cover', gallery: ['4', '6', '5', '9'] },
  // Solo tablet y móvil: las capturas de portátil muestran la barra de marcadores del navegador.
  // Los dispositivos son verticales y no se pueden recortar a una celda apaisada
  { key: 'museo',      lead: '5',     gallery: ['6', '7', '8', '9'],
    contain: { 5: WHITE, 6: WHITE, 7: WHITE, 8: WHITE, 9: WHITE } },
  // El título está a la derecha de la portada: se conserva ese lado
  { key: 'blacksheep', lead: 'cover', gallery: ['1', '2'], focus: { cover: [100, 50] } }
];

const t = key => (I18N[LANG] && I18N[LANG][key]) || I18N.es[key] || '';
const p = key => PRINT[LANG][key];
const pad = n => String(n).padStart(2, '0');
const book = document.getElementById('book');
// Problemas encontrados al construir: si hay alguno, build.sh no imprime
const problems = [];
function problem(message, detail) {
  console.error(message, detail === undefined ? '' : detail);
  problems.push(message + (detail === undefined ? '' : ' ' + detail));
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Traduce un fragmento copiado de la web y corrige sus rutas, que en la web son relativas a la raíz
function adopt(node) {
  node.querySelectorAll('[data-i18n]').forEach(n => { const v = t(n.dataset.i18n); if (v) n.textContent = v; });
  node.querySelectorAll('[data-i18n-alt]').forEach(n => { const v = t(n.dataset.i18nAlt); if (v) n.alt = v; });
  node.querySelectorAll('img[src]').forEach(img => {
    img.setAttribute('src', '../' + img.getAttribute('src'));
    img.loading = 'eager';
  });
  node.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  return node;
}

function page(className, ink) {
  const section = el('section', 'page ' + className + (ink ? ' ' + ink : ''));
  book.appendChild(section);
  return section;
}

function footer(section, right) {
  const f = el('footer', 'page-foot');
  f.append(el('span', '', p('footer')), el('span', 'page-num', right || ''));
  section.appendChild(f);
}

// Copia preparada por prepare_images.py de una imagen de la web (assets/img/….webp): las fotos de
// proyecto, en JPEG recortado a su marco; el resto (motivos, logo, retrato), en PNG a su tamaño
const preparedSrc = (webPath, ext) => 'img/' + webPath.replace(/^assets\/img\//, '').replace(/\.webp$/, ext);

// Marco con una foto de proyecto. webPath es la ruta del webp en la web. Sin «contain» la foto
// llena el marco recortada alrededor de «focus»; con «contain» (un fondo CSS) entra entera
function figure(webPath, focus, contain) {
  const fig = el('figure', contain ? 'shot shot--contain' : 'shot');
  const img = el('img');
  img.src = PRINT_IMAGES ? preparedSrc(webPath, '.jpg') : '../' + webPath;
  img.alt = '';
  img.dataset.web = webPath;
  if (contain) {
    fig.style.background = contain;
    img.dataset.fit = 'contain';
  } else {
    const [fx, fy] = focus || [50, 50];
    img.dataset.focus = fx + ',' + fy;
    img.style.objectPosition = fx + '% ' + fy + '%';
  }
  fig.appendChild(img);
  return fig;
}

/* ── Portada ── */
function coverPage() {
  const s = page('p-cover');
  const motifs = ['01-stars', '02-rings', '03-eye', '04-cocktail', '05-table', '06-lips', '07-cake', '09-disco-ball', '10-pink-eye', '11-cutlery'];
  const band = () => {
    const b = el('div', 'cover-band');
    motifs.forEach(m => { const i = el('img'); i.src = '../assets/img/motifs/' + m + '.webp'; i.alt = ''; b.appendChild(i); });
    return b;
  };
  const inner = el('div', 'cover-inner');
  const logo = el('img', 'cover-logo');
  logo.src = '../assets/img/brand/name.webp';
  logo.alt = t('nameAlt');
  inner.append(el('p', 'cover-kicker serial', p('kicker')), logo, el('h1', 'cover-name', 'Cecilia Pelayo'),
    el('p', 'cover-role serial', t('role') + ' · Madrid'));
  const link = el('a', 'cover-link serial', SITE_LABEL);
  link.href = SITE;
  inner.appendChild(link);
  s.append(band(), inner, band());
}

/* ── Sobre mí: la sección de la web sin animaciones, con una ficha breve tipo CV debajo ── */
function aboutPage(site) {
  const about = site.querySelector('.about');
  if (!about) return problem('No se encuentra la sección .about en index.html');
  const s = page('p-about');
  const section = adopt(about.cloneNode(true));
  const text = section.querySelector('.about-text');
  if (!text) return problem('No se encuentra .about-text en la sección .about de index.html');
  const facts = el('dl', 'about-facts');
  p('facts').forEach(([label, lines]) => {
    const dd = el('dd');
    lines.forEach(line => dd.appendChild(el('span', '', line)));
    facts.append(el('dt', 'serial', label), dd);
  });
  text.appendChild(facts);
  s.appendChild(section);
  footer(s);
}

/* ── Proyecto: ficha con imagen principal y página de galería ── */
function projectPages(pick, pack, serial) {
  const key = pick.key;
  const project = I18N[LANG].projects[key];
  const images = (pack.dataset.images || '').split('|').filter(Boolean);
  if (!project || !images.length) {
    problem('Falta la ficha o data-images del proyecto:', key);
    return;
  }
  const ink = Array.from(pack.classList).find(c => c.startsWith('ink-')) || '';
  const folder = images[0].slice(0, images[0].lastIndexOf('/') + 1);
  const shot = name => figure(folder + name + '.webp', pick.focus && pick.focus[name], pick.contain && pick.contain[name]);
  const hasVideo = images.some(i => /\.(mp4|webm)$/i.test(i));

  // 1 · Ficha
  const a = page('p-project', ink);
  const lead = el('div', 'project-lead');
  lead.appendChild(shot(pick.lead));
  const info = el('div', 'project-info');
  const head = el('p', 'project-head serial');
  head.append(el('span', '', serial), el('span', '', project.disc));
  info.appendChild(head);
  info.appendChild(el('h2', 'project-title display', project.title));
  const desc = el('div', 'project-desc');
  project.desc.forEach(text => desc.appendChild(el('p', '', text)));
  info.appendChild(desc);
  const meta = el('dl', 'project-meta');
  [['m.year', project.year], ['m.role', project.role], ['m.tools', project.tools], ['m.context', project.context]]
    .filter(([, v]) => v)
    .forEach(([label, value]) => meta.append(el('dt', 'serial', t(label)), el('dd', '', value)));
  info.appendChild(meta);
  if (hasVideo) {
    const link = el('a', 'project-video serial', '▶ ' + p('video'));
    link.href = SITE;
    info.appendChild(link);
  }
  a.append(lead, info);
  footer(a, serial);

  // 2 · Galería
  const b = page('p-gallery', ink);
  const top = el('p', 'gallery-head serial');
  top.append(el('span', '', serial + ' · ' + t('p.' + key + '.short')), el('span', '', project.disc));
  const grid = el('div', 'gallery-grid g' + pick.gallery.length);
  pick.gallery.forEach(name => grid.appendChild(shot(name)));
  b.append(top, grid);
  footer(b, serial);
}

/* ── Servicios: la lista de la web, con las referencias pasadas a la numeración del PDF ── */
function servicesPage(site, renumber) {
  const source = site.querySelector('.services');
  if (!source) return problem('No se encuentra la sección .services en index.html');
  const s = page('p-services');
  const services = adopt(source.cloneNode(true));
  DROP_SERVICES.forEach(ink => services.querySelectorAll('.svc.' + ink).forEach(n => n.remove()));
  services.querySelectorAll('.svc-refs').forEach(refs => {
    const nums = (refs.textContent.match(/\d+/g) || [])
      .map(n => renumber.get(Number(n)))
      .filter(Boolean)
      .sort((x, y) => x - y);
    // Un servicio sin proyectos en el PDF se queda sin referencia (p. ej. Motion)
    if (!nums.length) refs.remove();
    else refs.textContent = 'Nº ' + nums.map(pad).join(' · ');
  });
  const tools = services.querySelector('.tools');
  if (tools) tools.append(' · ' + EXTRA_TOOLS.join(' · '));
  s.appendChild(services);
  footer(s);
}

/* ── Contacto: la banda turquesa de la web, sin botón de copiar ── */
function contactPage(site) {
  const source = site.querySelector('.contact');
  if (!source || !source.querySelector('.social') || !source.querySelector('.colophon')) {
    return problem('No se encuentra la sección .contact (con .social y .colophon) en index.html');
  }
  const s = page('p-contact');
  const contact = adopt(source.cloneNode(true));
  contact.querySelectorAll('.btn-action, .copy-status').forEach(n => n.remove());
  // En el PDF el último cromo no tiene número: sería el de la serie y aquí no se cuenta
  contact.querySelectorAll('.contact-slot .serial').forEach(n => n.remove());
  contact.querySelectorAll('a[target]').forEach(a => a.removeAttribute('target'));
  const web = el('li');
  const link = el('a', '', p('web') + ' · ' + SITE_LABEL);
  link.href = SITE;
  web.appendChild(link);
  contact.querySelector('.social').appendChild(web);
  contact.querySelector('.colophon').replaceChildren(el('span', '', '© 2026 Cecilia Pelayo'), el('span', '', SITE_LABEL));
  s.appendChild(contact);
}

// Numera las páginas con pie (la portada es la 1)
function numberPages() {
  const pages = Array.from(book.querySelectorAll('.page'));
  pages.forEach((section, i) => {
    const num = section.querySelector('.page-num');
    if (num) num.textContent = (num.textContent ? num.textContent + ' · ' : '') + pad(i + 1);
  });
}

// Imágenes que no son fotos de proyecto (portada, «Sobre mí», contacto): con ?img=print pasan a su
// copia PNG preparada. Sin esto Chrome las incrusta sin comprimir a su tamaño completo
function useDecoImages() {
  document.querySelectorAll('img:not(.shot img)').forEach(img => {
    const web = img.getAttribute('src').replace(/^\.\.\//, '');
    if (!/^assets\/img\/.+\.webp$/.test(web)) return problem('Imagen fuera de assets/img que no se puede preparar:', web);
    img.dataset.web = web;
    if (PRINT_IMAGES) img.src = preparedSrc(web, '.png');
  });
}

// Tamaño en px CSS con que se pinta cada imagen, para que prepare_images.py prepare cada original:
// las fotos (kind «shot») se recortan a su marco; el resto («deco») solo se reduce
function recordShots() {
  const shots = new Map();
  document.querySelectorAll('img[data-web]').forEach(img => {
    const web = img.dataset.web;
    const isShot = !!img.closest('.shot');
    const [fx, fy] = (img.dataset.focus || '50,50').split(',').map(Number);
    const entry = { web, kind: isShot ? 'shot' : 'deco', fit: img.dataset.fit || 'cover', w: img.clientWidth, h: img.clientHeight, fx, fy };
    const prev = shots.get(web);
    if (prev && (isShot || prev.kind === 'shot')) {
      return problem('La misma foto sale en dos sitios y solo puede prepararse para uno:', web);
    }
    // Un motivo repetido (las dos cenefas de la portada) se prepara para el mayor de sus tamaños
    if (!prev || entry.w * entry.h > prev.w * prev.h) shots.set(web, entry);
  });
  document.documentElement.dataset.shots = JSON.stringify(Array.from(shots.values()));
}

async function build() {
  document.documentElement.lang = LANG;
  document.title = 'Cecilia Pelayo · Portfolio (' + LANG.toUpperCase() + ')';
  const html = await fetch('../index.html').then(r => {
    if (!r.ok) throw new Error('No se pudo leer index.html: ' + r.status);
    return r.text();
  });
  const site = new DOMParser().parseFromString(html, 'text/html');

  // Relaciona cada proyecto elegido con su sobre de la web y el Nº de la web con el del PDF
  const renumber = new Map();
  const projects = [];
  SELECTION.forEach(pick => {
    const pack = site.querySelector('.board .pack[data-project="' + pick.key + '"]');
    if (!pack) return problem('No se encuentra en index.html el sobre del proyecto:', pick.key);
    const webNum = Number((pack.querySelector('.serial').textContent.match(/\d+/) || [])[0]);
    renumber.set(webNum, projects.length + 1);
    projects.push({ pick, pack, serial: 'Nº ' + pad(projects.length + 1) });
  });

  coverPage();
  aboutPage(site);
  servicesPage(site, renumber);
  projects.forEach(({ pick, pack, serial }) => projectPages(pick, pack, serial));
  contactPage(site);
  numberPages();
  useDecoImages();

  // Se imprime cuando las fuentes y todas las imágenes han cargado. Se esperan los eventos de carga
  // y no img.decode(): en Chrome sin ventana, decode() no termina con las imágenes fuera de pantalla
  await document.fonts.ready;
  await Promise.all(Array.from(document.images).map(img => new Promise(resolve => {
    const done = () => {
      if (!img.naturalWidth) problem('No se pudo cargar la imagen:', img.src);
      resolve();
    };
    if (img.complete) return done();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  })));
  recordShots();
  document.documentElement.dataset.ready = problems.length ? 'error' : 'true';
  // Para build.sh: los problemas quedan escritos en la página
  document.documentElement.dataset.problems = problems.join(' | ');
}

build().catch(err => {
  console.error('No se pudo construir el portfolio:', err);
  document.documentElement.dataset.ready = 'error';
});

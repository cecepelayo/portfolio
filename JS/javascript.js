/* ══════════════════════════════════════════════════
   UTILIDADES
══════════════════════════════════════════════════ */
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

// Activa las animaciones de entrada solo si hay JS y el usuario no pide movimiento reducido
if (!reduceMotion.matches) root.classList.add('motion');

function storageGet(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (e) { /* almacenamiento no disponible: se ignora */ }
}

/* ══════════════════════════════════════════════════
   IDIOMA ES / EN
══════════════════════════════════════════════════ */
const SUPPORTED = ['es', 'en'];
let lang = (() => {
  const saved = storageGet('lang');
  if (SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || 'es').toLowerCase();
  return nav.startsWith('es') ? 'es' : 'en';
})();

const TITLES = {
  es: 'Cecilia Pelayo · Diseño gráfico',
  en: 'Cecilia Pelayo · Graphic design'
};

function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || '';
}

function applyLang(next) {
  lang = SUPPORTED.includes(next) ? next : 'es';
  root.lang = lang;
  document.title = TITLES[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = t(el.dataset.i18n);
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const value = t(el.dataset.i18nAlt);
    if (value) el.alt = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const value = t(el.dataset.i18nAria);
    if (value) el.setAttribute('aria-label', value);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
  boxes.forEach(box => {
    const project = I18N[lang].projects[box.dataset.project];
    if (project) box.setAttribute('aria-label', `${t('g.open')}: ${project.title}`);
  });
  if (look) look.textContent = t('look');
  if (drawer.open && current) {
    // Con la galería abierta se rehace todo para que miniaturas y alt cambien también de idioma
    renderInfo();
    renderThumbs();
    renderSlide();
  }
  root.classList.remove('i18n-pending');
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    storageSet('lang', btn.dataset.lang);
    applyLang(btn.dataset.lang);
  });
});

/* ══════════════════════════════════════════════════
   CABECERA — línea inferior al hacer scroll
══════════════════════════════════════════════════ */
const bar = document.getElementById('bar');
const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ══════════════════════════════════════════════════
   CAJAS — el cajón se desliza y se abre la galería
══════════════════════════════════════════════════ */
const boxes = Array.from(document.querySelectorAll('.box'));
const drawer = document.getElementById('drawer');
const stageImg = document.getElementById('drawer-img');
const stageError = document.getElementById('drawer-img-error');
const thumbs = document.getElementById('thumbs');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let current = null;   // { box, key, images }
let index = 0;
const OPEN_DELAY = 360; // ms: tiempo que tarda el cajón en salir antes de abrir la galería
let pending = null;     // { box, timer }: apertura en curso, solo puede haber una

function cancelPending() {
  if (!pending) return;
  window.clearTimeout(pending.timer);
  pending.box.classList.remove('is-opening');
  pending = null;
}

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (drawer.open || (pending && pending.box === box)) return;
    // Si se pulsa otra caja mientras la anterior aún se abre, gana la última
    cancelPending();
    if (reduceMotion.matches) {
      openDrawer(box);
      return;
    }
    box.classList.add('is-opening');
    pending = {
      box,
      timer: window.setTimeout(() => {
        pending = null;
        openDrawer(box);
      }, OPEN_DELAY)
    };
  });
});

function openDrawer(box) {
  box.classList.add('is-opening');
  const images = (box.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
  if (!images.length) {
    console.warn('El proyecto no tiene imágenes asignadas:', box.dataset.project);
  }
  current = { box, key: box.dataset.project, images };
  index = 0;
  renderInfo();
  renderThumbs();
  renderSlide();
  drawer.showModal();
  root.classList.add('is-locked');
  drawer.scrollTop = 0;
}

// Restaura la página al cerrar. Es idempotente: se llama al cerrar con el botón o el fondo,
// con Escape (cancel) y en el evento close, por si algún navegador no lo emite.
function resetDrawerState() {
  root.classList.remove('is-locked');
  if (current) current.box.classList.remove('is-opening');
  current = null;
}

function closeDrawer() {
  if (drawer.open) drawer.close();
  resetDrawerState();
}

drawer.addEventListener('cancel', resetDrawerState);
drawer.addEventListener('close', resetDrawerState);

// Cerrar al pulsar fuera de la caja abierta (sobre el fondo del diálogo)
drawer.addEventListener('click', e => {
  if (e.target === drawer) closeDrawer();
});
document.getElementById('close').addEventListener('click', closeDrawer);

function renderInfo() {
  const project = I18N[lang].projects[current.key];
  if (!project) {
    console.error('No hay textos para el proyecto:', current.key);
    return;
  }
  const serial = current.box.querySelector('.serial');
  document.getElementById('drawer-serial').textContent = serial ? serial.textContent : '';
  document.getElementById('drawer-disc').textContent = project.disc;
  document.getElementById('drawer-title').textContent = project.title;

  const desc = document.getElementById('drawer-desc');
  desc.replaceChildren(...project.desc.map(text => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
  }));

  const meta = document.getElementById('drawer-meta');
  const rows = [
    ['m.year', project.year],
    ['m.role', project.role],
    ['m.tools', project.tools],
    ['m.context', project.context]
  ].filter(([, value]) => value);
  meta.replaceChildren(...rows.flatMap(([label, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = t(label);
    const dd = document.createElement('dd');
    dd.textContent = value;
    return [dt, dd];
  }));

  drawer.className = 'drawer ' + Array.from(current.box.classList).filter(c => c.startsWith('ink-')).join(' ');
}

function renderThumbs() {
  thumbs.replaceChildren(...current.images.map((src, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'thumb';
    btn.setAttribute('aria-label', `${t('g.thumb')} ${i + 1}`);
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    btn.appendChild(img);
    btn.addEventListener('click', () => goTo(i));
    return btn;
  }));
  thumbs.hidden = current.images.length < 2;
}

function renderSlide() {
  const total = current.images.length;
  const project = I18N[lang].projects[current.key];
  stageImg.hidden = false;
  stageError.hidden = true;
  if (total) {
    stageImg.src = current.images[index];
    stageImg.alt = `${project ? project.title : ''} — ${index + 1} / ${total}`;
  }
  counter.textContent = `${total ? index + 1 : 0} / ${total}`;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= total - 1;
  thumbs.querySelectorAll('.thumb').forEach((th, i) => {
    th.classList.toggle('active', i === index);
    th.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
}

function goTo(i) {
  if (!current) return;
  index = Math.max(0, Math.min(i, current.images.length - 1));
  renderSlide();
}

prevBtn.addEventListener('click', () => goTo(index - 1));
nextBtn.addEventListener('click', () => goTo(index + 1));

drawer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
});

// Si una imagen falla, se muestra un aviso en lugar de un hueco vacío
stageImg.addEventListener('error', () => {
  console.error('No se pudo cargar la imagen:', stageImg.src);
  stageImg.hidden = true;
  stageError.hidden = false;
});

/* ══════════════════════════════════════════════════
   CURSOR «VER» — solo sobre las cajas y con ratón
══════════════════════════════════════════════════ */
const look = document.getElementById('look');

if (look && finePointer.matches) {
  boxes.forEach(box => {
    box.addEventListener('pointerenter', e => {
      // Se coloca antes de mostrarlo para que no aparezca en su posición anterior
      look.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      look.classList.add('on');
    });
    box.addEventListener('pointerleave', () => look.classList.remove('on'));
    box.addEventListener('pointermove', e => {
      look.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
}

/* ══════════════════════════════════════════════════
   LOGO — inclinación 3D que sigue al ratón
══════════════════════════════════════════════════ */
const masterLogo = document.querySelector('.master-logo');

if (masterLogo && finePointer.matches && !reduceMotion.matches) {
  masterLogo.addEventListener('pointermove', e => {
    const rect = masterLogo.getBoundingClientRect();
    // Posición del ratón relativa al centro del logo, de -1 a 1
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    masterLogo.style.transform = `perspective(900px) rotateX(${y * -12}deg) rotateY(${x * 12}deg)`;
  });
  masterLogo.addEventListener('pointerleave', () => {
    masterLogo.style.transform = '';
  });
}

/* ══════════════════════════════════════════════════
   COPIAR EMAIL
══════════════════════════════════════════════════ */
const copyBtn = document.getElementById('copy-mail');
const copyStatus = document.getElementById('copy-status');
const EMAIL = 'cecilia.pelayorodriguez@gmail.com';
let copyTimer = null;

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyStatus.textContent = t('ct.copied');
  } catch (e) {
    console.error('No se pudo copiar el email al portapapeles:', e);
    copyStatus.textContent = t('ct.copyFail');
  }
  window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => { copyStatus.textContent = ''; }, 3000);
});

/* ══════════════════════════════════════════════════
   ARRANQUE
══════════════════════════════════════════════════ */
applyLang(lang);

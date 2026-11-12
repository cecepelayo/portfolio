/* ══════════════════════════════════════════════════
   UTILIDADES
══════════════════════════════════════════════════ */
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const narrowScreen = window.matchMedia('(max-width: 720px)');

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
  packs.forEach(pack => {
    const project = I18N[lang].projects[pack.dataset.project];
    if (project) pack.setAttribute('aria-label', `${t('g.open')}: ${project.title}`);
  });
  if (look) look.textContent = t('look');
  if (drawer.open && current) {
    // Con la galería abierta se rehacen la ficha y los textos alternativos en el nuevo idioma
    renderInfo();
    renderDeckText();
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
const onScroll = () => {
  bar.classList.toggle('scrolled', window.scrollY > 8);
  // Fondo del lienzo: cartón en la mitad superior y turquesa en la inferior, para que el rebote
  // de arriba continúe la barra y el de abajo, la banda de contacto
  const half = (root.scrollHeight - window.innerHeight) / 2;
  root.classList.toggle('past-half', window.scrollY > half);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ══════════════════════════════════════════════════
   SOBRES — se rasga la tira, los cromos salen en abanico
   y vuelan hasta el mazo de la galería
══════════════════════════════════════════════════ */
const packs = Array.from(document.querySelectorAll('.pack'));
const drawer = document.getElementById('drawer');
const deck = document.getElementById('deck');
const flight = document.getElementById('flight');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Tiempos y forma de la apertura (preajuste «Intermedio» del laboratorio)
const OPEN = {
  tear: 300,      // ms: la tira se dobla y sale despedida
  fan: 550,       // ms: los cromos suben y se abren en abanico
  hold: 230,      // ms: pausa con el abanico abierto
  expand: 480,    // ms: vuelo del abanico al mazo
  stagger: 45,    // ms: escalonado entre cromos
  spread: 49,     // grados de apertura del abanico
  spreadNarrow: 30, // grados de apertura en móvil, donde los sobres llegan al borde
  rise: 66,       // % de la altura del cromo que sale del sobre
  margin: 12,     // px: distancia mínima del abanico a los bordes de la pantalla
  count: 5        // cromos en el abanico (y guardados en el sobre)
};
const DECK_MS = 390;     // ms: pasar un cromo; coincide con la transición de .deck .cromo
const DECK_OFFSET = 6;   // px: escalonado visible de los tres primeros cromos del mazo
const DECK_OUT = 'translate(-118%, 3%) rotate(-7deg)';

let current = null;      // { pack, key, images }
let index = 0;           // cromo de delante
let cards = [];          // cromos del mazo, en el orden de las imágenes
let aspects = [];        // proporción ancho/alto de cada imagen, cuando se conoce
let opening = null;      // sobre en plena apertura: solo puede haber una
let run = 0;             // identifica la apertura en curso para descartar las que se cierran antes
let stepping = false;

const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
const finished = animation => animation.finished.catch(() => {});

function imagesOf(pack) {
  return (pack.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
}

function buildCromo(src, i, total) {
  const cromo = document.createElement('span');
  cromo.className = 'cromo';
  const frame = document.createElement('span');
  frame.className = 'cromo-img';
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  frame.appendChild(img);
  const num = document.createElement('span');
  num.className = 'cromo-num';
  num.textContent = `${i + 1} / ${total}`;
  cromo.append(frame, num);
  return { cromo, img };
}

// Cada sobre guarda sus primeros cromos; el de delante va el último en el DOM para quedar encima
packs.forEach(pack => {
  const images = imagesOf(pack);
  if (!images.length) console.warn('El proyecto no tiene imágenes asignadas:', pack.dataset.project);
  const holder = pack.querySelector('.pack-cromos');
  const stored = images.slice(0, OPEN.count).map((src, i) => {
    const { cromo, img } = buildCromo(src, i, images.length);
    img.loading = 'lazy';
    if (i === 0) cromo.classList.add('is-front');
    return cromo;
  });
  holder.replaceChildren(...stored.reverse());
  pack.addEventListener('click', () => openPack(pack));
});

// Cromos del sobre, del de delante (0) al de detrás
function packCromos(pack) {
  return Array.from(pack.querySelectorAll('.pack-cromos .cromo')).reverse();
}
// En el abanico el de delante queda a la derecha y encima, como en la mano
function fanAngle(k, count, spread) {
  return count < 2 ? 0 : spread / 2 - k * (spread / (count - 1));
}

// Abanico que cabe en la pantalla. En móvil parte de una apertura menor; si aun así se sale por
// los lados, se cierra lo justo, y si se saldría por arriba, los cromos suben menos.
// Cada cromo gira sobre el centro de su base y después sube (translateY(-rise%) rotate(θ))
function fitFan(pack, count) {
  const box = pack.querySelector('.pack-cromos').getBoundingClientRect();
  const w = box.width;
  const h = box.height;
  const ox = box.left + w / 2;
  const oy = box.bottom;
  const vw = document.documentElement.clientWidth;
  const corners = [[-w / 2, 0], [w / 2, 0], [-w / 2, -h], [w / 2, -h]];
  // Contorno del abanico respecto al centro de la base, antes de subir
  const extent = spread => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity;
    for (let k = 0; k < count; k++) {
      const a = fanAngle(k, count, spread) * Math.PI / 180;
      const cos = Math.cos(a), sin = Math.sin(a);
      for (const [x, y] of corners) {
        const px = x * cos - y * sin;
        minX = Math.min(minX, px);
        maxX = Math.max(maxX, px);
        minY = Math.min(minY, x * sin + y * cos);
      }
    }
    return { minX, maxX, minY };
  };
  const fits = e => ox + e.minX >= OPEN.margin && ox + e.maxX <= vw - OPEN.margin;

  let spread = narrowScreen.matches ? OPEN.spreadNarrow : OPEN.spread;
  while (spread > 0 && !fits(extent(spread))) spread = Math.max(0, spread - 1);
  // Lo que pueden subir los cromos sin salir por arriba, en % de su altura
  const room = oy + extent(spread).minY - OPEN.margin;
  const rise = h > 0 ? Math.max(0, Math.min(OPEN.rise, room / h * 100)) : OPEN.rise;
  return { spread, rise };
}

async function openPack(pack) {
  if (drawer.open || opening) return;
  if (reduceMotion.matches) {
    openDrawer(pack, null);
    return;
  }
  opening = pack;
  pack.classList.add('is-opening');
  const strip = pack.querySelector('.pack-strip');
  const cromos = packCromos(pack);
  const count = cromos.length;
  const fan = fitFan(pack, count);

  try {
    // 1 · Rasgado: la tira se dobla sobre su extremo derecho y sale despedida
    const from = getComputedStyle(strip).transform;
    await finished(strip.animate([
      { transform: from === 'none' ? 'rotate(0deg)' : from, opacity: 1 },
      { transform: 'rotate(-9deg)', opacity: 1, offset: 0.4 },
      { transform: 'translate(70px, -80px) rotate(18deg)', opacity: 0 }
    ], { duration: OPEN.tear, easing: 'cubic-bezier(.4, 0, .7, 1)', fill: 'forwards' }));

    // 2 · Abanico: los cromos suben y se abren desde la base
    await Promise.all(cromos.map((cromo, k) => {
      const start = getComputedStyle(cromo).transform;
      return finished(cromo.animate([
        { transform: start === 'none' ? 'translateY(0) rotate(0deg)' : start },
        { transform: `translateY(-${fan.rise}%) rotate(${fanAngle(k, count, fan.spread)}deg)` }
      ], {
        duration: OPEN.fan,
        delay: (count - 1 - k) * OPEN.stagger,
        easing: 'cubic-bezier(.2, .8, .2, 1)',
        fill: 'both'
      }));
    }));
    await wait(OPEN.hold);

    // 3 · Expansión: se abre la galería y los cromos vuelan hasta el mazo
    await openDrawer(pack, cromos, fan);
  } catch (e) {
    console.error('No se pudo abrir el sobre:', e);
    if (!drawer.open) resetPack(pack);
  } finally {
    opening = null;
  }
}

async function openDrawer(pack, flying, fan) {
  const images = imagesOf(pack);
  current = { pack, key: pack.dataset.project, images };
  index = 0;
  const myRun = ++run;
  pack.classList.add('is-opening');
  renderInfo();
  renderDeck();
  drawer.showModal();
  root.classList.add('is-locked');
  drawer.scrollTop = 0;
  // El abanico se mide con el scroll ya bloqueado: ocultar la barra de desplazamiento mueve la página
  const base = flying ? pack.querySelector('.pack-cromos').getBoundingClientRect() : null;
  if (flying && flying.length) await flyToDeck(flying, base, myRun, fan);
}

// Copias de los cromos que animan su caja (no su escala) para pasar de recortados en el abanico
// a enteros en el mazo sin deformar la imagen
async function flyToDeck(cromos, base, myRun, fan) {
  const count = cromos.length;
  deck.classList.add('is-landing');
  await Promise.all(cromos.map((c, k) => loadAspect(k)));
  if (myRun !== run || !drawer.open) return;
  layoutDeck();

  const animations = cromos.map((cromo, k) => {
    const target = cards[k].getBoundingClientRect();
    const { cromo: copy } = buildCromo(current.images[k], k, current.images.length);
    copy.style.zIndex = String(count - k);
    const from = {
      left: base.left + 'px', top: base.top + 'px', width: base.width + 'px', height: base.height + 'px',
      padding: '6px 6px 0px', borderWidth: '2px',
      transform: `translateY(-${fan.rise}%) rotate(${fanAngle(k, count, fan.spread)}deg)`
    };
    // La copia nace ya colocada en el abanico: si no, durante su retraso se pintaría sin tamaño
    // y la imagen saldría a tamaño real, a pantalla completa
    Object.assign(copy.style, from);
    flight.appendChild(copy);
    cromo.style.visibility = 'hidden';
    return finished(copy.animate([from, {
      left: target.left + 'px', top: target.top + 'px', width: target.width + 'px', height: target.height + 'px',
      padding: '10px 10px 0px', borderWidth: '3px',
      transform: 'translateY(0%) rotate(0deg)'
    }], {
      duration: OPEN.expand,
      delay: k * OPEN.stagger * 0.6,
      easing: 'cubic-bezier(.16, 1, .3, 1)',
      fill: 'both'
    }));
  });
  await Promise.all(animations);
  if (myRun !== run) return;
  deck.classList.remove('is-landing');
  flight.replaceChildren();
}

// Devuelve el sobre a su estado de reposo: tira en su sitio y cromos dentro
function resetPack(pack) {
  pack.classList.remove('is-opening');
  const strip = pack.querySelector('.pack-strip');
  const wasTorn = strip.getAnimations().length > 0;
  strip.getAnimations().forEach(a => a.cancel());
  pack.querySelectorAll('.pack-cromos .cromo').forEach(cromo => {
    cromo.getAnimations().forEach(a => a.cancel());
    cromo.style.visibility = '';
  });
  if (wasTorn && !reduceMotion.matches) {
    strip.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }],
      { duration: 260, easing: 'ease-out' });
  }
}

// Restaura la página al cerrar. Es idempotente: se llama al cerrar con el botón o el fondo,
// con Escape (cancel) y en el evento close, por si algún navegador no lo emite.
function resetDrawerState() {
  root.classList.remove('is-locked');
  run++;
  flight.getAnimations({ subtree: true }).forEach(a => a.cancel());
  flight.replaceChildren();
  deck.classList.remove('is-landing');
  if (current) resetPack(current.pack);
  current = null;
}

function closeDrawer() {
  if (drawer.open) drawer.close();
  resetDrawerState();
}

drawer.addEventListener('cancel', resetDrawerState);
drawer.addEventListener('close', resetDrawerState);

// Cerrar al pulsar fuera del sobre abierto (sobre el fondo del diálogo)
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
  const serial = current.pack.querySelector('.serial');
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

  drawer.className = 'drawer ' + Array.from(current.pack.classList).filter(c => c.startsWith('ink-')).join(' ');
}

/* ── Mazo de cromos ── */
function renderDeck() {
  const total = current.images.length;
  aspects = [];
  cards = current.images.map((src, i) => {
    const { cromo, img } = buildCromo(src, i, total);
    // Si una imagen falla, el cromo muestra un aviso en lugar de un hueco vacío
    img.addEventListener('error', () => {
      console.error('No se pudo cargar la imagen:', img.src);
      const msg = document.createElement('p');
      msg.className = 'stage-error';
      msg.textContent = t('g.imgError');
      img.replaceWith(msg);
    }, { once: true });
    return cromo;
  });
  deck.replaceChildren(...cards);
  // Cada cromo se recoloca cuando se conoce la proporción de su imagen
  const deckCards = cards;
  cards.forEach((card, i) => loadAspect(i).then(() => {
    if (cards === deckCards && drawer.open) layoutDeck();
  }));
  layoutDeck();
  renderDeckText();
}

function loadAspect(i) {
  const list = aspects;
  const img = cards[i] && cards[i].querySelector('img');
  if (!img) return Promise.resolve();
  return img.decode().catch(() => {}).then(() => {
    if (img.naturalWidth) list[i] = img.naturalWidth / img.naturalHeight;
  });
}

// Caja del cromo i: la imagen entera, lo más grande posible dentro del mazo
function cardBox(i) {
  const card = cards[i];
  const cs = getComputedStyle(card);
  const pad = parseFloat(cs.paddingLeft);
  const border = parseFloat(cs.borderLeftWidth);
  const numH = card.querySelector('.cromo-num').offsetHeight;
  const frame = 3; // filete de 1,5 px alrededor de la imagen
  const aspect = aspects[i] || 4 / 3;
  const W = deck.clientWidth - 2 * DECK_OFFSET;
  const H = deck.clientHeight - 2 * DECK_OFFSET;
  const chromeW = 2 * (pad + border) + frame;
  const chromeH = pad + 2 * border + numH + frame;
  const imgW = Math.max(40, Math.min(W - chromeW, (H - chromeH) * aspect));
  const width = imgW + chromeW;
  const height = imgW / aspect + chromeH;
  return { left: (W - width) / 2, top: (H - height) / 2, width, height };
}

// Profundidad de cada cromo respecto al de delante; los tres primeros se ven escalonados
function layoutDeck() {
  const n = cards.length;
  cards.forEach((card, i) => {
    const d = (i - index + n) % n;
    const off = Math.min(d, 2) * DECK_OFFSET;
    const box = cardBox(i);
    card.style.left = box.left + 'px';
    card.style.top = box.top + 'px';
    card.style.width = box.width + 'px';
    card.style.height = box.height + 'px';
    card.style.zIndex = String(n - d);
    card.style.transform = `translate(${off}px, ${off}px)`;
  });
  counter.textContent = `${n ? index + 1 : 0} / ${n}`;
  prevBtn.disabled = nextBtn.disabled = n < 2;
}

// Solo el cromo de delante se anuncia; los de detrás quedan ocultos a los lectores de pantalla
function renderDeckText() {
  const project = I18N[lang].projects[current.key];
  const total = cards.length;
  cards.forEach((card, i) => {
    const front = i === index;
    card.setAttribute('aria-hidden', String(!front));
    const img = card.querySelector('img');
    if (img) img.alt = front ? `${project ? project.title : ''} — ${i + 1} / ${total}` : '';
  });
}

// Pasar cromo: el de delante sale y vuelve al fondo, o el del fondo sale y entra delante
async function step(dir) {
  const n = cards.length;
  // Mientras los cromos aterrizan en el mazo no se pasa: su destino ya está calculado
  if (!current || n < 2 || stepping || deck.classList.contains('is-landing')) return;
  if (reduceMotion.matches) {
    index = (index + dir + n) % n;
    layoutDeck();
    renderDeckText();
    return;
  }
  stepping = true;
  const deckAtStart = cards;
  const moving = dir > 0 ? cards[index] : cards[(index - 1 + n) % n];
  moving.style.transform = DECK_OUT;
  await wait(DECK_MS * 0.85);
  // Si entretanto se cerró la galería o se abrió otro sobre, este paso ya no aplica
  if (current && cards === deckAtStart) {
    if (dir < 0) moving.style.zIndex = String(n + 1);
    index = (index + dir + n) % n;
    layoutDeck();
    renderDeckText();
  }
  await wait(DECK_MS * 0.4);
  stepping = false;
}

prevBtn.addEventListener('click', () => step(-1));
nextBtn.addEventListener('click', () => step(1));

drawer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
});

window.addEventListener('resize', () => {
  if (drawer.open && current) layoutDeck();
});

/* ══════════════════════════════════════════════════
   CURSOR «VER» — solo sobre los sobres y con ratón
══════════════════════════════════════════════════ */
const look = document.getElementById('look');

if (look && finePointer.matches) {
  packs.forEach(pack => {
    pack.addEventListener('pointerenter', e => {
      // Durante la apertura no vuelve a aparecer, aunque el puntero pase a otro sobre
      if (opening || drawer.open) return;
      // Se coloca antes de mostrarlo para que no aparezca en su posición anterior
      look.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      look.classList.add('on');
    });
    pack.addEventListener('pointerleave', () => look.classList.remove('on'));
    // Al abrir se oculta para no tapar el abanico; vuelve al entrar de nuevo en un sobre
    pack.addEventListener('click', () => look.classList.remove('on'));
    pack.addEventListener('pointermove', e => {
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
   CENEFAS Y MARCO DE LA PORTADA — motivos de Cecilia
   Secuencia fija. Para añadir un motivo: su WebP en assets/img/motifs/
   (original en source-images/motifs/) y una línea aquí con su ancho, su alto y,
   si se quiere, escala (0.8–1), inclinación en grados y desplazamiento
   (fracción del alto, perpendicular a la tira).
══════════════════════════════════════════════════ */
const MOTIFS = [
  ['01-stars',      285, 160, { scale: 0.9,  tilt: -12, shift: -0.06 }],
  ['02-rings',      150, 160, { scale: 0.85, tilt: 10,  shift: 0.05 }],
  ['03-eye',        249, 160, { scale: 0.8,  shift: -0.05 }],
  ['04-cocktail',   139, 160, { scale: 0.95, tilt: -14 }],
  ['05-table',      155, 160, { scale: 0.9,  shift: 0.04 }],
  ['06-lips',       212, 160, { scale: 0.8,  tilt: 8,   shift: -0.04 }],
  ['07-cake',       137, 160, {}],
  ['08-me',          48, 160, {}],
  ['09-disco-ball', 145, 160, { scale: 0.9,  shift: -0.05 }],
  ['10-pink-eye',   243, 160, { scale: 0.8,  shift: 0.05 }],
  ['11-cutlery',    115, 160, { scale: 0.9,  tilt: -10 }],
];
const MOTIF_DIR = 'assets/img/motifs/';
const MOTIF_GAP = 8; // px: aire mínimo entre motivos
// Esquinas del marco: cada motivo se alinea con la diagonal que pasa por su esquina
const CORNER_TILT = { 'corner-tl': -45, 'corner-tr': 45, 'corner-br': -45, 'corner-bl': 45 };

// Caja que ocupa un rectángulo w×h girado `deg` grados
function rotatedBox(w, h, deg) {
  const r = Math.abs(deg) * Math.PI / 180;
  return { w: w * Math.cos(r) + h * Math.sin(r), h: w * Math.sin(r) + h * Math.cos(r) };
}

// Alto de referencia de los motivos de una tira (--motif-h), medido con una pieza de prueba
function motifSize(el) {
  const probe = document.createElement('span');
  probe.style.cssText = 'display:block;flex:none;width:1px;height:var(--motif-h)';
  el.replaceChildren(probe);
  const size = probe.offsetHeight;
  probe.remove();
  if (!(size > 0)) console.error('Cenefa: no se puede medir el alto de los motivos', el);
  return size;
}

function motifImg([name, w, h], { width, height, tilt = 0, shiftX = 0, shiftY = 0, eager }) {
  const img = document.createElement('img');
  img.className = 'motif';
  img.src = `${MOTIF_DIR}${name}.webp`;
  img.alt = '';
  img.width = w;
  img.height = h;
  img.style.width = `${width}px`;
  img.style.height = `${height}px`;
  if (tilt || shiftX || shiftY) {
    img.style.transform = `translate(${shiftX}px, ${shiftY}px) rotate(${tilt}deg)`;
  }
  img.decoding = 'async';
  img.draggable = false;
  if (!eager) img.loading = 'lazy';
  return img;
}

// Llena una tira con los motivos enteros que caben en `length`, desde la posición `start`
// de la secuencia. Cada motivo reserva la caja que ocupa ya inclinado, para que no se pisen.
// Devuelve cuántos ha puesto.
function fillRun(run, length, { start = 0, vertical = false, eager = false } = {}) {
  const size = motifSize(run);
  if (!(length > 0) || !(size > 0)) return 0; // tira oculta, sin sitio o sin medida

  const fit = [];
  let used = 0;
  while (fit.length < MOTIFS.length * 20) {
    const motif = MOTIFS[(start + fit.length) % MOTIFS.length];
    const [, w, h, { scale = 1, tilt = 0 }] = motif;
    // En horizontal todos parten del mismo alto; en vertical cada uno cabe en un cuadrado
    const base = vertical ? size * scale / Math.max(w, h) : size * scale / h;
    const box = { w: w * base, h: h * base };
    const turned = rotatedBox(box.w, box.h, tilt);
    const cost = (vertical ? turned.h : turned.w) + (fit.length ? MOTIF_GAP : 0);
    if (used + cost > length) break;
    used += cost;
    fit.push({ motif, box, turned });
  }

  const frag = document.createDocumentFragment();
  fit.forEach(({ motif, box, turned }) => {
    const [, , , { tilt = 0, shift = 0 }] = motif;
    const img = motifImg(motif, {
      width: box.w,
      height: box.h,
      tilt,
      shiftX: vertical ? shift * size : 0,
      shiftY: vertical ? 0 : shift * size,
      eager,
    });
    // El margen hace que el hueco de cada motivo sea su caja inclinada
    if (vertical) img.style.marginBlock = `${(turned.h - box.h) / 2}px`;
    else img.style.marginInline = `${(turned.w - box.w) / 2}px`;
    frag.append(img);
  });
  run.replaceChildren(frag);
  return fit.length;
}

// Cenefas entre pasajes: una tira que empieza siempre por el primer motivo
function layoutBand(band) {
  let run = band.querySelector('.motif-run');
  if (!run) {
    run = document.createElement('div');
    run.className = 'motif-run';
    band.append(run);
  }
  fillRun(run, run.clientWidth);
}

// Esquina del marco: el siguiente motivo de la secuencia, en diagonal y encajado en el cuadrado
function fillCorner(corner, motif) {
  const size = motifSize(corner);
  const room = corner.clientWidth;
  if (!(size > 0) || !(room > 0)) return;
  const [, w, h, { scale = 1 }] = motif;
  const tilt = CORNER_TILT[Array.from(corner.classList).find(c => c in CORNER_TILT)] || 0;
  let base = size * scale / h;
  const turned = rotatedBox(w * base, h * base, tilt);
  base *= Math.min(1, room / Math.max(turned.w, turned.h));
  corner.replaceChildren(motifImg(motif, { width: w * base, height: h * base, tilt, eager: true }));
}

// Marco de la portada: en sentido horario desde la esquina superior izquierda,
// la secuencia sigue de una pieza a la siguiente, esquinas incluidas
const FRAME_PARTS = ['corner-tl', 'side-top', 'corner-tr', 'side-right', 'corner-br', 'side-bottom', 'corner-bl', 'side-left'];

function layoutFrame(frame) {
  if (!frame.childElementCount) {
    FRAME_PARTS.forEach(part => {
      const el = document.createElement('div');
      el.className = part.startsWith('side')
        ? `motif-run ${part}${/left|right/.test(part) ? ' motif-run--v' : ''}`
        : `corner ${part}`;
      frame.append(el);
    });
  }
  let next = 0;
  Array.from(frame.children).forEach(el => {
    if (el.classList.contains('corner')) {
      fillCorner(el, MOTIFS[next++ % MOTIFS.length]);
      return;
    }
    const vertical = el.classList.contains('motif-run--v');
    next += fillRun(el, vertical ? el.clientHeight : el.clientWidth, { start: next, vertical, eager: true });
  });
}

const bands = Array.from(document.querySelectorAll('.band'));
const masterFrame = document.querySelector('.master-frame');
const motifSizes = new WeakMap(); // último tamaño maquetado, para no rehacer si no cambia

const motifObserver = new ResizeObserver(entries => {
  entries.forEach(({ target, contentRect }) => {
    const key = `${Math.round(contentRect.width)}x${Math.round(contentRect.height)}`;
    if (motifSizes.get(target) === key) return;
    motifSizes.set(target, key);
    if (target === masterFrame) layoutFrame(target);
    else layoutBand(target);
  });
});
bands.forEach(band => motifObserver.observe(band));
if (masterFrame) motifObserver.observe(masterFrame);

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

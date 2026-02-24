/* ---- Cursor ---- */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .project-card, .wip-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ---- Header scroll ---- */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Page routing ---- */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initFadeUps();
}

/* ---- Drawer ---- */
const drawer = document.getElementById('drawer');
const hamburger = document.getElementById('hamburger');
function toggleDrawer() {
  drawer.classList.toggle('open');
  hamburger.classList.toggle('open');
}

/* ---- Scroll to contact ---- */
function scrollToContact() {
  showPage('home');
  setTimeout(() => {
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

/* ---- Filter ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ════════════════════════════════════════════════════════
   MODAL CON SLIDER
   ─ Cada project-card puede tener:
     · data-images  → rutas separadas por | (usa la portada si está vacío)
     · data-year    → año
     · data-role    → tu rol en el proyecto
     · data-tools   → herramientas usadas
     · data-client  → cliente o contexto
════════════════════════════════════════════════════════ */
let currentSlide = 0;
let totalSlides  = 0;

function openModal(card) {
  /* — Datos de texto — */
  const title  = card.dataset.title  || '';
  const tag    = card.dataset.tag    || '';
  const desc   = card.dataset.desc   || '';

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-tag').textContent   = tag;
  document.getElementById('modal-desc').textContent  = desc;

  /* — Metadatos pie — */
  const metaDefs = [
    { label: 'Año',          value: card.dataset.year   },
    { label: 'Rol',          value: card.dataset.role   },
    { label: 'Herramientas', value: card.dataset.tools  },
    { label: 'Cliente',      value: card.dataset.client },
  ].filter(m => m.value);

  const metaGrid = document.getElementById('modal-meta-grid');
  metaGrid.innerHTML = metaDefs.map(m => `
    <div>
      <p class="modal-meta-label">${m.label}</p>
      <p class="modal-meta-value">${m.value}</p>
    </div>`).join('');
  metaGrid.style.display = metaDefs.length ? 'grid' : 'none';

  /* — Imágenes — */
  const rawImages  = (card.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
  const coverSrc   = card.querySelector('img').getAttribute('src');
  // Usar data-images si existen; si no, la portada; si no, array vacío
  const srcs = rawImages.length ? rawImages : (coverSrc ? [coverSrc] : []);

  totalSlides  = srcs.length || 1;
  currentSlide = 0;

  /* — Construir slides — */
  const track = document.getElementById('slider-track');
  if (srcs.length) {
    track.innerHTML = srcs.map((src, i) => `
      <div class="slide">
        <img src="${src}" alt="${title} — ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="slide-placeholder" style="display:none">Sin imagen</div>
      </div>`).join('');
  } else {
    track.innerHTML = `<div class="slide"><div class="slide-placeholder">Sin imágenes</div></div>`;
  }

  /* — Thumbnails (solo si hay más de 1 imagen) — */
  const thumbsEl = document.getElementById('slider-thumbs');
  if (srcs.length > 1) {
    thumbsEl.innerHTML = srcs.map((src, i) => `
      <img class="thumb ${i === 0 ? 'active' : ''}"
           src="${src}" alt="thumb ${i + 1}"
           onclick="goToSlide(${i})"
           loading="lazy"
           onerror="this.outerHTML='<div class=\\'thumb-placeholder ${i === 0 ? 'active' : ''}\\' onclick=\\'goToSlide(${i})\\'><span>${i + 1}</span></div>'" />`).join('');
  } else {
    thumbsEl.innerHTML = '';
  }

  /* — Modo contain para imágenes que no deben recortarse — */
  const slider = document.querySelector('.modal-slider');
  if (card.dataset.contain === 'true') {
    slider.classList.add('contain-mode');
  } else {
    slider.classList.remove('contain-mode');
  }

  updateSlider();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateSlider() {
  /* Mover track */
  document.getElementById('slider-track').style.transform =
    `translateX(-${currentSlide * 100}%)`;

  /* Contador */
  document.getElementById('slider-counter').textContent =
    `${currentSlide + 1} / ${totalSlides}`;

  /* Thumb activo */
  document.querySelectorAll('.thumb, .thumb-placeholder').forEach((t, i) => {
    t.classList.toggle('active', i === currentSlide);
  });

  /* Botones prev/next */
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  if (prevBtn) prevBtn.disabled = currentSlide === 0;
  if (nextBtn) nextBtn.disabled = currentSlide >= totalSlides - 1;
}

function slideBy(dir) {
  const next = currentSlide + dir;
  if (next >= 0 && next < totalSlides) {
    currentSlide = next;
    updateSlider();
  }
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function closeModal(e) {
  const isBackdrop = e && e.target === document.getElementById('modal');
  const isCloseBtn = e && e.currentTarget && e.currentTarget.classList.contains('modal-close');
  if (!e || isBackdrop || isCloseBtn) {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* Teclado: Esc cierra, ← → navegan el slider */
document.addEventListener('keydown', e => {
  if (!document.getElementById('modal').classList.contains('open')) return;
  if (e.key === 'Escape')      closeModal({});
  if (e.key === 'ArrowLeft')   slideBy(-1);
  if (e.key === 'ArrowRight')  slideBy(1);
});

/* ---- Form validation ---- */
function handleSubmit(e) {
  e.preventDefault();
  let valid = true;
  const fields = [
    { id: 'field-name',    input: 'name',    check: v => v.trim().length > 1 },
    { id: 'field-email',   input: 'email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'field-message', input: 'message', check: v => v.trim().length > 5 },
  ];
  fields.forEach(f => {
    const field = document.getElementById(f.id);
    const val   = document.getElementById(f.input).value;
    if (!f.check(val)) { field.classList.add('invalid');    valid = false; }
    else               { field.classList.remove('invalid'); }
  });
  if (!valid) return;

  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.style.opacity       = '0.3';
  form.style.pointerEvents = 'none';
  success.style.display    = 'block';

  // Para envío real descomenta:
  // fetch(form.action, { method:'POST', body: new FormData(form), headers:{ Accept:'application/json' } })
  //   .then(r => { if(r.ok){ form.style.opacity='0.3'; success.style.display='block'; } });
}

/* ---- Fade-up on scroll ---- */
function initFadeUps() {
  const els = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
initFadeUps();
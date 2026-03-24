/* ══════════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .project-card, .masonry-item, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ══════════════════════════════════════════════════
   HEADER — borde al hacer scroll
══════════════════════════════════════════════════ */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ══════════════════════════════════════════════════
   DRAWER MÓVIL
══════════════════════════════════════════════════ */
const drawer    = document.getElementById('drawer');
const hamburger = document.getElementById('hamburger');

function toggleDrawer() {
  if (!drawer || !hamburger) return;
  drawer.classList.toggle('open');
  hamburger.classList.toggle('open');
}

/* Cerrar drawer al hacer clic en un enlace */
if (drawer) {
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    });
  });
}

/* ══════════════════════════════════════════════════
   PORTFOLIO — FILTROS
══════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════
   MODAL CON SLIDER
══════════════════════════════════════════════════ */
let currentSlide = 0;
let totalSlides  = 0;

function openModal(card) {
  const title = card.dataset.title || '';
  const tag   = card.dataset.tag   || '';
  const desc  = card.dataset.desc  || '';

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-tag').textContent   = tag;
  document.getElementById('modal-desc').textContent  = desc;

  /* Metadatos */
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

  /* Imágenes */
  const rawImages = (card.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
  const coverSrc  = card.querySelector('img').getAttribute('src');
  const srcs      = rawImages.length ? rawImages : (coverSrc ? [coverSrc] : []);

  totalSlides  = srcs.length || 1;
  currentSlide = 0;

  /* Slides */
  const track = document.getElementById('slider-track');
  track.innerHTML = srcs.length
    ? srcs.map((src, i) => `
        <div class="slide">
          <img src="${src}" alt="${title} — ${i + 1}"
               loading="${i === 0 ? 'eager' : 'lazy'}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
          <div class="slide-placeholder" style="display:none">Sin imagen</div>
        </div>`).join('')
    : `<div class="slide"><div class="slide-placeholder">Sin imágenes</div></div>`;

  /* Thumbnails */
  const thumbsEl = document.getElementById('slider-thumbs');
  thumbsEl.innerHTML = srcs.length > 1
    ? srcs.map((src, i) => `
        <img class="thumb ${i === 0 ? 'active' : ''}"
             src="${src}" alt="thumb ${i + 1}"
             onclick="goToSlide(${i})" loading="lazy"
             onerror="this.outerHTML='<div class=\\'thumb-placeholder ${i === 0 ? 'active' : ''}\\' onclick=\\'goToSlide(${i})\\'><span>${i+1}</span></div>'" />`).join('')
    : '';

  updateSlider();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateSlider() {
  document.getElementById('slider-track').style.transform =
    `translateX(-${currentSlide * 100}%)`;
  document.getElementById('slider-counter').textContent =
    `${currentSlide + 1} / ${totalSlides}`;

  document.querySelectorAll('.thumb, .thumb-placeholder').forEach((t, i) => {
    t.classList.toggle('active', i === currentSlide);
  });

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

document.addEventListener('keydown', e => {
  const modal = document.getElementById('modal');
  if (!modal || !modal.classList.contains('open')) return;
  if (e.key === 'Escape')     closeModal({});
  if (e.key === 'ArrowLeft')  slideBy(-1);
  if (e.key === 'ArrowRight') slideBy(1);
});

/* ══════════════════════════════════════════════════
   FORMULARIO DE CONTACTO
══════════════════════════════════════════════════ */
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

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' }
  }).then(r => {
    if (r.ok) {
      form.style.opacity       = '0.3';
      form.style.pointerEvents = 'none';
      success.style.display    = 'block';
    }
  }).catch(() => {
    /* fallback demo sin servidor */
    form.style.opacity       = '0.3';
    form.style.pointerEvents = 'none';
    success.style.display    = 'block';
  });
}

/* ══════════════════════════════════════════════════
   FADE-UP EN SCROLL
══════════════════════════════════════════════════ */
function initFadeUps() {
  const els = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}
initFadeUps();

/* ══════════════════════════════════════════════════
   TEXTOS ES / EN
   Fuente única de todos los textos traducibles.
   · Claves simples: se aplican a los elementos con data-i18n.
   · projects: fichas de la galería (cajón) de cada proyecto.
══════════════════════════════════════════════════ */
const I18N = {
  es: {
    skip: 'Saltar a los proyectos',
    cta: 'Hablemos',
    claim: 'Dibujo yo. Y lo convierto en producto.',
    role: 'Diseñadora gráfica e ilustradora',
    look: 'Ver',

    'd.ilustracion': 'Ilustración',
    'd.editorial': 'Editorial',
    'd.packaging': 'Packaging',
    'd.identidad': 'Identidad',
    'd.3d': '3D',

    'p.cata.short': 'Cata la Lata 2026',
    'p.cata.ctx': 'Concurso · 8ª edición',
    'p.cata.line': 'Atún · Sardinillas · Mejillones',
    'p.colores.short': 'Colores',
    'p.colores.ctx': 'Académico · UDIT',
    'p.buna.short': 'Buna Coffee',
    'p.buna.ctx': 'Académico · UDIT',
    'p.buna.line': 'Seis variedades · Pack colectivo',
    'p.chachara.short': 'Cháchara',
    'p.chachara.ctx': 'Académico · UDIT',
    'p.neil.short': 'En el ojo del artista',
    'p.neil.ctx': 'Académico · UDIT',
    'p.blacksheep.short': 'Black Sheep',
    'p.blacksheep.ctx': 'Propuesta · no encargo',

    'off.title': 'Fuera de serie',
    'off.text': 'Pintura y experimentos personales. Lo que hago cuando nadie me lo encarga, y de donde sale buena parte de mi mano.',
    'off.jazz': 'Jazz · pintura',
    'off.jazz.alt': 'Pintura «Jazz»: figura en azules y rojos',
    'off.feelit': 'Feel it · pintura',
    'off.feelit.alt': 'Pintura «Feel it»: torso rojo sobre fondo de color',

    'svc.title': 'Lo que puedo hacer por tu marca',
    'svc.packaging.t': 'Packaging',
    'svc.packaging.p': 'Envases, etiquetas y cajas pensados para el lineal, vestidos con ilustración propia.',
    'svc.editorial.t': 'Diseño editorial',
    'svc.editorial.p': 'Libros, catálogos y colecciones, de la cubierta a la última página y sus piezas promocionales.',
    'svc.ilustracion.t': 'Ilustración',
    'svc.ilustracion.p': 'Dibujo a mano en Procreate, preparado para imprimirse sobre producto real.',
    'svc.identidad.t': 'Identidad y branding',
    'svc.identidad.p': 'Marcas con carácter: logotipo, sistema gráfico y sus aplicaciones.',
    'svc.3d.t': '3D y dirección de arte',
    'svc.3d.p': 'Renders de producto en Cinema 4D para enseñar un envase antes de fabricarlo.',
    'svc.tools': 'Trabajo con',

    'ct.head': 'Contacto',
    'ct.title': '¿Hablamos?',
    'ct.text': 'Cuéntame qué quieres sacar al mundo. Respondo en 24–48 horas.',
    'ct.copy': 'Copiar email',
    'ct.copied': 'Email copiado',
    'ct.copyFail': 'No se pudo copiar; selecciona el email a mano',
    'ct.colophon': 'Serie completa: 6 cajas · 2 fuera de serie',

    'g.prev': 'Imagen anterior',
    'g.next': 'Imagen siguiente',
    'g.close': 'Cerrar',
    'g.imgError': 'Esta imagen no se ha podido cargar.',
    'g.thumb': 'Ver imagen',
    'g.open': 'Abrir proyecto',

    'm.year': 'Año',
    'm.role': 'Rol',
    'm.tools': 'Herramientas',
    'm.context': 'Contexto',

    projects: {
      cata: {
        title: 'Cata la Lata 2026 · 8ª edición',
        disc: 'Ilustración · Packaging',
        desc: [
          'Packaging para una trilogía de conservas premium: atún, sardinillas y mejillones en escabeche.',
          'El proyecto apuesta por la ilustración personalizada para vestir cada lata y convertir un producto cotidiano en una pieza visual única.'
        ],
        year: '2026',
        role: 'Ilustración y packaging',
        tools: 'Procreate, Photoshop, Illustrator',
        context: 'Concurso Cata la Lata, 8ª edición · UDIT'
      },
      colores: {
        title: 'Colores — Colección de libros',
        disc: 'Editorial',
        desc: [
          'Diseño y maquetación de una colección editorial de tres volúmenes, «Azul», «Rojo» y «Amarillo». Cada libro explora un color primario como hilo conductor entre teoría del arte y creación gráfica.',
          'Además de las cubiertas, incluye las páginas interiores con textos reales y todas las piezas promocionales y corporativas: bolsa, marcapáginas, díptico y redes sociales. El resultado es un objeto editorial coherente y comercializable.'
        ],
        year: '2025',
        role: 'Diseño de productos editoriales',
        tools: 'Procreate, Illustrator, InDesign, Photoshop',
        context: 'Proyecto académico · Taller de Proyectos, UDIT'
      },
      buna: {
        title: 'Buna Coffee — Café premium',
        disc: 'Packaging',
        desc: [
          'Diseño y maquetación de un pack de café en grano premium para la marca Buna Coffee: seis variedades y un pack colectivo para toda la experiencia Buna.',
          'Las ilustraciones evocan los aromas y sabores de cada variedad, con una paleta cálida y terrosa que conecta con la tierra y el proceso artesanal del café.'
        ],
        year: '2026',
        role: 'Branding y packaging',
        tools: 'Procreate, Illustrator, Photoshop',
        context: 'Proyecto académico · UDIT'
      },
      chachara: {
        title: 'Cháchara — Vinos',
        disc: 'Identidad',
        desc: [
          'Marca de vinos valenciana con enfoque en sostenibilidad y producción orgánica.',
          'La identidad parte de la idea de conversación y comunidad, presente en el logotipo y en las ilustraciones de las etiquetas de tinto, blanco y rosado.'
        ],
        year: '2023',
        role: 'Branding e identidad',
        tools: 'Illustrator, Photoshop',
        context: 'Proyecto académico · UDIT'
      },
      neil: {
        title: 'En el ojo del artista — Neil Leifer',
        disc: 'Editorial',
        desc: [
          'Exposición dedicada a Neil Leifer, uno de los fotógrafos más influyentes de la historia del deporte.',
          'Para una experiencia inmersiva que resalte su legado se desarrolló una identidad visual completa: señalética, catálogo, entradas, banderolas y el resto de materiales editoriales de la muestra.'
        ],
        year: '2024/25',
        role: 'Diseño de productos editoriales',
        tools: 'InDesign, Illustrator, Photoshop',
        context: 'Proyecto académico · UDIT'
      },
      blacksheep: {
        title: 'Black Sheep — Iced Coffee',
        disc: '3D',
        desc: [
          'Exploración de packaging tridimensional para una línea de café helado de especialidad. El concepto gira alrededor de la contracultura del café: rechazo a lo genérico, apuesta por la singularidad.',
          'Modelado y texturizado en Cinema 4D, con render final en iluminación de estudio HDRI.'
        ],
        year: '2026',
        role: '3D y dirección de arte',
        tools: 'Cinema 4D, Photoshop',
        context: 'Propuesta especulativa para Black Sheep Coffee (no encargo)'
      }
    }
  },

  en: {
    skip: 'Skip to the projects',
    cta: "Let's talk",
    claim: 'I draw it. Then I turn it into product.',
    role: 'Graphic designer and illustrator',
    look: 'View',

    'd.ilustracion': 'Illustration',
    'd.editorial': 'Editorial',
    'd.packaging': 'Packaging',
    'd.identidad': 'Identity',
    'd.3d': '3D',

    'p.cata.short': 'Cata la Lata 2026',
    'p.cata.ctx': 'Competition · 8th edition',
    'p.cata.line': 'Tuna · Sardines · Mussels',
    'p.colores.short': 'Colores',
    'p.colores.ctx': 'Academic · UDIT',
    'p.buna.short': 'Buna Coffee',
    'p.buna.ctx': 'Academic · UDIT',
    'p.buna.line': 'Six varieties · Multipack',
    'p.chachara.short': 'Cháchara',
    'p.chachara.ctx': 'Academic · UDIT',
    'p.neil.short': 'Through the artist’s eye',
    'p.neil.ctx': 'Academic · UDIT',
    'p.blacksheep.short': 'Black Sheep',
    'p.blacksheep.ctx': 'Proposal · not commissioned',

    'off.title': 'Off the series',
    'off.text': 'Paintings and personal experiments. What I make when nobody commissions it, and where much of my hand comes from.',
    'off.jazz': 'Jazz · painting',
    'off.jazz.alt': '“Jazz” painting: a figure in blues and reds',
    'off.feelit': 'Feel it · painting',
    'off.feelit.alt': '“Feel it” painting: a red torso on a coloured ground',

    'svc.title': 'What I can do for your brand',
    'svc.packaging.t': 'Packaging',
    'svc.packaging.p': 'Tins, labels and boxes made for the shelf, dressed in my own illustration.',
    'svc.editorial.t': 'Editorial design',
    'svc.editorial.p': 'Books, catalogues and collections, from the cover to the last page and their promotional pieces.',
    'svc.ilustracion.t': 'Illustration',
    'svc.ilustracion.p': 'Hand drawing in Procreate, prepared to be printed on real product.',
    'svc.identidad.t': 'Identity and branding',
    'svc.identidad.p': 'Brands with character: logo, graphic system and its applications.',
    'svc.3d.t': '3D and art direction',
    'svc.3d.p': 'Product renders in Cinema 4D to show a pack before it is manufactured.',
    'svc.tools': 'I work with',

    'ct.head': 'Contact',
    'ct.title': "Shall we talk?",
    'ct.text': 'Tell me what you want to put out into the world. I reply within 24–48 hours.',
    'ct.copy': 'Copy email',
    'ct.copied': 'Email copied',
    'ct.copyFail': 'Could not copy; please select the email by hand',
    'ct.colophon': 'Full series: 6 boxes · 2 off the series',

    'g.prev': 'Previous image',
    'g.next': 'Next image',
    'g.close': 'Close',
    'g.imgError': 'This image could not be loaded.',
    'g.thumb': 'Show image',
    'g.open': 'Open project',

    'm.year': 'Year',
    'm.role': 'Role',
    'm.tools': 'Tools',
    'm.context': 'Context',

    projects: {
      cata: {
        title: 'Cata la Lata 2026 · 8th edition',
        disc: 'Illustration · Packaging',
        desc: [
          'Packaging for a trilogy of premium tinned seafood: tuna, sardines and mussels in escabeche.',
          'The project relies on bespoke illustration to dress each tin, turning an everyday product into a unique visual piece.'
        ],
        year: '2026',
        role: 'Illustration and packaging',
        tools: 'Procreate, Photoshop, Illustrator',
        context: 'Cata la Lata competition, 8th edition · UDIT'
      },
      colores: {
        title: 'Colores — A book collection',
        disc: 'Editorial',
        desc: [
          'Design and layout of a three-volume editorial collection, “Blue”, “Red” and “Yellow”. Each book explores a primary colour as the thread between art theory and graphic creation.',
          'Beyond the covers, it includes the interior pages with real texts and every promotional and corporate piece: tote bag, bookmarks, leaflet and social media. The result is a coherent, marketable editorial object.'
        ],
        year: '2025',
        role: 'Editorial product design',
        tools: 'Procreate, Illustrator, InDesign, Photoshop',
        context: 'Academic project · Project Studio, UDIT'
      },
      buna: {
        title: 'Buna Coffee — Premium coffee',
        disc: 'Packaging',
        desc: [
          'Design and layout of a premium whole-bean coffee pack for Buna Coffee: six varieties plus a collective pack for the whole Buna experience.',
          'The illustrations evoke the aromas and flavours of each variety, in a warm, earthy palette that ties back to the land and the craft of coffee.'
        ],
        year: '2026',
        role: 'Branding and packaging',
        tools: 'Procreate, Illustrator, Photoshop',
        context: 'Academic project · UDIT'
      },
      chachara: {
        title: 'Cháchara — Wines',
        disc: 'Identity',
        desc: [
          'A Valencian wine brand focused on sustainability and organic production.',
          'The identity grows from the idea of conversation and community, carried through the logo and the illustrated labels for the red, white and rosé.'
        ],
        year: '2023',
        role: 'Branding and identity',
        tools: 'Illustrator, Photoshop',
        context: 'Academic project · UDIT'
      },
      neil: {
        title: 'Through the artist’s eye — Neil Leifer',
        disc: 'Editorial',
        desc: [
          'An exhibition devoted to Neil Leifer, one of the most influential photographers in the history of sport.',
          'For an immersive experience that honours his legacy, a full visual identity was developed: signage, catalogue, tickets, banners and the rest of the show’s editorial material.'
        ],
        year: '2024/25',
        role: 'Editorial product design',
        tools: 'InDesign, Illustrator, Photoshop',
        context: 'Academic project · UDIT'
      },
      blacksheep: {
        title: 'Black Sheep — Iced Coffee',
        disc: '3D',
        desc: [
          'A three-dimensional packaging exploration for a specialty iced coffee line. The concept revolves around coffee counterculture: refusing the generic, betting on the singular.',
          'Modelled and textured in Cinema 4D, with a final render under HDRI studio lighting.'
        ],
        year: '2026',
        role: '3D and art direction',
        tools: 'Cinema 4D, Photoshop',
        context: 'Speculative proposal for Black Sheep Coffee (not commissioned)'
      }
    }
  }
};

/* ══════════════════════════════════════════════════
   TEXTOS ES / EN
   Fuente única de todos los textos traducibles.
   · Claves simples: se aplican a los elementos con data-i18n.
   · projects: fichas de la galería (sobre abierto) de cada proyecto.
══════════════════════════════════════════════════ */
const I18N = {
  es: {
    skip: 'Saltar a los proyectos',
    cta: 'Hablemos',
    role: 'Diseñadora gráfica e ilustradora',
    look: 'Ver',
    album: 'Colección',
    nameAlt: 'Cece me llaman',
    'pk.tear': 'Abrir por aquí',

    'd.ilustracion': 'Ilustración',
    'd.editorial': 'Editorial',
    'd.packaging': 'Packaging',
    'd.identidad': 'Identidad',
    'd.3d': '3D',
    'd.web': 'Diseño web',
    'd.motion': 'Motion',
    'd.foto': 'Fotografía',

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
    'p.axon.short': 'Axon',
    'p.axon.ctx': 'Académico · UDIT',
    'p.bear.short': 'Bear',
    'p.bear.ctx': 'Académico',
    'p.fireball.short': 'Fireball',
    'p.fireball.ctx': 'Académico · no encargo',
    'p.olatuak.short': 'Olatuak',
    'p.olatuak.ctx': 'Encargo · TFM',
    'p.museo.short': 'MNAD',
    'p.museo.ctx': 'Académico · UDIT',
    'p.lyric.short': 'What’s My Name?',
    'p.lyric.ctx': 'Académico · UDIT',
    'p.viaje.short': 'Un viaje de ida y vuelta',
    'p.viaje.ctx': 'Proyecto personal',

    'about.title': 'Sobre mí',
    'about.p1': 'Soy Cecilia Pelayo, aunque todo el mundo me llama Cece. Soy diseñadora gráfica e ilustradora, me estoy formando en UDIT y trabajo desde Madrid.',
    'about.p2': 'Dibujo a mano en Procreate y lo convierto en producto real: latas, cajas de café, etiquetas de vino, cubiertas de libro. Diseño e ilustración en una misma persona, para que tu marca no tenga que buscar a dos.',
    'about.alt': 'Autorretrato ilustrado de Cecilia: moño, sudadera verde azulado y vaqueros grises',
    'about.label': 'La autora',
    'about.tear': 'Edición única',

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
    'svc.web.t': 'Diseño web',
    'svc.web.p': 'Webs responsive pensadas para cada pantalla, del ordenador al móvil, con la misma identidad que el resto de piezas.',
    'svc.motion.t': 'Motion',
    'svc.motion.p': 'Animación de tipografía e ilustración para vídeo y redes, con el mismo carácter gráfico que el resto de piezas.',
    'svc.foto.t': 'Fotografía',
    'svc.foto.p': 'Series fotográficas con mirada documental, de la calle al paisaje, editadas para contar una historia.',
    'svc.tools': 'Trabajo con',

    'ct.head': 'Contacto',
    'ct.title': '¿Hablamos?',
    'ct.text': 'Cuéntame qué quieres sacar al mundo. Respondo en 24–48 horas.',
    'ct.copy': 'Copiar email',
    'ct.copied': 'Email copiado',
    'ct.copyFail': 'No se pudo copiar; selecciona el email a mano',
    'ct.colophon': 'Colección completa: 13 sobres · 2 fuera de serie',

    'g.prev': 'Imagen anterior',
    'g.next': 'Imagen siguiente',
    'g.close': 'Cerrar',
    'g.imgError': 'Esta imagen no se ha podido cargar.',
    'g.open': 'Abrir proyecto',
    'g.play': 'Reproducir vídeo',
    'g.videoError': 'Este vídeo no se ha podido cargar.',

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
      },
      axon: {
        title: 'Axon — Core Collection',
        disc: '3D',
        desc: [
          'Diseño, modelado y presentación de una colección de gafas en 3D para Axon, una marca conceptual de óptica contemporánea, con una estética moderna y funcional.',
          'Cada pieza se modeló por separado y con su propio mapeado UV, para controlar la forma, los materiales y los acabados con realismo. La colección se presenta con renders, campaña, revista y una secuencia animada.'
        ],
        year: '2026',
        role: 'Modelado 3D, dirección de arte y campaña',
        tools: 'Cinema 4D, After Effects',
        context: 'Proyecto académico · UDIT'
      },
      bear: {
        title: 'Bear — Cerveza artesana',
        disc: 'Packaging',
        desc: [
          'Naming, identidad y packaging para Bear, una cerveza artesana. El nombre juega con su parecido fonético con «beer», y el oso se construye por síntesis geométrica para transmitir modernidad y un acabado técnico.',
          'La gama se ordena por origen y especie: Cantábrica (Lager) en amarillo, Kodiak (IPA) en naranja y Tibetana (Porter) en rojo. Una etiqueta envolvente en azul oscuro une las tres variedades en una familia coherente y premium.'
        ],
        year: '2026',
        role: 'Branding y packaging',
        tools: 'Illustrator, Photoshop',
        context: 'Proyecto académico'
      },
      fireball: {
        title: 'Fireball — Rediseño de licor de canela',
        disc: 'Packaging',
        desc: [
          'Rediseño académico que reposiciona Fireball como un «lujo consciente»: un packaging de alta gama con materiales eco-friendly que eleva el valor percibido sin renunciar a la sostenibilidad.',
          'La comunicación adopta un tono urbano y desenfadado, pensado para la Generación Z, y conserva la irreverencia de la marca en todas las piezas: etiqueta, caja, escaparate, valla y redes sociales.'
        ],
        year: '2025',
        role: 'Rediseño de packaging y campaña',
        tools: 'Procreate, Illustrator, Photoshop',
        context: 'Proyecto académico · UDIT (rediseño no encargado por la marca)'
      },
      olatuak: {
        title: 'Olatuak — Festival de música',
        disc: 'Identidad',
        desc: [
          'Identidad para Olatuak, un festival de música ficticio con artistas mujeres que se celebraría en San Sebastián en 2027: logotipo, cartelería, merchandising y página web.',
          'El logotipo dibuja las olas del Cantábrico con colores vivos de puesta de sol. Es un encargo para el TFM de otra persona, en el que yo me ocupé del diseño.'
        ],
        year: '2026',
        role: 'Logotipo, cartelería, merch y web',
        tools: 'Illustrator, Photoshop',
        context: 'Encargo para un TFM (festival ficticio)'
      },
      museo: {
        title: 'MNAD — Rediseño web',
        disc: 'Diseño web',
        desc: [
          'Rediseño académico de la web del Museo Nacional de Artes Decorativas para modernizarla y hacerla más accesible: exposiciones, catálogo, visitas, actividades y compra de entradas.',
          'Primero diseñé la interfaz en Figma y después la llevé a código con HTML, CSS y algo de JavaScript, adaptada a ordenador, tableta y móvil.'
        ],
        year: '2025',
        role: 'Diseño UI/UX',
        tools: 'Figma, Photoshop, HTML, CSS, JavaScript',
        context: 'Proyecto académico · UDIT (rediseño no encargado por el museo)'
      },
      lyric: {
        title: 'What’s My Name? — Lyric video',
        disc: 'Motion',
        desc: [
          'Lyric video de casi 50 segundos para «What’s My Name?», de Rihanna: la letra se anima con tipografía cinética sobre texturas de cebra, labios y siluetas en rosas y naranjas.',
          'Animación tipográfica y dirección de arte en After Effects, con el montaje final en Premiere Pro.'
        ],
        year: '2026',
        role: 'Animación tipográfica y dirección de arte',
        tools: 'After Effects, Premiere Pro',
        context: 'Proyecto académico · UDIT. Canción: «What’s My Name?», de Rihanna'
      },
      viaje: {
        title: 'Un viaje de ida y vuelta',
        disc: 'Fotografía',
        desc: [
          'Serie fotográfica sobre volver a casa: de la gran ciudad, con sus calles llenas de gente y de ruido, a la calma del hogar, la naturaleza y las raíces.',
          'Doce imágenes que arrancan en las aceras y los escaparates de la ciudad y acaban entre la niebla, los prados y los animales del campo, hasta cerrar con un retrato en blanco y negro.'
        ],
        year: '2024',
        role: 'Fotografía y edición',
        tools: 'Canon EOS 750D, Photoshop',
        context: 'Proyecto personal'
      }
    }
  },

  en: {
    skip: 'Skip to the projects',
    cta: "Let's talk",
    role: 'Graphic designer and illustrator',
    look: 'View',
    album: 'Collection',
    nameAlt: 'They call me Cece',
    'pk.tear': 'Tear here',

    'd.ilustracion': 'Illustration',
    'd.editorial': 'Editorial',
    'd.packaging': 'Packaging',
    'd.identidad': 'Identity',
    'd.3d': '3D',
    'd.web': 'Web design',
    'd.motion': 'Motion',
    'd.foto': 'Photography',

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
    'p.axon.short': 'Axon',
    'p.axon.ctx': 'Academic · UDIT',
    'p.bear.short': 'Bear',
    'p.bear.ctx': 'Academic',
    'p.fireball.short': 'Fireball',
    'p.fireball.ctx': 'Academic · not commissioned',
    'p.olatuak.short': 'Olatuak',
    'p.olatuak.ctx': 'Commission · MA thesis',
    'p.museo.short': 'MNAD',
    'p.museo.ctx': 'Academic · UDIT',
    'p.lyric.short': 'What’s My Name?',
    'p.lyric.ctx': 'Academic · UDIT',
    'p.viaje.short': 'A round trip',
    'p.viaje.ctx': 'Personal project',

    'about.title': 'About me',
    'about.p1': 'I’m Cecilia Pelayo, though everyone calls me Cece. I’m a graphic designer and illustrator, studying at UDIT and based in Madrid.',
    'about.p2': 'I draw by hand in Procreate and turn it into real product: tins, coffee boxes, wine labels, book covers. Design and illustration in one person, so your brand doesn’t have to find two.',
    'about.alt': 'Cecilia’s illustrated self-portrait: hair bun, teal hoodie and grey jeans',
    'about.label': 'The author',
    'about.tear': 'One of a kind',

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
    'svc.web.t': 'Web design',
    'svc.web.p': 'Responsive websites designed for every screen, from desktop to mobile, with the same identity as every other piece.',
    'svc.motion.t': 'Motion',
    'svc.motion.p': 'Type and illustration animation for video and social media, with the same graphic character as every other piece.',
    'svc.foto.t': 'Photography',
    'svc.foto.p': 'Photo series with a documentary eye, from street to landscape, edited to tell a story.',
    'svc.tools': 'I work with',

    'ct.head': 'Contact',
    'ct.title': "Shall we talk?",
    'ct.text': 'Tell me what you want to put out into the world. I reply within 24–48 hours.',
    'ct.copy': 'Copy email',
    'ct.copied': 'Email copied',
    'ct.copyFail': 'Could not copy; please select the email by hand',
    'ct.colophon': 'Full collection: 13 packs · 2 off the series',

    'g.prev': 'Previous image',
    'g.next': 'Next image',
    'g.close': 'Close',
    'g.imgError': 'This image could not be loaded.',
    'g.open': 'Open project',
    'g.play': 'Play video',
    'g.videoError': 'This video could not be loaded.',

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
      },
      axon: {
        title: 'Axon — Core Collection',
        disc: '3D',
        desc: [
          'Design, modelling and presentation of a 3D eyewear collection for Axon, a conceptual contemporary optics brand, with a modern, functional look.',
          'Each piece was modelled separately with its own UV mapping, for realistic control over shape, materials and finishes. The collection is presented through renders, a campaign, a magazine and an animated sequence.'
        ],
        year: '2026',
        role: '3D modelling, art direction and campaign',
        tools: 'Cinema 4D, After Effects',
        context: 'Academic project · UDIT'
      },
      bear: {
        title: 'Bear — Craft beer',
        disc: 'Packaging',
        desc: [
          'Naming, identity and packaging for Bear, a craft beer. The name plays on its sound-alike with “beer”, and the bear is built through geometric synthesis to convey modernity and a precise, technical finish.',
          'The range is organised by origin and species: Cantábrica (Lager) in yellow, Kodiak (IPA) in orange and Tibetana (Porter) in red. A wrap-around label in dark blue ties the three varieties into one coherent, premium family.'
        ],
        year: '2026',
        role: 'Branding and packaging',
        tools: 'Illustrator, Photoshop',
        context: 'Academic project'
      },
      fireball: {
        title: 'Fireball — Cinnamon liqueur redesign',
        disc: 'Packaging',
        desc: [
          'An academic redesign that repositions Fireball as “conscious luxury”: high-end packaging in eco-friendly materials that raises perceived value without giving up on sustainability.',
          'The communication takes an urban, easy-going tone aimed at Gen Z, and keeps the brand’s irreverence across every piece: label, box, shop window, billboard and social media.'
        ],
        year: '2025',
        role: 'Packaging and campaign redesign',
        tools: 'Procreate, Illustrator, Photoshop',
        context: 'Academic project · UDIT (redesign not commissioned by the brand)'
      },
      olatuak: {
        title: 'Olatuak — Music festival',
        disc: 'Identity',
        desc: [
          'Identity for Olatuak, a fictional music festival featuring women artists, set in San Sebastián in 2027: logo, posters, merchandise and website.',
          'The logo draws the waves of the Cantabrian Sea in vivid sunset colours. It was commissioned for someone else’s master’s thesis, and I handled the design.'
        ],
        year: '2026',
        role: 'Logo, posters, merch and web',
        tools: 'Illustrator, Photoshop',
        context: 'Commissioned for a master’s thesis (fictional festival)'
      },
      museo: {
        title: 'MNAD — Website redesign',
        disc: 'Web design',
        desc: [
          'An academic redesign of the Museo Nacional de Artes Decorativas website to modernise it and make it more accessible: exhibitions, catalogue, visits, activities and ticket booking.',
          'I first designed the interface in Figma and then built it with HTML, CSS and a little JavaScript, adapted to desktop, tablet and mobile.'
        ],
        year: '2025',
        role: 'UI/UX design',
        tools: 'Figma, Photoshop, HTML, CSS, JavaScript',
        context: 'Academic project · UDIT (redesign not commissioned by the museum)'
      },
      lyric: {
        title: 'What’s My Name? — Lyric video',
        disc: 'Motion',
        desc: [
          'A lyric video of almost 50 seconds for Rihanna’s “What’s My Name?”: the lyrics come alive through kinetic type over zebra textures, lips and silhouettes in pinks and oranges.',
          'Type animation and art direction in After Effects, with the final edit in Premiere Pro.'
        ],
        year: '2026',
        role: 'Type animation and art direction',
        tools: 'After Effects, Premiere Pro',
        context: 'Academic project · UDIT. Song: “What’s My Name?” by Rihanna'
      },
      viaje: {
        title: 'A round trip',
        disc: 'Photography',
        desc: [
          'A photo series about coming home: from the big city, its streets full of people and noise, to the calm of home, nature and one’s roots.',
          'Twelve images that start on city pavements and shop windows and end among the fog, meadows and animals of the countryside, closing on a black-and-white portrait.'
        ],
        year: '2024',
        role: 'Photography and editing',
        tools: 'Canon EOS 750D, Photoshop',
        context: 'Personal project'
      }
    }
  }
};

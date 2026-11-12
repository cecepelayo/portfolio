---
name: Cecilia Pelayo · Diseño gráfico
description: Portfolio de una sola página montado como un álbum de cromos (El Álbum) con cada proyecto como sobre cerrado.
colors:
  board: "#F7F4EF"
  card: "#FFFDF9"
  ink: "#141413"
  ink-soft: "#45433E"
  turq: "#5ECFC5"
  red: "#E8553A"
  blue: "#7393E8"
  green: "#5BAA52"
  yellow: "#F2B705"
  pink: "#F2A3BC"
  gallery-well: "#EEEAE2"
typography:
  display:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(2.4rem, 5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.05
  claim:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(1.15rem, 1.7vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.5vw, 1.6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'DM Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.08em"
    fontFeature: "tnum"
rounded:
  none: "0px"
  disc: "50%"
spacing:
  pad: "clamp(16px, 2vw, 28px)"
  gap: "clamp(10px, 1.1vw, 18px)"
  bar-h: "64px"
  inner: "8px"
  strip-h: "34px"
  tooth: "7px"
  tooth-w: "12px"
components:
  button-action:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.55rem 1.15rem"
    height: "44px"
  button-icon:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "44px"
  button-icon-hover:
    backgroundColor: "{colors.turq}"
  lang-toggle:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: "44px"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
  card-pack:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  cromo:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 6px 0"
  album-cover:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "56px"
  ornament-band:
    height: "100px"
  contact-band:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px"
  look-cursor:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.ink}"
    rounded: "{rounded.disc}"
    size: "76px"
---

# Design System: Cecilia Pelayo · Diseño gráfico

## Overview

**Creative North Star: "El Álbum"**

El sitio es un álbum de cromos: el nombre de Cecilia es la portada del álbum, en el centro del tablero, y cada proyecto es un sobre de cromos cerrado y numerado de la colección. Fondo claro de cartón, papel impreso en tintas planas y vivas sobre negro de imprenta, filetes gruesos, numeración en mono. La impresión manda: nada brilla, nada flota, no hay degradados ni sombras en los sobres; todo está impreso y enmarcado.

La densidad es alta en la primera pantalla (el tablero de sobres ocupa el viewport y deja asomar la tercera fila) y se relaja después en pasajes separados por cenefas ornamentales. La composición en reposo es ortogonal (0/90°), salvo algunos motivos de las cenefas; el movimiento imita el objeto físico: la tira de rasgado se levanta, asoma el primer cromo y los demás sobres pierden tinta cuando uno tiene el foco; al abrir, la tira se rasga, los cromos salen en abanico y vuelan a la mano (el mazo de la galería). Lo que gira en tránsito se asienta siempre a 0°. La colección se va llenando: la línea de progreso turquesa de la barra avanza con el scroll y el último cromo, el de Cecilia, se pega en su hueco en el cierre de contacto.

Decisiones fijadas por la propietaria: fondo claro, display en serif italiana de alto contraste (Bodoni Moda) y cenefas hechas con sus propias ilustraciones: once motivos recortados (estrellas, anillos, ojo, cóctel, mesa, labios, tarta, autorretrato, bola de discoteca, ojo rosa y cubiertos) que se mezclan sueltos, sin bordes ni fondo, y algunos inclinados.

**Key Characteristics:**
- Álbum de cromos: sobres numerados (Nº 0X) de papel plano en la tinta de su disciplina, con soldaduras dentadas, filete negro exterior de 3px y filete interior de 1.5px.
- Una tinta plana por disciplina; turquesa del logo reservado a las acciones, a la línea de progreso de la colección y a su destino, la banda de contacto.
- Display en Bodoni Moda italic; rotulación en grotesca condensada; numeración en DM Mono.
- Esquinas rectas, composición en reposo a 0/90°, profundidad por capas físicas (tira, cromos dentro del sobre, mazo), no por sombras.
- Cenefas de motivos ilustrados por Cecilia entre pasajes y alrededor del nombre en la portada, sin bordes ni fondo.

## Colors

Tintas de imprenta planas y saturadas sobre un cartón claro, con negro casi puro como tinta de dibujo.

### Primary
- **Turquesa del logo** (turq): el color de lo que se pulsa y de la colección que se completa. Botón «Hablemos», enlace de salto, cursor «Ver» sobre los sobres, hover de los botones de la galería, la selección de texto y la línea de progreso de 3px bajo la barra, que se llena con el scroll. Es también el fondo de la banda de contacto, el destino de «Hablemos».

### Secondary (tintas de disciplina)
- **Bermellón** (red): Ilustración. Papel del sobre y base de la galería.
- **Azul aciano** (blue): Editorial.
- **Verde hoja** (green): Packaging.
- **Amarillo** (yellow): Identidad.
- **Rosa** (pink): 3D.

### Neutral
- **Cartón del expositor** (board): fondo de página y de la barra.
- **Cartoncillo** (card): canto de los cromos, marcos de imagen, diálogo, botón de copiar sobre la banda de contacto.
- **Tinta negra** (ink): texto, filetes y bordes, capa exterior del sobre, estado activo del selector de idioma, contorno de foco. Al 20% traza las estrías de las soldaduras del sobre.
- **Tinta suave** (ink-soft): texto secundario (rol, descripciones, herramientas, términos de ficha).
- **Fondo de galería** (gallery-well): pozo gris cálido bajo el mazo de cromos y fondo de la imagen dentro de cada cromo.

### Named Rules
**The Turquoise-Is-Action Rule.** El turquesa del logo solo pinta lo que se pulsa o señala que se puede pulsar, la línea de progreso de la colección bajo la barra y la banda de contacto a la que lleva «Hablemos». Nunca es fondo de otra sección, tinta de disciplina ni decoración. Sobre la banda de contacto, las acciones pasan a cartoncillo con borde negro y la selección a tinta negra.

**The One Ink Per Discipline Rule.** Cada disciplina tiene una única tinta (ilustración bermellón, editorial aciano, packaging verde hoja, identidad amarillo, 3D rosa), aplicada mediante `--field` en el papel del sobre y su tira, la muestra de servicios y la base del sobre abierto. Dos proyectos de la misma disciplina comparten tinta.

**The Turquoise Close Rule.** El bloque de contacto es una banda turquesa a sangre con el filete interior de los sobres (sin tira ni soldaduras, porque no se abre), nunca una tinta de disciplina. En la web no hay marrones ni maderas: la paleta es la de las tintas, el cartón y el cartoncillo.

## Typography

**Display Font:** Bodoni Moda (con Didot, serif)
**Body Font:** Bricolage Grotesque (con system-ui, sans-serif)
**Label/Mono Font:** DM Mono (con ui-monospace, monospace)

**Character:** Una italiana de alto contraste, siempre en cursiva para los titulares, frente a una grotesca de anchura variable que se condensa para rotular los sobres como un impreso de colección; la mono numera la serie y los cromos.

### Hierarchy
- **Display** (600 italic, display): títulos de pasaje («Fuera de serie», servicios, título del sobre abierto). `text-wrap: balance`.
- **Headline** (600 italic, headline): nombre de cada servicio.
- **Claim** (400 roman, claim): «Cecilia Pelayo» bajo el rotulado de la portada; es el h1 de la página y no se traduce.
- **Title** (800, condensada a wdth 75, mayúsculas): nombre del proyecto en el sobre; en el sobre grande sube a clamp(2rem, min(3.4vw, 6svh), 3.4rem). «¿Hablamos?» usa esta rotulación a clamp(3rem, 9vw, 6.5rem); el email de contacto, la misma grotesca a 800 y wdth 80.
- **Body** (400, body): texto corrido, 36–60ch según contexto.
- **Label** (DM Mono, mayúsculas, cifras tabulares): números de serie «Nº 0X», cabecera del sobre, número del cromo «1 / N», contador de galería, términos de ficha, colofón. La leyenda de la tira «Abrir por aquí» y el número del cromo en el sobre bajan a 0.6rem.

### Named Rules
**The Italic Display Rule.** Los titulares en Bodoni Moda van siempre en cursiva a 600; la redonda queda para el claim.

**The Printed Serial Rule.** Toda numeración de serie (Nº 0X, s/n, 1 / 6) va en DM Mono con cifras tabulares.

## Layout

El tablero es una retícula de 12 columnas con margen `pad` y separación `gap`. En escritorio, la portada del álbum ocupa las columnas 5–9 de las dos primeras filas, el sobre grande (Nº 01) las columnas 1–4, y la tercera fila asoma unos 150px en el primer viewport (altura de fila calculada sobre `100svh`). El tablero recorta en horizontal (`overflow-x: clip`) para que el abanico de cromos no ensanche la página. Debajo, los pasajes (fuera de serie, servicios, contacto) reutilizan la retícula de 12 columnas y se separan con cenefas de margen clamp(40px, 6vw, 88px).

Responsive: a 1100px el tablero pasa a 6 columnas con sobres de dos columnas y la portada a ancho completo; las imágenes adoptan proporción fija (4/3, 6/5); el sobre abierto ocupa toda la pantalla con la galería arriba y el botón de cerrar fijo. A 720px, 2 columnas, la barra baja a 60px, la tira del sobre a 30px y la cabecera del sobre se apila. La barra fija mide `bar-h` y el scroll se compensa con `scroll-padding-top`.

## Elevation & Depth

Sistema plano. La profundidad es física, no atmosférica: la tira de rasgado está por encima del cuerpo del sobre y los cromos guardados detrás de él. En hover o foco (solo con `@media (hover: hover)`), la tira se levanta y se ladea (`translateY(-10px) rotate(-4deg)`, girando sobre su extremo derecho), el primer cromo asoma 20px y los demás sobres bajan de tinta (el sobre entero a saturación 0.45, opaco) en vez de elevar el enfocado. En la galería, los tres primeros cromos del mazo se escalonan 6px. Las únicas sombras son suaves y de respuesta: el hover del botón de acción y la sombra proyectada del logo sobre el nombre.

### Shadow Vocabulary
- **Lift de acción** (`box-shadow: 0 6px 14px -6px rgba(20, 20, 19, 0.45)`): solo en hover del botón de acción, junto a `translateY(-2px)`.
- **Rotulado recortado** (`filter: drop-shadow(0 8px 10px rgba(20, 20, 19, 0.18))`): el rotulado «CECE ME LLAMAN» del centro de la portada.
- **Doble filete de muestra** (`box-shadow: inset 0 0 0 3px card, inset 0 0 0 4.5px ink`): filete interior impreso de la muestra de servicios; es un filete, no una elevación.

### Named Rules
**The Tear Not Shadow Rule.** Un sobre se destaca levantando su tira, asomando su primer cromo y apagando a los demás, nunca levantándolo con una sombra. Los sobres no llevan brillo, degradado ni sombra.

## Shapes

Esquinas rectas en todo el sistema (0px). La forma se construye con filetes: capa exterior negra de 3px y filete interior de 1.5px en sobres; 2px en controles, marcos de imagen, canto de los cromos del sobre y separadores (3px en los cromos del mazo). El sobre tiene la única silueta no rectangular: soldaduras con dientes en zigzag arriba y abajo (7px de alto, 12px de paso), recortadas con `mask` de `conic-gradient`, con estrías verticales del sellado (1px cada 4px) y una línea troquelada discontinua (6px trazo, 4px hueco) bajo la tira. La única forma redonda es el cursor «Ver» (disco de 76px); las formas de los motivos de las cenefas pertenecen a sus dibujos, no a los contenedores. En reposo nada está girado: composición a 0/90°; los giros solo existen en tránsito (tira, abanico, vuelo, entradas) y terminan a 0°. **Excepción:** los motivos de las cenefas, que son ilustraciones sueltas y no contenedores, pueden ir inclinados en reposo con un ángulo fijo por motivo (entre 8° y 15°) y a 45° en las esquinas del marco de la portada.

## Components

### Buttons
Rotulados e impresos, con borde negro.
- **Shape:** esquinas rectas (0px), borde de 2px en tinta negra, altura mínima 44px.
- **Acción:** fondo turquesa, texto en tinta negra, Bricolage 700 condensada (wdth 85), relleno 0.55rem 1.15rem.
- **Hover / Focus:** sube 2px con el lift de acción (0.25s, `ease-out`); en `:active` vuelve a 0 sin sombra. Foco global: contorno de 3px en tinta negra con 3px de separación (también sobre la banda turquesa de contacto).
- **Icono (galería, cerrar):** cuadrado de 44px en cartoncillo con borde de 2px e icono SVG de trazo 1.8; hover a turquesa (solo con `@media (hover: hover)`) y `:active` a turquesa mientras se pulsa, para dar respuesta en táctil; deshabilitado a opacidad 0.3. En móvil (≤720px) el de cerrar se ve de 32px y conserva 44px de zona táctil.

### Chips (selector de idioma)
- **Style:** grupo ES/EN con un borde negro común de 2px, botones de 44×44px en DM Mono.
- **State:** activo en tinta negra con texto en cartón; inactivo transparente, hover a cartoncillo.

### Cards / Containers (el sobre de cromos)
- **Corner Style:** recto (0px), con soldaduras dentadas arriba y abajo.
- **Background:** papel en la tinta de su disciplina (`--field`) sobre una capa negra que asoma 3px como filete exterior; marco de imagen en cartoncillo.
- **Shadow Strategy:** ninguna; la tira y los cromos dan la profundidad (ver Elevation & Depth).
- **Border:** capa exterior negra de 3px, filete interior de 1.5px a 5px del borde que termina sobre la soldadura inferior (banda estriada con filete superior de 1.5px); marco de imagen de 2px.
- **Internal Padding:** 12px 14px (10px en móvil), separación interna 8px.
- **Tira de rasgado:** soldadura superior de 34px en la tinta del sobre, con estrías, línea troquelada y la leyenda mono «Abrir por aquí».
- **Contenido:** cabecera en mono (Nº y disciplina), portada del proyecto, título condensado en mayúsculas, contexto honesto en mono. Dentro guarda hasta 5 cromos (proporción 5/7).
- **Apertura:** al pulsar, la tira se rasga (300ms), los cromos suben un 66% y se abren en abanico de 49° (30° en móvil) (550ms, escalonado 45ms), pausa de 230ms y sus copias vuelan al mazo de la galería (480ms). El sobre que se abre pasa por encima de la barra (también con el puntero encima) y el cursor «Ver» se oculta hasta que el puntero vuelve a entrar en un sobre; el abanico nunca se sale de la pantalla: queda a 12px de sus bordes, cerrándose lo justo si se saldría por los lados y subiendo menos si se saldría por arriba. Con movimiento reducido se abre la galería directamente.

### Cromo
Imagen en cartoncillo con canto negro (2px en el sobre, 3px en el mazo), relleno 6px 6px 0 (10px en el mazo), filete de 1.5px alrededor de la imagen sobre el fondo de galería y número «1 / N» en mono debajo.

### Navigation
Barra fija de 64px sobre el cartón: logo a la izquierda, selector de idioma y botón «Hablemos» a la derecha. Al hacer scroll aparece un filete inferior negro de 2px y, donde hay `animation-timeline`, una línea turquesa de 3px que se llena de izquierda a derecha con el progreso de la página. No hay navegación por secciones.

### Portada del álbum
Sin bordes ni fondo: el contenido flota sobre el cartón de la página, rodeado por un marco de motivos de 48px (36px en móvil) que recorre los cuatro lados en sentido horario desde la esquina superior izquierda, con los motivos de pie y apilados en los laterales y uno en diagonal (±45°, alineado con la diagonal de su esquina) en cada esquina. Contiene «Colección» en mono, el rotulado de grafiti de burbujas «CECE ME LLAMAN» de Cecilia (turquesa, morado y rosa; el mismo en los dos idiomas, con texto alternativo traducido), «Cecilia Pelayo» y el rol en mono. El rotulado ocupa el alto que ocupaban antes el logo y el nombre (`clamp(165px, min(18.5vw, 29.5svh), 300px)` de ancho), conserva la sombra suave y la inclinación 3D al pasar el ratón. Debajo, «Cecilia Pelayo» en Bodoni redonda es el título principal de la página (h1).

### Cenefa
Tira de motivos sueltos sobre el cartón de la página, sin filetes, sin fondo y sin separadores. Alto de referencia de los motivos 80px (56px en móvil); la tira mide 1.25 veces ese alto y no recorta, así que los inclinados pueden asomar. Secuencia fija de once motivos (la lista vive en `main.js`), repetida en bucle y empezando siempre por el primero. Solo entran motivos enteros, con 8px de aire mínimo entre las cajas que ocupan ya inclinados; el hueco sobrante se reparte entre ellos para llegar de borde a borde. Cada motivo tiene escala (80–100%), desplazamiento vertical e inclinación fijos: estrellas −12°, anillos +10°, cóctel −14°, labios +8° y cubiertos −10°; el resto, rectos. Las mismas reglas valen para el marco de la portada.

### Sobre abierto (galería)
Diálogo de hasta 1240px con borde de 3px que aparece solo con opacidad (0.34s). A la izquierda, sobre el fondo de galería, el mazo de cromos en la mano: cada cromo toma la proporción de su imagen para mostrarla entera; al pasar, el de delante sale hacia la izquierda (`translate(-118%, 3%) rotate(-7deg)`, 390ms) y vuelve al fondo del mazo, en ciclo. Debajo, anterior, contador «1 / N» y siguiente; sin miniaturas. A la derecha, texto y ficha, cerrado por una base en la tinta de la disciplina con número de serie en mono. Fondo de página al 72% de tinta negra. En tablet y móvil (≤1100px) la galería ocupa toda la pantalla y el botón cerrar flota fijo arriba a la derecha; sobre el mazo queda una franja libre de su altura más 8px de aire (64px en tablet, 52px en móvil) y el escenario crece lo mismo, para que ningún cromo pase bajo el botón sin perder tamaño.

### Contacto (banda turquesa)
Banda turquesa a sangre, de borde a borde de la pantalla, con borde superior de 3px en tinta negra y, al margen del tablero, el filete interior de 1.5px de los sobres con relleno de 14px; sin tira. Cabecera en mono mayúsculas («Contacto» a la izquierda; a la derecha, el hueco numerado «Nº 07» con borde discontinuo de 1.5px y proporción 5/7, y «Madrid») separada por un filete de 1.5px que llega al filete interior. Al hacer scroll, el último cromo de la colección, el de Cecilia (logo CECE en cartoncillo con borde de 2px), entra girando y se pega en el hueco; después se traza el filete. Titular «¿Hablamos?» en la rotulación de los sobres (Bricolage 800, wdth 75, mayúsculas), email en grotesca 800 condensada, botón de copiar en cartoncillo con borde negro e iconos sociales SVG de trazo. El colofón («Colección completa: 6 sobres · 2 fuera de serie») va bajo el filete, en mono sobre el turquesa: la página termina en la banda. El fondo del lienzo (el que se ve al estirar la página y bajo la barra de Safari de iPhone) es cartón en la mitad superior, continuando la barra, y turquesa en la inferior, continuando la banda; sin script queda en cartón.

## Do's and Don'ts

### Do:
- **Do** reservar el turquesa del logo para acciones (botones, cursor «Ver», hover de controles, selección), la línea de progreso de la barra y la banda de contacto.
- **Do** asignar a cada disciplina su única tinta mediante `--field` (ink-ilustracion, ink-editorial, ink-packaging, ink-identidad, ink-3d).
- **Do** usar el bermellón de texto, y no el bermellón de fondo, cuando el bermellón sea texto sobre cartoncillo.
- **Do** enmarcar sobres y portada con 3px en tinta negra y filete interior de 1.5px, con esquinas rectas.
- **Do** numerar en DM Mono mayúsculas con cifras tabulares (Nº 0X, s/n, 1 / N).
- **Do** mostrar las imágenes de la galería enteras: el cromo toma la proporción de su imagen.
- **Do** separar pasajes con cenefas de motivos de Cecilia en su color original, recortados de sus propias ilustraciones.
- **Do** etiquetar el contexto de cada proyecto con honestidad (académico, concurso, propuesta no encargada) en la cara del sobre.
- **Do** dejar que los giros vivan solo en tránsito (tira, abanico, vuelo, entradas) y asentar todo a 0°.

### Don't:
- **Don't** usar el turquesa como fondo de otra sección que no sea contacto, como tinta de disciplina o como decoración.
- **Don't** pintar el bloque de contacto con una tinta de disciplina ni introducir marrones o maderas en la paleta.
- **Don't** redondear esquinas de contenedores ni dejar elementos girados en reposo fuera de 0/90°.
- **Don't** destacar un sobre con sombra, brillo, degradado o elevación; se destaca levantando la tira y apagando a los demás.
- **Don't** aplicar los estados de hover del sobre ni de los botones de icono fuera de `@media (hover: hover)`: en táctil se quedarían pegados; la respuesta al toque es `:active`.
- **Don't** poner titulares de Bodoni Moda en redonda ni en un peso distinto de 600.
- **Don't** poner filetes, fondos ni separadores (puntos, rombos) en las cenefas ni en el marco de la portada: los motivos van sueltos.

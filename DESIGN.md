---
name: Cecilia Pelayo · Diseño gráfico
description: Portfolio de una sola página montado como expositor de cajas de cerillas de coleccionista (Fosforera).
colors:
  board: "#F7F4EF"
  card: "#FFFDF9"
  ink: "#141413"
  ink-soft: "#45433E"
  turq: "#5ECFC5"
  red: "#E8553A"
  red-text: "#C63A20"
  blue: "#7393E8"
  green: "#5BAA52"
  yellow: "#F2B705"
  pink: "#F2A3BC"
  wood: "#EED9AC"
  wood-grain: "#DDBF85"
  striker: "#5A2418"
  gallery-well: "#EEEAE2"
typography:
  display-master:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(3rem, min(6.2vw, 9.5svh), 6rem)"
    fontWeight: 600
    lineHeight: 0.88
    letterSpacing: "-0.03em"
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
    height: "40px"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
  matchbox-sleeve:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px"
  master-label:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px"
  ornament-band:
    backgroundColor: "{colors.card}"
    height: "48px"
  contact-striker:
    backgroundColor: "{colors.striker}"
    textColor: "{colors.card}"
  look-cursor:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.ink}"
    rounded: "{rounded.disc}"
    size: "76px"
---

# Design System: Cecilia Pelayo · Diseño gráfico

## Overview

**Creative North Star: "La Fosforera"**

El sitio es el expositor de un coleccionista de cajas de cerillas: cada proyecto es una etiqueta numerada de una serie, y el nombre de Cecilia es la etiqueta maestra en el centro. Fondo claro de cartón, tintas planas y vivas sobre negro de imprenta, filetes gruesos, numeración en mono. La impresión manda: nada brilla, nada flota, todo está impreso y enmarcado.

La densidad es alta en la primera pantalla (el tablero de cajas ocupa el viewport y deja asomar la tercera fila) y se relaja después en pasajes separados por cenefas ornamentales. La composición es ortogonal (solo 0/90°); el movimiento imita el objeto físico: el cajón de la caja asoma, sale al abrir y las demás cajas pierden tinta cuando una tiene el foco.

Decisiones fijadas por la propietaria: fondo claro, display en serif italiana de alto contraste (Bodoni Moda) y cenefas ornamentales. El adorno actual de las cenefas es **provisional**: un SVG dibujado a la espera de los recortes PNG de los motivos de Cecilia.

**Key Characteristics:**
- Expositor de cajas de cerillas: etiquetas numeradas (Nº 0X) con filete negro grueso y filete interior.
- Una tinta plana por disciplina; turquesa del logo reservado a las acciones.
- Display en Bodoni Moda italic; rotulación en grotesca condensada; numeración en DM Mono.
- Esquinas rectas, composición a 0/90°, profundidad por capas físicas (cajón, manga), no por sombras.
- Cenefas ornamentales entre pasajes (adorno provisional).

## Colors

Tintas de imprenta planas y saturadas sobre un cartón claro, con negro casi puro como tinta de dibujo.

### Primary
- **Turquesa del logo** (turq): el color de lo que se pulsa. Botón «Hablemos» y «Copiar email», enlace de salto, cursor «Ver» sobre las cajas, hover de los botones de la galería y la selección de texto.

### Secondary (tintas de disciplina)
- **Bermellón** (red): Ilustración. Fondo de la manga de la caja, cabezas de cerilla del cajón y adorno.
- **Bermellón de texto** (red-text): versión oscurecida del bermellón solo para texto sobre cartoncillo («Cecilia» en la etiqueta maestra), para alcanzar contraste AA.
- **Azul aciano** (blue): Editorial.
- **Verde hoja** (green): Packaging.
- **Amarillo** (yellow): Identidad.
- **Rosa** (pink): 3D.

### Tertiary (materiales de la caja)
- **Madera de bandeja** (wood) con **veta** (wood-grain): rayado del cajón interior que asoma bajo la manga.
- **Rascador** (striker): marrón granulado de la banda de contacto, con texto en cartoncillo.

### Neutral
- **Cartón del expositor** (board): fondo de página y de la barra.
- **Cartoncillo** (card): interior de etiquetas, marcos de imagen, cenefas, diálogo, texto sobre el rascador.
- **Tinta negra** (ink): texto, filetes y bordes, estado activo del selector de idioma, contorno de foco.
- **Tinta suave** (ink-soft): texto secundario (rol, descripciones, herramientas, términos de ficha).
- **Fondo de galería** (gallery-well): pozo gris cálido donde se presenta la imagen en el cajón abierto.

### Named Rules
**The Turquoise-Is-Action Rule.** El turquesa del logo solo pinta lo que se pulsa o señala que se puede pulsar. Nunca es fondo de sección, tinta de disciplina ni decoración.

**The One Ink Per Discipline Rule.** Cada disciplina tiene una única tinta (ilustración bermellón, editorial aciano, packaging verde hoja, identidad amarillo, 3D rosa), aplicada mediante `--field` en la caja, la muestra de servicios y la base del cajón abierto. Dos proyectos de la misma disciplina comparten tinta.

**The Striker Close Rule.** El bloque de contacto es la banda de rascador: marrón granulado, nunca una tinta de disciplina.

## Typography

**Display Font:** Bodoni Moda (con Didot, serif)
**Body Font:** Bricolage Grotesque (con system-ui, sans-serif)
**Label/Mono Font:** DM Mono (con ui-monospace, monospace)

**Character:** Una italiana de alto contraste, siempre en cursiva para los titulares, frente a una grotesca de anchura variable que se condensa para rotular las cajas como una etiqueta impresa; la mono numera la serie.

### Hierarchy
- **Display maestro** (600 italic, display-master): solo el nombre en la etiqueta maestra, en dos tintas («Cecilia» en bermellón de texto, «Pelayo» en tinta negra).
- **Display** (600 italic, display): títulos de pasaje («Fuera de serie», servicios, «¿Hablamos?» a mayor tamaño, título del cajón abierto). `text-wrap: balance`.
- **Headline** (600 italic, headline): nombre de cada servicio.
- **Claim** (400 roman, claim): la frase de la etiqueta maestra, máximo 22ch.
- **Title** (800, condensada a wdth 75, mayúsculas): nombre del proyecto en la caja; en la caja grande sube a clamp(2rem, min(3.4vw, 6svh), 3.4rem). El email de contacto usa la misma grotesca a 800 y wdth 80.
- **Body** (400, body): texto corrido, 36–60ch según contexto.
- **Label** (DM Mono, mayúsculas, cifras tabulares): números de serie «Nº 0X», cabecera de la caja, contador de galería, términos de ficha, colofón.

### Named Rules
**The Italic Display Rule.** Los titulares en Bodoni Moda van siempre en cursiva a 600; la redonda queda para el claim.

**The Printed Serial Rule.** Toda numeración de serie (Nº 0X, s/n, 1 / 6) va en DM Mono con cifras tabulares.

## Layout

El tablero es una retícula de 12 columnas con margen `pad` y separación `gap`. En escritorio, la etiqueta maestra ocupa las columnas 5–9 de las dos primeras filas, la caja grande (Nº 01) las columnas 1–4, y la tercera fila asoma unos 150px en el primer viewport (altura de fila calculada sobre `100svh`). Debajo, los pasajes (fuera de serie, servicios, contacto) reutilizan la retícula de 12 columnas y se separan con cenefas de margen clamp(40px, 6vw, 88px).

Responsive: a 1100px el tablero pasa a 6 columnas con cajas de dos columnas y la maestra a ancho completo; las imágenes adoptan proporción fija (4/3, 6/5). A 720px, 2 columnas, la barra baja a 60px, la cabecera de caja se apila y el cajón abierto ocupa toda la pantalla con la galería primero. La barra fija mide `bar-h` y el scroll se compensa con `scroll-padding-top`.

## Elevation & Depth

Sistema plano. La profundidad es física, no atmosférica: la manga de la caja se apoya sobre su cajón, que asoma 7px en reposo, 18px en hover/foco y un 42% al abrir. Las cajas no enfocadas bajan de tinta (saturación 0.2, opacidad 0.55) en vez de elevar la enfocada. Las únicas sombras son suaves y de respuesta: el hover del botón de acción y la sombra proyectada del logo sobre el nombre.

### Shadow Vocabulary
- **Lift de acción** (`box-shadow: 0 6px 14px -6px rgba(20, 20, 19, 0.45)`): solo en hover del botón de acción, junto a `translateY(-2px)`.
- **Logo recortado** (`filter: drop-shadow(0 8px 10px rgba(20, 20, 19, 0.18))`): el logo CECE que monta sobre el nombre.
- **Doble filete de muestra** (`box-shadow: inset 0 0 0 3px card, inset 0 0 0 4.5px ink`): filete interior impreso de la muestra de servicios; es un filete, no una elevación.

### Named Rules
**The Tray Not Shadow Rule.** Una caja se destaca sacando su cajón y apagando a las demás, nunca levantándola con una sombra.

## Shapes

Esquinas rectas en todo el sistema (0px). La forma se construye con filetes: borde exterior negro de 3px y filete interior de 1.5px en etiquetas y mangas; 2px en controles, marcos de imagen y separadores. La única forma redonda es el cursor «Ver» (disco de 76px); los círculos y rombos del adorno pertenecen al motivo, no a los contenedores. Nada se gira: composición a 0/90°.

## Components

### Buttons
Rotulados e impresos, con borde negro.
- **Shape:** esquinas rectas (0px), borde de 2px en tinta negra, altura mínima 44px.
- **Acción:** fondo turquesa, texto en tinta negra, Bricolage 700 condensada (wdth 85), relleno 0.55rem 1.15rem.
- **Hover / Focus:** sube 2px con el lift de acción (0.25s, `ease-out`); en `:active` vuelve a 0 sin sombra. Foco global: contorno de 3px en tinta negra con 3px de separación (en cartoncillo dentro del rascador).
- **Icono (galería, cerrar):** cuadrado de 44px en cartoncillo con borde de 2px e icono SVG de trazo 1.8; hover a turquesa; deshabilitado a opacidad 0.3.

### Chips (selector de idioma)
- **Style:** grupo ES/EN con un borde negro común de 2px, botones de 44×40px en DM Mono.
- **State:** activo en tinta negra con texto en cartón; inactivo transparente, hover a cartoncillo.

### Cards / Containers (la caja de cerillas)
- **Corner Style:** recto (0px).
- **Background:** manga en la tinta de su disciplina (`--field`), marco de imagen en cartoncillo.
- **Shadow Strategy:** ninguna; el cajón da la profundidad (ver Elevation & Depth).
- **Border:** 3px en tinta negra más filete interior de 1.5px a 5px del borde; marco de imagen de 2px.
- **Internal Padding:** 14px (10px en móvil), separación interna 8px.
- **Contenido:** cabecera en mono (Nº y disciplina), imagen, título condensado en mayúsculas, contexto honesto en mono. Al pulsar, el cajón sale y se abre el diálogo de galería.

### Navigation
Barra fija de 64px sobre el cartón: logo a la izquierda, selector de idioma y botón «Hablemos» a la derecha. Al hacer scroll aparece un filete inferior negro de 2px. No hay navegación por secciones.

### Etiqueta maestra
Cartoncillo con borde de 3px, relleno de 8px, banda ornamental con el adorno en mosaico y panel interior con filete de 1.5px. Contiene el logo CECE montado sobre el nombre, el display maestro en dos tintas, el claim y el rol en mono.

### Cenefa
Banda de 48px en cartoncillo entre filetes de 2px arriba y abajo, con el adorno repetido en horizontal a 30px de alto. El adorno (`--ornament`) es **provisional**.

### Cajón abierto (galería)
Diálogo de hasta 1240px con borde de 3px: escenario de imagen sobre el fondo de galería, controles y miniaturas a la izquierda; texto y ficha a la derecha, cerrado por una base en la tinta de la disciplina con número de serie en mono. Fondo de página al 72% de tinta negra.

### Contacto (banda de rascador)
Fondo marrón rascador con grano de dos puntos en degradado radial, texto en cartoncillo, titular display grande, email en grotesca 800 condensada, botón de acción turquesa para copiar e iconos sociales SVG de trazo.

## Do's and Don'ts

### Do:
- **Do** reservar el turquesa del logo para acciones: botones, cursor «Ver», hover de controles, selección.
- **Do** asignar a cada disciplina su única tinta mediante `--field` (ink-ilustracion, ink-editorial, ink-packaging, ink-identidad, ink-3d).
- **Do** usar el bermellón de texto, y no el bermellón de fondo, cuando el bermellón sea texto sobre cartoncillo.
- **Do** enmarcar etiquetas con borde de 3px en tinta negra y filete interior de 1.5px, con esquinas rectas.
- **Do** numerar en DM Mono mayúsculas con cifras tabulares (Nº 0X, s/n).
- **Do** separar pasajes con cenefas ornamentales, sustituyendo el adorno provisional por los recortes de Cecilia cuando lleguen.
- **Do** etiquetar el contexto de cada proyecto con honestidad (académico, concurso, propuesta no encargada) en la cara de la caja.

### Don't:
- **Don't** usar el turquesa como fondo de sección, tinta de disciplina o decoración.
- **Don't** pintar el bloque de contacto con una tinta de disciplina; es la banda de rascador.
- **Don't** redondear esquinas de contenedores ni girar elementos fuera de 0/90°.
- **Don't** destacar una caja con sombra o elevación; se destaca sacando el cajón y apagando a las demás.
- **Don't** poner titulares de Bodoni Moda en redonda ni en un peso distinto de 600.
- **Don't** tratar el adorno SVG actual como motivo definitivo de la marca.

# Cecilia Pelayo · Diseño gráfico

Portfolio de una sola página de Cecilia Pelayo (CECE), diseñadora gráfica e ilustradora. Concepto: un expositor de coleccionista en el que cada proyecto es una caja de cerillas de una serie numerada.

🌐 **[Ver la web](https://portfolioweb-roan-two.vercel.app/)**

## Características

- Una sola página, sin secciones de navegación: expositor de proyectos, obra personal («Fuera de serie»), servicios y contacto.
- Bilingüe ES/EN en la misma página: detecta el idioma del navegador y recuerda la elección.
- Galería por proyecto: al pulsar una caja se desliza el cajón y se abre la galería con ficha (año, rol, herramientas, contexto).
- Accesible con teclado y respeta «movimiento reducido».
- Imágenes optimizadas en WebP (`img/web/`); los originales en alta se conservan en `img/`.

## Tecnología

HTML, CSS y JavaScript sin dependencias ni proceso de build. Tipografías de Google Fonts (Bodoni Moda, Bricolage Grotesque, DM Mono). Desplegado en Vercel.

## Estructura

```
index.html        Página única
css/style.css     Estilos (tokens de color al inicio)
JS/i18n.js        Todos los textos ES/EN, incluidas las fichas de proyecto
JS/javascript.js  Idioma, galería del cajón, copiar email, efectos
img/web/          Imágenes optimizadas que usa la web
img/              Originales en alta (no se sirven)
```

## Editar contenido

- **Textos:** en `JS/i18n.js`. Cada clave existe en `es` y en `en`.
- **Añadir un proyecto:** duplicar un `<button class="box">` en `index.html` con su `data-project` e imágenes, añadir su ficha en `projects` de ambos idiomas en `JS/i18n.js` y colocarlo en la rejilla de `.board` en `css/style.css`.
- **Cenefas:** usan un adorno provisional (`--ornament` en `css/style.css`); se sustituirán por motivos recortados de las ilustraciones.

## Desarrollo local

```bash
python3 -m http.server 5173
```

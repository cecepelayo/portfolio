#!/bin/sh
# Genera los PDF del portfolio (ES y EN) a partir de print/portfolio.html.
# Uso: sh print/build.sh   (desde cualquier carpeta; necesita macOS, Google Chrome y python3)
#
# 1. Construye la maqueta con los webp de la web y lee el tamaño de cada marco de foto.
# 2. prepare_images.py prepara cada foto desde su original en source-images/ (print/img/).
# 3. Construye la maqueta con esas fotos (?img=print) e imprime un PDF por idioma.
set -eu

ROOT=$(cd "$(dirname "$0")/.." && pwd)
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=5199
# Resolución y calidad JPEG de las fotos: ajustadas para que cada PDF pese menos de 8 MB
PPI=${PPI:-140}
QUALITY=${QUALITY:-72}
# Límite de los portales de empleo, en MB decimales (como lo cuentan la mayoría)
MAX_BYTES=8000000

if [ ! -x "$CHROME" ]; then
  echo "No se encuentra Google Chrome en $CHROME" >&2
  exit 1
fi
if ! command -v sips >/dev/null 2>&1; then
  echo "Falta sips (viene con macOS): hace falta para preparar las fotos" >&2
  exit 1
fi

# Si el puerto ya responde, Chrome imprimiría otra cosa: mejor parar
if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$PORT/"; then
  echo "El puerto $PORT ya está en uso; libéralo o cambia PORT en este script" >&2
  exit 1
fi

# Servidor local temporal: la maqueta lee index.html con fetch y no funciona abierta como archivo
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT" >/dev/null 2>&1 &
SERVER=$!
PROFILE=$(mktemp -d)
cleanup() {
  kill "$SERVER" 2>/dev/null || true
  rm -rf "${PROFILE:?}"
}
trap cleanup EXIT

# Espera a que el servidor sirva la maqueta (hasta 10 s)
TRIES=0
until curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$PORT/print/portfolio.html"; do
  TRIES=$((TRIES + 1))
  if [ "$TRIES" -ge 20 ]; then
    echo "El servidor local no arranca en el puerto $PORT" >&2
    exit 1
  fi
  sleep 0.5
done

# Construye la maqueta en Chrome sin ventana, guarda el DOM resultante en $2 y comprueba
# que print.js terminó sin problemas (marca data-ready). El presupuesto de tiempo virtual deja
# que carguen fuentes, index.html e imágenes. La ventana mide lo que la página del PDF para que
# style.css aplique las mismas media queries y unidades vw que al imprimir
render_dom() {
  "$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
    --user-data-dir="$PROFILE" --window-size=1600,900 --virtual-time-budget=30000 --dump-dom "$1" 2>/dev/null > "$2"
  if ! grep -q 'data-ready="true"' "$2"; then
    echo "La maqueta no se ha construido bien ($1); no se imprime." >&2
    grep -o 'data-problems="[^"]*"' "$2" >&2 || echo "Ábrela en el navegador y mira la consola: $1" >&2
    exit 1
  fi
}

BASE="http://127.0.0.1:$PORT/print/portfolio.html"

# 1-2 · Marcos medidos con los webp de la web y fotos preparadas desde los originales.
# Los marcos son iguales en los dos idiomas: basta con medir una vez
render_dom "$BASE?lang=es" "$PROFILE/measure.html"
echo "Preparando fotos a $PPI ppp, calidad JPEG $QUALITY…"
python3 -I "$ROOT/print/prepare_images.py" "$ROOT" "$PROFILE/measure.html" "$ROOT/print/img" "$PPI" "$QUALITY"

# 3 · Un PDF por idioma
for LANG_CODE in es en; do
  OUT="$ROOT/print/cecilia-pelayo-portfolio-$LANG_CODE.pdf"
  RAW="$PROFILE/raw-$LANG_CODE.pdf"
  URL="$BASE?lang=$LANG_CODE&img=print"
  render_dom "$URL" "$PROFILE/dom-$LANG_CODE.html"
  "$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
    --user-data-dir="$PROFILE" --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw --virtual-time-budget=30000 \
    --print-to-pdf="$RAW" "$URL" 2>/dev/null
  # Sin Ghostscript: Chrome incrusta las fotos JPEG tal cual (una sola compresión) y el resto de
  # imágenes ya va reducido a su tamaño. Pasarlo por gs volvería a comprimir los JPEG
  cp "$RAW" "$OUT"
  SIZE_BYTES=$(wc -c < "$OUT" | tr -d ' ')
  echo "Generado: $OUT ($(awk -v b="$SIZE_BYTES" 'BEGIN { printf "%.1f MB", b / 1000000 }'))"
  if [ "$SIZE_BYTES" -ge "$MAX_BYTES" ]; then
    echo "Aviso: pesa más de 8 MB; baja PPI o QUALITY (p. ej. QUALITY=68 sh print/build.sh)" >&2
  fi
done

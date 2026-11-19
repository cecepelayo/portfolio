"""Prepara las imágenes del portfolio en PDF a partir de sus originales.

Lee la lista que anota print.js (<html data-shots>: ruta del webp de la web, tipo, tamaño en px CSS
y punto de enfoque) y, para cada imagen, busca el original en source-images/ (mismo nombre, en PNG o
JPG; si no lo hay, usa el webp de la web) y lo guarda en print/img/. Las «deco» parten siempre
del webp de la web (ver prepare_deco):
· fotos de proyecto («shot»): reducidas a la resolución de impresión, recortadas a la proporción
  exacta de su marco y en JPEG. Así cada foto se comprime una sola vez (Chrome incrusta el JPEG tal
  cual) y el PDF no lleva píxeles que luego quedan fuera del marco;
· el resto («deco»: motivos, logo, retrato): PNG con transparencia, reducido a su tamaño en página.

Uso: python3 -I prepare_images.py <raíz del repo> <dom.html> <carpeta de salida> <ppp> <calidad JPEG>
Solo usa la biblioteca estándar y sips (macOS), que también aplana la transparencia sobre blanco.
"""
import html
import json
import math
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

CSS_PPI = 96  # Chrome imprime 96 px CSS por pulgada
DECO_PPI = 200  # motivos y logo son dibujo de línea: algo más de resolución que las fotos, pesan poco
SOURCE_EXTENSIONS = ('.png', '.jpg', '.jpeg')


def fail(message):
    print('prepare_images: ' + message, file=sys.stderr)
    sys.exit(1)


def run_sips(args):
    result = subprocess.run(['sips', *args], capture_output=True, text=True)
    if result.returncode != 0:
        fail('sips ha fallado (' + ' '.join(args) + '): ' + result.stderr.strip())
    return result.stdout


def image_size(path):
    out = run_sips(['-g', 'pixelWidth', '-g', 'pixelHeight', str(path)])
    width = re.search(r'pixelWidth:\s*(\d+)', out)
    height = re.search(r'pixelHeight:\s*(\d+)', out)
    if not width or not height:
        fail('no se puede leer el tamaño de ' + str(path))
    return int(width.group(1)), int(height.group(1))


def find_source(root, web_path):
    """Original en source-images/ con el mismo nombre que el webp de la web; si no hay, el webp."""
    relative = Path(web_path).relative_to('assets/img')
    for ext in SOURCE_EXTENSIONS:
        candidate = root / 'source-images' / relative.with_suffix(ext)
        if candidate.is_file():
            return candidate
    fallback = root / web_path
    if not fallback.is_file():
        fail('no existe la imagen ' + web_path)
    print('Aviso: sin original para ' + web_path + '; se usa el webp de la web', file=sys.stderr)
    return fallback


def read_shots(dom_path):
    match = re.search(r'data-shots="([^"]*)"', Path(dom_path).read_text(encoding='utf-8'))
    if not match:
        fail('la maqueta no ha anotado data-shots')
    shots = json.loads(html.unescape(match.group(1)))
    if not shots:
        fail('data-shots está vacío')
    return shots


def prepare_deco(root, shot, out_dir, tmp):
    """Motivos, logo y retrato: PNG con su transparencia, reducido a su tamaño en página.
    Parte del webp de la web y no del original: los originales de los motivos tienen otro lienzo
    (sin recortar) y saldrían con otro tamaño en la cenefa."""
    source = root / shot['web']
    if not source.is_file():
        fail('no existe la imagen ' + shot['web'])
    src_w, src_h = image_size(source)
    out = out_dir / Path(shot['web']).relative_to('assets/img').with_suffix('.png')
    out.parent.mkdir(parents=True, exist_ok=True)
    if shot['w'] and shot['h']:
        target_w = math.ceil(shot['w'] * DECO_PPI / CSS_PPI)
        target_h = math.ceil(shot['h'] * DECO_PPI / CSS_PPI)
        scale = min(1.0, max(target_w / src_w, target_h / src_h))
    else:
        scale = 1.0  # no se pinta (oculta): se copia sin reducir para que la maqueta la encuentre
    resized_w, resized_h = max(1, round(src_w * scale)), max(1, round(src_h * scale))
    run_sips(['-s', 'format', 'png', '-z', str(resized_h), str(resized_w), str(source), '--out', str(out)])
    print(f"{shot['web']}: {resized_w}x{resized_h} (PNG)")


def prepare(root, shot, out_dir, ppi, quality, tmp):
    if shot['kind'] == 'deco':
        return prepare_deco(root, shot, out_dir, tmp)
    if not shot['w'] or not shot['h']:
        fail('el marco de ' + shot['web'] + ' no tiene tamaño')
    source = find_source(root, shot['web'])
    src_w, src_h = image_size(source)
    target_w = math.ceil(shot['w'] * ppi / CSS_PPI)
    target_h = math.ceil(shot['h'] * ppi / CSS_PPI)
    contain = shot['fit'] == 'contain'
    # Escala para que la imagen cubra el marco (o, con contain, quepa entera) a la resolución
    # pedida; nunca se amplía
    fit_scale = min(target_w / src_w, target_h / src_h) if contain else max(target_w / src_w, target_h / src_h)
    scale = min(1.0, fit_scale)
    resized_w, resized_h = max(1, round(src_w * scale)), max(1, round(src_h * scale))

    out = out_dir / Path(shot['web']).relative_to('assets/img').with_suffix('.jpg')
    out.parent.mkdir(parents=True, exist_ok=True)
    # Pasos intermedios sin pérdida (PNG); la única compresión con pérdida es la del JPEG final
    step = tmp / 'step.png'
    run_sips(['-s', 'format', 'png', '-z', str(resized_h), str(resized_w), str(source), '--out', str(step)])
    if contain:
        crop_w, crop_h = resized_w, resized_h
        shown_w = min(shot['w'], shot['h'] * src_w / src_h)  # ancho con que se pinta entera
    else:
        # Mayor recorte con la proporción del marco que cabe en la imagen reducida
        aspect = shot['w'] / shot['h']
        if resized_w / resized_h > aspect:
            crop_h, crop_w = resized_h, min(resized_w, round(resized_h * aspect))
        else:
            crop_w, crop_h = resized_w, min(resized_h, round(resized_w / aspect))
        offset_x = round((resized_w - crop_w) * shot['fx'] / 100)
        offset_y = round((resized_h - crop_h) * shot['fy'] / 100)
        run_sips(['-c', str(crop_h), str(crop_w), '--cropOffset', str(offset_y), str(offset_x), str(step), '--out', str(step)])
        shown_w = shot['w']
    run_sips(['-s', 'format', 'jpeg', '-s', 'formatOptions', str(quality), str(step), '--out', str(out)])
    effective_ppi = round(crop_w / shown_w * CSS_PPI)
    note = '' if effective_ppi >= ppi * 0.9 else '  (original pequeño: ' + str(effective_ppi) + ' ppp)'
    print(f"{shot['web']}: {crop_w}x{crop_h}{note}")


def main():
    if len(sys.argv) != 6:
        fail('uso: prepare_images.py <raíz> <dom.html> <salida> <ppp> <calidad>')
    root, dom_path, out_dir = Path(sys.argv[1]), sys.argv[2], Path(sys.argv[3])
    ppi, quality = int(sys.argv[4]), int(sys.argv[5])
    shots = read_shots(dom_path)
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)
    with tempfile.TemporaryDirectory() as tmp:
        for shot in shots:
            prepare(root, shot, out_dir, ppi, quality, Path(tmp))


if __name__ == '__main__':
    main()

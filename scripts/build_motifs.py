# Recorta cada motivo al contorno (canal alfa) y genera su WebP para la web.
# Uso: python3 -I build_motifs.py <source-images/motifs> <assets/img/motifs> <tmp>
import base64, os, re, subprocess, sys

SRC, OUT, TMP = sys.argv[1:4]
TARGET_H = 160      # 80px en pantalla a 2x
ALPHA_MIN = 24      # ignora halos casi transparentes
PAD = 2

def run(*args):
    res = subprocess.run(args, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if res.returncode:
        sys.exit(f'Error al ejecutar {args[0]} sobre {args[1]}: {res.stderr.strip()}')

def read_pam(path):
    data = open(path, 'rb').read()
    end = data.index(b'ENDHDR\n') + 7
    head = dict(l.split(b' ', 1) for l in data[:end].split(b'\n')[1:-2])
    w, h = int(head[b'WIDTH']), int(head[b'HEIGHT'])
    assert int(head[b'DEPTH']) == 4, path
    return w, h, bytearray(data[end:])

def decode_webp(path):
    pam = path + '.pam'
    run('dwebp', path, '-pam', '-o', pam)
    return read_pam(pam)

def layers(name, path):
    if path.endswith('.png'):
        tmp = os.path.join(TMP, name + '.src.webp')
        run('cwebp', '-lossless', '-exact', path, '-o', tmp)
        return [decode_webp(tmp)]
    svg = open(path).read()
    # Solo se admiten capas que ocupan todo el lienzo: no se interpretan x, y ni transformaciones
    if re.search(r'<image[^>]*\s(x|y|transform)=', svg):
        sys.exit(f'{path}: hay capas desplazadas o transformadas; expórtalo como PNG')
    out = []
    for i, b64 in enumerate(re.findall(r'base64,([A-Za-z0-9+/=]+)', svg)):
        tmp = os.path.join(TMP, f'{name}.layer{i}.webp')
        open(tmp, 'wb').write(base64.b64decode(b64))
        out.append(decode_webp(tmp))
    if not out:
        sys.exit(f'{path}: no contiene ninguna imagen incrustada')
    if len({(w, h) for w, h, _ in out}) > 1:
        sys.exit(f'{path}: las capas tienen tamaños distintos; expórtalo como PNG')
    return out

def over(base, top):
    # Composición «source over» de dos capas RGBA del mismo tamaño
    w, h, b = base
    _, _, t = top
    for i in range(0, len(b), 4):
        ta = t[i + 3]
        if ta == 0:
            continue
        ba = b[i + 3]
        oa = ta + ba * (255 - ta) // 255
        for c in range(3):
            b[i + c] = (t[i + c] * ta + b[i + c] * ba * (255 - ta) // 255) // oa
        b[i + 3] = oa
    return w, h, b

SPECK_MAX = 0.0005  # grupos con menos del 0,05 % de los píxeles son motas sueltas

def span(counts):
    # Tramos contiguos con contenido; se descartan los que son motas
    runs, start = [], None
    for i, v in enumerate(counts + [0]):
        if v and start is None:
            start = i
        elif not v and start is not None:
            runs.append((start, i - 1, sum(counts[start:i])))
            start = None
    if not runs:
        return None
    total = sum(r[2] for r in runs)
    kept = [r for r in runs if r[2] >= total * SPECK_MAX]
    return kept[0][0], kept[-1][1]

def bbox(w, h, px):
    cols, rows = [0] * w, [0] * h
    for y in range(h):
        for x in range(w):
            if px[(y * w + x) * 4 + 3] >= ALPHA_MIN:
                cols[x] += 1
                rows[y] += 1
    if span(cols) is None:
        return None
    x0, x1 = span(cols)
    y0, y1 = span(rows)
    return max(0, x0 - PAD), max(0, y0 - PAD), min(w - 1, x1 + PAD), min(h - 1, y1 + PAD)

for f in sorted(os.listdir(SRC)):
    name, ext = os.path.splitext(f)
    if ext not in ('.png', '.svg'):
        continue
    ls = layers(name, os.path.join(SRC, f))
    img = ls[0]
    for top in ls[1:]:
        img = over(img, top)
    w, h, px = img
    box = bbox(w, h, px)
    if box is None:
        sys.exit(f'{f}: la imagen está vacía (sin píxeles visibles)')
    x0, y0, x1, y1 = box
    cw, ch = x1 - x0 + 1, y1 - y0 + 1
    crop = bytearray()
    for y in range(y0, y1 + 1):
        crop += px[(y * w + x0) * 4:(y * w + x1 + 1) * 4]
    pam = os.path.join(TMP, name + '.crop.pam')
    with open(pam, 'wb') as fh:
        fh.write(f'P7\nWIDTH {cw}\nHEIGHT {ch}\nDEPTH 4\nMAXVAL 255\nTUPLTYPE RGB_ALPHA\nENDHDR\n'.encode())
        fh.write(crop)
    out = os.path.join(OUT, name + '.webp')
    run('cwebp', '-q', '85', '-alpha_q', '100', '-resize', '0', str(min(TARGET_H, ch)), pam, '-o', out)
    print(f'{name}: capas={len(ls)} lienzo={w}x{h} recorte={cw}x{ch}@{x0},{y0} -> {os.path.getsize(out)} B')

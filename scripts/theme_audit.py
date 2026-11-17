"""Contrast audit for theme tokens. Importable: parse(), PAIRS, contrast(), audit()."""
import re, pathlib, colorsys
ROOT = pathlib.Path(__file__).resolve().parent.parent

NAMED = {"black": "#000000", "white": "#ffffff"}
def rgb(v):
    v = v.strip().lower(); v = NAMED.get(v, v)
    m = re.fullmatch(r"#([0-9a-f]{3})", v)
    if m: return tuple(int(c * 2, 16) for c in m.group(1))
    m = re.fullmatch(r"#([0-9a-f]{6})", v)
    if m: h = m.group(1); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    m = re.fullmatch(r"rgba?\(([^)]+)\)", v)
    if m: return tuple(min(255, max(0, int(float(x)))) for x in re.split(r"[,\s/]+", m.group(1).strip())[:3])
    return None
def colors_in(v):
    """every color a value can paint with (a gradient has several)"""
    found = re.findall(r"#[0-9a-fA-F]{3,6}\b|rgba?\([^)]+\)|\b(?:black|white)\b", v)
    return [c for c in (rgb(x) for x in found) if c]
def lum(c):
    f = lambda x: (x / 255 / 12.92) if x / 255 <= 0.03928 else ((x / 255 + 0.055) / 1.055) ** 2.4
    r, g, b = (f(x) for x in c); return 0.2126 * r + 0.7152 * g + 0.0722 * b
def contrast(a, b):
    la, lb = lum(a), lum(b); return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)
def hexs(c): return "#%02x%02x%02x" % c

def block(css, selector):
    m = re.search(re.escape(selector) + r"\s*\{([^}]*)\}", css)
    return dict(re.findall(r"--([a-z0-9-]+):\s*([^;]+);", m.group(1))) if m else {}
def parse():
    base = (ROOT / "src/styles/react95.css").read_text()
    light = block(base, ":root"); dark = {**light, **block(base, ".dark")}
    themes = {"default (light)": light, "default (dark)": dark}
    css = (ROOT / "src/styles/themes.css").read_text()
    for name, body in re.findall(r'\[data-r95-theme="([^"]+)"\]\s*\{([^}]*)\}', css):
        themes[name] = {**light, **dict(re.findall(r"--([a-z0-9-]+):\s*([^;]+);", body))}
    return themes

def pairs():
    """the same rules the generator repairs with, flattened to (fg, bg, minimum, what, direction)"""
    from importlib import import_module
    rules = import_module("gen-css").RULES
    out = [(k, b, need, what, (rest[0] if rest else None)) for k, bgs, need, what, *rest in rules for b in bgs]
    return out + [("danger", "material", 4.5, "form error text", None), ("danger-foreground", "danger", 4.5, "destructive badge text", None),
                  ("progress-foreground", "progress", 4.5, "text on the progress fill", None),
                  ("desktop-foreground", "desktop-background", 4.5, "text on the desktop", None), ("material-text", "material-hatch", 3.0, "label on a pressed button", None)]
PAIRS = None

def audit(themes=None):
    themes = themes or parse(); out = []
    global PAIRS
    PAIRS = PAIRS or pairs()
    for name, t in themes.items():
        from importlib import import_module
        reachable = import_module("gen-css").reachable
        for fg, bg, need, where, direction in PAIRS:
            f, bs = colors_in(t.get(fg, "")), colors_in(t["material"] if t.get(bg, "").strip() == "transparent" else t.get(bg, ""))
            if not f or not bs: out.append((name, fg, bg, 0, need, where + " (unparsed value)")); continue
            if "gradient" in t.get(fg, ""): continue
            # first gradient stop carries the full requirement; later stops only need 3:1
            for i, b in enumerate(bs):
                want = reachable(b, need if i == 0 else min(need, 3.0), direction)
                got = contrast(f[0], b)
                if got < want - 0.01: out.append((name, fg, bg, round(got, 2), round(want, 2), where)); break
    return out

if __name__ == "__main__":
    import collections, sys
    th = parse(); res = audit(th)
    print(len(th), "themes |", len(res), "failing pairs in", len({r[0] for r in res}), "themes")
    by = collections.Counter((r[1], r[2]) for r in res)
    for (fg, bg), n in by.most_common(): print(f"  {n:3d}  {fg} on {bg}")
    if "-v" in sys.argv:
        for r in res: print(r)
    sys.exit(1 if res else 0)

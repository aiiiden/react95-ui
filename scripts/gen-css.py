"""Generate src/styles/themes.css.
themes.css is parsed (not executed) from the react95 npm package theme files."""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
# fonts.css is maintained by hand (font faces adapted from catarchy); this script only builds themes.
src = pathlib.Path(sys.argv[1])
def kebab(s): return re.sub(r"([A-Z])", lambda m: "-"+m.group(1).lower(), s)
names = {"desktopBackground": "desktop-background"}
blocks, listing = [], []
for f in sorted(src.glob("*.js")):
  if f.stem == "index": continue
  txt = f.read_text()
  pairs = re.findall(r'^\s*([A-Za-z]+):\s*"([^"]*)"', txt, re.M)
  d = dict(pairs)
  if "material" not in d: continue
  name = d.pop("name", f.stem)
  decl = "\n".join(f"  --{kebab(k)}: {v};" for k, v in d.items())
  blocks.append(f'[data-r95-theme="{f.stem}"] {{\n{decl}\n}}')
  listing.append(f.stem)
hdr = "/* 59 themes ported from React95 (MIT). Apply with <html data-r95-theme=\"name\">. */\n"
(root/"src/styles/themes.css").write_text(hdr + "\n\n".join(blocks) + "\n")
(root/"src/showcase/theme-list.ts").write_text("export const themeNames = " + repr(listing).replace("'", '"') + " as const\n")
print(len(listing), "themes")

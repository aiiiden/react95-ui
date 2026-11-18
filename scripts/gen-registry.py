"""Build registry.json (Radix UI) and registry-base.json (Base UI) by reading each file's imports.

Every component exists once in src/components/ui. The ones that depend on Radix have a second
version in src/components/ui-base; the Base UI registry serves that version when there is one
and the shared file otherwise."""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
# Items point at each other by full URL. That resolves the same way however an item is
# installed: by URL, by GitHub address (aiiiden/react95-ui/button) or through a namespace.
SITE = "https://aiiiden.github.io/react95-ui"
ui, ui_base = root / "src/components/ui", root / "src/components/ui-base"

def build(name, base_url, pick, note):
  dep = lambda item: f"{base_url}/{item}.json"
  items = [{
    "name": "utils",
    "type": "registry:lib",
    "title": "cn() helper",
    "dependencies": ["clsx", "tailwind-merge"],
    "files": [{"path": "src/lib/utils.ts", "type": "registry:lib"}],
  }, {
    "name": "theme",
    # registry:item, not registry:style: the CLI treats a style as a replacement for the whole
    # project setup and warns that existing CSS variables and components will be overwritten
    "type": "registry:item",
    "title": "React95 theme",
    "description": "Tokens, bevel utilities, pixel type utilities and 59 React95 themes for Tailwind v4. Fonts are not included: see the README for the recommended pixel fonts.",
    "files": [
      {"path": "src/styles/react95.css", "type": "registry:file", "target": "src/styles/react95.css"},
      {"path": "src/styles/themes.css", "type": "registry:file", "target": "src/styles/themes.css"},
    ],
  }]
  for shared in sorted(ui.glob("*.tsx")):
    f = pick(shared)
    src = f.read_text()
    # every third-party import becomes an npm dependency of the item
    deps = []
    for mod in re.findall(r'from "([^"./@][^"]*|@[^"/]+/[^"]+)"', src):
      pkg = "/".join(mod.split("/")[:2]) if mod.startswith("@") else mod.split("/")[0]
      if pkg not in ("react", "react-dom") and not mod.startswith("@/") and pkg not in deps: deps.append(pkg)
    reg = [dep("utils")] if "@/lib/utils" in src else []
    # siblings are imported as ./x, or as @/components/ui/x from a ui-base file
    reg += [dep(m) for m in re.findall(r'from "(?:\./|@/components/ui/)([a-z-]+)"', src)]
    if f.stem != "icons": reg.append(dep("theme"))
    items.append({
      "name": f.stem,
      "type": "registry:ui",
      "title": f.stem.replace("-", " ").title(),
      "dependencies": deps,
      "registryDependencies": sorted(set(reg)),
      "files": [{"path": str(f.relative_to(root)), "type": "registry:ui"}],
    })
  reg = {"$schema": "https://ui.shadcn.com/schema/registry.json", "name": "react95-ui", "homepage": f"{SITE}/", "items": items}
  (root / name).write_text(json.dumps(reg, indent=2, ensure_ascii=False) + "\n")
  print(name, len(items) - 2, "ui items,", note(items))

build("registry.json", f"{SITE}/r", lambda f: f, lambda items: "Radix UI")
base_version = lambda f: ui_base / f.name if (ui_base / f.name).exists() else f
build("registry-base.json", f"{SITE}/r/base", base_version,
      lambda items: f"{sum('ui-base' in i['files'][0]['path'] for i in items)} of them Base UI versions")
stray = [f.name for f in ui_base.glob("*.tsx") if not (ui / f.name).exists()]
assert not stray, f"ui-base files without a Radix counterpart: {stray}"

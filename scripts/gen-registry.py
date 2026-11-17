"""Build registry.json from src/components/ui by reading each file's imports."""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
ui = root / "src/components/ui"
items = [{
  "name": "utils",
  "type": "registry:lib",
  "title": "cn() helper",
  "dependencies": ["clsx", "tailwind-merge"],
  "files": [{"path": "src/lib/utils.ts", "type": "registry:lib"}],
}, {
  "name": "theme",
  "type": "registry:style",
  "title": "React95 theme",
  "description": "Tokens, bevel utilities, pixel type utilities and 59 React95 themes for Tailwind v4. Fonts are not included: see the README for the recommended pixel fonts.",
  "files": [
    {"path": "src/styles/react95.css", "type": "registry:file", "target": "src/styles/react95.css"},
    {"path": "src/styles/themes.css", "type": "registry:file", "target": "src/styles/themes.css"},
  ],
}]
for f in sorted(ui.glob("*.tsx")):
  src = f.read_text()
  # every third-party import becomes an npm dependency of the item
  deps = []
  for mod in re.findall(r'from "([^"./@][^"]*|@[^"/]+/[^"]+)"', src):
    pkg = "/".join(mod.split("/")[:2]) if mod.startswith("@") else mod.split("/")[0]
    if pkg not in ("react", "react-dom") and not mod.startswith("@/") and pkg not in deps: deps.append(pkg)
  reg = ["@react95/utils"] if "@/lib/utils" in src else []
  reg += [f"@react95/{m}" for m in re.findall(r'from "\./([a-z-]+)"', src)]
  if f.stem != "icons": reg.append("@react95/theme")
  items.append({
    "name": f.stem,
    "type": "registry:ui",
    "title": f.stem.replace("-", " ").title(),
    "dependencies": deps,
    "registryDependencies": sorted(set(reg)),
    "files": [{"path": f"src/components/ui/{f.name}", "type": "registry:ui"}],
  })
reg = {"$schema": "https://ui.shadcn.com/schema/registry.json", "name": "react95", "homepage": "https://aiiiden.github.io/react95-ui/", "items": items}
(root / "registry.json").write_text(json.dumps(reg, indent=2, ensure_ascii=False) + "\n")
print(len(items) - 2, "ui items")

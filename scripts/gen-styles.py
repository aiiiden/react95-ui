"""Publish the registry under every shadcn style name.

A namespace URL may contain {style}; the CLI fills it with the "style" from the project's
components.json (base-nova, radix-vega, ...; a legacy "new-york" is sent as new-york-v4).
With <site>/r/{style}/{name}.json a project therefore gets the
Base UI version when it was set up on Base UI and the Radix UI version otherwise.

GitHub Pages cannot route, so each style gets a folder of copies. The copies keep pointing at
the canonical /r/ and /r/base/ URLs for their dependencies.
A style that shadcn adds later is missing here until it is added to STYLES."""
import pathlib, shutil
root = pathlib.Path(__file__).resolve().parent.parent
out = root / "public/r"
# apps/v4/registry/styles.tsx and bases.ts in shadcn-ui/ui
STYLES = ["vega", "nova", "maia", "lyra", "mira", "luma", "sera", "rhea"]
radix = [f for f in out.glob("*.json")]
base = [f for f in (out / "base").glob("*.json")]
assert radix and base, "run shadcn build first"
targets = {f"base-{s}": base for s in STYLES}
# React Aria projects get the Radix version: the components install radix-ui themselves
targets |= {f"{lib}-{s}": radix for lib in ("radix", "aria") for s in STYLES}
targets |= {legacy: radix for legacy in ("new-york-v4", "new-york", "default")}
for name, files in targets.items():
  d = out / name
  shutil.rmtree(d, ignore_errors=True); d.mkdir()
  for f in files: shutil.copy(f, d / f.name)
print(len(targets), "style folders")

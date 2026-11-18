import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import fs from "node:fs"
import path from "node:path"

const dir = import.meta.dirname
/* R95_LIB=base builds the showcase on the Base UI components: every import that lands on
 * src/components/ui/x.tsx is sent to src/components/ui-base/x.tsx when that file exists.
 * It mirrors what a project gets when it installs from the Base UI registry. */
const useBase = process.env.R95_LIB === "base"

function baseUiComponents(): Plugin {
  const ui = path.resolve(dir, "src/components/ui")
  const alt = path.resolve(dir, "src/components/ui-base")
  return {
    name: "r95-base-ui",
    enforce: "pre",
    async resolveId(source, importer, options) {
      const found = await this.resolve(source, importer, { ...options, skipSelf: true })
      if (!found || path.dirname(found.id) !== ui) return null
      const swapped = path.join(alt, path.basename(found.id))
      return fs.existsSync(swapped) ? swapped : null
    },
  }
}

export default defineConfig({
  base: "./",
  plugins: [...(useBase ? [baseUiComponents()] : []), react(), tailwindcss(), viteSingleFile()],
  define: { __R95_BASE__: JSON.stringify(useBase) },
  resolve: { alias: { "@": path.resolve(dir, "./src") } },
  ...(useBase && { publicDir: false, build: { outDir: "dist/base" } }),
})

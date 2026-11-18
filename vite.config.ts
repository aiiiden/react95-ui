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

/* Every <Spec name="…"> in the showcase gets a `code` prop holding its own source, so the
 * examples on the page are the code that is actually running and cannot go stale.
 * The showcase helpers that hide the Radix / Base UI differences (slot, one, mixed) are
 * written back out as the real props of the library being built. */
function specCode(): Plugin {
  const balanced = (src: string, open: number) => {
    // index just past the bracket that closes the one at `open`
    const pairs: Record<string, string> = { "(": ")", "{": "}", "[": "]" }
    const stack: string[] = []
    for (let i = open; i < src.length; i++) {
      const c = src[i]
      if (c === '"' || c === "'" || c === "`") { i = src.indexOf(c, i + 1); continue }
      if (pairs[c]) stack.push(pairs[c])
      else if (c === stack[stack.length - 1]) { stack.pop(); if (!stack.length) return i + 1 }
    }
    return -1
  }
  const guard = (fn: string, base: boolean) => {
    const arrow = fn.match(/^\((\w+)\) => (.*)$/)
    const [arg, body] = arrow ? [arrow[1], arrow[2]] : ["v", `${fn}(v)`]
    return `onValueChange={(${base ? `[${arg}]` : arg}) => ${arg} && ${body}}`
  }
  const clean = (code: string) => {
    // <Trigger {...slot(<Button />)} />
    for (let m; (m = /<(\w+) \{\.\.\.slot\(/.exec(code)); ) {
      const start = m.index + m[0].length - 1
      const end = balanced(code, start)
      const el = code.slice(start + 1, end - 1)
      const after = code.indexOf("/>", end) + 2
      code = code.slice(0, m.index) + (useBase ? `<${m[1]} render={${el}} />` : `<${m[1]} asChild>${el}</${m[1]}>`) + code.slice(after)
    }
    code = code.replace(/\{\.\.\.one\(\{ (.*?) \}\)\}/g, (_, body: string) =>
      [
        ...(useBase ? [] : ['type="single"']),
        ...body.split(/, (?=\w+: )/).map((pair) => {
          const [key, value] = [pair.slice(0, pair.indexOf(":")), pair.slice(pair.indexOf(":") + 2)]
          if (key === "onValueChange") return guard(value, useBase)
          return useBase ? `${key}={[${value}]}` : value.startsWith('"') ? `${key}=${value}` : `${key}={${value}}`
        }),
      ].join(" ")
    )
    code = code.replace(/ \{\.\.\.mixed\}/g, useBase ? " indeterminate" : ' checked="indeterminate"')
    code = code.replace(/ \{\.\.\.\(!isBase && \{ collapsible: true \}\)\}/g, useBase ? "" : " collapsible")
    const lines = code.replace(/^\n+|\s+$/g, "").split("\n")
    const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length))
    return lines.map((l) => l.slice(indent)).join("\n")
  }
  return {
    name: "r95-spec-code",
    enforce: "pre",
    transform(src, id) {
      if (!/src\/showcase\/[^/]+\.tsx$/.test(id) || !src.includes("<Spec ")) return null
      // what each imported name comes from, to head every example with its imports
      const origin = new Map<string, string>()
      for (const m of src.matchAll(/import \{([^}]+)\} from "([^"]+)"/g))
        if (!m[2].startsWith("./"))
          for (const part of m[1].split(",")) {
            const name = part.replace(/^\s*type\s+/, "").trim()
            if (name) origin.set(name, m[2])
          }
      let out = ""
      let at = 0
      for (const m of src.matchAll(/<Spec name="[^"]*"/g)) {
        const open = src.indexOf(">", m.index + m[0].length) + 1
        const close = src.indexOf("</Spec>", open)
        const code = clean(src.slice(open, close))
        const used = new Map<string, string[]>()
        for (const [name, mod] of origin) if (new RegExp(`(?<![\\w.])${name}\\b`).test(code)) used.set(mod, [...(used.get(mod) ?? []), name])
        const imports = [...used].map(([mod, names]) => `import { ${names.join(", ")} } from "${mod}"`).join("\n")
        out += src.slice(at, m.index + m[0].length) + ` code={${JSON.stringify(imports ? imports + "\n\n" + code : code)}}`
        at = m.index + m[0].length
      }
      return { code: out + src.slice(at), map: null }
    },
  }
}

export default defineConfig({
  base: "./",
  plugins: [specCode(), ...(useBase ? [baseUiComponents()] : []), react(), tailwindcss(), viteSingleFile()],
  define: { __R95_BASE__: JSON.stringify(useBase) },
  resolve: { alias: { "@": path.resolve(dir, "./src") } },
  ...(useBase && { publicDir: false, build: { outDir: "dist/base" } }),
})

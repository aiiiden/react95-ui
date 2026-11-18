import * as React from "react"

/* A small JSX highlighter for the Code panels: enough for import lines and markup, no dependency.
 *
 * Colors come from the theme's chart palette (the 16-color VGA hues every theme already has).
 * A fixed set of syntax colors cannot be readable on 61 different canvases, so each hue is
 * mixed toward the text color only as far as it takes to reach 4.5:1 against the canvas.
 * Colorful themes keep colorful code; a monochrome theme gets monochrome code. */
const HUES = [1, 2, 3, 5]
const MIN_CONTRAST = 4.5

function syncPalette() {
  const root = document.documentElement
  const probe = document.createElement("span")
  root.appendChild(probe)
  const read = (name: string) => {
    probe.style.color = `var(${name})`
    return (getComputedStyle(probe).color.match(/[\d.]+/g) ?? ["0", "0", "0"]).slice(0, 3).map(Number)
  }
  const lum = (c: number[]) => {
    const [r, g, b] = c.map((v) => (v / 255 <= 0.03928 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const contrast = (a: number[], b: number[]) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05)
  const canvas = read("--canvas")
  const text = read("--canvas-text")
  for (const n of HUES) {
    const hue = read(`--chart-${n}`)
    let color = text
    // strongest tint first; step toward the text color until it is readable
    for (let keep = 1; keep > 0; keep -= 0.05) {
      const mixed = hue.map((v, i) => Math.round(v * keep + text[i] * (1 - keep)))
      if (contrast(mixed, canvas) >= MIN_CONTRAST) { color = mixed; break }
    }
    root.style.setProperty(`--r95-code-${n}`, `rgb(${color.join(" ")})`)
  }
  probe.remove()
}

let watching = false
function watchPalette() {
  if (watching) return
  watching = true
  syncPalette()
  // light/dark and theme changes arrive as attributes on <html>
  new MutationObserver(syncPalette).observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-r95-theme"] })
}

const tint = (n: number) => ({ color: `var(--r95-code-${n}, var(--canvas-text))` })
const STYLE: Record<string, React.CSSProperties | undefined> = {
  comment: { color: "var(--canvas-text-disabled)" },
  string: tint(3),
  keyword: tint(1),
  tag: tint(1),
  attr: tint(2),
  number: tint(5),
  plain: undefined,
}

const KEYWORDS = "import|from|export|const|let|return|function|type|new|true|false|null|undefined|as"
/* order matters: comments and strings first, so nothing inside them is matched again */
const TOKEN = new RegExp(
  [
    /(?<comment>\{\/\*[\s\S]*?\*\/\}|\/\*[\s\S]*?\*\/|\/\/[^\n]*)/,
    /(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/,
    /(?<tag>(?<=<\/?)[A-Za-z][\w.]*)/,
    /(?<attr>(?<=\s)[a-zA-Z_][\w-]*(?==))/,
    new RegExp(`(?<keyword>\\b(?:${KEYWORDS})\\b)`),
    /(?<number>(?<![\w.])\d+(?:\.\d+)?(?![\w.]))/,
  ]
    .map((r) => r.source)
    .join("|"),
  "g"
)

export function Highlight({ code }: { code: string }) {
  React.useEffect(watchPalette, [])
  const parts = React.useMemo(() => {
    const out: React.ReactNode[] = []
    let at = 0
    for (const m of code.matchAll(TOKEN)) {
      const kind = Object.keys(m.groups ?? {}).find((k) => m.groups![k] !== undefined) ?? "plain"
      if (m.index > at) out.push(code.slice(at, m.index))
      out.push(
        <span key={m.index} data-token={kind} style={STYLE[kind]}>
          {m[0]}
        </span>
      )
      at = m.index + m[0].length
    }
    out.push(code.slice(at))
    return out
  }, [code])
  return <>{parts}</>
}

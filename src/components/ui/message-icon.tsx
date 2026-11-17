import * as React from "react"
import { PixelArt } from "./icons"

/* The four message box icons, drawn on a 16x16 grid.
 * K outline · F face · X glyph · Y warning yellow */
const DISC = [
  ".....KKKKKK.....", "...KKFFFFFFKK...", "..KFFFFFFFFFFK..", ".KFFFFFFFFFFFFK.", ".KFFFFFFFFFFFFK.", "KFFFFFFFFFFFFFFK",
  "KFFFFFFFFFFFFFFK", "KFFFFFFFFFFFFFFK", "KFFFFFFFFFFFFFFK", "KFFFFFFFFFFFFFFK", "KFFFFFFFFFFFFFFK", ".KFFFFFFFFFFFFK.",
  ".KFFFFFFFFFFFFK.", "..KFFFFFFFFFFK..", "...KKFFFFFFKK...", ".....KKKKKK.....",
]
const stamp = (glyph: string[], top: number, left: number) =>
  DISC.map((row, y) => {
    const g = glyph[y - top]
    if (!g) return row
    return row.split("").map((c, x) => (g[x - left] === "X" ? "X" : c)).join("")
  })

const ART = {
  info: stamp(["..XX..", "..XX..", "......", ".XXX..", "..XX..", "..XX..", "..XX..", "..XX..", ".XXXX."], 3, 5),
  question: stamp([".XXXX.", "XX..XX", "XX..XX", "...XX.", "..XX..", "..XX..", "......", "..XX..", "..XX.."], 3, 5),
  error: stamp(["XX....XX", ".XX..XX.", "..XXXX..", "...XX...", "...XX...", "..XXXX..", ".XX..XX.", "XX....XX"], 4, 4),
  warning: [
    ".......KK.......", "......KYYK......", "......KYYK......", ".....KYYYYK.....", ".....KYYYYK.....", "....KYYXXYYK....",
    "....KYYXXYYK....", "...KYYYXXYYYK...", "...KYYYXXYYYK...", "..KYYYYXXYYYYK..", "..KYYYYXXYYYYK..", ".KYYYYYYYYYYYYK.",
    ".KYYYYYXXYYYYYK.", "KYYYYYYXXYYYYYYK", "KYYYYYYYYYYYYYYK", ".KKKKKKKKKKKKKK.",
  ],
}
const PALETTE = {
  info: { K: "#0a0a0a", F: "#ffffff", X: "#1034a6" },
  question: { K: "#0a0a0a", F: "#ffffff", X: "#1034a6" },
  error: { K: "#0a0a0a", F: "#d21f1f", X: "#ffffff" },
  warning: { K: "#0a0a0a", Y: "#f7c600", X: "#0a0a0a" },
}

type MessageIconType = keyof typeof ART

/** `size` should be a multiple of 16 so the pixels stay square */
function MessageIcon({ type = "info", size = 32, ...props }: Omit<React.ComponentProps<"svg">, "width" | "height" | "type" | "scale"> & { type?: MessageIconType; size?: number }) {
  return <PixelArt data-slot="message-icon" rows={ART[type]} palette={PALETTE[type]} scale={size / 16} className="shrink-0" {...props} />
}

export { MessageIcon, type MessageIconType }

import * as React from "react"
import { cn } from "@/lib/utils"

/* 7-segment digits (Minesweeper counter). Segment order: a b c d e f g */
const SEGMENTS: Record<string, string> = {
  "0": "1111110", "1": "0110000", "2": "1101101", "3": "1111001", "4": "0110011",
  "5": "1011011", "6": "1011111", "7": "1110000", "8": "1111111", "9": "1111011", "-": "0000001",
}
/* Block segments on an 11x20 grid: x, y, width, height */
const SEG_RECTS: [number, number, number, number][] = [
  [2, 0, 7, 2], // a
  [9, 2, 2, 7], // b
  [9, 11, 2, 7], // c
  [2, 18, 7, 2], // d
  [0, 11, 2, 7], // e
  [0, 2, 2, 7], // f
  [2, 9, 7, 2], // g
]

function Digit({ char, scale }: { char: string; scale: number }) {
  const on = SEGMENTS[char] ?? "0000000"
  return (
    <svg width={11 * scale} height={20 * scale} viewBox="0 0 11 20" shapeRendering="crispEdges" aria-hidden="true">
      {SEG_RECTS.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={on[i] === "1" ? "var(--r95-counter-on, #ff2a1a)" : "var(--r95-counter-off, #4a0600)"} />
      ))}
    </svg>
  )
}

type CounterProps = React.ComponentProps<"div"> & {
  value?: number
  /** Pad with leading zeros to this many digits */
  minLength?: number
  size?: "sm" | "md" | "lg"
}

function Counter({ value = 0, minLength = 3, size = "md", className, ...props }: CounterProps) {
  const scale = size === "sm" ? 1 : size === "md" ? 2 : 3
  const neg = value < 0
  const body = String(Math.abs(Math.trunc(value))).padStart(neg ? minLength - 1 : minLength, "0")
  const text = (neg ? "-" : "") + body
  return (
    <div data-slot="counter" role="status" aria-label={String(value)} className={cn("inline-flex gap-1 bevel-field bg-black p-1", className)} {...props}>
      {text.split("").map((c, i) => (
        <Digit key={i} char={c} scale={scale} />
      ))}
    </div>
  )
}

export { Counter, type CounterProps }

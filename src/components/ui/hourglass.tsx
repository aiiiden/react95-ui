import * as React from "react"
import { cn } from "@/lib/utils"
import { PixelArt } from "./icons"

/* 16x16. K = frame, G = glass, S = sand */
const ROWS = [
  "................",
  "..KKKKKKKKKKKK..",
  "..KKKKKKKKKKKK..",
  "...KGGGGGGGGK...",
  "...KGSSSSSSGK...",
  "....KGSSSSGK....",
  ".....KGSSGK.....",
  "......KSSK......",
  "......KSSK......",
  ".....KGSSGK.....",
  "....KGGSSGGK....",
  "...KGSSSSSSGK...",
  "...KSSSSSSSSK...",
  "..KKKKKKKKKKKK..",
  "..KKKKKKKKKKKK..",
  "................",
]

/** Pixel hourglass (the Windows "busy" cursor). `size` should be a multiple of 16. Still when reduced motion is on. */
function Hourglass({ size = 32, className, ...props }: React.ComponentProps<"span"> & { size?: number }) {
  return (
    <span data-slot="hourglass" role="img" aria-label="Loading" className={cn("inline-flex shrink-0", className)} style={{ width: size, height: size }} {...props}>
      <PixelArt
        rows={ROWS}
        scale={size / 16}
        palette={{ K: "var(--border-darkest)", G: "var(--canvas)", S: "var(--progress)" }}
        className="motion-safe:animate-hourglass"
      />
    </span>
  )
}

export { Hourglass }

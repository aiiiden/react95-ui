import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { PixelArt } from "./icons"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-2 type-16", className)} {...props} />
}

/* 12x12 sunken circle. D/B = top-left rings, L/W = bottom-right rings, C = face */
const RING = [
  "....DDDD....",
  "..DDBBBBDD..",
  ".DBBCCCCLLW.",
  ".DBCCCCCCLW.",
  "DBCCCCCCCCLW",
  "DBCCCCCCCCLW",
  "DBCCCCCCCCLW",
  "DBCCCCCCCCLW",
  ".DBCCCCCCLW.",
  ".DLLCCCCLLW.",
  "..WWLLLLWW..",
  "....WWWW....",
]
const DOT = [".XX.", "XXXX", "XXXX", ".XX."]

function RadioGroupItem({ className, variant = "default", disabled, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item> & { variant?: "default" | "flat" }) {
  const face = disabled ? "var(--material)" : "var(--canvas)"
  const palette =
    variant === "flat"
      ? { D: "var(--flat-dark)", B: "var(--flat-dark)", L: "var(--flat-dark)", W: "var(--flat-dark)", C: face }
      : { D: "var(--border-dark)", B: "var(--border-darkest)", L: "var(--border-light)", W: "var(--border-lightest)", C: face }
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      disabled={disabled}
      className={cn(
        "peer relative inline-flex size-3 shrink-0 items-center justify-center text-checkmark outline-none disabled:text-checkmark-disabled",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-material-text focus-visible:outline-offset-2",
        className
      )}
      {...props}
    >
      <PixelArt rows={RING} palette={palette} className="absolute inset-0" />
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex">
        <PixelArt rows={DOT} palette={{ X: "currentColor" }} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

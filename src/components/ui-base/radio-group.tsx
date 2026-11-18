import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"
import { PixelArt } from "@/components/ui/icons"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return <RadioGroupPrimitive data-slot="radio-group" className={cn("grid gap-2 type-16", className)} {...props} />
}

/* A 20x20 sunken circle, the same size and edge thickness as Checkbox: a 2px outer ring and
 * a 2px inner ring around a 12px face. On the top-left half the rings are the shadow colors
 * (D outer, B inner), on the bottom-right half the highlights (W outer, L inner). C is the face. */
const SIZE = 20
const inside = (x: number, y: number, r: number) => (x - 9.5) ** 2 + (y - 9.5) ** 2 <= r * r
const RING = Array.from({ length: SIZE }, (_, y) =>
  Array.from({ length: SIZE }, (_, x) => {
    if (!inside(x, y, 10)) return "."
    if (inside(x, y, 6.2)) return "C"
    const lit = x + y > SIZE - 1
    return inside(x, y, 8.1) ? (lit ? "L" : "B") : lit ? "W" : "D"
  }).join("")
)
const DOT = ["..XX..", ".XXXX.", "XXXXXX", "XXXXXX", ".XXXX.", "..XX.."]

function RadioGroupItem({ className, variant = "default", disabled, ...props }: RadioPrimitive.Root.Props & { variant?: "default" | "flat" }) {
  const face = disabled ? "var(--material)" : "var(--canvas)"
  const palette =
    variant === "flat"
      ? { D: "var(--flat-dark)", B: "var(--flat-dark)", L: "var(--flat-dark)", W: "var(--flat-dark)", C: face }
      : { D: "var(--border-dark)", B: "var(--border-darkest)", L: "var(--border-light)", W: "var(--border-lightest)", C: face }
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      disabled={disabled}
      className={cn(
        "peer relative inline-flex size-5 shrink-0 items-center justify-center text-checkmark outline-none data-[disabled]:text-checkmark-disabled",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-material-text focus-visible:outline-offset-2",
        className
      )}
      {...props}
    >
      <PixelArt rows={RING} palette={palette} className="absolute inset-0" />
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex">
        <PixelArt rows={DOT} palette={{ X: "currentColor" }} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }

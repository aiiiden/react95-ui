import * as React from "react"
import { cn } from "@/lib/utils"
import { TriangleDown, TriangleUp } from "./icons"

type NumberInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  variant?: "default" | "flat"
}

function clamp(v: number, min?: number, max?: number) {
  if (min !== undefined && v < min) return min
  if (max !== undefined && v > max) return max
  return v
}

function NumberInput({ value, defaultValue = 0, onValueChange, min, max, step = 1, variant = "default", disabled, className, ...props }: NumberInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const commit = (v: number) => {
    const next = clamp(Number.isNaN(v) ? current : v, min, max)
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }
  const precision = (String(step).split(".")[1] ?? "").length
  const bump = (dir: 1 | -1) => commit(Number((current + dir * step).toFixed(precision)))
  const stepper =
    "flex flex-1 items-center justify-center bevel-button bg-material text-material-text active:bevel-button-pressed disabled:text-engraved"
  return (
    <div
      data-slot="number-input"
      className={cn("inline-flex h-9 w-28 items-stretch bg-canvas p-0.5", variant === "default" ? "bevel-field" : "bevel-flat", disabled && "bg-material", className)}
    >
      <input
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-valuenow={current}
        aria-valuemin={min}
        aria-valuemax={max}
        disabled={disabled}
        value={current}
        onChange={(e) => commit(parseFloat(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") { e.preventDefault(); bump(1) }
          if (e.key === "ArrowDown") { e.preventDefault(); bump(-1) }
        }}
        className="w-full min-w-0 bg-transparent px-2 type-16 text-canvas-text outline-none disabled:text-engraved"
        {...props}
      />
      <div className="flex w-5 shrink-0 flex-col">
        <button type="button" tabIndex={-1} aria-label="Increase" disabled={disabled || (max !== undefined && current >= max)} onClick={() => bump(1)} className={stepper}>
          <TriangleUp width={7} height={4} />
        </button>
        <button type="button" tabIndex={-1} aria-label="Decrease" disabled={disabled || (min !== undefined && current <= min)} onClick={() => bump(-1)} className={stepper}>
          <TriangleDown />
        </button>
      </div>
    </div>
  )
}

export { NumberInput, type NumberInputProps }

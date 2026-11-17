import * as React from "react"
import { cn } from "@/lib/utils"
import { TriangleDown } from "./icons"

type ColorInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (hex: string) => void
  variant?: "default" | "flat"
}

/** React95 ColorInput: a button showing the swatch; clicking opens the native color picker */
function ColorInput({ value, defaultValue = "#008080", onValueChange, variant = "default", disabled, className, id, ...props }: ColorInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const autoId = React.useId()
  const inputId = id ?? autoId
  return (
    <label
      htmlFor={inputId}
      data-slot="color-input"
      className={cn(
        "relative inline-flex h-9 w-fit cursor-pointer items-center gap-2 bg-material px-2 text-material-text has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-dotted has-[:focus-visible]:-outline-offset-4",
        variant === "default" ? "bevel-button active:bevel-button-pressed" : "bevel-flat",
        disabled && "pointer-events-none text-material-text-disabled",
        className
      )}
    >
      <input
        id={inputId}
        type="color"
        value={current}
        disabled={disabled}
        onChange={(e) => {
          if (value === undefined) setInner(e.target.value)
          onValueChange?.(e.target.value)
        }}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
        {...props}
      />
      <span aria-hidden="true" className={cn("block h-5 w-9 border-2 border-material-text", disabled && "hatched border-material-text-disabled")} style={disabled ? undefined : { background: current }} />
      <span aria-hidden="true" className="h-5 border-l border-r border-l-border-dark border-r-border-lightest" />
      <TriangleDown />
    </label>
  )
}

export { ColorInput, type ColorInputProps }

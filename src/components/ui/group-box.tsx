import * as React from "react"
import { cn } from "@/lib/utils"

type GroupBoxProps = React.ComponentProps<"fieldset"> & {
  label?: React.ReactNode
  variant?: "default" | "flat"
}

function GroupBox({ label, variant = "default", disabled, className, children, ...props }: GroupBoxProps) {
  return (
    <fieldset
      data-slot="group-box"
      disabled={disabled}
      className={cn(
        "relative min-w-0 px-4 pb-4 pt-5 type-16 text-material-text disabled:text-engraved",
        variant === "default" ? "bevel-grouping" : "border-2 border-flat-dark",
        className
      )}
      {...props}
    >
      {label != null && (
        <legend className={cn("absolute -top-2.5 left-2 px-1.5 type-16", variant === "default" ? "bg-material" : "bg-canvas")}>
          {label}
        </legend>
      )}
      {children}
    </fieldset>
  )
}

export { GroupBox, type GroupBoxProps }

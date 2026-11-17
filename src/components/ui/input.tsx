import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  /** "flat" = the borderless field used inside lists and dialogs */
  variant?: "default" | "flat"
}

function Input({ className, variant = "default", type = "text", ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-9 w-full min-w-0 bg-canvas px-2 type-16 text-canvas-text outline-none selection:bg-hover selection:text-canvas-text-invert placeholder:text-canvas-text-disabled",
        "disabled:bg-material disabled:text-engraved read-only:bg-material",
        "aria-invalid:outline aria-invalid:outline-1 aria-invalid:outline-danger aria-invalid:-outline-offset-4",
        variant === "default" ? "bevel-field" : "bevel-flat",
        className
      )}
      {...props}
    />
  )
}

function Textarea({ className, variant = "default", ...props }: React.ComponentProps<"textarea"> & { variant?: "default" | "flat" }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "scrollbar-r95 min-h-24 w-full min-w-0 resize-y bg-canvas p-2 type-16 text-canvas-text outline-none selection:bg-hover selection:text-canvas-text-invert placeholder:text-canvas-text-disabled disabled:bg-material disabled:text-engraved",
        variant === "default" ? "bevel-field" : "bevel-flat",
        className
      )}
      {...props}
    />
  )
}

export { Input, Textarea, type InputProps }

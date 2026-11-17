import * as React from "react"
import { cn } from "@/lib/utils"

/** Raised grip bar used at the start of toolbars (React95 Handle) */
function Handle({ size = 28, className, style, ...props }: React.ComponentProps<"div"> & { size?: number | string }) {
  return (
    <div
      data-slot="handle"
      aria-hidden="true"
      className={cn("mx-1 inline-block w-[7px] shrink-0 border-2 border-b-border-dark border-l-border-lightest border-r-border-dark border-t-border-lightest bg-material", className)}
      style={{ height: typeof size === "number" ? `${size}px` : size, ...style }}
      {...props}
    />
  )
}

export { Handle }

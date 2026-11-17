import * as React from "react"
import { cn } from "@/lib/utils"

type ScrollViewProps = React.ComponentProps<"div"> & {
  /** "default" = sunken white field, "flat" = flat outline, "well" = sunken on material */
  variant?: "default" | "flat" | "well"
  /** Remove the inner padding */
  noPadding?: boolean
}

/** Native scrolling with Windows 95 scrollbars (arrows, hatched track, beveled thumb). */
function ScrollView({ variant = "default", noPadding, className, children, ...props }: ScrollViewProps) {
  return (
    <div
      data-slot="scroll-view"
      className={cn(
        "relative type-16",
        variant === "default" && "bevel-field bg-canvas text-canvas-text",
        variant === "flat" && "bevel-flat bg-canvas text-canvas-text",
        variant === "well" && "bevel-field bg-material text-material-text",
        className
      )}
      {...props}
    >
      <div tabIndex={0} className={cn("scrollbar-r95 size-full overflow-auto outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:-outline-offset-2", !noPadding && "p-3")}>
        {children}
      </div>
    </div>
  )
}

export { ScrollView, type ScrollViewProps }

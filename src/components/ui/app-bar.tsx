import * as React from "react"
import { cn } from "@/lib/utils"

/* Phone browsers (and in-app browsers) float their own bars over the page and report the
 * covered area as safe-area insets. A pinned bar must not leave page content showing in
 * that strip, so each pinned position paints window material out to the screen edge:
 * above a top bar, below a bottom bar. */
type AppBarProps = React.ComponentProps<"header"> & {
  /** "top" (React95 default) or "bottom" for a taskbar */
  position?: "static" | "sticky-top" | "fixed-top" | "fixed-bottom"
}

function AppBar({ position = "static", className, ...props }: AppBarProps) {
  return (
    <header
      data-slot="app-bar"
      className={cn(
        "z-40 w-full bevel-window bg-material type-16 text-material-text",
        position === "sticky-top" &&
          "sticky top-[env(safe-area-inset-top,0px)] before:pointer-events-none before:absolute before:-inset-x-0.5 before:bottom-[calc(100%+2px)] before:h-[env(safe-area-inset-top,0px)] before:bg-material",
        position === "fixed-top" && "fixed inset-x-0 top-0 pt-[env(safe-area-inset-top,0px)]",
        position === "fixed-bottom" &&
          "fixed inset-x-0 bottom-0 pb-[env(safe-area-inset-bottom,0px)] after:pointer-events-none after:absolute after:-inset-x-0.5 after:top-[calc(100%+2px)] after:h-[50vh] after:bg-material",
        className
      )}
      {...props}
    />
  )
}

export { AppBar, type AppBarProps }

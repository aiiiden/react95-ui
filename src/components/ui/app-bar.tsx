import * as React from "react"
import { cn } from "@/lib/utils"

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
        position === "sticky-top" && "sticky top-[env(safe-area-inset-top,0px)]",
        position === "fixed-top" && "fixed inset-x-0 top-0",
        position === "fixed-bottom" && "fixed inset-x-0 bottom-0 pb-[env(safe-area-inset-bottom,0px)]",
        className
      )}
      {...props}
    />
  )
}

export { AppBar, type AppBarProps }

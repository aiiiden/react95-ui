import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

/** Engraved 2px line: dark on top/left, light on bottom/right */
function Separator({ className, orientation = "horizontal", decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "h-0 w-full border-b border-t border-b-border-lightest border-t-border-dark" : "h-full w-0 self-stretch border-l border-r border-l-border-dark border-r-border-lightest",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

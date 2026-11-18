import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "@/lib/utils"

/** Engraved 2px line: dark on top/left, light on bottom/right */
function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
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

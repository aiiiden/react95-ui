import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "@/lib/utils"
import { toggleClass, type ToggleStyleProps } from "./toggle"

const ToggleGroupContext = React.createContext<ToggleStyleProps>({})

/** `value` is always an array. One item at a time by default; pass `multiple` to allow several. */
function ToggleGroup({ className, variant, size, children, ...props }: ToggleGroupPrimitive.Props & ToggleStyleProps) {
  return (
    <ToggleGroupPrimitive data-slot="toggle-group" className={cn("inline-flex flex-wrap items-center type-16", className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({ className, variant, size, ...props }: TogglePrimitive.Props & ToggleStyleProps) {
  const ctx = React.useContext(ToggleGroupContext)
  return <TogglePrimitive data-slot="toggle-group-item" className={cn(toggleClass({ variant: variant ?? ctx.variant, size: size ?? ctx.size }), className)} {...props} />
}

export { ToggleGroup, ToggleGroupItem }

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { toggleClass, type ToggleStyleProps } from "./toggle"

const ToggleGroupContext = React.createContext<ToggleStyleProps>({})

function ToggleGroup({ className, variant, size, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleStyleProps) {
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn("inline-flex flex-wrap items-center type-16", className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({ className, variant, size, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleStyleProps) {
  const ctx = React.useContext(ToggleGroupContext)
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(toggleClass({ variant: variant ?? ctx.variant, size: size ?? ctx.size }), className)} {...props} />
}

export { ToggleGroup, ToggleGroupItem }

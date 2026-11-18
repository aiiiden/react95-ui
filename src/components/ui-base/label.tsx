import * as React from "react"
import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex select-none items-center gap-2 type-16 text-material-text peer-disabled:text-engraved peer-data-[disabled]:text-engraved group-data-[disabled=true]:text-engraved",
        className
      )}
      {...props}
    />
  )
}

export { Label }

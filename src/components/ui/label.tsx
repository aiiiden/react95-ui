import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("flex select-none items-center gap-2 type-16 text-material-text peer-disabled:text-engraved group-data-[disabled=true]:text-engraved", className)}
      {...props}
    />
  )
}

export { Label }

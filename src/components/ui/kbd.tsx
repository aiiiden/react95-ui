import * as React from "react"
import { cn } from "@/lib/utils"

/** A keycap */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" className={cn("inline-flex h-5 min-w-5 items-center justify-center bevel-thin bg-material px-1 type-12 text-material-text", className)} {...props} />
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="kbd-group" className={cn("inline-flex items-center gap-1 type-12", className)} {...props} />
}

export { Kbd, KbdGroup }

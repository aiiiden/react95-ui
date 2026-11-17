import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

function Anchor({ className, asChild, underline = true, ...props }: React.ComponentProps<"a"> & { asChild?: boolean; underline?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"
  return (
    <Comp
      data-slot="anchor"
      className={cn(
        "text-anchor visited:text-anchor-visited underline-offset-2 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted",
        underline ? "underline" : "hover:underline",
        className
      )}
      {...props}
    />
  )
}

export { Anchor }

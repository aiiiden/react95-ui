import * as React from "react"
import { cn } from "@/lib/utils"

/** The child fills the box, as with Radix's AspectRatio */
function AspectRatio({ ratio = 1, className, style, ...props }: React.ComponentProps<"div"> & { ratio?: number }) {
  return <div data-slot="aspect-ratio" className={cn("relative w-full [&>*]:absolute [&>*]:inset-0", className)} style={{ aspectRatio: ratio, ...style }} {...props} />
}

export { AspectRatio }

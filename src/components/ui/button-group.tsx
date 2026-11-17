import * as React from "react"
import { cn } from "@/lib/utils"

/** Buttons that belong together, set edge to edge */
function ButtonGroup({ className, orientation = "horizontal", ...props }: React.ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return <div data-slot="button-group" role="group" data-orientation={orientation} className={cn("inline-flex type-16", orientation === "vertical" ? "flex-col" : "flex-wrap", className)} {...props} />
}

export { ButtonGroup }

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const frameVariants = cva("relative block type-16", {
  variants: {
    variant: {
      window: "bevel-window bg-material text-material-text",
      button: "bevel-button bg-material text-material-text",
      field: "bevel-field bg-canvas p-0.5 text-canvas-text",
      status: "bevel-status bg-material text-material-text",
      grouping: "bevel-grouping bg-material text-material-text",
      well: "bevel-field bg-material p-0.5 text-material-text",
      flat: "bevel-flat bg-canvas p-0.5 text-canvas-text",
    },
  },
  defaultVariants: { variant: "window" },
})

type FrameProps = React.ComponentProps<"div"> & VariantProps<typeof frameVariants>

function Frame({ className, variant, ...props }: FrameProps) {
  return <div data-slot="frame" data-variant={variant ?? "window"} className={cn(frameVariants({ variant }), className)} {...props} />
}

export { Frame, frameVariants, type FrameProps }

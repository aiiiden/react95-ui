import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap px-1.5 type-12", {
  variants: {
    variant: {
      default: "bg-header text-header-text",
      secondary: "bevel-status bg-material px-1 text-material-text",
      destructive: "bg-danger text-canvas",
      outline: "border border-material-text text-material-text",
    },
  },
  defaultVariants: { variant: "default" },
})

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

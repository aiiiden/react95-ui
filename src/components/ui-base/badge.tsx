import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap px-1.5 type-12", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bevel-status bg-material px-1 text-material-text",
      destructive: "bg-danger text-danger-foreground",
      outline: "border border-material-text text-material-text",
    },
  },
  defaultVariants: { variant: "default" },
})

function Badge({ className, variant, render, ...props }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">({ className: cn(badgeVariants({ variant }), className) }, props),
    state: { slot: "badge" },
  })
}

export { Badge, badgeVariants }

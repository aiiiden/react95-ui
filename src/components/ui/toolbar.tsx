import * as React from "react"
import { Toolbar as ToolbarPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

function Toolbar({ className, noPadding, ...props }: React.ComponentProps<typeof ToolbarPrimitive.Root> & { noPadding?: boolean }) {
  return <ToolbarPrimitive.Root data-slot="toolbar" className={cn("flex items-center gap-1 type-16", !noPadding && "p-1", className)} {...props} />
}

function ToolbarButton({ className, variant = "thin", ...props }: React.ComponentProps<typeof ToolbarPrimitive.Button> & { variant?: "thin" | "default" | "menu" }) {
  return <ToolbarPrimitive.Button data-slot="toolbar-button" className={cn(buttonVariants({ variant, size: "md" }), "[--btn-px:8px]", className)} {...props} />
}

function ToolbarSeparator({ className, ...props }: React.ComponentProps<typeof ToolbarPrimitive.Separator>) {
  return <ToolbarPrimitive.Separator data-slot="toolbar-separator" className={cn("mx-1 h-7 w-0 border-l border-r border-l-border-dark border-r-border-lightest", className)} {...props} />
}

const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup

function ToolbarToggleItem({ className, ...props }: React.ComponentProps<typeof ToolbarPrimitive.ToggleItem>) {
  return (
    <ToolbarPrimitive.ToggleItem
      data-slot="toolbar-toggle-item"
      className={cn(buttonVariants({ variant: "thin", size: "icon" }), "data-[state=on]:bevel-thin-pressed data-[state=on]:hatched", className)}
      {...props}
    />
  )
}

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem }

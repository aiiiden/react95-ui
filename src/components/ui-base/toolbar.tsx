import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

function Toolbar({ className, noPadding, ...props }: ToolbarPrimitive.Root.Props & { noPadding?: boolean }) {
  return <ToolbarPrimitive.Root data-slot="toolbar" className={cn("flex items-center gap-1 type-16", !noPadding && "p-1", className)} {...props} />
}

function ToolbarButton({ className, variant = "thin", ...props }: ToolbarPrimitive.Button.Props & { variant?: "thin" | "default" | "menu" }) {
  return <ToolbarPrimitive.Button data-slot="toolbar-button" className={cn(buttonVariants({ variant, size: "md" }), "[--btn-px:8px]", className)} {...props} />
}

function ToolbarSeparator({ className, ...props }: ToolbarPrimitive.Separator.Props) {
  return <ToolbarPrimitive.Separator data-slot="toolbar-separator" className={cn("mx-1 h-7 w-0 border-l border-r border-l-border-dark border-r-border-lightest", className)} {...props} />
}

/** `value` is always an array. One item at a time by default; pass `multiple` to allow several. */
function ToolbarToggleGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return <ToggleGroupPrimitive data-slot="toolbar-toggle-group" className={cn("flex items-center", className)} {...props} />
}

function ToolbarToggleItem({ className, ...props }: TogglePrimitive.Props) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-toggle-item"
      className={cn(buttonVariants({ variant: "thin", size: "icon" }), "data-[pressed]:bevel-thin-pressed data-[pressed]:hatched", className)}
      render={<TogglePrimitive {...props} />}
    />
  )
}

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem }

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { TriangleDown, TriangleUp } from "./icons"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

function SelectTrigger({ className, children, variant = "default", ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & { variant?: "default" | "flat" }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group inline-flex h-9 w-48 items-stretch bg-canvas p-0 text-left type-16 text-canvas-text outline-none disabled:bg-material disabled:text-engraved",
        variant === "default" ? "bevel-field" : "bevel-flat",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center px-1.5">
        <span className="truncate px-0.5 group-focus-visible:bg-hover group-focus-visible:text-canvas-text-invert group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-dotted group-focus-visible:outline-focus-secondary">
          {children}
        </span>
      </span>
      <SelectPrimitive.Icon asChild>
        <span className="flex w-7 shrink-0 items-center justify-center bevel-button bg-material text-material-text group-data-[state=open]:bevel-button-pressed group-disabled:text-material-text-disabled">
          <TriangleDown />
        </span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden border border-border-darkest bg-canvas type-16 text-canvas-text",
          className
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-5 items-center justify-center bg-material"><TriangleUp width={7} height={4} /></SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="overscroll-none p-0">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-5 items-center justify-center bg-material"><TriangleDown /></SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn("px-2 py-1 type-12 text-canvas-text-disabled", className)} {...props} />
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex h-8 cursor-default select-none items-center px-2 outline-none data-[highlighted]:bg-hover data-[highlighted]:text-canvas-text-invert data-[disabled]:text-canvas-text-disabled",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn("my-0.5 h-px bg-border-dark", className)} {...props} />
}

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }

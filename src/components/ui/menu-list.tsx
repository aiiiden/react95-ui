import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/** Static menu panel (Start menu, context menus you position yourself). For a popup menu use DropdownMenu. */
function MenuList({ className, inline, ...props }: React.ComponentProps<"ul"> & { inline?: boolean }) {
  return (
    <ul
      data-slot="menu-list"
      role="menu"
      className={cn("bevel-window bg-material p-1 type-16 text-material-text", inline ? "inline-flex flex-col" : "flex flex-col", className)}
      {...props}
    />
  )
}

type MenuListItemProps = React.ComponentProps<"li"> & {
  asChild?: boolean
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  /** Square icon-only item */
  square?: boolean
  primary?: boolean
}

function MenuListItem({ className, asChild, disabled, size = "md", square, primary, children, ...props }: MenuListItemProps) {
  const Comp = asChild ? Slot.Root : "li"
  return (
    <Comp
      data-slot="menu-list-item"
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex cursor-default select-none items-center gap-2 px-2 outline-none",
        size === "sm" && "h-7", size === "md" && "h-9", size === "lg" && "h-11",
        square && "justify-center px-0 aspect-square",
        primary && "font-pixel-bold",
        disabled ? "text-engraved" : "hover:bg-hover hover:text-material-text-invert focus-visible:bg-hover focus-visible:text-material-text-invert",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

function MenuListSeparator({ className, ...props }: React.ComponentProps<"li">) {
  return <li role="separator" data-slot="menu-list-separator" className={cn("mx-0.5 my-1 border-b border-t border-b-border-lightest border-t-border-dark", className)} {...props} />
}

export { MenuList, MenuListItem, MenuListSeparator }

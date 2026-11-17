import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { menuPanelClass } from "./dropdown-menu"
import { TriangleDown } from "./icons"

/** Site navigation as a row of flat toolbar buttons; each panel drops below its own button */
function NavigationMenu({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn("relative z-10 flex max-w-full type-16 text-material-text", className)} {...props} />
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("flex flex-wrap items-center gap-0.5", className)} {...props} />
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
}

const navButton =
  "inline-flex h-9 cursor-default select-none items-center gap-1.5 border-2 border-transparent bg-material px-2 text-material-text outline-none hover:bevel-thin focus-visible:bevel-thin data-[state=open]:bevel-thin-pressed data-[active]:bevel-thin-pressed"

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn(navButton, className)} {...props}>
      {children}
      <TriangleDown />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" className={cn(menuPanelClass, "absolute left-0 top-full mt-0.5 flex w-max max-w-[calc(100vw-32px)] flex-col", className)} {...props} />
}

/** Use inside NavigationMenuContent for a menu row, or directly in an item for a plain link */
function NavigationMenuLink({ className, variant = "item", ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link> & { variant?: "item" | "button" }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        variant === "button"
          ? navButton
          : "flex min-h-8 cursor-default select-none flex-col justify-center px-3 py-1 outline-none hover:bg-hover hover:text-material-text-invert focus-visible:bg-hover focus-visible:text-material-text-invert",
        className
      )}
      {...props}
    />
  )
}

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink }

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cn } from "@/lib/utils"
import { menuPanelClass } from "./dropdown-menu"
import { TriangleDown } from "@/components/ui/icons"

/** Site navigation as a row of flat toolbar buttons; each panel drops below its own button */
function NavigationMenu({ className, children, ...props }: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn("relative z-10 flex max-w-full type-16 text-material-text", className)} {...props}>
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner side="bottom" align="start" sideOffset={2} collisionPadding={8} className="z-50 type-16 text-material-text">
          <NavigationMenuPrimitive.Popup data-slot="navigation-menu-popup" className={cn(menuPanelClass, "max-w-[calc(100vw-32px)]")}>
            <NavigationMenuPrimitive.Viewport />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("flex flex-wrap items-center gap-0.5", className)} {...props} />
}

function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
}

const navButton =
  "inline-flex h-9 cursor-default select-none items-center gap-1.5 border-2 border-transparent bg-material px-2 text-material-text outline-none hover:bevel-thin focus-visible:bevel-thin data-[popup-open]:bevel-thin-pressed data-[active]:bevel-thin-pressed"

function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn(navButton, className)} {...props}>
      {children}
      <TriangleDown />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" className={cn("flex w-max max-w-full flex-col", className)} {...props} />
}

/** Use inside NavigationMenuContent for a menu row, or directly in an item for a plain link */
function NavigationMenuLink({ className, variant = "item", ...props }: NavigationMenuPrimitive.Link.Props & { variant?: "item" | "button" }) {
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

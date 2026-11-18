import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"
import { TriangleRight } from "@/components/ui/icons"

const panel = "min-w-40 bevel-window bg-material p-1 type-16 text-material-text outline-none"
const item =
  "relative flex h-8 cursor-default select-none items-center gap-2 pl-6 pr-6 outline-none data-[highlighted]:bg-hover data-[highlighted]:text-material-text-invert data-[disabled]:text-engraved data-[disabled]:pointer-events-none"

/* shared by ContextMenu, Menubar and NavigationMenu so every menu looks the same */
export const menuPanelClass = panel
export const menuItemClass = item

type Placement = Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuContent({ className, side = "bottom", sideOffset = 2, align = "start", alignOffset = 0, ...props }: MenuPrimitive.Popup.Props & Placement) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50 outline-none">
        <MenuPrimitive.Popup data-slot="dropdown-menu-content" className={cn(panel, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/** What the item does goes in onClick (Radix calls it onSelect) */
function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return <MenuPrimitive.Item data-slot="dropdown-menu-item" className={cn(item, className)} {...props} />
}

function DropdownMenuCheckboxItem({ className, children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn(item, className)} {...props}>
      <MenuPrimitive.CheckboxItemIndicator className="absolute left-2">
        <svg width="7" height="7" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M6 0h1v3H6v1H5v1H4v1H3v1H2V6H1V5H0V2h1v1h1v1h1V3h1V2h1V1h1z" fill="currentColor" />
        </svg>
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn(item, className)} {...props}>
      <MenuPrimitive.RadioItemIndicator className="absolute left-2.5">
        <svg width="4" height="4" viewBox="0 0 4 4" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M1 0h2v1h1v2H3v1H1V3H0V1h1z" fill="currentColor" />
        </svg>
      </MenuPrimitive.RadioItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

/* a plain element, so it can sit anywhere in the menu (Base UI's GroupLabel must be inside a Group) */
function DropdownMenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-label" className={cn("px-6 py-1 type-12 text-material-text-disabled", className)} {...props} />
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return <MenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("mx-0.5 my-1 border-b border-t border-b-border-lightest border-t-border-dark", className)} {...props} />
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-shortcut" className={cn("ml-auto pl-6 type-12", className)} {...props} />
}

function DropdownMenuSubTrigger({ className, children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger data-slot="dropdown-menu-sub-trigger" className={cn(item, "data-[popup-open]:bg-hover data-[popup-open]:text-material-text-invert", className)} {...props}>
      {children}
      <TriangleRight className="absolute right-2" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({ className, side = "right", sideOffset = 0, align = "start", alignOffset = 0, ...props }: MenuPrimitive.Popup.Props & Placement) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50 outline-none">
        <MenuPrimitive.Popup data-slot="dropdown-menu-sub-content" className={cn(panel, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
}

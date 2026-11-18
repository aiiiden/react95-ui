import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { cn } from "@/lib/utils"
import { menuItemClass, menuPanelClass } from "./dropdown-menu"
import { TriangleRight } from "@/components/ui/icons"


type Placement = Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">

/** The File / Edit / View bar under a window's title bar */
function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return <MenubarPrimitive data-slot="menubar" className={cn("flex flex-wrap items-center bg-material p-0.5 type-16 text-material-text", className)} {...props} />
}

function MenubarMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="menubar-menu" {...props} />
}

function MenubarTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex h-7 cursor-default select-none items-center px-2 outline-none focus-visible:bg-hover focus-visible:text-material-text-invert data-[popup-open]:bg-hover data-[popup-open]:text-material-text-invert data-[disabled]:text-engraved",
        className
      )}
      {...props}
    />
  )
}

function MenubarGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="menubar-sub" {...props} />
}

function MenubarRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarContent({ className, side = "bottom", sideOffset = 0, align = "start", alignOffset = 0, ...props }: MenuPrimitive.Popup.Props & Placement) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50 outline-none">
        <MenuPrimitive.Popup data-slot="menubar-content" className={cn(menuPanelClass, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/** What the item does goes in onClick (Radix calls it onSelect) */
function MenubarItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return <MenuPrimitive.Item data-slot="menubar-item" className={cn(menuItemClass, className)} {...props} />
}

function MenubarCheckboxItem({ className, children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="menubar-checkbox-item" className={cn(menuItemClass, className)} {...props}>
      <MenuPrimitive.CheckboxItemIndicator className="absolute left-2">
        <svg width="7" height="7" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M6 0h1v3H6v1H5v1H4v1H3v1H2V6H1V5H0V2h1v1h1v1h1V3h1V2h1V1h1z" fill="currentColor" />
        </svg>
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem data-slot="menubar-radio-item" className={cn(menuItemClass, className)} {...props}>
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
function MenubarLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="menubar-label" className={cn("px-6 py-1 type-12 text-material-text-disabled", className)} {...props} />
}

function MenubarSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return <MenuPrimitive.Separator data-slot="menubar-separator" className={cn("mx-0.5 my-1 border-b border-t border-b-border-lightest border-t-border-dark", className)} {...props} />
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="menubar-shortcut" className={cn("ml-auto pl-6 type-12", className)} {...props} />
}

function MenubarSubTrigger({ className, children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger data-slot="menubar-sub-trigger" className={cn(menuItemClass, "data-[popup-open]:bg-hover data-[popup-open]:text-material-text-invert", className)} {...props}>
      {children}
      <TriangleRight className="absolute right-2" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function MenubarSubContent({ className, side = "right", sideOffset = 0, align = "start", alignOffset = 0, ...props }: MenuPrimitive.Popup.Props & Placement) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50 outline-none">
        <MenuPrimitive.Popup data-slot="menubar-sub-content" className={cn(menuPanelClass, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

export {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarItem, MenubarCheckboxItem,
  MenubarRadioGroup, MenubarRadioItem, MenubarLabel, MenubarSeparator, MenubarShortcut,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
}

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { menuItemClass, menuPanelClass } from "./dropdown-menu"
import { TriangleRight } from "./icons"

/** The File / Edit / View bar under a window's title bar */
function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return <MenubarPrimitive.Root data-slot="menubar" className={cn("flex flex-wrap items-center bg-material p-0.5 type-16 text-material-text", className)} {...props} />
}
const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex h-7 cursor-default select-none items-center px-2 outline-none data-[highlighted]:bg-hover data-[highlighted]:text-material-text-invert data-[state=open]:bg-hover data-[state=open]:text-material-text-invert data-[disabled]:text-engraved",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({ className, align = "start", sideOffset = 0, alignOffset = 0, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content data-slot="menubar-content" align={align} sideOffset={sideOffset} alignOffset={alignOffset} collisionPadding={8} className={cn(menuPanelClass, className)} {...props} />
    </MenubarPrimitive.Portal>
  )
}

function MenubarItem({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Item>) {
  return <MenubarPrimitive.Item data-slot="menubar-item" className={cn(menuItemClass, className)} {...props} />
}

function MenubarCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem data-slot="menubar-checkbox-item" className={cn(menuItemClass, className)} {...props}>
      <MenubarPrimitive.ItemIndicator className="absolute left-2">
        <svg width="7" height="7" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M6 0h1v3H6v1H5v1H4v1H3v1H2V6H1V5H0V2h1v1h1v1h1V3h1V2h1V1h1z" fill="currentColor" />
        </svg>
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem data-slot="menubar-radio-item" className={cn(menuItemClass, className)} {...props}>
      <MenubarPrimitive.ItemIndicator className="absolute left-2.5">
        <svg width="4" height="4" viewBox="0 0 4 4" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M1 0h2v1h1v2H3v1H1V3H0V1h1z" fill="currentColor" />
        </svg>
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label>) {
  return <MenubarPrimitive.Label data-slot="menubar-label" className={cn("px-6 py-1 type-12 text-material-text-disabled", className)} {...props} />
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator data-slot="menubar-separator" className={cn("mx-0.5 my-1 border-b border-t border-b-border-lightest border-t-border-dark", className)} {...props} />
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="menubar-shortcut" className={cn("ml-auto pl-6 type-12", className)} {...props} />
}

function MenubarSubTrigger({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger>) {
  return (
    <MenubarPrimitive.SubTrigger data-slot="menubar-sub-trigger" className={cn(menuItemClass, "data-[state=open]:bg-hover data-[state=open]:text-material-text-invert", className)} {...props}>
      {children}
      <TriangleRight className="absolute right-2" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent data-slot="menubar-sub-content" collisionPadding={8} className={cn(menuPanelClass, className)} {...props} />
    </MenubarPrimitive.Portal>
  )
}

export {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarItem, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarLabel, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubTrigger, MenubarSubContent,
}

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cn } from "@/lib/utils"
import { menuItemClass, menuPanelClass } from "./dropdown-menu"
import { TriangleRight } from "@/components/ui/icons"


type Placement = Pick<ContextMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">

function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger(props: ContextMenuPrimitive.Trigger.Props) {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
}

function ContextMenuGroup(props: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

function ContextMenuSub(props: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
}

/* Base UI types these values as `any`. The type argument (string unless you say or pass otherwise) keeps `any` out of your handlers. */
type ContextMenuRadioGroupProps<TValue> = Omit<ContextMenuPrimitive.RadioGroup.Props, "value" | "defaultValue" | "onValueChange"> & {
  value?: TValue
  defaultValue?: TValue
  onValueChange?: (value: TValue, eventDetails: ContextMenuPrimitive.RadioGroup.ChangeEventDetails) => void
}

function ContextMenuRadioGroup<TValue = string>(props: ContextMenuRadioGroupProps<TValue>) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
}

function ContextMenuContent({ className, side = "right", sideOffset = 0, align = "start", alignOffset = 0, ...props }: ContextMenuPrimitive.Popup.Props & Placement) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50 outline-none">
        <ContextMenuPrimitive.Popup data-slot="context-menu-content" className={cn(menuPanelClass, className)} {...props} />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

/** What the item does goes in onClick (Radix calls it onSelect) */
function ContextMenuItem({ className, ...props }: ContextMenuPrimitive.Item.Props) {
  return <ContextMenuPrimitive.Item data-slot="context-menu-item" className={cn(menuItemClass, className)} {...props} />
}

function ContextMenuCheckboxItem({ className, children, ...props }: ContextMenuPrimitive.CheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem data-slot="context-menu-checkbox-item" className={cn(menuItemClass, className)} {...props}>
      <ContextMenuPrimitive.CheckboxItemIndicator className="absolute left-2">
        <svg width="7" height="7" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M6 0h1v3H6v1H5v1H4v1H3v1H2V6H1V5H0V2h1v1h1v1h1V3h1V2h1V1h1z" fill="currentColor" />
        </svg>
      </ContextMenuPrimitive.CheckboxItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem<TValue = string>({ className, children, ...props }: Omit<ContextMenuPrimitive.RadioItem.Props, "value"> & { value: TValue }) {
  return (
    <ContextMenuPrimitive.RadioItem data-slot="context-menu-radio-item" className={cn(menuItemClass, className)} {...props}>
      <ContextMenuPrimitive.RadioItemIndicator className="absolute left-2.5">
        <svg width="4" height="4" viewBox="0 0 4 4" shapeRendering="crispEdges" aria-hidden="true">
          <path d="M1 0h2v1h1v2H3v1H1V3H0V1h1z" fill="currentColor" />
        </svg>
      </ContextMenuPrimitive.RadioItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

/* a plain element, so it can sit anywhere in the menu (Base UI's GroupLabel must be inside a Group) */
function ContextMenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="context-menu-label" className={cn("px-6 py-1 type-12 text-material-text-disabled", className)} {...props} />
}

function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return <ContextMenuPrimitive.Separator data-slot="context-menu-separator" className={cn("mx-0.5 my-1 border-b border-t border-b-border-lightest border-t-border-dark", className)} {...props} />
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="context-menu-shortcut" className={cn("ml-auto pl-6 type-12", className)} {...props} />
}

function ContextMenuSubTrigger({ className, children, ...props }: ContextMenuPrimitive.SubmenuTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger data-slot="context-menu-sub-trigger" className={cn(menuItemClass, "data-[popup-open]:bg-hover data-[popup-open]:text-material-text-invert", className)} {...props}>
      {children}
      <TriangleRight className="absolute right-2" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({ className, side = "right", sideOffset = 0, align = "start", alignOffset = 0, ...props }: ContextMenuPrimitive.Popup.Props & Placement) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50 outline-none">
        <ContextMenuPrimitive.Popup data-slot="context-menu-sub-content" className={cn(menuPanelClass, className)} {...props} />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

export {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuCheckboxItem,
  ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
}

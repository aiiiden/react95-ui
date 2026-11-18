import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { WindowButton } from "@/components/ui/window"

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

const sides = {
  right: "inset-y-0 right-0 h-full w-[min(320px,calc(100vw-32px))]",
  left: "inset-y-0 left-0 h-full w-[min(320px,calc(100vw-32px))]",
  top: "inset-x-0 top-0 max-h-[80dvh] w-full",
  bottom: "inset-x-0 bottom-0 max-h-[80dvh] w-full",
}

/** A window docked to one edge of the screen */
function SheetContent({ className, side = "right", children, ...props }: SheetPrimitive.Popup.Props & { side?: keyof typeof sides }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop data-slot="sheet-overlay" className="fixed inset-0 z-50" />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        className={cn("fixed z-50 flex flex-col bevel-window bg-material p-1 type-16 text-material-text outline-none", sides[side], className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  )
}

function SheetHeader({ className, children, closeLabel = "Close", ...props }: React.ComponentProps<"div"> & { closeLabel?: string }) {
  return (
    <div data-slot="sheet-header" className={cn("flex h-8 shrink-0 select-none items-center gap-2 bg-header pl-1.5 pr-0.5 text-header-text font-pixel-bold", className)} {...props}>
      <div className="min-w-0 flex-1 truncate">{children}</div>
      <SheetPrimitive.Close render={<WindowButton glyph="close" aria-label={closeLabel} className="font-normal [letter-spacing:0] [text-shadow:none]" />} />
    </div>
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return <SheetPrimitive.Title data-slot="sheet-title" render={<div />} className={cn("truncate", className)} {...props} />
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-body" className={cn("scrollbar-r95 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4", className)} {...props} />
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn(className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("flex shrink-0 flex-wrap justify-end gap-2 px-4 pb-4", className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetDescription, SheetFooter }

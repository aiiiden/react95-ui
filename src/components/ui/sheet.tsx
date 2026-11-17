import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { WindowButton } from "./window"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close

const sides = {
  right: "inset-y-0 right-0 h-full w-[min(320px,calc(100vw-32px))]",
  left: "inset-y-0 left-0 h-full w-[min(320px,calc(100vw-32px))]",
  top: "inset-x-0 top-0 max-h-[80dvh] w-full",
  bottom: "inset-x-0 bottom-0 max-h-[80dvh] w-full",
}

/** A window docked to one edge of the screen */
function SheetContent({ className, side = "right", children, ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: keyof typeof sides }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay data-slot="sheet-overlay" className="fixed inset-0 z-50" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn("fixed z-50 flex flex-col bevel-window bg-material p-1 type-16 text-material-text outline-none", sides[side], className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

function SheetHeader({ className, children, closeLabel = "Close", ...props }: React.ComponentProps<"div"> & { closeLabel?: string }) {
  return (
    <div data-slot="sheet-header" className={cn("flex h-8 shrink-0 select-none items-center gap-2 bg-header pl-1.5 pr-0.5 text-header-text font-pixel-bold", className)} {...props}>
      <div className="min-w-0 flex-1 truncate">{children}</div>
      <SheetPrimitive.Close asChild>
        <WindowButton glyph="close" aria-label={closeLabel} className="font-normal [letter-spacing:0] [text-shadow:none]" />
      </SheetPrimitive.Close>
    </div>
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("truncate", className)} {...props} />
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-body" className={cn("scrollbar-r95 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4", className)} {...props} />
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn(className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("flex shrink-0 flex-wrap justify-end gap-2 px-4 pb-4", className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetDescription, SheetFooter }

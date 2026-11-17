import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"

function Drawer(props: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close

/** A panel that slides up from the bottom edge; drag the grip to dismiss.
 * It is a sheet of window material, not a window: no title bar. The grip sits where a title
 * bar would, and the title is plain bold text above an engraved rule. */
function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay data-slot="drawer-overlay" className="fixed inset-0 z-50" />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn("fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col bevel-window bg-material p-1 pb-[max(4px,env(safe-area-inset-bottom,0px))] type-16 text-material-text outline-none", className)}
        {...props}
      >
        <div aria-hidden="true" className="mx-auto mb-1 mt-2 h-1.5 w-16 shrink-0 bevel-thin" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("mx-3 flex shrink-0 flex-col gap-1 border-b border-b-border-lightest px-1 pb-2 pt-1 shadow-[inset_0_-1px_0_0_var(--border-dark)]", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-slot="drawer-title" className={cn("font-pixel-bold", className)} {...props} />
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-body" className={cn("scrollbar-r95 flex min-h-0 flex-col gap-3 overflow-y-auto px-4 py-3", className)} {...props} />
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return <DrawerPrimitive.Description data-slot="drawer-description" className={cn(className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("flex shrink-0 flex-wrap justify-end gap-2 px-4 pb-4", className)} {...props} />
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerDescription, DrawerFooter }

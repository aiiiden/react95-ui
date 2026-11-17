import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"

function Drawer(props: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerClose = DrawerPrimitive.Close

/** A window that slides up from the bottom edge; drag the grip to dismiss */
function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay data-slot="drawer-overlay" className="fixed inset-0 z-50" />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn("fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col bevel-window bg-material p-1 pb-[max(4px,env(safe-area-inset-bottom,0px))] type-16 text-material-text outline-none", className)}
        {...props}
      >
        <div aria-hidden="true" className="mx-auto my-1.5 h-1.5 w-16 shrink-0 bevel-thin" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn("flex h-8 shrink-0 select-none items-center bg-header px-1.5 text-header-text font-pixel-bold", className)} {...props} />
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-slot="drawer-title" className={cn("truncate", className)} {...props} />
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-body" className={cn("scrollbar-r95 flex min-h-0 flex-col gap-3 overflow-y-auto p-4", className)} {...props} />
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return <DrawerPrimitive.Description data-slot="drawer-description" className={cn(className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("flex shrink-0 flex-wrap justify-end gap-2 px-4 pb-4", className)} {...props} />
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerDescription, DrawerFooter }

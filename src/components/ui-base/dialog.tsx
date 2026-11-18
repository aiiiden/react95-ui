import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { WindowButton } from "@/components/ui/window"

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/* Windows 95 does not dim the screen behind a modal: the overlay only blocks clicks */
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return <DialogPrimitive.Backdrop data-slot="dialog-overlay" className={cn("fixed inset-0 z-50", className)} {...props} />
}

function DialogContent({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-32px)] w-[calc(100vw-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col bevel-window bg-material p-1 type-16 text-material-text outline-none",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/** The title bar. Put DialogTitle inside; the close button is added for you. */
function DialogHeader({ className, children, closeLabel = "Close", hideClose, ...props }: React.ComponentProps<"div"> & { closeLabel?: string; hideClose?: boolean }) {
  return (
    <div data-slot="dialog-header" className={cn("flex h-8 shrink-0 select-none items-center gap-2 bg-header pl-1.5 pr-0.5 text-header-text font-pixel-bold", className)} {...props}>
      <div className="min-w-0 flex-1 truncate">{children}</div>
      {!hideClose && <DialogPrimitive.Close render={<WindowButton glyph="close" aria-label={closeLabel} className="font-normal [letter-spacing:0] [text-shadow:none]" />} />}
    </div>
  )
}

/* a <div>, not Base UI's default <h2>: the title bar sets its own type */
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title data-slot="dialog-title" render={<div />} className={cn("truncate", className)} {...props} />
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-body" className={cn("scrollbar-r95 flex min-h-0 flex-col gap-3 overflow-y-auto p-4", className)} {...props} />
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn(className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex shrink-0 flex-wrap justify-end gap-2 px-4 pb-4", className)} {...props} />
}

export { Dialog, DialogTrigger, DialogClose, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogDescription, DialogFooter }

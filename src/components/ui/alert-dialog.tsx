import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { MessageIcon, type MessageIconType } from "./message-icon"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/** A Windows message box: title bar, icon + text, centered buttons. No screen dimming. */
function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" className="fixed inset-0 z-50" />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex w-[calc(100vw-32px)] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col bevel-window bg-material p-1 type-16 text-material-text outline-none",
          className
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  )
}

/** The title bar. Message boxes have no close button: the user must pick an answer. */
function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-header" className={cn("flex h-8 shrink-0 select-none items-center bg-header px-1.5 text-header-text font-pixel-bold", className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn("truncate", className)} {...props} />
}

function AlertDialogBody({ className, icon, children, ...props }: React.ComponentProps<"div"> & { icon?: MessageIconType | false }) {
  return (
    <div data-slot="alert-dialog-body" className={cn("flex items-start gap-4 p-4", className)} {...props}>
      {icon !== false && <MessageIcon type={icon ?? "warning"} />}
      <div className="flex min-w-0 flex-1 flex-col gap-2 self-center">{children}</div>
    </div>
  )
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn(className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-footer" className={cn("flex flex-wrap justify-center gap-2 px-4 pb-4", className)} {...props} />
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(buttonVariants({ primary: true }), "min-w-20", className)} {...props} />
}

function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(buttonVariants(), "min-w-20", className)} {...props} />
}

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogBody, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel }

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { MessageIcon, type MessageIconType } from "@/components/ui/message-icon"

function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

/** A Windows message box: title bar, icon + text, centered buttons. No screen dimming. */
function AlertDialogContent({ className, ...props }: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop data-slot="alert-dialog-overlay" className="fixed inset-0 z-50" />
      <AlertDialogPrimitive.Popup
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

function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props) {
  return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" render={<div />} className={cn("truncate", className)} {...props} />
}

function AlertDialogBody({ className, icon, children, ...props }: React.ComponentProps<"div"> & { icon?: MessageIconType | false }) {
  return (
    <div data-slot="alert-dialog-body" className={cn("flex items-start gap-4 p-4", className)} {...props}>
      {icon !== false && <MessageIcon type={icon ?? "warning"} />}
      <div className="flex min-w-0 flex-1 flex-col gap-2 self-center">{children}</div>
    </div>
  )
}

function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props) {
  return <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn(className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-footer" className={cn("flex flex-wrap justify-center gap-2 px-4 pb-4", className)} {...props} />
}

/* Both buttons close the box; put what the action does in onClick */
function AlertDialogAction({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogPrimitive.Close data-slot="alert-dialog-action" className={cn(buttonVariants({ primary: true }), "min-w-20", className)} {...props} />
}

function AlertDialogCancel({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogPrimitive.Close data-slot="alert-dialog-cancel" className={cn(buttonVariants(), "min-w-20", className)} {...props} />
}

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogBody, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel }

import * as React from "react"
import { cn } from "@/lib/utils"
import { MessageIcon, type MessageIconType } from "./message-icon"

type AlertProps = React.ComponentProps<"div"> & {
  /** Picks the message icon. `destructive` is an alias for `error`, to match shadcn. */
  variant?: MessageIconType | "destructive" | "default"
  /** Icon size in px (16 or 32). Pass `false` to hide the icon. */
  icon?: 16 | 32 | false
}

/** An inline message: a sunken strip with one of the four message box icons */
function Alert({ className, variant = "default", icon = 32, children, ...props }: AlertProps) {
  const type: MessageIconType = variant === "default" ? "info" : variant === "destructive" ? "error" : variant
  return (
    <div data-slot="alert" role="alert" data-variant={variant} className={cn("flex items-start gap-3 bevel-status bg-material p-3 type-16 text-material-text", className)} {...props}>
      {icon !== false && <MessageIcon type={type} size={icon} />}
      <div className="flex min-w-0 flex-1 flex-col gap-1 self-center">{children}</div>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("font-pixel-bold", className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn(className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription, type AlertProps }

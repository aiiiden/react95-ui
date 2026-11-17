import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: number
  square?: boolean
  noBorder?: boolean
}

function Avatar({ size = 40, square, noBorder, className, style, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-material-dark",
        !square && "rounded-full",
        !noBorder && "border-2 border-b-border-lightest border-l-border-dark border-r-border-lightest border-t-border-dark",
        className
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("size-full object-cover pixelated", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn("flex size-full items-center justify-center type-16 text-material-text", className)} {...props} />
}

export { Avatar, AvatarImage, AvatarFallback }

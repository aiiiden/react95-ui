import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* Horizontal padding lives in --btn-px so the pressed state can nudge the label 1px
 * without losing it. To change padding, set [--btn-px:8px] instead of px-2. */
const buttonVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap bg-material type-16 text-material-text outline-none disabled:pointer-events-none disabled:text-engraved [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bevel-button active:bevel-button-pressed active:pt-0.5 active:pl-[calc(var(--btn-px)+1px)] active:pr-[max(0px,calc(var(--btn-px)-1px))] focus-visible:after:absolute focus-visible:after:inset-1 focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-dotted focus-visible:after:outline-material-text data-[active=true]:bevel-button-pressed data-[active=true]:hatched data-[active=true]:font-pixel-bold",
        raised:
          "bevel-thin active:bevel-thin-pressed data-[active=true]:bevel-thin-pressed data-[active=true]:hatched",
        thin:
          "border-2 border-transparent hover:bevel-thin active:bevel-thin-pressed data-[active=true]:bevel-thin-pressed",
        flat:
          "bevel-flat bg-canvas text-canvas-text active:bg-flat-light",
        menu:
          "border-2 border-transparent hover:bg-hover hover:text-material-text-invert data-[active=true]:bg-hover data-[active=true]:text-material-text-invert",
      },
      size: {
        sm: "h-7 [--btn-px:8px] px-(--btn-px) type-12 ",
        md: "h-9 [--btn-px:16px] px-(--btn-px)",
        lg: "h-11 [--btn-px:20px] px-(--btn-px)",
        icon: "size-9 [--btn-px:0px] p-0",
        "icon-sm": "size-7 [--btn-px:0px] p-0",
      },
      primary: {
        true: "ring-1 ring-border-darkest ring-offset-0",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "default", size: "md", primary: false, fullWidth: false },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Renders the pressed (toggled-on) state */
    active?: boolean
    asChild?: boolean
  }

function Button({ className, variant, size, primary, fullWidth, active, asChild = false, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-active={active ? "true" : undefined}
      aria-pressed={active === undefined ? undefined : active}
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, primary, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }

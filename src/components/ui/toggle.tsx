import * as React from "react"
import { Toggle as TogglePrimitive } from "radix-ui"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

/* a button that stays pressed: pressed bevel + checkerboard, like a toolbar's Bold button */
const toggleOn = {
  default: "data-[state=on]:bevel-button-pressed data-[state=on]:hatched",
  raised: "data-[state=on]:bevel-thin-pressed data-[state=on]:hatched",
  thin: "data-[state=on]:bevel-thin-pressed data-[state=on]:hatched",
  flat: "data-[state=on]:bg-flat-light",
  menu: "data-[state=on]:bg-hover data-[state=on]:text-material-text-invert",
}

type ToggleStyleProps = Pick<VariantProps<typeof buttonVariants>, "variant" | "size">

function toggleClass({ variant, size }: ToggleStyleProps) {
  return cn(buttonVariants({ variant, size }), toggleOn[variant ?? "default"])
}

function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & ToggleStyleProps) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleClass({ variant, size }), className)} {...props} />
}

export { Toggle, toggleClass, type ToggleStyleProps }

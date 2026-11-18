import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

/* a button that stays pressed: pressed bevel + checkerboard, like a toolbar's Bold button */
const toggleOn = {
  default: "data-[pressed]:bevel-button-pressed data-[pressed]:hatched",
  raised: "data-[pressed]:bevel-thin-pressed data-[pressed]:hatched",
  thin: "data-[pressed]:bevel-thin-pressed data-[pressed]:hatched",
  flat: "data-[pressed]:bg-flat-light",
  menu: "data-[pressed]:bg-hover data-[pressed]:text-material-text-invert",
}

type ToggleStyleProps = Pick<VariantProps<typeof buttonVariants>, "variant" | "size">

function toggleClass({ variant, size }: ToggleStyleProps) {
  return cn(buttonVariants({ variant, size }), toggleOn[variant ?? "default"])
}

function Toggle({ className, variant, size, ...props }: TogglePrimitive.Props & ToggleStyleProps) {
  return <TogglePrimitive data-slot="toggle" className={cn(toggleClass({ variant, size }), className)} {...props} />
}

export { Toggle, toggleClass, type ToggleStyleProps }

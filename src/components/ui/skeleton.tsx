import * as React from "react"
import { cn } from "@/lib/utils"

/** Placeholder while content loads: a sunken strip filled with a dither that blinks in two steps.
 * The dither uses the disabled-text color, which every theme keeps readable against the window. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" aria-hidden="true" className={cn("border border-b-border-lightest border-l-border-dark border-r-border-lightest border-t-border-dark bg-material hatched [--r95-hatch:var(--material-text-disabled)] motion-safe:animate-[pulse_1.2s_steps(2,jump-none)_infinite]", className)} {...props} />
}

export { Skeleton }

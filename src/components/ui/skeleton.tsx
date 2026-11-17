import * as React from "react"
import { cn } from "@/lib/utils"

/** Placeholder while content loads: a dithered block that blinks in two steps */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" aria-hidden="true" className={cn("bg-material-dark hatched [--r95-hatch:var(--material)] motion-safe:animate-[pulse_1.2s_steps(2,jump-none)_infinite]", className)} {...props} />
}

export { Skeleton }

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  /** "default": solid bar with inverted % label · "tile": chunked blocks */
  variant?: "default" | "tile"
  /** Hide the percentage label (default variant only) */
  hideValue?: boolean
}

function Progress({ value = 0, max = 100, variant = "default", hideValue, className, ...props }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, ((value ?? 0) / max) * 100))
  const label = `${Math.round(pct)}%`
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      max={max}
      className={cn("relative h-8 w-full overflow-hidden bevel-field bg-canvas type-16", className)}
      {...props}
    >
      {variant === "default" ? (
        <>
          {!hideValue && <span className="absolute inset-0 flex items-center justify-center text-canvas-text">{label}</span>}
          <ProgressPrimitive.Indicator
            className="absolute inset-0 flex items-center justify-center bg-progress text-canvas-text-invert"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            {!hideValue && label}
          </ProgressPrimitive.Indicator>
        </>
      ) : (
        <ProgressPrimitive.Indicator className="absolute inset-y-[3px] left-[3px] right-[3px]">
          <span
            className="block h-full"
            style={{
              /* snap to whole 16px blocks */
              width: `round(down, ${pct}%, 16px)`,
              background: "repeating-linear-gradient(90deg, var(--progress) 0 14px, transparent 14px 16px)",
            }}
          />
        </ProgressPrimitive.Indicator>
      )}
    </ProgressPrimitive.Root>
  )
}

export { Progress, type ProgressProps }

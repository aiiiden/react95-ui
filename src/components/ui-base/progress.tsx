import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

type ProgressProps = Omit<ProgressPrimitive.Root.Props, "value"> & {
  value?: number | null
  /** "default": solid bar with inverted % label · "tile": chunked blocks */
  variant?: "default" | "tile"
  /** Hide the percentage label (default variant only) */
  hideValue?: boolean
}

function Progress({ value = 0, min = 0, max = 100, variant = "default", hideValue, className, ...props }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (((value ?? 0) - min) / (max - min)) * 100))
  const label = `${Math.round(pct)}%`
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      min={min}
      max={max}
      className={cn("relative h-8 w-full overflow-hidden bevel-field bg-canvas type-16", className)}
      {...props}
    >
      {variant === "default" ? (
        <>
          {!hideValue && <span className="absolute inset-0 flex items-center justify-center text-canvas-text">{label}</span>}
          <ProgressPrimitive.Track
            className="absolute inset-0.5 flex items-center justify-center bg-progress text-progress-foreground"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} /* the fill sits inside the sunken edge, never over it */
          >
            {!hideValue && label}
          </ProgressPrimitive.Track>
        </>
      ) : (
        <ProgressPrimitive.Track className="absolute inset-y-[3px] left-[3px] right-[3px]">
          <span
            className="block h-full"
            style={{
              /* snap to whole 16px blocks */
              width: `round(down, ${pct}%, 16px)`,
              background: "repeating-linear-gradient(90deg, var(--progress) 0 14px, transparent 14px 16px)",
            }}
          />
        </ProgressPrimitive.Track>
      )}
    </ProgressPrimitive.Root>
  )
}

export { Progress, type ProgressProps }

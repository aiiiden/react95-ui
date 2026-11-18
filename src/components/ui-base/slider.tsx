import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

type SliderProps = SliderPrimitive.Root.Props & {
  /** Draw tick marks under the track: true = every step, number = that many ticks */
  marks?: boolean | number
  variant?: "default" | "flat"
}

/** `value` is a number for one thumb or an array for several; `onValueChange` returns the same shape. */
function Slider({ className, marks, variant = "default", min = 0, max = 100, step = 1, orientation = "horizontal", defaultValue, value, ...props }: SliderProps) {
  const current = value ?? defaultValue
  const thumbs = Array.isArray(current) ? current.length : 1
  const count = marks === true ? Math.floor((max - min) / step) + 1 : typeof marks === "number" ? marks : 0
  const vertical = orientation === "vertical"
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      defaultValue={defaultValue}
      value={value}
      thumbAlignment="edge"
      className={cn("relative", vertical ? "h-48 w-8" : "h-8 w-full", className)}
      {...props}
    >
      {/* thumbs are placed against the control, not the track, so the track's border does not shorten their travel */}
      <SliderPrimitive.Control className={cn("relative flex size-full touch-none select-none items-center", vertical && "flex-col")}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          style={{ position: "static" }}
          className={cn("grow", vertical ? "h-full w-2" : "h-2 w-full", variant === "default" ? "bevel-field bg-material-dark" : "bevel-flat bg-flat-light")}
        >
          {Array.from({ length: thumbs }, (_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              index={i}
              data-slot="slider-thumb"
              className={cn(
                "block bevel-button bg-material outline-none has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-dotted has-[:focus-visible]:outline-material-text has-[:focus-visible]:outline-offset-2 data-[disabled]:hatched",
                vertical ? "h-3 w-7" : "h-7 w-3"
              )}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
      {count > 1 && (
        <div aria-hidden="true" className={cn("pointer-events-none absolute flex justify-between", vertical ? "-right-1 top-1.5 bottom-1.5 flex-col" : "left-1.5 right-1.5 -bottom-1.5")}>
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className={cn("bg-material-text", vertical ? "h-px w-1.5" : "h-1.5 w-px")} />
          ))}
        </div>
      )}
    </SliderPrimitive.Root>
  )
}

export { Slider, type SliderProps }

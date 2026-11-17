import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** Draw tick marks under the track: true = every step, number = that many ticks */
  marks?: boolean | number
  variant?: "default" | "flat"
}

function Slider({ className, marks, variant = "default", min = 0, max = 100, step = 1, orientation = "horizontal", defaultValue, value, ...props }: SliderProps) {
  const thumbs = (value ?? defaultValue ?? [min]).length
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
      className={cn(
        "relative flex touch-none select-none items-center data-[disabled]:opacity-100",
        vertical ? "h-48 w-8 flex-col" : "h-8 w-full",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn("relative grow", vertical ? "w-2 h-full" : "h-2 w-full", variant === "default" ? "bevel-field bg-material-dark" : "bevel-flat bg-flat-light")}
      >
        <SliderPrimitive.Range className="absolute" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          className={cn(
            "block bevel-button bg-material outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-material-text focus-visible:outline-offset-2 data-[disabled]:hatched",
            vertical ? "h-3 w-7" : "h-7 w-3"
          )}
        />
      ))}
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

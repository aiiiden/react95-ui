import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"

/** For the mixed state pass `indeterminate` (Radix uses checked="indeterminate"). */
function Checkbox({ className, variant = "default", ...props }: CheckboxPrimitive.Root.Props & { variant?: "default" | "flat" }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer inline-flex size-5 shrink-0 items-center justify-center bg-canvas text-checkmark outline-none",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-material-text focus-visible:outline-offset-2",
        "data-[disabled]:bg-material data-[disabled]:text-checkmark-disabled",
        variant === "default" ? "bevel-field" : "bevel-flat",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="group flex items-center justify-center">
        <svg width="7" height="7" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true" className="group-data-[indeterminate]:hidden">
          <path d="M6 0h1v3H6v1H5v1H4v1H3v1H2V6H1V5H0V2h1v1h1v1h1V3h1V2h1V1h1z" fill="currentColor" />
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true" className="hidden group-data-[indeterminate]:block">
          <path d="M0 0h1v1H0zM2 0h1v1H2zM4 0h1v1H4zM6 0h1v1H6zM1 1h1v1H1zM3 1h1v1H3zM5 1h1v1H5zM7 1h1v1H7zM0 2h1v1H0zM2 2h1v1H2zM4 2h1v1H4zM6 2h1v1H6zM1 3h1v1H1zM3 3h1v1H3zM5 3h1v1H5zM7 3h1v1H7zM0 4h1v1H0zM2 4h1v1H2zM4 4h1v1H4zM6 4h1v1H6zM1 5h1v1H1zM3 5h1v1H3zM5 5h1v1H5zM7 5h1v1H7zM0 6h1v1H0zM2 6h1v1H2zM4 6h1v1H4zM6 6h1v1H6zM1 7h1v1H1zM3 7h1v1H3zM5 7h1v1H5zM7 7h1v1H7z" fill="currentColor" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

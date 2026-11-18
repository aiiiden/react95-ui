import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

function Popover(props: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

/** To position against something other than the trigger, pass `anchor` (an element or ref). */
function PopoverContent({
  className,
  side = "bottom",
  sideOffset = 2,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: PopoverPrimitive.Popup.Props & Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "anchor">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} anchor={anchor} collisionPadding={8} className="z-50">
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn("w-72 max-w-[calc(100vw-16px)] bevel-window bg-material p-3 type-16 text-material-text outline-none", className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverClose, PopoverContent }

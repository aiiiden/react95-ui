import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "@/lib/utils"

function HoverCard(props: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ delay = 400, closeDelay = 150, ...props }: PreviewCardPrimitive.Trigger.Props) {
  return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" delay={delay} closeDelay={closeDelay} {...props} />
}

/** A larger cousin of Tooltip: the pale-yellow info balloon */
function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  ...props
}: PreviewCardPrimitive.Popup.Props & Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} collisionPadding={8} className="z-50">
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn("w-64 max-w-[calc(100vw-16px)] border border-border-darkest bg-tooltip p-2 type-12 text-canvas-text outline-none", className)}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }

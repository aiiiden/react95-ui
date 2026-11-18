import * as React from "react"
import { Group, Panel, Separator } from "react-resizable-panels"
import { cn } from "@/lib/utils"

/**
 * Split panes, the way Explorer does it: every pane is its own sunken field, and the
 * splitter is just the gap of window material between them. Nothing is drawn across the
 * frame, so there is no joint where a bar would meet a border.
 */
function ResizablePanelGroup({ className, ...props }: React.ComponentProps<typeof Group>) {
  return <Group data-slot="resizable-panel-group" className={cn("flex size-full bg-material type-16 text-material-text", className)} {...props} />
}

/** `variant="plain"` drops the sunken frame, for panes that bring their own (a Table, a ScrollView) */
function ResizablePanel({ className, variant = "field", ...props }: React.ComponentProps<typeof Panel> & { variant?: "field" | "plain" }) {
  return <Panel data-slot="resizable-panel" className={cn("min-h-0 min-w-0", variant === "field" && "bevel-field bg-canvas p-0.5 text-canvas-text", className)} {...props} />
}

/* 4px of bare material to grab. Keyboard focus shows as a checkerboard, like a dragged splitter. */
function ResizableHandle({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "shrink-0 bg-material outline-none [--r95-hatch:var(--border-dark)] focus-visible:hatched data-[separator=active]:hatched aria-[orientation=vertical]:w-1 aria-[orientation=vertical]:cursor-col-resize aria-[orientation=horizontal]:h-1 aria-[orientation=horizontal]:cursor-row-resize",
        className
      )}
      {...props}
    />
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

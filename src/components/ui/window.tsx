import * as React from "react"
import { cn } from "@/lib/utils"

type WindowProps = React.ComponentProps<"div"> & {
  /** Dims the title bar like an unfocused window */
  inactive?: boolean
  /** Shows a resize grip in the bottom-right corner */
  resizable?: boolean
}

function Window({ className, inactive, resizable, children, ...props }: WindowProps) {
  return (
    <div
      data-slot="window"
      data-inactive={inactive ? "true" : undefined}
      className={cn("group/window relative flex flex-col bevel-window bg-material p-1 type-16 text-material-text", className)}
      {...props}
    >
      {children}
      {resizable && <WindowResizeGrip />}
    </div>
  )
}

function WindowHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-header"
      className={cn(
        "flex h-8 shrink-0 select-none items-center gap-2 bg-header pl-1.5 pr-0.5 type-16 text-header-text font-pixel-bold",
        "group-data-[inactive=true]/window:bg-header-inactive group-data-[inactive=true]/window:text-header-inactive-text",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function WindowTitle({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="window-title" className={cn("min-w-0 flex-1 truncate", className)} {...props} />
}

function WindowControls({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="window-controls" className={cn("ml-auto flex shrink-0 items-center gap-0.5", className)} {...props} />
}

const glyphs = {
  close: "M1 1h2v1h1v1h2V2h1V1h2v1H8v1H7v1H6v1h1v1h1v1h1v1H7V7H6V6H4v1H3v1H1V7h1V6h1V5h1V4H3V3H2V2H1z",
  minimize: "M2 7h6v2H2z",
  maximize: "M1 1h8v8H1zM2 3v5h6V3z",
  restore: "M3 1h6v6H8V3H3zM1 3h6v6H1zM2 5v3h4V5z",
  help: "M3 1h4v1h1v2H7v1H6v1H4V4h1V3h1V2H4v1H3zM4 7h2v2H4z",
} as const

type WindowButtonProps = React.ComponentProps<"button"> & { glyph?: keyof typeof glyphs }

function WindowButton({ className, glyph = "close", children, type = "button", ...props }: WindowButtonProps) {
  return (
    <button
      data-slot="window-button"
      type={type}
      aria-label={props["aria-label"] ?? glyph}
      className={cn(
        "inline-flex h-5 w-[22px] items-center justify-center bevel-button bg-material p-0 text-material-text active:bevel-button-pressed active:pl-px active:pt-px disabled:text-engraved",
        className
      )}
      {...props}
    >
      {children ?? (
        <svg width="10" height="10" viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
          <path d={glyphs[glyph]} fill="currentColor" fillRule="evenodd" />
        </svg>
      )}
    </button>
  )
}

function WindowContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="window-content" className={cn("flex-1 p-4", className)} {...props} />
}

function WindowStatusBar({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="window-statusbar" className={cn("mt-0.5 flex gap-0.5 type-12 [&>*]:bevel-status [&>*]:px-2 [&>*]:py-0.5 [&>*:first-child]:flex-1", className)} {...props} />
}

function WindowResizeGrip({ className }: { className?: string }) {
  return (
    <svg
      data-slot="window-resize-grip"
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      className={cn("pointer-events-none absolute bottom-1 right-1", className)}
    >
      {[0, 4, 8].map((o) => (
        <g key={o}>
          <path d={`M${11 - o} ${o + 1}L${o + 1} 11`} stroke="var(--border-lightest)" />
          <path d={`M${12 - o} ${o + 1}L${o + 1} 12`} stroke="var(--border-dark)" />
        </g>
      ))}
    </svg>
  )
}

export { Window, WindowHeader, WindowTitle, WindowControls, WindowButton, WindowContent, WindowStatusBar, WindowResizeGrip }

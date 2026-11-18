import * as React from "react"
import { cn } from "@/lib/utils"

type MonitorProps = React.ComponentProps<"div"> & {
  /** Screen content. Defaults to the desktop color. */
  children?: React.ReactNode
  screenClassName?: string
  /** Screen area width in px (height follows 4:3) */
  width?: number
}

/** The classic beige CRT from Display Properties */
function Monitor({ children, screenClassName, width = 195, className, ...props }: MonitorProps) {
  return (
    <div data-slot="monitor" className={cn("inline-flex flex-col items-center type-16", className)} {...props}>
      <div className="relative bevel-window bg-material p-3 pb-4">
        <div className={cn("relative overflow-hidden bevel-field bg-desktop p-0.5", screenClassName)} style={{ width, height: Math.round((width * 3) / 4) }}>
          {children}
        </div>
        <span aria-hidden="true" className="absolute bottom-1.5 right-3 h-1 w-2.5 border border-border-darkest bg-success" />
      </div>
      <div aria-hidden="true" className="h-2.5 w-[38%] bevel-window bg-material border-t-0" />
      <div aria-hidden="true" className="h-2 w-[55%] bevel-window bg-material" />
    </div>
  )
}

export { Monitor, type MonitorProps }

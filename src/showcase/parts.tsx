import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Window, WindowButton, WindowContent, WindowControls, WindowHeader, WindowStatusBar, WindowTitle } from "@/components/ui/window"

export function Spec({ name, children, className }: { name: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={"flex min-w-0 flex-col gap-3 " + (className ?? "")}>
      <h3 className="flex items-center gap-2 type-12">
        <span className="shrink-0">{name}</span>
        <Separator className="flex-1" />
      </h3>
      <div className="flex min-w-0 flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

export function DemoWindow({ title, children, className, status }: { title: string; children: React.ReactNode; className?: string; status?: React.ReactNode }) {
  return (
    <Window className={"h-full min-w-0 " + (className ?? "")}>
      <WindowHeader>
        <WindowTitle>{title}</WindowTitle>
        <WindowControls>
          <WindowButton glyph="minimize" aria-label="Minimize" />
          <WindowButton glyph="maximize" aria-label="Maximize" />
          <WindowButton glyph="close" aria-label="Close" className="ml-0.5" />
        </WindowControls>
      </WindowHeader>
      <WindowContent className="flex flex-col gap-6 p-2 sm:p-4">{children}</WindowContent>
      {status && <WindowStatusBar>{status}</WindowStatusBar>}
    </Window>
  )
}


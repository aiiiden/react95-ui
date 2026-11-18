import * as React from "react"
import { Button } from "@/components/ui/button"
import { Frame } from "@/components/ui/frame"
import { Separator } from "@/components/ui/separator"
import { Window, WindowButton, WindowContent, WindowControls, WindowHeader, WindowStatusBar, WindowTitle } from "@/components/ui/window"

/** `code` is filled in at build time with this section's own source (see specCode in vite.config.ts) */
export function Spec({ name, children, className, code }: { name: string; children: React.ReactNode; className?: string; code?: string }) {
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    if (!code) return
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }, () => {})
  }
  return (
    <section className={"flex min-w-0 flex-col gap-3 " + (className ?? "")}>
      <h3 className="flex items-center gap-2 type-12">
        <span className="shrink-0">{name}</span>
        <Separator className="flex-1" />
        {code && open && (
          <Button size="sm" variant="raised" onClick={copy} className="h-5 [--btn-px:6px]">
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
        {code && (
          <Button size="sm" variant="raised" active={open} aria-expanded={open} onClick={() => setOpen(!open)} className="h-5 [--btn-px:6px]">
            Code
          </Button>
        )}
      </h3>
      <div className="flex min-w-0 flex-wrap items-center gap-3">{children}</div>
      {open && code && (
        <Frame data-slot="spec-code" variant="field" className="scrollbar-r95 max-h-80 min-w-0 overflow-auto p-3 type-12">
          <pre>{code}</pre>
        </Frame>
      )}
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


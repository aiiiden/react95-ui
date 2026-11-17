import * as React from "react"
import { cn } from "@/lib/utils"
import { TriangleLeft, TriangleRight } from "./icons"

type CalendarProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  selected?: Date
  defaultSelected?: Date
  onSelect?: (date: Date) => void
  /** The month on screen (any day in it) */
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  locale?: string
  /** 0 = Sunday, 1 = Monday */
  weekStartsOn?: 0 | 1
  disabled?: (date: Date) => boolean
  previousLabel?: string
  nextLabel?: string
}

const sameDay = (a?: Date, b?: Date) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

/** A month grid for picking one day. No date library: it uses Date and Intl. */
function Calendar({
  selected, defaultSelected, onSelect, month, defaultMonth, onMonthChange, locale = "en-US", weekStartsOn = 0, disabled,
  previousLabel = "Previous month", nextLabel = "Next month", className, ...props
}: CalendarProps) {
  const [innerSel, setInnerSel] = React.useState(defaultSelected)
  const sel = selected ?? innerSel
  const [innerMonth, setInnerMonth] = React.useState(() => defaultMonth ?? defaultSelected ?? selected ?? new Date())
  const shown = month ?? innerMonth
  const y = shown.getFullYear()
  const m = shown.getMonth()
  const go = (delta: number) => {
    const next = new Date(y, m + delta, 1)
    if (month === undefined) setInnerMonth(next)
    onMonthChange?.(next)
  }
  const lead = (new Date(y, m, 1).getDay() - weekStartsOn + 7) % 7
  const days = new Date(y, m + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((lead + days) / 7) * 7 }, (_, i) => new Date(y, m, i - lead + 1))
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2000, 0, 2 + i + weekStartsOn).toLocaleString(locale, { weekday: "narrow" }))
  const today = new Date()
  const nav = "flex size-7 items-center justify-center bevel-button bg-material text-material-text active:bevel-button-pressed"
  return (
    <div data-slot="calendar" className={cn("inline-flex w-fit flex-col gap-2 bevel-window bg-material p-2 type-16 text-material-text", className)} {...props}>
      <div className="flex items-center gap-2">
        <button type="button" aria-label={previousLabel} onClick={() => go(-1)} className={nav}><TriangleLeft /></button>
        <div aria-live="polite" className="flex-1 text-center">{shown.toLocaleString(locale, { year: "numeric", month: "long" })}</div>
        <button type="button" aria-label={nextLabel} onClick={() => go(1)} className={nav}><TriangleRight /></button>
      </div>
      <div className="bevel-field bg-canvas text-canvas-text">
        <div className="grid grid-cols-[repeat(7,30px)] bg-material-dark text-center type-12 text-material-text-invert">
          {weekdays.map((w, i) => (
            <span key={i} className="py-0.5">{w}</span>
          ))}
        </div>
        <div role="grid" className="grid grid-cols-[repeat(7,30px)] text-center">
          {cells.map((d) => {
            const outside = d.getMonth() !== m
            const off = disabled?.(d) ?? false
            return (
              <button
                key={d.toISOString()}
                type="button"
                role="gridcell"
                aria-selected={sameDay(d, sel)}
                aria-current={sameDay(d, today) ? "date" : undefined}
                disabled={off}
                tabIndex={outside ? -1 : 0}
                onClick={() => {
                  if (selected === undefined) setInnerSel(d)
                  if (outside) go(d < shown ? -1 : 1)
                  onSelect?.(d)
                }}
                className={cn(
                  "h-7 type-16 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:-outline-offset-2 disabled:line-through",
                  (outside || off) && "text-canvas-text-disabled",
                  sameDay(d, today) && "outline outline-1 -outline-offset-1 outline-border-dark",
                  sameDay(d, sel) && "bg-hover text-canvas-text-invert"
                )}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { Calendar, type CalendarProps }

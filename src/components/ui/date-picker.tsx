import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { NumberInput } from "./number-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Window, WindowButton, WindowContent, WindowControls, WindowHeader, WindowTitle } from "./window"

type DatePickerProps = Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date) => void
  /** Called by the OK / Cancel buttons */
  onAccept?: (date: Date) => void
  onCancel?: () => void
  title?: string
  locale?: string
  okLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
}

function DatePicker({ value, defaultValue, onValueChange, onAccept, onCancel, title = "Date", locale = "en-US", okLabel = "OK", cancelLabel = "Cancel", className, ...props }: DatePickerProps) {
  const [inner, setInner] = React.useState(() => defaultValue ?? new Date())
  const date = value ?? inner
  const set = (d: Date) => {
    if (value === undefined) setInner(d)
    onValueChange?.(d)
  }
  const y = date.getFullYear()
  const m = date.getMonth()
  const day = date.getDate()
  const daysIn = (yy: number, mm: number) => new Date(yy, mm + 1, 0).getDate()
  const go = (yy: number, mm: number, dd: number) => set(new Date(yy, mm, Math.min(dd, daysIn(yy, mm))))
  const months = Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1).toLocaleString(locale, { month: "long" }))
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2000, 0, 2 + i).toLocaleString(locale, { weekday: "narrow" }))
  const first = new Date(y, m, 1).getDay()
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - first + 1
    return d > 0 && d <= daysIn(y, m) ? d : null
  })
  const rows = cells.slice(35).every((c) => c === null) ? cells.slice(0, 35) : cells

  return (
    <Window data-slot="date-picker" className={cn("w-fit", className)} {...props}>
      <WindowHeader>
        <WindowTitle>{title}</WindowTitle>
        <WindowControls>
          <WindowButton glyph="close" aria-label={typeof cancelLabel === "string" ? cancelLabel : "Close"} onClick={onCancel} />
        </WindowControls>
      </WindowHeader>
      <WindowContent className="flex flex-col gap-3 p-3">
        <div className="flex gap-2">
          <Select value={String(m)} onValueChange={(v) => go(y, Number(v), day)}>
            <SelectTrigger className="w-auto min-w-0 flex-1" aria-label="Month">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((name, i) => (
                <SelectItem key={i} value={String(i)}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <NumberInput aria-label="Year" className="w-24" value={y} min={1900} max={2999} onValueChange={(v) => go(v, m, day)} />
        </div>
        <div className="bevel-field bg-canvas text-canvas-text">
          <div className="grid grid-cols-[repeat(7,30px)] bg-material-dark text-center type-12 text-material-text">
            {weekdays.map((w, i) => (
              <span key={i} className="py-0.5">{w}</span>
            ))}
          </div>
          <div role="grid" aria-label={`${y} ${months[m]}`} className="grid grid-cols-[repeat(7,30px)] text-center">
            {rows.map((d, i) =>
              d === null ? (
                <span key={i} />
              ) : (
                <button
                  key={i}
                  type="button"
                  role="gridcell"
                  aria-selected={d === day}
                  onClick={() => go(y, m, d)}
                  className={cn(
                    "h-7 type-16 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:-outline-offset-2",
                    d === day && "bg-hover text-canvas-text-invert"
                  )}
                >
                  {d}
                </button>
              )
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>{cancelLabel}</Button>
          <Button primary onClick={() => onAccept?.(date)}>{okLabel}</Button>
        </div>
      </WindowContent>
    </Window>
  )
}

export { DatePicker, type DatePickerProps }

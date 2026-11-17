import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { TriangleLeft, TriangleRight } from "./icons"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col type-16", className)} {...props} />
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  /**
   * What happens when the tabs do not fit on one row, following the Win32 tab control:
   * - "multiline" (TCS_MULTILINE + TCS_RIGHTJUSTIFY, what property sheets use): tabs wrap into
   *   rows, every row is stretched to the full width, and the row holding the selected tab
   *   moves to the front, next to the panel.
   * - "scroll": one row that scrolls sideways. Swipe, trackpad and wheel scroll it natively
   *   (no visible scrollbar), tabs snap to the left edge, the selected tab is always brought
   *   into view, and the classic up-down control sits beside the row for mouse users
   *   instead of covering the last tab.
   */
  overflow?: "multiline" | "scroll"
}

/* width of the dithered edge strip; snapped tabs stop just clear of it */
const EDGE = 10

const useIsoLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

/* The row starts 2px in, so the selected first tab (which grows 2px on each side)
 * lines up exactly with the panel's left edge. */
function TabsList({ className, overflow = "multiline", ...props }: TabsListProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [edges, setEdges] = React.useState({ canPrev: false, canNext: false })

  useIsoLayoutEffect(() => {
    const list = ref.current
    if (!list) return
    const tabs = () => Array.from(list.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]'))

    const layoutMultiline = () => {
      const items = tabs()
      // 1. natural widths
      items.forEach((t) => { t.style.flex = "0 0 auto"; t.style.width = ""; t.style.order = ""; t.style.marginRight = "" })
      const avail = list.clientWidth - 4
      const natural = items.map((t) => Math.ceil(t.getBoundingClientRect().width - (t.dataset.state === "active" ? 4 : 0)))
      // 2. greedy rows
      const rows: number[][] = [[]]
      let used = 0
      natural.forEach((w, i) => {
        const row = rows[rows.length - 1]
        if (row.length && used + w > avail) { rows.push([i]); used = w } else { row.push(i); used += w }
      })
      if (rows.length === 1) {
        list.dataset.rows = "1"
        items.forEach((t) => { t.style.flex = ""; t.style.width = ""; t.style.marginRight = "" })
        return
      }
      // 3. stretch every row to exactly the full width, so wrapping cannot change when rows are reordered
      list.dataset.rows = String(rows.length)
      const activeRow = Math.max(0, rows.findIndex((r) => r.some((i) => items[i].dataset.state === "active")))
      rows.forEach((row, r) => {
        const sum = row.reduce((a, i) => a + natural[i], 0)
        const extra = Math.max(0, avail - sum)
        // Grow tabs in steps of 2px so centered labels stay on whole pixels; an odd leftover
        // pixel becomes a margin after the row's last tab.
        const each = Math.floor(extra / row.length / 2) * 2
        let pairs = Math.floor((extra - each * row.length) / 2)
        const odd = (extra - each * row.length) % 2
        // the selected row goes last (front); the others keep their order behind it
        const order = r === activeRow ? rows.length : r < activeRow ? r : r - 1
        row.forEach((i, n) => {
          const w = natural[i] + each + (pairs-- > 0 ? 2 : 0)
          items[i].style.width = `${w + (items[i].dataset.state === "active" ? 4 : 0)}px`
          items[i].style.order = String(order)
          items[i].style.marginRight = odd && n === row.length - 1 && items[i].dataset.state !== "active" ? "1px" : ""
        })
      })
    }

    const viewport = viewportRef.current
    const updateEdges = () => {
      if (!viewport) return
      const max = viewport.scrollWidth - viewport.clientWidth
      const next = { canPrev: viewport.scrollLeft > 1, canNext: viewport.scrollLeft < max - 1 }
      setEdges((e) => (e.canPrev === next.canPrev && e.canNext === next.canNext ? e : next))
    }
    // keep the selected tab visible, whether it was chosen by click, keyboard or code
    const revealActive = () => {
      const active = list.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]')
      if (viewport && active) {
        const left = Math.max(0, active.offsetLeft - EDGE)
        const right = active.offsetLeft + active.offsetWidth + EDGE
        if (left < viewport.scrollLeft) viewport.scrollTo({ left })
        else if (right > viewport.scrollLeft + viewport.clientWidth) viewport.scrollTo({ left: right - viewport.clientWidth })
      }
      updateEdges()
    }
    const layoutScroll = () => revealActive()

    const run = overflow === "multiline" ? layoutMultiline : layoutScroll
    run()
    const ro = new ResizeObserver(run)
    ro.observe(list)
    if (viewport) ro.observe(viewport)
    const mo = new MutationObserver(run)
    // characterData: a label that changes (e.g. a language switch) changes tab widths too
    mo.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state"], childList: true, characterData: true })
    // web fonts arrive late (and per script, with unicode-range), so measure again whenever one lands
    document.fonts?.ready.then(run)
    document.fonts?.addEventListener("loadingdone", run)
    viewport?.addEventListener("scroll", updateEdges, { passive: true })
    return () => {
      ro.disconnect()
      mo.disconnect()
      document.fonts?.removeEventListener("loadingdone", run)
      viewport?.removeEventListener("scroll", updateEdges)
    }
  }, [overflow])

  if (overflow === "scroll") {
    // scroll to the previous / next tab boundary
    const step = (dir: 1 | -1) => {
      const viewport = viewportRef.current
      const list = ref.current
      if (!viewport || !list) return
      const starts = Array.from(list.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')).map((t) => Math.max(0, t.offsetLeft - EDGE))
      const x = viewport.scrollLeft
      const target = dir === 1 ? starts.find((l) => l > x + 1) : [...starts].reverse().find((l) => l < x - 1)
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      viewport.scrollTo({ left: target ?? (dir === 1 ? viewport.scrollWidth : 0), behavior: smooth ? "smooth" : "auto" })
    }
    const spin = "flex h-5 w-5 items-center justify-center bevel-button bg-material text-material-text active:bevel-button-pressed disabled:text-material-text-disabled"
    const overflowing = edges.canPrev || edges.canNext
    return (
      <div data-slot="tabs-list-scroller" className="relative z-10 flex items-end">
        <div className="relative min-w-0 flex-1">
          {/* pb-1/-mb-1 keeps the selected tab's 4px overlap inside the scrollport, where it is not clipped */}
          <div
            ref={viewportRef}
            data-slot="tabs-list-viewport"
            className="relative -mb-1 snap-x snap-proximity scroll-pl-2.5 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <TabsPrimitive.List ref={ref} data-slot="tabs-list" className={cn("flex w-max items-end px-0.5 [&>*]:shrink-0 [&>*]:snap-start", className)} {...props} />
          </div>
          {/* Where more tabs continue past an edge, the row dissolves into a dither instead of
              being cut off mid-letter: a solid strip, then a 2px checkerboard. */}
          {edges.canPrev && (
            <span aria-hidden="true" data-slot="tabs-edge" className="pointer-events-none absolute inset-y-0 left-0 z-20 flex">
              <span className="w-0.5 bg-material" />
              <span className="w-2 hatched [--r95-hatch:var(--material)]" />
            </span>
          )}
          {edges.canNext && (
            <span aria-hidden="true" data-slot="tabs-edge" className="pointer-events-none absolute inset-y-0 right-0 z-20 flex">
              <span className="w-2 hatched [--r95-hatch:var(--material)]" />
              <span className="w-0.5 bg-material" />
            </span>
          )}
        </div>
        {overflowing && (
          <div data-slot="tabs-updown" className="flex shrink-0 pb-1.5 pl-1.5">
            <button type="button" tabIndex={-1} aria-label="Scroll tabs left" disabled={!edges.canPrev} onClick={() => step(-1)} className={spin}>
              <TriangleLeft />
            </button>
            <button type="button" tabIndex={-1} aria-label="Scroll tabs right" disabled={!edges.canNext} onClick={() => step(1)} className={spin}>
              <TriangleRight />
            </button>
          </div>
        )}
      </div>
    )
  }

  return <TabsPrimitive.List ref={ref} data-slot="tabs-list" className={cn("relative z-10 flex flex-wrap items-end px-0.5", className)} {...props} />
}

/* Tab edges use the same rings as bevel-window (2px outer + 2px inner), so the selected
 * tab's sides run straight into the panel's border. Its ::after erases the 4px of panel
 * border underneath it. */
function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative h-8 select-none whitespace-nowrap border-2 border-b-0 border-l-border-light border-t-border-light border-r-border-darkest bg-material px-3 type-16 text-material-text outline-none",
        "rounded-t-[4px] shadow-[inset_2px_2px_0_0_var(--border-lightest),inset_-2px_0_0_0_var(--border-dark)]",
        "data-[state=active]:z-10 data-[state=active]:-mx-0.5 data-[state=active]:h-[34px] data-[state=active]:px-3.5",
        "data-[state=active]:after:absolute data-[state=active]:after:inset-x-0.5 data-[state=active]:after:-bottom-1 data-[state=active]:after:h-1 data-[state=active]:after:bg-material",
        /* 2x2 joint: carries the tab's inner highlight down into the panel's inner highlight */
        "data-[state=active]:before:absolute data-[state=active]:before:left-0 data-[state=active]:before:-bottom-0.5 data-[state=active]:before:z-10 data-[state=active]:before:size-0.5 data-[state=active]:before:bg-border-lightest",
        "focus-visible:[&>span]:outline focus-visible:[&>span]:outline-1 focus-visible:[&>span]:outline-dotted focus-visible:[&>span]:outline-material-text",
        "disabled:text-engraved",
        className
      )}
      {...props}
    >
      <span className="px-0.5">{children}</span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("bevel-window bg-material p-4 type-16 text-material-text outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

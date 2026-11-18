import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>

const ChartContext = React.createContext<ChartConfig>({})

/**
 * Wraps a Recharts chart. Each key in `config` becomes a CSS variable `--color-<key>`,
 * so series can use `fill="var(--color-sales)"`. The theme provides five series colors,
 * `var(--chart-1)` to `var(--chart-5)`. Shapes render with crisp edges and axis text uses
 * the 12px pixel font.
 */
function ChartContainer({ config, className, children, style, ...props }: Omit<React.ComponentProps<"div">, "children"> & { config: ChartConfig; children: React.ComponentProps<typeof ResponsiveContainer>["children"] }) {
  const vars = Object.fromEntries(Object.entries(config).filter(([, v]) => v.color).map(([k, v]) => [`--color-${k}`, v.color]))
  return (
    <ChartContext.Provider value={config}>
      <div
        data-slot="chart"
        className={cn(
          "h-56 w-full bevel-field bg-canvas p-2 type-12 text-canvas-text [&_svg]:outline-none [&_.recharts-surface]:[shape-rendering:crispEdges] [&_text]:fill-canvas-text [&_.recharts-cartesian-grid_line]:stroke-border-light [&_.recharts-cartesian-axis-line]:stroke-canvas-text [&_.recharts-cartesian-axis-tick-line]:stroke-canvas-text",
          className
        )}
        style={{ ...vars, ...style } as React.CSSProperties}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

type TooltipEntry = {
  dataKey?: string | number
  name?: string | number
  value?: string | number | (string | number)[]
  color?: string
  payload?: { fill?: string }
}

/** Pass as `<Tooltip content={<ChartTooltipContent />} />`. Labels come from the chart config,
 * looked up by series key (bars, lines) or by slice name (pies). */
function ChartTooltipContent({ active, payload, label, className }: { active?: boolean; payload?: readonly TooltipEntry[]; label?: React.ReactNode; className?: string }) {
  const config = React.useContext(ChartContext)
  if (!active || !payload?.length) return null
  return (
    <div data-slot="chart-tooltip" className={cn("flex flex-col gap-1 border border-border-darkest bg-tooltip px-2 py-1 type-12 text-canvas-text", className)}>
      {label != null && label !== "" && <div>{label}</div>}
      {payload.map((p, i) => {
        const key = [p.name, p.dataKey].map((k) => (k == null ? "" : String(k))).find((k) => k in config) ?? String(p.name ?? p.dataKey ?? i)
        return (
          <div key={`${key}-${i}`} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 border border-border-darkest" style={{ background: p.payload?.fill ?? p.color ?? `var(--color-${key})` }} />
            <span>{config[key]?.label ?? key}</span>
            <span className="ml-auto pl-3 tabular-nums">{Array.isArray(p.value) ? p.value.join(" – ") : p.value}</span>
          </div>
        )
      })}
    </div>
  )
}

/** A square data point for lines: `<Line dot={<ChartDot />} />`. Squares stay crisp where circles would not. */
function ChartDot({ cx, cy, stroke, fill, size = 6 }: { cx?: number; cy?: number; stroke?: string; fill?: string; size?: number }) {
  if (cx == null || cy == null) return null
  return <rect x={Math.round(cx) - size / 2} y={Math.round(cy) - size / 2} width={size} height={size} fill={stroke ?? fill} stroke="var(--canvas)" strokeWidth={1} />
}

/**
 * A 2px checkerboard fill, the way 16-color charts faked a lighter shade. Put it in the chart
 * and point a series at it: `<ChartHatch id="files" color="var(--chart-1)" />` then
 * `<Area fill="url(#files)" />`.
 */
function ChartHatch({ id, color, background = "transparent" }: { id: string; color: string; background?: string }) {
  return (
    <defs>
      <pattern id={id} width={4} height={4} patternUnits="userSpaceOnUse">
        <rect width={4} height={4} fill={background} />
        <rect width={2} height={2} fill={color} />
        <rect x={2} y={2} width={2} height={2} fill={color} />
      </pattern>
    </defs>
  )
}

/** Color keys for the series. Inside a ChartContainer it reads that chart's config; placed
 * outside (under the chart, say) pass the same `config`. */
function ChartLegend({ config: own, className }: { config?: ChartConfig; className?: string }) {
  const inherited = React.useContext(ChartContext)
  const config = own ?? inherited
  return (
    <div data-slot="chart-legend" className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 type-12", className)}>
      {Object.entries(config).map(([key, v]) => (
        <span key={key} className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2 border border-border-darkest" style={{ background: v.color ?? `var(--color-${key})` }} />
          {v.label ?? key}
        </span>
      ))}
    </div>
  )
}

export { ChartContainer, ChartTooltipContent, ChartLegend, ChartDot, ChartHatch, type ChartConfig }

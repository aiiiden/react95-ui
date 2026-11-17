import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>

const ChartContext = React.createContext<ChartConfig>({})

/**
 * Wraps a Recharts chart. Each key in `config` becomes a CSS variable `--color-<key>`,
 * so series can use `fill="var(--color-sales)"`. Shapes render with crisp edges and
 * axis text uses the 12px pixel font.
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

type TooltipEntry = { dataKey?: string | number; name?: string | number; value?: string | number | (string | number)[]; color?: string }

/** Pass as `<Tooltip content={<ChartTooltipContent />} />` */
function ChartTooltipContent({ active, payload, label, className }: { active?: boolean; payload?: readonly TooltipEntry[]; label?: React.ReactNode; className?: string }) {
  const config = React.useContext(ChartContext)
  if (!active || !payload?.length) return null
  return (
    <div data-slot="chart-tooltip" className={cn("flex flex-col gap-1 border border-border-darkest bg-tooltip px-2 py-1 type-12 text-canvas-text", className)}>
      {label != null && <div>{label}</div>}
      {payload.map((p, i) => {
        const key = String(p.dataKey ?? p.name ?? i)
        return (
          <div key={key} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 border border-border-darkest" style={{ background: p.color ?? `var(--color-${key})` }} />
            <span>{config[key]?.label ?? key}</span>
            <span className="ml-auto pl-3 tabular-nums">{Array.isArray(p.value) ? p.value.join(" – ") : p.value}</span>
          </div>
        )
      })}
    </div>
  )
}

function ChartLegend({ className }: { className?: string }) {
  const config = React.useContext(ChartContext)
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

export { ChartContainer, ChartTooltipContent, ChartLegend, type ChartConfig }

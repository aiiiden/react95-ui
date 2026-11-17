import * as React from "react"

/** Pixel glyphs shared by components (crisp 1px rendering, colored with currentColor) */
type GlyphProps = React.ComponentProps<"svg">

export function TriangleDown(props: GlyphProps) {
  return (
    <svg width="7" height="4" viewBox="0 0 7 4" shapeRendering="crispEdges" aria-hidden="true" {...props}>
      <path d="M0 0h7v1H6v1H5v1H4v1H3V3H2V2H1V1H0z" fill="currentColor" />
    </svg>
  )
}

export function TriangleUp(props: GlyphProps) {
  return <TriangleDown style={{ transform: "rotate(180deg)" }} {...props} />
}

export function TriangleRight(props: GlyphProps) {
  return (
    <svg width="4" height="7" viewBox="0 0 4 7" shapeRendering="crispEdges" aria-hidden="true" {...props}>
      <path d="M0 0h1v1h1v1h1v1h1v1H3v1H2v1H1v1H0z" fill="currentColor" />
    </svg>
  )
}

export function TriangleLeft(props: GlyphProps) {
  return <TriangleRight style={{ transform: "rotate(180deg)" }} {...props} />
}

/**
 * Draws pixel art from rows of characters. Each character maps to a color in `palette`;
 * "." (or any unmapped character) is transparent. Horizontal runs are merged into one rect.
 */
export function PixelArt({ rows, palette, scale = 1, ...props }: Omit<GlyphProps, "width" | "height"> & { rows: string[]; palette: Record<string, string>; scale?: number }) {
  const w = rows[0]?.length ?? 0
  const rects: React.ReactNode[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const c = row[x]
      let end = x + 1
      while (end < row.length && row[end] === c) end++
      if (palette[c]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} fill={palette[c]} />)
      x = end
    }
  })
  return (
    <svg width={w * scale} height={rows.length * scale} viewBox={`0 0 ${w} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true" {...props}>
      {rects}
    </svg>
  )
}

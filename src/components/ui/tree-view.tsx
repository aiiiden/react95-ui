import * as React from "react"
import { cn } from "@/lib/utils"

type TreeNode = {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  items?: TreeNode[]
}

type TreeViewProps = Omit<React.ComponentProps<"ul">, "onSelect"> & {
  tree: TreeNode[]
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (ids: string[]) => void
  selected?: string
  defaultSelected?: string
  onSelect?: (id: string) => void
}

function ExpandBox({ open }: { open: boolean }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="0.5" y="0.5" width="8" height="8" fill="var(--canvas)" stroke="var(--border-dark)" />
      <path d="M2 4h5v1H2z" fill="var(--canvas-text)" />
      {!open && <path d="M4 2h1v5H4z" fill="var(--canvas-text)" />}
    </svg>
  )
}

function TreeView({ tree, expanded, defaultExpanded = [], onExpandedChange, selected, defaultSelected, onSelect, className, ...props }: TreeViewProps) {
  const [innerExp, setInnerExp] = React.useState(defaultExpanded)
  const [innerSel, setInnerSel] = React.useState(defaultSelected)
  const exp = expanded ?? innerExp
  const sel = selected ?? innerSel
  const toggle = (id: string) => {
    const next = exp.includes(id) ? exp.filter((x) => x !== id) : [...exp, id]
    if (expanded === undefined) setInnerExp(next)
    onExpandedChange?.(next)
  }
  const choose = (id: string) => {
    if (selected === undefined) setInnerSel(id)
    onSelect?.(id)
  }

  const renderNodes = (nodes: TreeNode[], level: number): React.ReactNode =>
    nodes.map((node, i) => {
      const hasChildren = !!node.items?.length
      const open = exp.includes(node.id)
      const last = i === nodes.length - 1
      return (
        <li
          key={node.id}
          role="treeitem"
          aria-expanded={hasChildren ? open : undefined}
          aria-selected={sel === node.id}
          aria-disabled={node.disabled || undefined}
          className="relative"
        >
          {level > 0 && (
            <span
              aria-hidden="true"
              className={cn("absolute -left-3 top-0 w-3 border-l border-dotted border-canvas-text", last ? "h-3.5" : "h-full")}
            />
          )}
          {level > 0 && <span aria-hidden="true" className="absolute -left-3 top-3.5 w-3 border-t border-dotted border-canvas-text" />}
          <div className="flex h-7 items-center gap-1">
            {hasChildren ? (
              <button type="button" tabIndex={-1} aria-label={open ? "Collapse" : "Expand"} onClick={() => toggle(node.id)} className="relative z-10 -ml-1 flex size-4 items-center justify-center">
                <ExpandBox open={open} />
              </button>
            ) : (
              level === 0 && <span className="w-3" />
            )}
            <button
              type="button"
              disabled={node.disabled}
              onClick={() => choose(node.id)}
              onDoubleClick={() => hasChildren && toggle(node.id)}
              onKeyDown={(e) => {
                if (!hasChildren) return
                if (e.key === "ArrowRight" && !open) { e.preventDefault(); toggle(node.id) }
                if (e.key === "ArrowLeft" && open) { e.preventDefault(); toggle(node.id) }
              }}
              className={cn(
                "flex h-6 items-center gap-1.5 px-1 text-left outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-canvas-text disabled:text-canvas-text-disabled",
                sel === node.id && "bg-hover text-canvas-text-invert"
              )}
            >
              {node.icon}
              <span className="whitespace-nowrap">{node.label}</span>
            </button>
          </div>
          {hasChildren && open && (
            <ul role="group" className="ml-[22px]">
              {renderNodes(node.items!, level + 1)}
            </ul>
          )}
        </li>
      )
    })

  return (
    <ul data-slot="tree-view" role="tree" className={cn("type-16 text-canvas-text", className)} {...props}>
      {renderNodes(tree, 0)}
    </ul>
  )
}

export { TreeView, type TreeNode, type TreeViewProps }

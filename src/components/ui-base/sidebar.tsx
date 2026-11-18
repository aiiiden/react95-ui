import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "@/lib/utils"

/* A compact take on shadcn's Sidebar: an Explorer-style pane beside the content.
 * It collapses to nothing (or to an icon rail with collapsible="icon"); it does not
 * turn into a sheet on phones. */
const SidebarContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void; toggle: () => void } | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>")
  return ctx
}

function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange, className, ...props }: React.ComponentProps<"div"> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = openProp ?? inner
  const setOpen = React.useCallback((v: boolean) => { if (openProp === undefined) setInner(v); onOpenChange?.(v) }, [openProp, onOpenChange])
  const value = React.useMemo(() => ({ open, setOpen, toggle: () => setOpen(!open) }), [open, setOpen])
  return (
    <SidebarContext.Provider value={value}>
      <div data-slot="sidebar-wrapper" data-state={open ? "expanded" : "collapsed"} className={cn("group/sidebar flex min-h-0 w-full type-16 text-material-text", className)} {...props} />
    </SidebarContext.Provider>
  )
}

function Sidebar({ className, collapsible = "offcanvas", side = "left", ...props }: React.ComponentProps<"aside"> & { collapsible?: "offcanvas" | "icon" | "none"; side?: "left" | "right" }) {
  const { open } = useSidebar()
  const hidden = !open && collapsible === "offcanvas"
  return (
    <aside
      data-slot="sidebar"
      data-collapsible={collapsible}
      data-state={open ? "expanded" : "collapsed"}
      hidden={hidden}
      className={cn(
        "group/pane flex shrink-0 flex-col bevel-field bg-canvas p-0.5 text-canvas-text",
        open || collapsible === "none" ? "w-48" : "w-11",
        side === "right" && "order-last",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-inset" className={cn("flex min-w-0 flex-1 flex-col", className)} {...props} />
}

function SidebarTrigger({ className, render, ...props }: useRender.ComponentProps<"button">) {
  const { toggle, open } = useSidebar()
  return useRender({
    defaultTagName: "button",
    render,
    state: { slot: "sidebar-trigger" },
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        "aria-expanded": open,
        onClick: toggle,
        className: cn(!render && "inline-flex h-9 items-center gap-1.5 bevel-button bg-material px-2 text-material-text active:bevel-button-pressed", className),
      },
      props
    ),
  })
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("bevel-button bg-material px-2 py-1 text-material-text group-data-[state=collapsed]/pane:hidden", className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn("scrollbar-r95 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-1", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("p-1 group-data-[state=collapsed]/pane:hidden", className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("flex flex-col", className)} {...props} />
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-label" className={cn("px-2 py-1 type-12 text-canvas-text-disabled group-data-[state=collapsed]/pane:hidden", className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex flex-col", className)} {...props} />
}

function SidebarMenuItem(props: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" {...props} />
}

/** Put an icon first and the label in a <span>: the span hides when the pane collapses to icons */
function SidebarMenuButton({ className, isActive, render, ...props }: useRender.ComponentProps<"button"> & { isActive?: boolean }) {
  return useRender({
    defaultTagName: "button",
    render,
    state: { slot: "sidebar-menu-button", active: isActive ? "true" : undefined },
    props: mergeProps<"button">(
      {
        type: render ? undefined : "button",
        "aria-current": isActive ? "page" : undefined,
        className: cn(
        "flex h-8 w-full cursor-default select-none items-center gap-2 px-2 text-left outline-none hover:bg-hover hover:text-canvas-text-invert focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:-outline-offset-2 data-[active=true]:bg-hover data-[active=true]:text-canvas-text-invert [&>span]:truncate group-data-[state=collapsed]/pane:justify-center group-data-[state=collapsed]/pane:px-0 group-data-[state=collapsed]/pane:[&>span]:hidden",
          className
        ),
      },
      props
    ),
  })
}

export {
  SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar,
}

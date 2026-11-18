import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "@/lib/utils"
import { TriangleDown, TriangleUp } from "@/components/ui/icons"

/* Radix shows the selected item's text in the trigger. Base UI shows the raw value unless the
 * root is given `items`, because its items do not exist until the list has been opened.
 * To keep both versions interchangeable, SelectContent also renders its children once in a
 * hidden "collect" pass, where each SelectItem only reports its label to the root, and
 * SelectValue reads the label back. Passing `items` yourself still works and takes over. */
type Labels = { map: Map<unknown, React.ReactNode>; add: (value: unknown, label: React.ReactNode) => void }
const LabelsContext = React.createContext<Labels | null>(null)
const CollectContext = React.createContext(false)

function Select<Value, Multiple extends boolean | undefined = false>(props: SelectPrimitive.Root.Props<Value, Multiple>) {
  const [map, setMap] = React.useState(() => new Map<unknown, React.ReactNode>())
  const add = React.useCallback((value: unknown, label: React.ReactNode) => {
    // text labels are kept up to date; an element label is stored once (it is a new object on every render)
    setMap((prev) => ((typeof label === "string" || typeof label === "number" ? prev.get(value) === label : prev.has(value)) ? prev : new Map(prev).set(value, label)))
  }, [])
  const labels = React.useMemo(() => (props.items ? null : { map, add }), [props.items, map, add])
  return (
    <LabelsContext.Provider value={labels}>
      <SelectPrimitive.Root data-slot="select" {...props} />
    </LabelsContext.Provider>
  )
}

function SelectGroup(props: SelectPrimitive.Group.Props) {
  if (React.useContext(CollectContext)) return <>{props.children}</>
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ children, placeholder, ...props }: SelectPrimitive.Value.Props) {
  const labels = React.useContext(LabelsContext)
  const text = (value: unknown): React.ReactNode => {
    if (Array.isArray(value)) return value.length ? value.map((v, i) => <React.Fragment key={i}>{i > 0 && ", "}{text(v)}</React.Fragment>) : placeholder
    if (value == null || value === "") return placeholder
    return labels?.map.get(value) ?? String(value)
  }
  return (
    <SelectPrimitive.Value data-slot="select-value" placeholder={placeholder} {...props}>
      {children ?? (labels ? text : undefined)}
    </SelectPrimitive.Value>
  )
}

function SelectTrigger({ className, children, variant = "default", ...props }: SelectPrimitive.Trigger.Props & { variant?: "default" | "flat" }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group inline-flex h-9 w-48 items-stretch bg-canvas p-0.5 text-left type-16 text-canvas-text outline-none data-[disabled]:bg-material data-[disabled]:text-engraved",
        variant === "default" ? "bevel-field" : "bevel-flat",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center px-1.5">
        <span className="truncate px-0.5 group-focus-visible:bg-hover group-focus-visible:text-canvas-text-invert group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-dotted group-focus-visible:outline-focus-secondary">
          {children}
        </span>
      </span>
      <SelectPrimitive.Icon
        render={
          <span className="flex w-7 shrink-0 items-center justify-center bevel-button bg-material text-material-text group-data-[popup-open]:bevel-button-pressed group-data-[disabled]:text-material-text-disabled" />
        }
      >
        <TriangleDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/* A Windows 95 drop-down list opens under the field, so the selected item is not laid over the trigger */
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 0,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props & Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger">) {
  const labels = React.useContext(LabelsContext)
  return (
    <>
    {labels && (
      <span hidden data-slot="select-labels">
        <CollectContext.Provider value={true}>{children}</CollectContext.Provider>
      </span>
    )}
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} alignItemWithTrigger={alignItemWithTrigger} className="z-50">
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative flex max-h-(--available-height) min-w-(--anchor-width) flex-col overflow-hidden border border-border-darkest bg-canvas type-16 text-canvas-text outline-none",
            className
          )}
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow className="top-0 z-10 flex h-5 w-full items-center justify-center bg-material"><TriangleUp width={7} height={4} /></SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List className="min-h-0 overflow-y-auto overscroll-none p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow className="bottom-0 z-10 flex h-5 w-full items-center justify-center bg-material"><TriangleDown /></SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
    </>
  )
}

/** Use inside SelectGroup */
function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  if (React.useContext(CollectContext)) return null
  return <SelectPrimitive.GroupLabel data-slot="select-label" className={cn("px-2 py-1 type-12 text-canvas-text-disabled", className)} {...props} />
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  const labels = React.useContext(LabelsContext)
  const add = labels?.add
  React.useLayoutEffect(() => add?.(props.value, children), [add, props.value, children])
  if (React.useContext(CollectContext)) return null
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex h-8 cursor-default select-none items-center px-2 outline-none data-[highlighted]:bg-hover data-[highlighted]:text-canvas-text-invert data-[disabled]:text-canvas-text-disabled",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  if (React.useContext(CollectContext)) return null
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn("my-0.5 h-px bg-border-dark", className)} {...props} />
}

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "@/lib/utils"

/** `value` is always an array. One panel at a time by default; pass `multiple` to allow several. */
/* Base UI types these values as `any`. The type argument (string unless you say or pass otherwise) keeps `any` out of your handlers. */
function Accordion<TValue = string>({ className, ...props }: AccordionPrimitive.Root.Props<TValue>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex flex-col type-16 text-material-text", className)} {...props} />
}

function AccordionItem<TValue = string>({ className, ...props }: Omit<AccordionPrimitive.Item.Props, "value"> & { value?: TValue }) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-b-border-lightest shadow-[inset_0_-1px_0_0_var(--border-dark)] last:border-b-0 last:shadow-none", className)} {...props} />
}

/* the +/- box from the tree view */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn("group flex min-h-9 flex-1 cursor-default select-none items-center gap-2 px-1 py-1 text-left outline-none focus-visible:[&>span]:outline focus-visible:[&>span]:outline-1 focus-visible:[&>span]:outline-dotted data-[disabled]:text-engraved", className)}
        {...props}
      >
        <svg width="9" height="9" viewBox="0 0 9 9" shapeRendering="crispEdges" aria-hidden="true" className="shrink-0">
          <rect x="0.5" y="0.5" width="8" height="8" fill="var(--canvas)" stroke="var(--border-dark)" />
          <path d="M2 4h5v1H2z" fill="var(--canvas-text)" />
          <path d="M4 2h1v5H4z" fill="var(--canvas-text)" className="group-data-[panel-open]:hidden" />
        </svg>
        <span>{children}</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return <AccordionPrimitive.Panel data-slot="accordion-content" className={cn("pb-3 pl-[21px] pr-1", className)} {...props} />
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

import * as React from "react"
import { cn } from "@/lib/utils"

/* The sunken edge is 4px: a 2px border and a 2px inner ring drawn as an inset shadow. Content
 * would paint over that inner ring, so the frame keeps 2px of padding and the scrolling
 * happens in a box inside it. `containerClassName` sizes the frame (h-64, max-h-80, ...). */
function Table({ className, containerClassName, ...props }: React.ComponentProps<"table"> & { containerClassName?: string }) {
  return (
    <div data-slot="table-container" className={cn("relative flex w-full flex-col bevel-field bg-canvas p-0.5", containerClassName)}>
      <div data-slot="table-scroll" className="scrollbar-r95 min-h-0 flex-1 overflow-auto">
        <table data-slot="table" className={cn("w-full border-collapse type-16 text-canvas-text", className)} {...props} />
      </div>
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("sticky top-0 z-10", className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("bg-material text-material-text", className)} {...props} />
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("data-[state=selected]:bg-hover data-[state=selected]:text-canvas-text-invert", className)}
      {...props}
    />
  )
}

/** Cells never spill into the next column: long text is cut with an ellipsis.
 * Give the table a min-width if you would rather scroll sideways than truncate. */
/** Header cells are beveled buttons; pass onClick + aria-sort for sortable columns */
function TableHead({ className, onClick, children, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      onClick={onClick}
      className={cn(
        "h-8 overflow-hidden text-ellipsis whitespace-nowrap bevel-button bg-material px-2 text-left align-middle type-16 font-normal text-material-text",
        onClick && "cursor-pointer select-none active:bevel-button-pressed",
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("h-7 overflow-hidden text-ellipsis whitespace-nowrap px-2 align-middle", className)} {...props} />
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("caption-bottom bg-material py-1 type-12 text-material-text", className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }

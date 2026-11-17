import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { TriangleLeft, TriangleRight } from "./icons"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="pagination" role="navigation" aria-label="pagination" className={cn("flex max-w-full type-16", className)} {...props} />
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-wrap items-center gap-1", className)} {...props} />
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = React.ComponentProps<"button"> & { isActive?: boolean }

/** Buttons rather than links, so they work with client-side state; the current page stays pressed */
function PaginationLink({ className, isActive, type = "button", ...props }: PaginationLinkProps) {
  return (
    <button
      data-slot="pagination-link"
      type={type}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "true" : undefined}
      className={cn(buttonVariants({ size: "md" }), "min-w-9 [--btn-px:8px]", className)}
      {...props}
    />
  )
}

function PaginationPrevious({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink {...props}>
      <TriangleLeft />
      {children}
    </PaginationLink>
  )
}

function PaginationNext({ children, ...props }: PaginationLinkProps) {
  return (
    <PaginationLink {...props}>
      {children}
      <TriangleRight />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="pagination-ellipsis" aria-hidden="true" className={cn("flex h-9 w-6 items-end justify-center pb-1.5", className)} {...props}>
      ...
    </span>
  )
}

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis }

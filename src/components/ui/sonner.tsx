import * as React from "react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"
import { MessageIcon } from "./message-icon"

/**
 * Toasts as Windows XP notification balloons, redrawn in pixels: a pale yellow bubble with a
 * tail pointing at the taskbar, a bold title, and a close box.
 *
 *   toast("Copy complete", { description: "3 files copied." })   // info icon
 *   toast.warning("Low disk space")                              // warning icon
 *   toast.error("Access denied")                                 // error icon
 *
 * Set `offset` so the tail lands on your taskbar or status area.
 */
function Toaster({ position = "bottom-right", closeButton = true, expand = true, visibleToasts = 3, icons, toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      data-slot="toaster"
      position={position}
      closeButton={closeButton}
      /* expanded: sonner's collapsed stack scales older toasts, which blurs pixel art */
      expand={expand}
      visibleToasts={visibleToasts}
      gap={4}
      icons={{
        info: <MessageIcon type="info" size={16} />,
        success: <MessageIcon type="info" size={16} />,
        warning: <MessageIcon type="warning" size={16} />,
        error: <MessageIcon type="error" size={16} />,
        close: (
          <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
            <path d="M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v2h1v1h1v1h1v1H6V7H5V6H3v1H2v1H0V7h1V6h1V5h1V3H2V2H1V1H0z" fill="currentColor" />
          </svg>
        ),
        ...icons,
      }}
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: "balloon flex w-full items-start gap-2 px-3 pb-[18px] pt-2.5 type-16",
          icon: "mt-0.5 flex shrink-0",
          content: "flex min-w-0 flex-1 flex-col gap-1 pr-5",
          title: "font-pixel-bold",
          description: "type-12",
          actionButton: "ml-auto inline-flex h-7 shrink-0 items-center bevel-button bg-material px-2 type-12 text-material-text active:bevel-button-pressed",
          cancelButton: "inline-flex h-7 shrink-0 items-center bevel-button bg-material px-2 type-12 text-material-text active:bevel-button-pressed",
          /* sonner styles this button outside any layer, so these need ! to win */
          closeButton:
            "!absolute !right-2 !top-2 !left-auto flex !size-4 items-center justify-center !rounded-none !border !border-border-dark !bg-tooltip !text-canvas-text !transform-none hover:!border-border-darkest active:!bg-canvas",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }

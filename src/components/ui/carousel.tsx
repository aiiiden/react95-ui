import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { TriangleLeft, TriangleRight } from "./icons"

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]

const CarouselContext = React.createContext<{ viewportRef: UseEmblaCarouselType[0]; api: CarouselApi; canPrev: boolean; canNext: boolean; orientation: "horizontal" | "vertical" } | null>(null)
function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("Carousel parts must be used inside <Carousel>")
  return ctx
}

function Carousel({ opts, orientation = "horizontal", setApi, className, children, ...props }: React.ComponentProps<"div"> & { opts?: CarouselOptions; orientation?: "horizontal" | "vertical"; setApi?: (api: CarouselApi) => void }) {
  const [viewportRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" })
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)
  React.useEffect(() => {
    if (!api) return
    const update = () => { setCanPrev(api.canScrollPrev()); setCanNext(api.canScrollNext()) }
    update()
    setApi?.(api)
    api.on("select", update).on("reInit", update)
    return () => { api.off("select", update).off("reInit", update) }
  }, [api, setApi])
  return (
    <CarouselContext.Provider value={{ viewportRef, api, canPrev, canNext, orientation }}>
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        onKeyDownCapture={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); api?.scrollPrev() }
          if (e.key === "ArrowRight") { e.preventDefault(); api?.scrollNext() }
        }}
        className={cn("flex items-center gap-2 type-16 text-material-text", orientation === "vertical" && "flex-col", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { viewportRef, orientation } = useCarousel()
  return (
    <div ref={viewportRef} data-slot="carousel-viewport" className="min-w-0 flex-1 overflow-hidden bevel-field bg-canvas text-canvas-text">
      <div data-slot="carousel-content" className={cn("flex", orientation === "vertical" && "flex-col", className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="carousel-item" role="group" aria-roledescription="slide" className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} {...props} />
}

const arrow = "flex size-9 shrink-0 items-center justify-center bevel-button bg-material text-material-text active:bevel-button-pressed disabled:text-material-text-disabled"

function CarouselPrevious({ className, "aria-label": label = "Previous slide", ...props }: React.ComponentProps<"button">) {
  const { api, canPrev } = useCarousel()
  return (
    <button data-slot="carousel-previous" type="button" aria-label={label} disabled={!canPrev} onClick={() => api?.scrollPrev()} className={cn(arrow, className)} {...props}>
      <TriangleLeft />
    </button>
  )
}

function CarouselNext({ className, "aria-label": label = "Next slide", ...props }: React.ComponentProps<"button">) {
  const { api, canNext } = useCarousel()
  return (
    <button data-slot="carousel-next" type="button" aria-label={label} disabled={!canNext} onClick={() => api?.scrollNext()} className={cn(arrow, className)} {...props}>
      <TriangleRight />
    </button>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi }

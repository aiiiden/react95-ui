import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "@/lib/utils"

function Anchor({ className, render, underline = true, ...props }: useRender.ComponentProps<"a"> & { underline?: boolean }) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        className: cn(
          "text-anchor visited:text-anchor-visited underline-offset-2 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted",
          underline ? "underline" : "hover:underline",
          className
        ),
      },
      props
    ),
    state: { slot: "anchor" },
  })
}

export { Anchor }

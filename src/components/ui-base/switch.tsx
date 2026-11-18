import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

/** Windows 95 had no switch. This one is built from its parts: a sunken track and a raised thumb. */
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-10 shrink-0 items-stretch bevel-field bg-canvas p-0.5 outline-none data-[checked]:bg-progress",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-material-text focus-visible:outline-offset-2",
        "data-[disabled]:bg-material data-[checked]:data-[disabled]:bg-material-dark",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="block w-4 bevel-button bg-material data-[checked]:translate-x-4" />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

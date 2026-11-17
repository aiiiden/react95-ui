import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cn } from "@/lib/utils"

function InputOTP({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return <OTPInput data-slot="input-otp" containerClassName={cn("flex items-center gap-2 has-disabled:opacity-100", containerClassName)} className={cn("disabled:cursor-default", className)} {...props} />
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center gap-1", className)} {...props} />
}

function InputOTPSlot({ index, className, ...props }: React.ComponentProps<"div"> & { index: number }) {
  const ctx = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = ctx?.slots[index] ?? {}
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn("relative flex h-9 w-8 items-center justify-center bevel-field bg-canvas type-16 text-canvas-text data-[active=true]:outline data-[active=true]:outline-1 data-[active=true]:outline-dotted data-[active=true]:outline-material-text data-[active=true]:outline-offset-1", className)}
      {...props}
    >
      {char}
      {hasFakeCaret && <span aria-hidden="true" className="pointer-events-none absolute h-4 w-px bg-canvas-text motion-safe:animate-[pulse_1s_steps(1)_infinite]" />}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <span className="block h-0.5 w-2 bg-material-text" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

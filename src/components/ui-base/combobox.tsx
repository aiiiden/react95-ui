import * as React from "react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { TriangleDown } from "@/components/ui/icons"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type ComboboxOption = { value: string; label: string; disabled?: boolean }

type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: React.ReactNode
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

/** A Select you can type into to filter (Popover + Command) */
function Combobox({ options, value, defaultValue = "", onValueChange, placeholder = "", searchPlaceholder, emptyText = "—", disabled, className, ...props }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const selected = options.find((o) => o.value === current)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-label={props["aria-label"]}
        disabled={disabled}
        data-slot="combobox"
        className={cn("group inline-flex h-9 w-48 items-stretch bevel-field bg-canvas p-0.5 text-left type-16 text-canvas-text outline-none disabled:bg-material disabled:text-engraved", className)}
      >
        <span className="flex min-w-0 flex-1 items-center px-2">
          <span className={cn("truncate group-focus-visible:bg-hover group-focus-visible:text-canvas-text-invert", !selected && "text-canvas-text-disabled")}>{selected?.label ?? placeholder}</span>
        </span>
        <span className="flex w-7 shrink-0 items-center justify-center bevel-button bg-material text-material-text group-aria-expanded:bevel-button-pressed">
          <TriangleDown />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) min-w-48 p-1">
        <Command>
          <CommandInput placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((o) => (
              <CommandItem
                key={o.value}
                value={o.label}
                disabled={o.disabled}
                onSelect={() => {
                  if (value === undefined) setInner(o.value)
                  onValueChange?.(o.value)
                  setOpen(false)
                }}
              >
                {o.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type ComboboxOption, type ComboboxProps }

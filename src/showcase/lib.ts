import * as React from "react"

/* The showcase is built twice from the same source: once on the Radix components
 * (src/components/ui) and once on the Base UI ones (src/components/ui-base, R95_LIB=base).
 * The two libraries differ in a few props; these helpers hide that from the demos.
 * The return types are the Radix ones because that is what the source is type-checked against. */
declare const __R95_BASE__: boolean
export const isBase = __R95_BASE__

/** Compose a part with your own element: asChild in Radix, render in Base UI */
export function slot(el: React.ReactElement) {
  return (isBase ? { render: el } : { asChild: true, children: el }) as { asChild: true; children: React.ReactElement }
}

type One = { value?: string; defaultValue?: string; onValueChange?: (value: string) => void }

/** One-of-many groups: Radix takes type="single" and a string, Base UI always an array */
export function one({ value, defaultValue, onValueChange }: One) {
  const props = isBase
    ? {
        ...(value !== undefined && { value: [value] }),
        ...(defaultValue !== undefined && { defaultValue: [defaultValue] }),
        ...(onValueChange && { onValueChange: (v: string[]) => v[0] && onValueChange(v[0]) }),
      }
    : {
        type: "single",
        ...(value !== undefined && { value }),
        ...(defaultValue !== undefined && { defaultValue }),
        ...(onValueChange && { onValueChange: (v: string) => v && onValueChange(v) }),
      }
  return props as { type: "single" } & One
}

/** The mixed state of a checkbox */
export const mixed = (isBase ? { indeterminate: true } : { checked: "indeterminate" }) as { checked: "indeterminate" }

import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/* Register React95 utilities so a later class replaces an earlier one of the same kind
 * (e.g. cn("type-16", "type-12") -> "type-12"). */
const twMerge = extendTailwindMerge<"r95-type" | "r95-bevel">({
  extend: {
    classGroups: {
      "r95-type": [{ type: ["10", "12", "16", "32", "48"] }],
      "r95-bevel": [
        "bevel",
        { bevel: ["button", "button-pressed", "thin", "thin-pressed", "field", "grouping", "status", "window", "flat", "none"] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        indigo: "border-transparent bg-[var(--color-semantic-indigo)] text-white hover:opacity-80",
        green: "border-transparent bg-[var(--color-semantic-green)] text-white hover:opacity-80",
        orange: "border-transparent bg-[var(--color-semantic-orange)] text-white hover:opacity-80",
        yellow: "border-transparent bg-[var(--color-semantic-yellow)] text-gray-900 hover:opacity-80",
        red: "border-transparent bg-[var(--color-semantic-red)] text-white hover:opacity-80",
        blue: "border-transparent bg-[var(--color-semantic-blue)] text-white hover:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

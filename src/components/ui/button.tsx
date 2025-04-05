
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wizardry-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-wizardry-navy to-black text-wizardry-parchment hover:shadow-[0_0_15px_rgba(75,0,130,0.5),0_0_10px_rgba(138,43,226,0.3)] border border-wizardry-purple/30 relative overflow-hidden",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-wizardry-purple/50 bg-black/80 backdrop-blur-sm hover:bg-wizardry-navy/30 hover:text-wizardry-mist hover:shadow-[0_0_15px_rgba(138,43,226,0.2)]",
        secondary:
          "bg-black text-wizardry-parchment hover:bg-wizardry-navy/40 border border-wizardry-purple/30 hover:border-wizardry-purple/70 hover:shadow-[0_0_15px_rgba(75,0,130,0.5)]",
        ghost: "hover:bg-wizardry-navy/10 hover:text-wizardry-mist",
        link: "text-wizardry-purple underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

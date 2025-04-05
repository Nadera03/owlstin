
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wizardry-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-wizardry-primary text-wizardry-parchment hover:bg-wizardry-primary/80 border border-wizardry-primary/50 shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-wizardry-primary/50 bg-transparent hover:bg-wizardry-primary/10 text-wizardry-parchment",
        secondary:
          "bg-wizardry-secondary text-wizardry-parchment hover:bg-wizardry-tertiary border border-wizardry-secondary/50",
        ghost: "hover:bg-wizardry-dark hover:text-wizardry-primary",
        link: "text-wizardry-primary underline-offset-4 hover:underline",
        mystical: "bg-wizardry-mystical text-wizardry-parchment hover:bg-wizardry-mystical/80 border border-wizardry-light/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
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
      >
        {/* Magical glow effect */}
        <span className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(155,135,245,0.8)_0%,_transparent_60%)] mix-blend-overlay pointer-events-none"></span>
        
        {props.children}
        
        {/* Bottom edge highlight */}
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-wizardry-light/20 pointer-events-none"></span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

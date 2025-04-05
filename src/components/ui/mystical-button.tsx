
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const mysticalButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wizardry-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-wizardry-primary text-wizardry-parchment hover:bg-wizardry-primary/80 border-2 border-wizardry-light/30 shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-wizardry-primary/50 bg-transparent hover:bg-wizardry-primary/20 text-wizardry-parchment",
        secondary:
          "bg-wizardry-secondary text-wizardry-parchment hover:bg-wizardry-tertiary border border-wizardry-secondary/70 shadow-lg",
        ghost: "hover:bg-wizardry-dark hover:text-wizardry-primary",
        link: "text-wizardry-primary underline-offset-4 hover:underline",
        mystical: "bg-wizardry-mystical text-wizardry-parchment hover:bg-wizardry-mystical/80 border border-wizardry-light/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
        royal: "bg-wizardry-deep-purple text-wizardry-parchment hover:bg-wizardry-deep-purple/80 border border-wizardry-gold/30 shadow-[0_0_15px_rgba(155,135,245,0.3)]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-md px-4",
        lg: "h-14 rounded-md px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MysticalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mysticalButtonVariants> {
  asChild?: boolean
}

const MysticalButton = React.forwardRef<HTMLButtonElement, MysticalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(mysticalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Magical glow effect */}
        <span className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_rgba(155,135,245,0.8)_0%,_transparent_60%)] mix-blend-overlay pointer-events-none"></span>
        
        {props.children}
        
        {/* Edge highlights */}
        <span className="absolute inset-x-0 bottom-0 h-1 bg-wizardry-light/20 pointer-events-none"></span>
        <span className="absolute inset-x-0 top-0 h-1 bg-wizardry-primary/30 pointer-events-none"></span>
      </Comp>
    )
  }
)
MysticalButton.displayName = "MysticalButton"

export { MysticalButton, mysticalButtonVariants }

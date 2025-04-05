
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useBiome } from "@/contexts/BiomeContext"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-archive-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-biome-wood text-archive-text hover:bg-biome-wood/80 border-2 border-biome-soil shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-archive-border bg-archive-base hover:bg-archive-secondary hover:border-archive-accent",
        secondary:
          "bg-archive-secondary text-archive-text hover:bg-archive-accent border border-archive-border",
        ghost: "hover:bg-archive-secondary hover:text-archive-accent",
        link: "text-archive-accent underline-offset-4 hover:underline",
        tropical: "bg-biome-tropical text-white hover:bg-biome-tropical/80 border-2 border-biome-tropical/60 shadow-md",
        savanna: "bg-biome-savanna text-archive-text hover:bg-biome-savanna/80 border-2 border-biome-savanna/60 shadow-md",
        tundra: "bg-biome-tundra text-archive-base hover:bg-biome-tundra/80 border-2 border-biome-tundra/60 shadow-md",
        desert: "bg-biome-desert text-archive-base hover:bg-biome-desert/80 border-2 border-biome-desert/60 shadow-md",
        forest: "bg-biome-forest text-white hover:bg-biome-forest/80 border-2 border-biome-forest/60 shadow-md",
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
  biomeType?: 'tropical' | 'savanna' | 'tundra' | 'desert' | 'forest';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, biomeType, ...props }, ref) => {
    const { currentBiome } = useBiome();
    const buttonBiome = biomeType || currentBiome;
    
    // Check if the biome type matches any of our variant names
    let biomeVariant = variant;
    if (buttonBiome && ['tropical', 'savanna', 'tundra', 'desert', 'forest'].includes(buttonBiome)) {
      biomeVariant = buttonBiome as any;
    }
    
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant: biomeVariant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Wood grain texture */}
        <span className="absolute inset-0 opacity-20 bg-repeat mix-blend-overlay pointer-events-none" 
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c5 0 10 10 15 10s10-10 15-10 10 10 15 10 10-10 15-10 10 10 15 10 10-10 15-10 10 10 15 10' stroke='%23ffffff' stroke-width='2' fill='none' /%3E%3C/svg%3E\")" }}>
        </span>
        
        {props.children}
        
        {/* Bark edge effect */}
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-biome-soil/30 pointer-events-none"></span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

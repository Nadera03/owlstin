
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useBiome } from "@/contexts/BiomeContext"

const jungleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-archive-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-biome-wood text-archive-text hover:bg-biome-wood/80 border-2 border-biome-wood/80 shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-biome-wood/80 bg-transparent hover:bg-biome-wood/20 text-archive-text",
        secondary:
          "bg-biome-moss text-archive-text hover:bg-biome-moss/80 border border-biome-soil shadow-lg",
        ghost: "hover:bg-archive-secondary hover:text-archive-accent",
        link: "text-archive-accent underline-offset-4 hover:underline",
        tropical: "bg-biome-tropical text-white hover:bg-biome-tropical/80 border-2 border-biome-tropical/60 shadow-lg",
        savanna: "bg-biome-savanna text-archive-text hover:bg-biome-savanna/80 border-2 border-biome-savanna/60 shadow-lg",
        tundra: "bg-biome-tundra text-archive-base hover:bg-biome-tundra/80 border-2 border-biome-tundra/60 shadow-lg",
        desert: "bg-biome-desert text-archive-base hover:bg-biome-desert/80 border-2 border-biome-desert/60 shadow-lg",
        forest: "bg-biome-forest text-white hover:bg-biome-forest/80 border-2 border-biome-forest/60 shadow-lg",
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

export interface JungleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof jungleButtonVariants> {
  asChild?: boolean
  biomeType?: 'tropical' | 'savanna' | 'tundra' | 'desert' | 'forest';
}

const JungleButton = React.forwardRef<HTMLButtonElement, JungleButtonProps>(
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
        className={cn(jungleButtonVariants({ variant: biomeVariant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Wood grain texture */}
        <span className="absolute inset-0 opacity-20 bg-repeat mix-blend-overlay pointer-events-none" 
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c5 0 10 10 15 10s10-10 15-10 10 10 15 10 10-10 15-10 10 10 15 10 10-10 15-10 10 10 15 10' stroke='%23ffffff' stroke-width='2' fill='none' /%3E%3C/svg%3E\")" }}>
        </span>
        
        {props.children}
        
        {/* Bark edge effect */}
        <span className="absolute inset-x-0 bottom-0 h-1 bg-biome-soil/30 pointer-events-none"></span>
        <span className="absolute inset-x-0 top-0 h-1 bg-biome-wood/70 pointer-events-none"></span>
      </Comp>
    )
  }
)
JungleButton.displayName = "JungleButton"

export { JungleButton, jungleButtonVariants }

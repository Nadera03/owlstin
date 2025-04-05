
import React from 'react';
import { useBiome } from '@/contexts/BiomeContext';

interface VineHeadingProps {
  children: React.ReactNode;
  className?: string;
  biomeType?: 'tropical' | 'savanna' | 'tundra' | 'desert' | 'forest';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const VineHeading: React.FC<VineHeadingProps> = ({ 
  children, 
  className = "", 
  biomeType: propBiomeType,
  level = 2
}) => {
  const biomeContext = useBiome();
  
  // Use prop biomeType if provided, otherwise use context
  const biomeType = propBiomeType || biomeContext.currentBiome;
  
  const getBiomeClasses = () => {
    switch (biomeType) {
      case 'tropical':
        return 'text-biome-tropical border-biome-vine after:bg-biome-vine';
      case 'savanna':
        return 'text-biome-savanna border-biome-savanna after:bg-biome-savanna';
      case 'tundra':
        return 'text-biome-tundra border-biome-tundra after:bg-biome-tundra';
      case 'desert':
        return 'text-biome-desert border-biome-desert after:bg-biome-desert';
      case 'forest':
        return 'text-biome-forest border-biome-forest after:bg-biome-forest';
      default:
        return 'text-biome-tropical border-biome-vine after:bg-biome-vine';
    }
  };
  
  const headingClasses = `relative font-headline uppercase tracking-wide mb-6 pb-3 ${getBiomeClasses()} ${className}`;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <div className="relative">
      <HeadingTag className={headingClasses}>
        {children}
        
        {/* Vines/decorative underline */}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current opacity-30"></span>
        <span className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-current"></span>
        
        {/* Hanging vines - only show for tropical */}
        {biomeType === 'tropical' && (
          <div className="absolute left-0 -bottom-12 w-full overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={`vine-${i}`} 
                className="absolute h-12 w-0.5 bg-biome-vine animate-vine-grow" 
                style={{
                  left: `${10 + i * 20}%`,
                  animationDelay: `${0.3 * i}s`,
                  opacity: 0.8 - (i * 0.1)
                }}>
                <div className="absolute -left-1 bottom-0 w-3 h-3 bg-biome-vine rounded-full"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Savanna tall grass */}
        {biomeType === 'savanna' && (
          <div className="absolute left-0 -bottom-8 w-full overflow-hidden">
            {[...Array(7)].map((_, i) => (
              <div 
                key={`grass-${i}`} 
                className="absolute h-8 w-1 bg-biome-savanna/60 rounded-t-full" 
                style={{
                  left: `${5 + i * 15}%`,
                  transform: `rotate(${-10 + i * 5}deg)`,
                  opacity: 0.9 - (i * 0.1)
                }}>
              </div>
            ))}
          </div>
        )}
        
        {/* Tundra icicles */}
        {biomeType === 'tundra' && (
          <div className="absolute left-0 -bottom-10 w-full overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div 
                key={`icicle-${i}`} 
                className="absolute w-1 bg-gradient-to-b from-biome-tundra to-white" 
                style={{
                  left: `${8 + i * 16}%`,
                  height: `${4 + Math.sin(i) * 6}px`,
                  opacity: 0.7
                }}>
              </div>
            ))}
          </div>
        )}
        
        {/* Desert sand drops */}
        {biomeType === 'desert' && (
          <div className="absolute left-0 -bottom-6 w-full overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div 
                key={`sand-${i}`} 
                className="absolute h-2 w-2 bg-biome-desert rounded-full" 
                style={{
                  left: `${4 + i * 12}%`,
                  bottom: `${-1 - i % 3}px`,
                  opacity: 0.6
                }}>
              </div>
            ))}
          </div>
        )}
        
        {/* Forest leaves */}
        {biomeType === 'forest' && (
          <div className="absolute left-0 -bottom-6 w-full overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div 
                key={`leaf-${i}`} 
                className="absolute h-4 w-6 bg-biome-forest rounded-full" 
                style={{
                  left: `${10 + i * 25}%`,
                  bottom: `-4px`,
                  opacity: 0.7,
                  transform: `rotate(${45 + i * 20}deg)`
                }}>
              </div>
            ))}
          </div>
        )}
      </HeadingTag>
    </div>
  );
};

export default VineHeading;

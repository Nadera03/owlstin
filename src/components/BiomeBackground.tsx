
import React, { useEffect, useState } from 'react';
import { useBiome } from '@/contexts/BiomeContext';

interface BiomeBackgroundProps {
  biomeType?: 'tropical' | 'savanna' | 'tundra' | 'desert' | 'forest';
}

const BiomeBackground: React.FC<BiomeBackgroundProps> = ({ biomeType: propBiomeType }) => {
  const biomeContext = useBiome();
  const [loaded, setLoaded] = useState(false);
  
  // Use prop biomeType if provided, otherwise use context
  const biomeType = propBiomeType || biomeContext.currentBiome;
  
  useEffect(() => {
    // Add a small delay for transition effect
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [biomeType]);
  
  const getBiomeClasses = () => {
    switch (biomeType) {
      case 'tropical':
        return 'bg-biome-tropical before:bg-tropical';
      case 'savanna':
        return 'bg-biome-savanna before:bg-savanna';
      case 'tundra': 
        return 'bg-biome-tundra before:bg-tundra';
      case 'desert':
        return 'bg-biome-desert before:bg-desert';
      case 'forest':
        return 'bg-biome-forest before:opacity-80';
      default:
        return 'bg-biome-tropical before:bg-tropical';
    }
  };
  
  const getPatternElement = () => {
    switch (biomeType) {
      case 'tropical':
        return (
          <div className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay" 
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 11.8l7.07 7.414v-.002zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23fff' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}>
          </div>
        );
      case 'savanna':
        return (
          <div className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay"
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}>
          </div>
        );
      case 'tundra':
        return (
          <div className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay"
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"}}>
          </div>
        );
      case 'desert':
        return (
          <div className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay"
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"}}>
          </div>
        );
      case 'forest':
        return (
          <div className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay"
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")"}}>
          </div>
        );
    }
  };

  const getBiomeElements = () => {
    switch (biomeType) {
      case 'tropical':
        return (
          <>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              {/* Animated vines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={`vine-${i}`}
                  className="absolute bg-biome-vine w-1 animate-vine-grow origin-top opacity-60"
                  style={{ 
                    left: `${10 + i * 12}%`, 
                    height: '80%', 
                    top: 0,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {/* Leaves on vines */}
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div 
                      key={`leaf-${i}-${j}`}
                      className="absolute w-8 h-6 bg-biome-tropical rounded-full -left-3 animate-leaf-sway"
                      style={{ 
                        top: `${20 + j * 30}%`,
                        animationDelay: `${i * 0.3 + j * 0.2}s`,
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </>
        );
        
      case 'savanna':
        return (
          <>
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-biome-savanna to-transparent"></div>
            {/* Grass elements */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`grass-${i}`}
                className="absolute bottom-0 bg-biome-savanna/80"
                style={{
                  left: `${5 + i * 5}%`,
                  height: `${10 + Math.random() * 15}px`,
                  width: '2px',
                  transform: `rotate(${-10 + Math.random() * 20}deg)`,
                  transformOrigin: 'bottom center'
                }}
              ></div>
            ))}
          </>
        );
        
      case 'tundra':
        return (
          <>
            {/* Snow particles */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={`snow-${i}`}
                className="absolute bg-white rounded-full opacity-80"
                style={{ 
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationName: 'float',
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationIterationCount: 'infinite',
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
            {/* Icy ground */}
            <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-biome-tundra/50 to-transparent"></div>
          </>
        );
        
      case 'desert':
        return (
          <>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-biome-desert/70 to-transparent"></div>
            {/* Sand dunes */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={`dune-${i}`}
                className="absolute bottom-0 bg-biome-desert/40"
                style={{
                  left: `${i * 33}%`,
                  width: '50%',
                  height: '60px',
                  borderRadius: '50% 50% 0 0'
                }}
              ></div>
            ))}
          </>
        );
        
      case 'forest':
        return (
          <>
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-biome-forest/30 to-transparent"></div>
            {/* Trees */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={`tree-${i}`}
                className="absolute bottom-0"
                style={{
                  left: `${5 + i * 12}%`,
                }}
              >
                <div className="w-2 h-16 bg-biome-wood"></div>
                <div 
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-16 bg-biome-forest rounded-full"
                  style={{
                    transform: 'translateX(-50%) rotate(0deg)',
                  }}
                ></div>
                <div 
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 w-10 h-12 bg-biome-forest rounded-full"
                  style={{
                    transform: 'translateX(-50%) rotate(0deg)',
                  }}
                ></div>
              </div>
            ))}
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base biome background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} ${getBiomeClasses()}`}>
        {/* Texture overlay */}
        {getPatternElement()}

        {/* Animated elements for each biome */}
        {getBiomeElements()}
      </div>
    </div>
  );
};

export default BiomeBackground;

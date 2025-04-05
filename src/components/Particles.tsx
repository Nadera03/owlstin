
import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
  isGold: boolean;
}

interface CastlevaniaElement {
  id: number;
  type: 'window' | 'bookshelf' | 'chandelier';
  x: number;
  y: number;
  size: number;
  zIndex: number;
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [castleElements, setCastleElements] = useState<CastlevaniaElement[]>([]);
  const animationFrameRef = useRef<number>();
  const chandelierRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.25,
        delay: Math.random() * 5,
        isGold: Math.random() > 0.5
      });
    }
    
    setParticles(newParticles);
    
    // Create Castlevania elements
    const newElements: CastlevaniaElement[] = [];
    
    // Add gothic windows
    for (let i = 0; i < 3; i++) {
      newElements.push({
        id: i,
        type: 'window',
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 10,
        size: Math.random() * 60 + 60,
        zIndex: 5
      });
    }
    
    // Add bookshelves
    for (let i = 0; i < 2; i++) {
      newElements.push({
        id: i + 3,
        type: 'bookshelf',
        x: Math.random() * 80 + 10,
        y: Math.random() * 30 + 60,
        size: Math.random() * 40 + 80,
        zIndex: 5
      });
    }
    
    // Add chandeliers
    for (let i = 0; i < 2; i++) {
      newElements.push({
        id: i + 5,
        type: 'chandelier',
        x: 30 + i * 40,
        y: 10,
        size: Math.random() * 20 + 80,
        zIndex: 10
      });
    }
    
    setCastleElements(newElements);
    
    // Add chandelier sway animation
    const animateChandelier = () => {
      if (chandelierRef.current) {
        // Gentle swaying motion
        const time = Date.now() / 1000;
        const swayAmount = Math.sin(time) * 3;
        chandelierRef.current.style.transform = `rotate(${swayAmount}deg)`;
      }
      animationFrameRef.current = requestAnimationFrame(animateChandelier);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateChandelier);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  const renderCastlevaniaElement = (element: CastlevaniaElement) => {
    switch (element.type) {
      case 'window':
        return (
          <div
            key={`window-${element.id}`}
            className="gothic-window"
            style={{
              position: 'absolute',
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size * 1.5}px`,
              zIndex: element.zIndex
            }}
          >
            <div className="absolute inset-0 opacity-60 bg-gradient-to-b from-wizardry-gold/5 to-wizardry-gold/10"></div>
          </div>
        );
        
      case 'bookshelf':
        return (
          <div
            key={`bookshelf-${element.id}`}
            className="bookshelf"
            style={{
              position: 'absolute',
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              zIndex: element.zIndex
            }}
          >
            <div className="bookshelf-shelf" style={{ top: '33%' }}></div>
            <div className="bookshelf-shelf" style={{ top: '66%' }}></div>
            
            {/* Books - top shelf */}
            {Array.from({ length: Math.floor(element.size / 12) }).map((_, i) => (
              <div
                key={`book-top-${i}`}
                className="book"
                style={{
                  left: i * 8,
                  height: '30%',
                  bottom: '70%',
                  backgroundColor: ['#8B0000', '#DC143C', '#D4AF37', '#B3901E', '#3c1502'][Math.floor(Math.random() * 5)]
                }}
              ></div>
            ))}
            
            {/* Books - middle shelf */}
            {Array.from({ length: Math.floor(element.size / 12) }).map((_, i) => (
              <div
                key={`book-mid-${i}`}
                className="book"
                style={{
                  left: i * 8,
                  height: '30%',
                  bottom: '37%',
                  backgroundColor: ['#8B0000', '#DC143C', '#D4AF37', '#B3901E', '#3c1502'][Math.floor(Math.random() * 5)]
                }}
              ></div>
            ))}
            
            {/* Books - bottom shelf */}
            {Array.from({ length: Math.floor(element.size / 12) }).map((_, i) => (
              <div
                key={`book-bottom-${i}`}
                className="book"
                style={{
                  left: i * 8,
                  height: '30%',
                  bottom: '3%',
                  backgroundColor: ['#8B0000', '#DC143C', '#D4AF37', '#B3901E', '#3c1502'][Math.floor(Math.random() * 5)]
                }}
              ></div>
            ))}
          </div>
        );
        
      case 'chandelier':
        return (
          <div
            ref={chandelierRef}
            key={`chandelier-${element.id}`}
            className="chandelier animate-sway"
            style={{
              position: 'absolute',
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size * 1.5}px`,
              zIndex: element.zIndex,
              transformOrigin: 'top center'
            }}
          >
            <div className="chandelier-base"></div>
            <div className="chandelier-chain"></div>
            <div className="chandelier-ring">
              {/* Candles */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI;
                const x = Math.cos(angle) * (element.size / 2 - 10);
                const y = Math.sin(angle) * (element.size / 2 - 10);
                return (
                  <div key={`candle-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(${x}px, ${y}px)` }}>
                    <div 
                      className="chandelier-candle" 
                      style={{ 
                        width: `${element.size / 20}px`, 
                        height: `${element.size / 8}px` 
                      }}
                    ></div>
                    <div 
                      className="chandelier-flame" 
                      style={{ 
                        top: `-${element.size / 16}px`, 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        width: `${element.size / 20}px`, 
                        height: `${element.size / 16}px` 
                      }}
                    ></div>
                  </div>
                );
              })}
              
              {/* Small chains connecting to candles */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI;
                const x = Math.cos(angle) * (element.size / 4);
                const y = Math.sin(angle) * (element.size / 4);
                return (
                  <div 
                    key={`chain-${i}`} 
                    style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
                      width: '1px',
                      height: `${element.size / 4}px`,
                      backgroundColor: '#D4AF37'
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden stone-wall">
      {/* Castle elements */}
      {castleElements.map(renderCastlevaniaElement)}
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.isGold ? '#D4AF37' : '#DC143C',
            opacity: particle.opacity,
            animationDuration: `${particle.speed * 8}s`,
            animationDelay: `${particle.delay}s`,
            boxShadow: particle.isGold 
              ? '0 0 5px rgba(212, 175, 55, 0.8)' 
              : '0 0 5px rgba(220, 20, 60, 0.8)'
          }}
        />
      ))}
      
      {/* Add some floating magical elements */}
      <div className="floating-element" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>
        <div className="w-12 h-12 star-orb"></div>
      </div>
      <div className="floating-element" style={{ top: '70%', left: '85%', animationDelay: '2s' }}>
        <div className="w-8 h-8 star-orb"></div>
      </div>
      <div className="floating-element" style={{ top: '40%', left: '90%', animationDelay: '1s' }}>
        <div className="w-10 h-10 star-orb"></div>
      </div>
    </div>
  );
}

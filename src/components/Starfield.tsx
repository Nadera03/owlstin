
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}

export default function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  
  useEffect(() => {
    if (!starfieldRef.current) return;
    
    const createStars = () => {
      const starCount = 100;
      const container = starfieldRef.current;
      if (!container) return;
      
      // Clear existing stars
      container.innerHTML = '';
      starsRef.current = [];
      
      // Create new stars
      for (let i = 0; i < starCount; i++) {
        const star: Star = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 1 + 0.5,
          delay: Math.random() * 5
        };
        
        starsRef.current.push(star);
        
        const starElement = document.createElement('div');
        starElement.className = 'star';
        starElement.style.left = `${star.x}%`;
        starElement.style.top = `${star.y}%`;
        starElement.style.width = `${star.size}px`;
        starElement.style.height = `${star.size}px`;
        starElement.style.opacity = star.opacity.toString();
        starElement.style.animationDuration = `${star.speed}s`;
        starElement.style.animationDelay = `${star.delay}s`;
        
        container.appendChild(starElement);
      }
    };
    
    createStars();
    
    // Recreate stars on window resize
    const handleResize = () => {
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={starfieldRef} className="starfield"></div>;
}

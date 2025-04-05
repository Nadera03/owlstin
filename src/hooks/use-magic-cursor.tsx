
import { useState, useEffect, useCallback } from "react";

interface MagicCursorOptions {
  trailCount?: number;
  trailSize?: number;
  trailColor?: string;
  cursorSize?: number;
  cursorRingSize?: number;
  cursorColor?: string;
  ringColor?: string;
  disableOnMobile?: boolean;
}

export function useMagicCursor({
  trailCount = 8,
  trailSize = 8,
  trailColor = "rgba(139, 0, 0, 0.7)",
  cursorSize = 12,
  cursorRingSize = 40,
  cursorColor = "#8B0000",
  ringColor = "rgba(139, 0, 0, 0.7)",
  disableOnMobile = true
}: MagicCursorOptions = {}) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; size: number; id: number }[]>([]);
  const [trailId, setTrailId] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  
  // Update cursor position and create trails
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Randomly add trail particles
    if (Math.random() > 0.6) {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * trailSize + 4,
        id: trailId
      };
      
      setTrails(prev => {
        // Limit the number of trails
        const updatedTrails = [...prev, newTrail];
        if (updatedTrails.length > trailCount) {
          return updatedTrails.slice(updatedTrails.length - trailCount);
        }
        return updatedTrails;
      });
      
      setTrailId(prev => prev + 1);
      
      // Remove trail after animation
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 1000);
    }
  }, [trailId, trailCount, trailSize]);
  
  // Check if cursor is over interactive elements
  const updatePointerStatus = useCallback(() => {
    const hoveredElement = document.elementFromPoint(position.x, position.y);
    const computedStyle = hoveredElement ? window.getComputedStyle(hoveredElement) : null;
    const isPointerNow = computedStyle?.cursor === 'pointer';
    setIsPointer(isPointerNow);
  }, [position.x, position.y]);
  
  // Track mouse events
  useEffect(() => {
    // Skip on mobile
    if (disableOnMobile && isMobile) {
      return;
    }
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', updatePointerStatus);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', updatePointerStatus);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [updateCursorPosition, updatePointerStatus, disableOnMobile, isMobile]);
  
  // Return the JSX elements for the cursor and trails
  const renderMagicCursor = useCallback(() => {
    if (disableOnMobile && isMobile) {
      return null;
    }
    
    return (
      <>
        <div 
          className="magic-cursor-dot" 
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            backgroundColor: cursorColor,
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`
          }}
        />
        <div 
          className="magic-cursor-outline" 
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            width: isPointer ? `${cursorRingSize + 10}px` : `${cursorRingSize}px`,
            height: isPointer ? `${cursorRingSize + 10}px` : `${cursorRingSize}px`,
            borderColor: isPointer ? cursorColor : ringColor
          }}
        />
        
        {/* Trail particles */}
        <div className="magic-trail">
          {trails.map((trail) => (
            <div 
              key={`trail-${trail.id}`}
              className="magic-trail-particle"
              style={{
                left: `${trail.x}px`,
                top: `${trail.y}px`,
                width: `${trail.size}px`,
                height: `${trail.size}px`,
                backgroundColor: trailColor,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      </>
    );
  }, [
    position, 
    isClicking, 
    isPointer, 
    trails, 
    cursorSize, 
    cursorRingSize, 
    cursorColor, 
    ringColor, 
    trailColor, 
    disableOnMobile, 
    isMobile
  ]);
  
  return { renderMagicCursor, isMobile };
}

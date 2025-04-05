
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface SkillOrbProps {
  skill: string;
  level: number;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export default function SkillOrb({ 
  skill, 
  level, 
  color = "#44DDDD", 
  size = "md" 
}: SkillOrbProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Convert size to pixel values
  const sizeMap = {
    sm: { orbSize: 80, fontSize: "text-xs", ringSize: 90 },
    md: { orbSize: 120, fontSize: "text-sm", ringSize: 140 },
    lg: { orbSize: 160, fontSize: "text-base", ringSize: 180 }
  };
  
  const { orbSize, fontSize, ringSize } = sizeMap[size];
  
  useEffect(() => {
    if (isHovered) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);
  
  return (
    <div 
      className="relative flex flex-col items-center justify-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isAnimating && (
          <>
            <motion.div
              initial={{ width: orbSize, height: orbSize, opacity: 0.8 }}
              animate={{ 
                width: ringSize * 1.5, 
                height: ringSize * 1.5, 
                opacity: 0 
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ borderColor: color }}
              className="absolute rounded-full border-2 border-dashed"
            />
            <motion.div
              initial={{ width: orbSize, height: orbSize, opacity: 0.6 }}
              animate={{ 
                width: ringSize * 1.2, 
                height: ringSize * 1.2, 
                opacity: 0 
              }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              style={{ borderColor: color }}
              className="absolute rounded-full border"
            />
          </>
        )}
      </div>
      
      {/* Main orb */}
      <motion.div 
        className="relative flex items-center justify-center rounded-full bg-black bg-opacity-30 backdrop-blur-sm border overflow-hidden shadow-lg"
        style={{ 
          width: orbSize, 
          height: orbSize, 
          borderColor: `${color}40`  // 40 is hex for 25% opacity
        }}
        whileHover={{ scale: 1.05 }}
        animate={isHovered ? { rotate: 360 } : {}}
        transition={{ duration: isHovered ? 20 : 0, ease: "linear", repeat: Infinity }}
      >
        {/* Inner glowing effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-30 blur-md"
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
        />
        
        {/* Skill name */}
        <span className={`z-10 font-cinzel font-bold text-center ${fontSize} max-w-[80%] text-balance`} 
          style={{ color }}>
          {skill}
        </span>
      </motion.div>
      
      {/* Skill level indicator */}
      <div className={`w-full mt-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
        <Progress 
          value={level} 
          className="h-1 bg-black bg-opacity-50" 
          indicatorClassName="bg-opacity-80"
          style={{ backgroundColor: `${color}20`, color }}
        />
        <div className="flex justify-between text-xs mt-1">
          <span style={{ color }} className="opacity-70">Novice</span>
          <span style={{ color }} className="opacity-70">Expert</span>
        </div>
      </div>
    </div>
  );
}

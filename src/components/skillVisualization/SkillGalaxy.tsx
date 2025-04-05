
import React, { useState, useEffect } from "react";
import SkillOrb from "./SkillOrb";
import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  color: string;
}

interface SkillGalaxyProps {
  skills: Skill[];
  title?: string;
  description?: string;
}

export default function SkillGalaxy({ 
  skills, 
  title = "Your Skill Galaxy",
  description = "Explore your magical abilities in this interactive skill visualization"
}: SkillGalaxyProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [galaxyLayout, setGalaxyLayout] = useState<"orbit" | "cluster" | "grid">("orbit");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  
  const categories = ["all", ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === selectedCategory));
    }
  }, [selectedCategory, skills]);
  
  const getPositionStyle = (index: number, total: number) => {
    if (galaxyLayout === "orbit") {
      // Orbit layout - skills orbit around a center point
      const radius = Math.min(300, window.innerWidth * 0.4);
      const angleStep = (2 * Math.PI) / total;
      const angle = index * angleStep;
      
      // Calculate position based on angle
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      };
    }
    
    if (galaxyLayout === "cluster") {
      // Cluster layout - skills form organic clusters
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200 + 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      };
    }
    
    // Grid layout - skills form a grid
    return {};
  };
  
  const containerVariants = {
    orbit: {
      transition: { staggerChildren: 0.1 }
    },
    cluster: {
      transition: { staggerChildren: 0.05 }
    },
    grid: {
      transition: { staggerChildren: 0.03 }
    }
  };
  
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cinzel font-bold mb-4 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            {title}
          </h2>
          <p className="text-magical-starlight/70 max-w-2xl mx-auto">
            {description}
          </p>
          
          {/* Category filters */}
          <div className="mt-8 flex justify-center flex-wrap gap-2">
            <ToggleGroup type="single" value={selectedCategory} onValueChange={(val) => val && setSelectedCategory(val)}>
              {categories.map((category) => (
                <ToggleGroupItem key={category} value={category} className="capitalize">
                  {category}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          {/* Layout controls */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <span className="text-magical-starlight/60 text-sm">Layout:</span>
            <Button 
              variant={galaxyLayout === "orbit" ? "default" : "outline"} 
              size="sm"
              onClick={() => setGalaxyLayout("orbit")}
              className="rounded-full"
            >
              Orbit
            </Button>
            <Button 
              variant={galaxyLayout === "cluster" ? "default" : "outline"} 
              size="sm"
              onClick={() => setGalaxyLayout("cluster")}
              className="rounded-full"
            >
              Cluster
            </Button>
            <Button 
              variant={galaxyLayout === "grid" ? "default" : "outline"}
              size="sm" 
              onClick={() => setGalaxyLayout("grid")}
              className="rounded-full"
            >
              Grid
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="ml-4"
              onClick={() => {
                setGalaxyLayout("cluster"); 
                setTimeout(() => setGalaxyLayout("orbit"), 100);
              }}
            >
              <Wand2 className="mr-1 h-4 w-4" />
              <span>Shuffle</span>
            </Button>
          </div>
        </div>
        
        {/* Skill orbs display area */}
        <div 
          className={`relative min-h-[600px] ${galaxyLayout === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-10" : "h-[600px]"}`}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={galaxyLayout}
            className={galaxyLayout === "grid" ? "contents" : ""}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`${galaxyLayout !== "grid" ? "absolute" : ""}`}
                style={galaxyLayout !== "grid" ? getPositionStyle(index, filteredSkills.length) : {}}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  duration: 0.6
                }}
              >
                <SkillOrb 
                  skill={skill.name} 
                  level={skill.level} 
                  color={skill.color} 
                  size={galaxyLayout === "grid" ? "sm" : (index % 3 === 0 ? "lg" : "md")}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Central glow effect for orbit layout */}
          {galaxyLayout === "orbit" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full bg-magical-glowing-teal/30 animate-pulse filter blur-xl"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

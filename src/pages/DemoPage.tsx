
import React from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import SkillGalaxy from "@/components/skillVisualization/SkillGalaxy";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Mock data for skill visualization
const mockSkills = [
  { id: "1", name: "React", level: 90, category: "frontend", color: "#61DAFB" },
  { id: "2", name: "TypeScript", level: 85, category: "language", color: "#3178C6" },
  { id: "3", name: "Node.js", level: 75, category: "backend", color: "#539E43" },
  { id: "4", name: "UI/UX Design", level: 80, category: "design", color: "#FF7262" },
  { id: "5", name: "Machine Learning", level: 65, category: "ai", color: "#FF6384" },
  { id: "6", name: "Data Analysis", level: 70, category: "data", color: "#4BC0C0" },
  { id: "7", name: "Cloud Architecture", level: 60, category: "devops", color: "#36A2EB" },
  { id: "8", name: "API Design", level: 85, category: "backend", color: "#9966FF" },
  { id: "9", name: "CSS/SCSS", level: 90, category: "frontend", color: "#FF9F40" },
  { id: "10", name: "Python", level: 80, category: "language", color: "#FFCD56" },
  { id: "11", name: "Blockchain", level: 50, category: "emerging", color: "#4D5360" },
  { id: "12", name: "AR/VR", level: 45, category: "emerging", color: "#C9CBCF" },
  { id: "13", name: "Mobile Dev", level: 75, category: "frontend", color: "#8CD98C" },
  { id: "14", name: "SQL", level: 85, category: "data", color: "#FF6384" },
  { id: "15", name: "Docker", level: 70, category: "devops", color: "#2496ED" },
];

export default function DemoPage() {
  // Set dark mode on mount
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight overflow-hidden">
      <Starfield />
      <MagicCursor />
      <Navbar />
      
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center text-magical-glowing-teal hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Interactive Skill Visualization
          </h1>
          <p className="text-magical-starlight/80 text-lg max-w-2xl mx-auto">
            Explore your skills in an enchanted, interactive galaxy. Perfect for showcasing your abilities to recruiters or tracking your professional growth.
          </p>
        </div>
      </section>
      
      {/* Skill Galaxy Component */}
      <SkillGalaxy 
        skills={mockSkills} 
        title="Your Professional Constellation" 
        description="Explore your skills in this interactive visualization. Toggle between different layouts and categories to see your talents from different perspectives."
      />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-magical-glowing-teal/20">
        <div className="container mx-auto text-center">
          <p className="text-magical-starlight/60 text-sm">
            © {new Date().getFullYear()} Owlstin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

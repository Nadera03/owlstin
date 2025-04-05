
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import SkillGalaxy from "@/components/skillVisualization/SkillGalaxy";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import SkillDetailModal from "@/components/skillVisualization/SkillDetailModal";

// Skill interface for better type safety
interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  color: string;
  description?: string;
  resources?: string[];
  projectIdea?: string;
}

// Initial skill data
const initialSkills: Skill[] = [
  { id: "1", name: "React", level: 90, category: "frontend", color: "#61DAFB", 
    description: "A JavaScript library for building user interfaces with a component-based architecture.",
    resources: ["React Official Docs: https://reactjs.org/docs/getting-started.html", "React Hooks Tutorial: https://www.youtube.com/watch?v=ec8vSKJuZTk"],
    projectIdea: "Build a personal portfolio using React and Framer Motion for animations." },
  { id: "2", name: "TypeScript", level: 85, category: "language", color: "#3178C6",
    description: "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    resources: ["TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/", "TypeScript in 5 minutes: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html"],
    projectIdea: "Convert an existing JavaScript project to TypeScript to appreciate its benefits." },
  { id: "3", name: "Node.js", level: 75, category: "backend", color: "#539E43",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for building server-side applications.",
    resources: ["Node.js Docs: https://nodejs.org/en/docs/", "Node.js Crash Course: https://www.youtube.com/watch?v=fBNz5xF-Kx4"],
    projectIdea: "Create a RESTful API with Express.js and MongoDB." },
  { id: "4", name: "UI/UX Design", level: 80, category: "design", color: "#FF7262",
    description: "The process of creating intuitive and aesthetically pleasing interfaces that enhance user experience.",
    resources: ["UI/UX Design Fundamentals: https://www.youtube.com/watch?v=wIuVvCuiJhU", "Figma Tutorial: https://www.figma.com/resources/learn-design/"],
    projectIdea: "Design a mobile app interface in Figma, focusing on user flow and accessibility." },
  { id: "5", name: "Machine Learning", level: 65, category: "ai", color: "#FF6384",
    description: "Building systems that can learn from and make decisions based on data.",
    resources: ["Machine Learning Crash Course by Google: https://developers.google.com/machine-learning/crash-course", "Practical Deep Learning for Coders: https://course.fast.ai/"],
    projectIdea: "Train a simple image classifier using TensorFlow to recognize different categories." },
  { id: "6", name: "Data Analysis", level: 70, category: "data", color: "#4BC0C0",
    description: "The process of inspecting, cleansing, transforming, and modeling data to discover useful information.",
    resources: ["Python for Data Analysis: https://wesmckinney.com/book/", "Kaggle Learn: https://www.kaggle.com/learn/overview"],
    projectIdea: "Analyze and visualize a public dataset using pandas and matplotlib." },
  { id: "7", name: "Cloud Architecture", level: 60, category: "devops", color: "#36A2EB",
    description: "Designing and implementing cloud-based systems that are scalable, reliable, and cost-effective.",
    resources: ["AWS Free Tier: https://aws.amazon.com/free/", "Azure Fundamentals: https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/"],
    projectIdea: "Deploy a serverless application using AWS Lambda or Azure Functions." },
  { id: "8", name: "API Design", level: 85, category: "backend", color: "#9966FF",
    description: "Creating interfaces that allow different software systems to communicate with each other.",
    resources: ["RESTful API Design: https://restfulapi.net/", "GraphQL Tutorial: https://www.howtographql.com/"],
    projectIdea: "Design and implement a GraphQL API for a book collection system." },
  { id: "9", name: "CSS/SCSS", level: 90, category: "frontend", color: "#FF9F40",
    description: "Languages used to style and layout web pages, with SCSS adding features like variables and nesting.",
    resources: ["CSS Tricks: https://css-tricks.com/", "SCSS Crash Course: https://www.youtube.com/watch?v=Zz6eOVaaelI"],
    projectIdea: "Create a responsive landing page with complex animations using SCSS." },
  { id: "10", name: "Python", level: 80, category: "language", color: "#FFCD56",
    description: "A versatile programming language used in web development, data science, AI, and automation.",
    resources: ["Python Official Docs: https://docs.python.org/3/tutorial/", "Automate the Boring Stuff with Python: https://automatetheboringstuff.com/"],
    projectIdea: "Build a web scraper to collect and analyze data from a website." },
  { id: "11", name: "Blockchain", level: 50, category: "emerging", color: "#4D5360",
    description: "A distributed ledger technology that enables secure, transparent, and tamper-proof transactions.",
    resources: ["Blockchain Basics: https://www.coursera.org/learn/blockchain-basics", "Solidity Tutorial: https://cryptozombies.io/"],
    projectIdea: "Create a simple smart contract on Ethereum's test network." },
  { id: "12", name: "AR/VR", level: 45, category: "emerging", color: "#C9CBCF",
    description: "Technologies that create immersive experiences by overlaying digital content on the real world (AR) or creating entirely virtual environments (VR).",
    resources: ["A-Frame WebVR: https://aframe.io/", "ARKit Documentation: https://developer.apple.com/augmented-reality/"],
    projectIdea: "Build a simple AR application that places 3D objects in the real world using A-Frame or ARKit." },
  { id: "13", name: "Mobile Dev", level: 75, category: "frontend", color: "#8CD98C",
    description: "Creating applications for mobile devices using frameworks like React Native, Flutter, or native development tools.",
    resources: ["React Native Docs: https://reactnative.dev/docs/getting-started", "Flutter Tutorials: https://flutter.dev/docs/get-started"],
    projectIdea: "Build a cross-platform mobile app with React Native that integrates with a RESTful API." },
  { id: "14", name: "SQL", level: 85, category: "data", color: "#FF6384",
    description: "A language designed for managing and manipulating relational databases.",
    resources: ["SQL Tutorial: https://www.w3schools.com/sql/", "PostgreSQL Documentation: https://www.postgresql.org/docs/"],
    projectIdea: "Design and implement a database schema for an e-commerce platform with complex relationships." },
  { id: "15", name: "Docker", level: 70, category: "devops", color: "#2496ED",
    description: "A platform for developing, shipping, and running applications in containers.",
    resources: ["Docker Documentation: https://docs.docker.com/get-started/", "Docker Crash Course: https://www.youtube.com/watch?v=pTFZFxd4hOI"],
    projectIdea: "Containerize a full-stack application using Docker and Docker Compose." },
];

export default function DemoPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [totalSkillLevel, setTotalSkillLevel] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { toast } = useToast();

  // Set dark mode on mount and calculate total skill level
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    
    // Calculate total skill level percentage
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    const maxPossible = skills.length * 100;
    setTotalSkillLevel(Math.round((total / maxPossible) * 100));
    
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [skills]);
  
  // Handle skill click
  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  // Handle skill level update
  const handleSkillLevelUpdate = (id: string, newLevel: number) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => 
        skill.id === id ? { ...skill, level: newLevel } : skill
      )
    );
    
    toast({
      title: "Skill Updated",
      description: "Your skill level has been updated successfully.",
    });
  };

  // Add a new skill
  const handleAddSkill = () => {
    // This would typically open a form modal
    toast({
      title: "Add Skill",
      description: "A form to add new skills would open here.",
    });
  };

  // Generate a report
  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your skill report is being generated.",
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your skill report has been generated and is ready for download.",
      });
    }, 2000);
  };
  
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
          <p className="text-magical-starlight/80 text-lg max-w-2xl mx-auto mb-8">
            Explore your skills in an enchanted, interactive galaxy. Perfect for showcasing your abilities to recruiters or tracking your professional growth.
          </p>
          
          {/* Overall progress */}
          <div className="max-w-md mx-auto mb-8">
            <h3 className="text-lg mb-2">Overall Mastery: {totalSkillLevel}%</h3>
            <Progress value={totalSkillLevel} className="h-2" 
                     indicatorClassName={`bg-gradient-to-r from-magical-glowing-teal to-purple-500`} />
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button onClick={handleAddSkill} className="bg-magical-glowing-teal hover:bg-magical-glowing-teal/80">
              <Plus className="w-4 h-4 mr-2" />
              Add New Skill
            </Button>
            <Button onClick={handleGenerateReport} variant="outline" className="border-magical-glowing-teal text-magical-glowing-teal">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </section>
      
      {/* Skill Galaxy Component */}
      <SkillGalaxy 
        skills={skills} 
        title="Your Professional Constellation" 
        description="Explore your skills in this interactive visualization. Toggle between different layouts and categories to see your talents from different perspectives."
        onSkillClick={handleSkillClick}
      />

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skill={selectedSkill}
          onUpdateLevel={handleSkillLevelUpdate}
        />
      )}
      
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

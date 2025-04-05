
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Map, 
  Calendar, 
  Star, 
  Zap, 
  TrendingUp, 
  Clock, 
  Flag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillProgress {
  skill: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  estimatedHours: number;
}

interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  date?: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  skills: string[];
  completed: boolean;
  dueDate?: string;
}

export default function DashboardPage() {
  // Set dark mode and scroll to top on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [overallProgress, setOverallProgress] = useState(42);
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([
    { skill: "Node.js", progress: 60, status: "in-progress", estimatedHours: 20 },
    { skill: "PostgreSQL", progress: 30, status: "in-progress", estimatedHours: 25 },
    { skill: "Docker", progress: 0, status: "not-started", estimatedHours: 15 },
    { skill: "AWS", progress: 0, status: "not-started", estimatedHours: 30 },
    { skill: "GraphQL", progress: 0, status: "not-started", estimatedHours: 12 }
  ]);
  
  const [userBadges, setUserBadges] = useState<Badge[]>([
    { 
      id: 1, 
      name: "First Steps", 
      icon: "🚀", 
      description: "Started your learning journey", 
      earned: true,
      date: "2023-09-15"
    },
    { 
      id: 2, 
      name: "Consistent Learner", 
      icon: "🔥", 
      description: "Learned for 7 days in a row", 
      earned: true,
      date: "2023-09-22"
    },
    { 
      id: 3, 
      name: "Node Novice", 
      icon: "📦", 
      description: "Completed 50% of Node.js learning path", 
      earned: true,
      date: "2023-10-05"
    },
    { 
      id: 4, 
      name: "SQL Wizard", 
      icon: "🧙‍♂️", 
      description: "Completed PostgreSQL learning path", 
      earned: false
    },
    { 
      id: 5, 
      name: "Container Master", 
      icon: "🐳", 
      description: "Completed Docker learning path", 
      earned: false
    },
    { 
      id: 6, 
      name: "Cloud Architect", 
      icon: "☁️", 
      description: "Completed AWS learning path", 
      earned: false
    }
  ]);
  
  const [upcomingProjects, setUpcomingProjects] = useState<Project[]>([
    {
      id: 1,
      name: "RESTful API with Node.js & Express",
      description: "Build a simple REST API that connects to a PostgreSQL database",
      skills: ["Node.js", "Express", "PostgreSQL"],
      completed: false,
      dueDate: "2023-10-30"
    },
    {
      id: 2,
      name: "Docker Containerization",
      description: "Containerize your Node.js application using Docker",
      skills: ["Docker", "Node.js"],
      completed: false,
      dueDate: "2023-11-15"
    },
    {
      id: 3,
      name: "AWS Deployment",
      description: "Deploy your containerized application to AWS",
      skills: ["AWS", "Docker"],
      completed: false,
      dueDate: "2023-12-01"
    }
  ]);
  
  const updateSkillProgress = (index: number, newProgress: number) => {
    setSkillProgress(prev => {
      const updated = [...prev];
      updated[index].progress = newProgress;
      updated[index].status = newProgress === 100 ? "completed" : "in-progress";
      
      // Recalculate overall progress
      const totalSkills = updated.length;
      const completedProgress = updated.reduce((sum, skill) => sum + skill.progress, 0);
      const newOverallProgress = Math.floor(completedProgress / (totalSkills * 100) * 100);
      setOverallProgress(newOverallProgress);
      
      // Check if we need to award a badge
      if (updated[index].progress === 100) {
        const relevantBadgeIndex = userBadges.findIndex(
          badge => badge.name.toLowerCase().includes(updated[index].skill.toLowerCase())
        );
        
        if (relevantBadgeIndex !== -1 && !userBadges[relevantBadgeIndex].earned) {
          const updatedBadges = [...userBadges];
          updatedBadges[relevantBadgeIndex].earned = true;
          updatedBadges[relevantBadgeIndex].date = new Date().toISOString().split('T')[0];
          setUserBadges(updatedBadges);
          
          toast({
            title: "New Badge Earned!",
            description: `You've earned the ${userBadges[relevantBadgeIndex].name} badge!`,
          });
        }
      }
      
      return updated;
    });
  };
  
  return (
    <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <MagicCursor />
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header */}
          <section className="py-8 md:py-12">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Your Magical Journey
            </h1>
            <p className="text-magical-starlight/80 text-lg max-w-3xl mb-8">
              Welcome to your personalized dashboard. Track your progress, earn magical badges, and follow your enchanted learning path.
            </p>
            
            {/* Overall Progress Card */}
            <Card className="magical-card mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Progress Orb */}
                  <div className="relative w-40 h-40 shrink-0">
                    <div className="absolute inset-0 bg-magical-glowing-teal/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Crystal ball with progress */}
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-magical-deep-purple to-magical-enchanted border border-magical-glowing-teal/30 relative overflow-hidden flex items-center justify-center">
                        <div className="text-4xl font-bold text-magical-starlight">
                          {overallProgress}%
                        </div>
                        
                        {/* Fill level based on progress */}
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-magical-glowing-teal/30 transition-all duration-1000"
                          style={{ height: `${overallProgress}%` }}
                        ></div>
                        
                        {/* Particle effects */}
                        <div className="absolute inset-0">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div 
                              key={i}
                              className="absolute w-1 h-1 bg-magical-glowing-teal/70 rounded-full animate-ping"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random() * 3}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-cinzel mb-4 text-magical-starlight">Your Magical Progress</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-magical-starlight/80">Overall Completion</span>
                          <span className="text-magical-glowing-teal">{overallProgress}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-2 bg-magical-deep-purple" indicatorClassName="bg-magical-glowing-teal" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-magical-starlight/80">Job Match Potential</span>
                          <span className="text-magical-glowing-teal">100%</span>
                        </div>
                        <Progress value={100} className="h-2 bg-magical-deep-purple" indicatorClassName="bg-gradient-to-r from-magical-glowing-teal to-magical-purple-light" />
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-magical-glowing-teal mr-2" />
                          <span className="text-magical-starlight/80">
                            <span className="text-magical-glowing-teal font-bold">2</span> Skills in Progress
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-magical-glowing-teal mr-2" />
                          <span className="text-magical-starlight/80">
                            <span className="text-magical-glowing-teal font-bold">3</span> Badges Earned
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Button className="magical-button" onClick={() => navigate("/job-seeker")}>
                      Update Resume
                    </Button>
                    <Button variant="outline" className="border-magical-glowing-teal/50 text-magical-starlight">
                      View Job Matches
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Skill Progress */}
            <div className="lg:col-span-2">
              {/* Upskilling Roadmap */}
              <Card className="magical-card mb-8">
                <CardHeader className="pb-3">
                  <CardTitle className="font-cinzel text-2xl flex items-center bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    <Map className="mr-2 h-5 w-5 text-magical-glowing-teal" />
                    Your Magical Upskilling Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="relative">
                    {/* Skill Progress Items */}
                    <div className="space-y-8">
                      {skillProgress.map((skill, index) => (
                        <div key={index} className="relative">
                          {/* Connecting line */}
                          {index < skillProgress.length - 1 && (
                            <div className="absolute h-8 w-0.5 bg-magical-deep-purple left-6 top-full"></div>
                          )}
                          
                          <div className={`flex gap-6 items-start ${
                            skill.status === "completed" 
                              ? "opacity-100" 
                              : skill.status === "in-progress"
                                ? "opacity-100"
                                : "opacity-60"
                          }`}>
                            {/* Skill Status Icon */}
                            <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${
                              skill.status === "completed" 
                                ? "bg-magical-glowing-teal text-magical-midnight" 
                                : skill.status === "in-progress"
                                  ? "bg-magical-deep-purple border-2 border-magical-glowing-teal"
                                  : "bg-magical-deep-purple"
                            }`}>
                              {skill.status === "completed" ? (
                                <CheckCircle2 className="h-6 w-6" />
                              ) : skill.status === "in-progress" ? (
                                <div className="text-magical-glowing-teal">
                                  {skill.progress}%
                                </div>
                              ) : (
                                <Clock className="h-6 w-6 text-magical-starlight/60" />
                              )}
                            </div>
                            
                            {/* Skill Content */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                <h3 className="text-xl font-cinzel text-magical-starlight">
                                  {skill.skill}
                                </h3>
                                
                                <div className="flex items-center gap-4">
                                  <div className="text-magical-starlight/70 flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Est. {skill.estimatedHours} hours
                                  </div>
                                  
                                  {skill.status !== "completed" && (
                                    <div className="flex gap-2">
                                      <Button 
                                        size="sm" 
                                        className="magical-button py-0 h-8"
                                        onClick={() => navigate("/job-seeker")}
                                      >
                                        Learn
                                      </Button>
                                      
                                      {skill.status === "in-progress" && (
                                        <Button 
                                          size="sm" 
                                          variant="outline" 
                                          className="border-magical-glowing-teal/50 py-0 h-8"
                                          onClick={() => updateSkillProgress(index, 100)}
                                        >
                                          Complete
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <Progress 
                                value={skill.progress} 
                                className="h-2 mb-3 bg-magical-deep-purple" 
                                indicatorClassName={`${
                                  skill.status === "completed" 
                                    ? "bg-magical-glowing-teal" 
                                    : "bg-gradient-to-r from-magical-purple-light to-magical-glowing-teal"
                                }`} 
                              />
                              
                              <div className="bg-magical-deep-purple/30 rounded-lg p-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                  <div className="flex-1">
                                    <h4 className="font-cinzel text-magical-glowing-teal mb-2 text-sm">Key Learning Resources</h4>
                                    <ul className="space-y-1 text-magical-starlight/70 text-sm">
                                      <li className="flex items-center">
                                        <Star className="h-3 w-3 text-magical-glowing-teal mr-2" />
                                        Official Documentation
                                      </li>
                                      <li className="flex items-center">
                                        <Star className="h-3 w-3 text-magical-glowing-teal mr-2" />
                                        Video Course (12 hours)
                                      </li>
                                      <li className="flex items-center">
                                        <Star className="h-3 w-3 text-magical-glowing-teal mr-2" />
                                        Interactive Tutorial
                                      </li>
                                    </ul>
                                  </div>
                                  
                                  <div className="flex-1">
                                    <h4 className="font-cinzel text-magical-glowing-teal mb-2 text-sm">Suggested Project</h4>
                                    <p className="text-magical-starlight/70 text-sm">
                                      Build a simple {skill.skill} application to demonstrate key concepts.
                                    </p>
                                  </div>
                                </div>
                                
                                {(skill.status === "in-progress" || skill.status === "completed") && (
                                  <div className="mt-3 pt-3 border-t border-magical-deep-purple">
                                    <div className="flex justify-between items-center">
                                      <div className="text-sm text-magical-starlight/70">Progress Update</div>
                                      <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="10"
                                        value={skill.progress}
                                        onChange={(e) => updateSkillProgress(index, parseInt(e.target.value))}
                                        className="w-48 h-1.5 bg-magical-deep-purple rounded-lg appearance-none cursor-pointer"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Project Roadmap */}
              <Card className="magical-card mb-8 lg:mb-0">
                <CardHeader className="pb-3">
                  <CardTitle className="font-cinzel text-2xl flex items-center bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    <Flag className="mr-2 h-5 w-5 text-magical-glowing-teal" />
                    Project Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-6">
                    {upcomingProjects.map((project, index) => (
                      <div key={project.id} className="bg-magical-deep-purple/30 rounded-lg p-5 border border-magical-glowing-teal/20">
                        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3">
                          <h3 className="text-lg font-cinzel text-magical-starlight flex items-center">
                            {project.name}
                          </h3>
                          
                          {project.dueDate && (
                            <div className="flex items-center text-magical-starlight/70 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {project.dueDate}
                            </div>
                          )}
                        </div>
                        
                        <p className="text-magical-starlight/80 mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill, idx) => (
                            <Badge 
                              key={idx} 
                              className="bg-magical-deep-purple text-magical-glowing-teal border-magical-glowing-teal/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-magical-starlight/70 text-sm">
                            Recommended after completing: {project.skills[0]}
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="magical-button"
                            disabled={!skillProgress.some(s => 
                              s.skill === project.skills[0] && s.status === "completed"
                            )}
                          >
                            Start Project
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center pt-4">
                      <Button 
                        variant="link" 
                        className="text-magical-glowing-teal"
                      >
                        View All Projects
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Stats & Badges */}
            <div className="space-y-8">
              {/* Weekly Stats */}
              <Card className="magical-card">
                <CardHeader className="pb-3">
                  <CardTitle className="font-cinzel text-xl flex items-center bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    <TrendingUp className="mr-2 h-5 w-5 text-magical-glowing-teal" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-magical-starlight/80">Hours Studied</div>
                      <div className="text-magical-glowing-teal font-bold">12.5</div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {Array.from({ length: 7 }).map((_, i) => {
                        const height = [30, 45, 20, 60, 75, 40, 0][i];
                        return (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-full bg-magical-deep-purple/50 rounded-sm relative" style={{ height: '80px' }}>
                              <div 
                                className={`absolute bottom-0 left-0 right-0 bg-magical-glowing-teal/60 rounded-sm`}
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                            <div className="text-magical-starlight/50 text-xs">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-magical-starlight/70">Streak</span>
                        <span className="text-magical-starlight">6 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-magical-starlight/70">Goal Completion</span>
                        <span className="text-magical-starlight">83%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-magical-starlight/70">Points Earned</span>
                        <span className="text-magical-starlight">420</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Badge Showcase */}
              <Card className="magical-card">
                <CardHeader className="pb-3">
                  <CardTitle className="font-cinzel text-xl flex items-center justify-between bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    <div className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-magical-glowing-teal" />
                      Magical Badge Chest
                    </div>
                    <Badge className="bg-magical-glowing-teal/20 text-magical-glowing-teal">
                      {userBadges.filter(b => b.earned).length}/{userBadges.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userBadges.map((badge) => (
                      <div 
                        key={badge.id} 
                        className={`relative group p-3 rounded-lg border text-center transition-all ${
                          badge.earned 
                            ? "border-magical-glowing-teal/40 bg-magical-deep-purple/40" 
                            : "border-magical-deep-purple/40 bg-magical-deep-purple/20 opacity-60"
                        }`}
                      >
                        <div className={`text-4xl mb-2 ${badge.earned ? "animate-float" : ""}`}>
                          {badge.icon}
                        </div>
                        <h3 className="text-sm font-medium mb-1 text-magical-starlight">
                          {badge.name}
                        </h3>
                        
                        {/* Tooltip on hover */}
                        <div className="absolute z-10 bg-magical-midnight border border-magical-glowing-teal/30 rounded-lg p-3 w-48 shadow-xl invisible opacity-0 transition-opacity -top-2 left-1/2 -translate-x-1/2 -translate-y-full group-hover:visible group-hover:opacity-100">
                          <div className="text-sm mb-1">{badge.description}</div>
                          {badge.earned && badge.date && (
                            <div className="text-xs text-magical-starlight/60">
                              Earned on {badge.date}
                            </div>
                          )}
                        </div>
                        
                        {/* Badge glow effect */}
                        {badge.earned && (
                          <div className="absolute inset-0 -z-10 bg-magical-glowing-teal/5 rounded-lg animate-pulse"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-magical-deep-purple/50 flex justify-between items-center">
                    <div className="text-sm text-magical-starlight/70">
                      Next Badge:
                      <span className="text-magical-glowing-teal ml-1">SQL Wizard</span>
                    </div>
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-magical-glowing-teal/30 text-magical-starlight"
                    >
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Leaderboard Snippet */}
              <Card className="magical-card">
                <CardHeader className="pb-3">
                  <CardTitle className="font-cinzel text-xl flex items-center bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    <Zap className="mr-2 h-5 w-5 text-magical-glowing-teal" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "Hermione", points: 1250, avatar: "https://randomuser.me/api/portraits/women/66.jpg" },
                      { rank: 2, name: "Luna", points: 980, avatar: "https://randomuser.me/api/portraits/women/76.jpg" },
                      { rank: 3, name: "Ron", points: 840, avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
                      { rank: 4, name: "YOU", points: 760, avatar: "https://randomuser.me/api/portraits/women/44.jpg", isUser: true },
                      { rank: 5, name: "Draco", points: 720, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
                    ].map((entry) => (
                      <div 
                        key={entry.rank} 
                        className={`flex items-center p-2 rounded-lg ${
                          entry.isUser 
                            ? "bg-magical-glowing-teal/10 border border-magical-glowing-teal/30" 
                            : ""
                        }`}
                      >
                        <div className="w-7 h-7 flex items-center justify-center mr-3">
                          {entry.rank <= 3 ? (
                            <div className={`text-lg ${
                              entry.rank === 1 
                                ? "text-amber-400" 
                                : entry.rank === 2 
                                  ? "text-stone-300" 
                                  : "text-amber-600"
                            }`}>
                              {["🥇", "🥈", "🥉"][entry.rank - 1]}
                            </div>
                          ) : (
                            <div className="text-magical-starlight/70">{entry.rank}</div>
                          )}
                        </div>
                        
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          <img 
                            src={entry.avatar} 
                            alt={entry.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className={`font-medium ${
                            entry.isUser ? "text-magical-glowing-teal" : "text-magical-starlight"
                          }`}>
                            {entry.name}
                          </div>
                        </div>
                        
                        <div className="text-magical-starlight/80">
                          {entry.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-4">
                    <Button variant="link" className="text-magical-glowing-teal">View Full Leaderboard</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

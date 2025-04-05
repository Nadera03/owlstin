import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import BiomeBackground from "@/components/BiomeBackground";
import VineHeading from "@/components/VineHeading";
import { JungleButton } from "@/components/ui/jungle-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, BookOpen, CheckCircle2, FileText, ArrowRight, Book, CheckCheck, Star, Palmtree, Mountain, Sprout, TreePine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  name: string;
  matched: boolean;
}

interface Recommendation {
  skill: string;
  description: string;
  resources: string[];
  project: string;
  completed: boolean;
}

export default function JobSeekerPage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jobDescText, setJobDescText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState<Skill[]>([]);
  const [missingSkills, setMissingSkills] = useState<Skill[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [spellbookOpen, setSpellbookOpen] = useState(false);
  const [currentBiome, setCurrentBiome] = useState<'tropical' | 'savanna' | 'tundra' | 'desert'>('tropical');
  const spellbookRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: `File: ${e.target.files[0].name}`,
      });
    }
  };

  const handleJobDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescFile(e.target.files[0]);
      toast({
        title: "Job description uploaded",
        description: `File: ${e.target.files[0].name}`,
      });
    }
  };

  const handleJobDescTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescText(e.target.value);
  };
  
  const analyzeSkills = () => {
    if (!resumeFile || (!jobDescFile && !jobDescText)) {
      toast({
        title: "Missing files",
        description: "Please upload both resume and job description",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setSpellbookOpen(true);
    
    setTimeout(() => {
      const mockMatchedSkills: Skill[] = [
        { name: "JavaScript", matched: true },
        { name: "React", matched: true },
        { name: "TypeScript", matched: true },
        { name: "CSS", matched: true },
        { name: "HTML", matched: true },
        { name: "Git", matched: true },
        { name: "REST API", matched: true },
        { name: "Problem Solving", matched: true },
        { name: "Communication", matched: true }
      ];
      
      const mockMissingSkills: Skill[] = [
        { name: "Node.js", matched: false },
        { name: "PostgreSQL", matched: false },
        { name: "Docker", matched: false },
        { name: "AWS", matched: false },
        { name: "GraphQL", matched: false }
      ];
      
      const mockRecommendations: Recommendation[] = [
        {
          skill: "Node.js",
          description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to run JavaScript code on the server side.",
          resources: ["NodeJS Official Documentation", "freeCodeCamp's Node.js Course"],
          project: "Build a simple REST API with Express.js and connect it to a database",
          completed: false
        },
        {
          skill: "PostgreSQL",
          description: "PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development.",
          resources: ["PostgreSQL Tutorial", "SQL for Web Developers on YouTube"],
          project: "Create a database design for a blog platform with users, posts, and comments",
          completed: false
        },
        {
          skill: "Docker",
          description: "Docker is a platform for developing, shipping, and running applications in containers.",
          resources: ["Docker Official Documentation", "Docker for Beginners Workshop"],
          project: "Containerize a simple web application using Docker",
          completed: false
        },
        {
          skill: "AWS",
          description: "Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.",
          resources: ["AWS Free Tier Tutorials", "AWS Certified Cloud Practitioner Training"],
          project: "Deploy a static website to AWS S3 and set up CloudFront distribution",
          completed: false
        },
        {
          skill: "GraphQL",
          description: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.",
          resources: ["GraphQL.org Tutorials", "How to GraphQL Course"],
          project: "Convert a small REST API to GraphQL and implement queries and mutations",
          completed: false
        }
      ];
      
      setMatchedSkills(mockMatchedSkills);
      setMissingSkills(mockMissingSkills);
      setRecommendations(mockRecommendations);
      
      const totalSkills = mockMatchedSkills.length + mockMissingSkills.length;
      const matchedCount = mockMatchedSkills.length;
      const initialPercentage = Math.round((matchedCount / totalSkills) * 100);
      
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setMatchPercentage(count);
        
        if (count >= initialPercentage) {
          clearInterval(interval);
          
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            setSpellbookOpen(false);
            
            toast({
              title: "Analysis complete",
              description: `Your skills match ${initialPercentage}% of the job requirements`,
            });
          }, 1000);
        }
      }, 20);
    }, 3000);
  };
  
  const toggleSkillCompletion = (index: number) => {
    setRecommendations(prev => {
      const updated = [...prev];
      updated[index].completed = !updated[index].completed;
      
      const totalSkills = matchedSkills.length + missingSkills.length;
      const completedSkills = matchedSkills.length + updated.filter(r => r.completed).length;
      const newPercentage = Math.round((completedSkills / totalSkills) * 100);
      setMatchPercentage(newPercentage);
      
      return updated;
    });
    
    toast({
      title: "Progress updated",
      description: "Your skill progress has been saved",
    });
  };
  
  useEffect(() => {
    if (spellbookOpen && spellbookRef.current) {
      spellbookRef.current.style.transform = "scale(1)";
    } else if (spellbookRef.current) {
      spellbookRef.current.style.transform = "scale(0)";
    }
  }, [spellbookOpen]);
  
  return (
    <div className="min-h-screen text-archive-text relative">
      <BiomeBackground biomeType={currentBiome} />
      
      <Starfield />
      <MagicCursor />
      <Navbar />
      
      <main className="pt-20 pb-12 relative z-10">
        <section className="py-12 md:py-20 px-4 relative" onMouseEnter={() => setCurrentBiome('tropical')}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center mb-6">
              <Palmtree className="text-biome-tropical mr-3 h-6 w-6" />
              <VineHeading level={1} className="text-4xl md:text-5xl font-bold text-center" biomeType="tropical">
                Your Magical Career Journey
              </VineHeading>
            </div>
            <p className="text-archive-text/80 text-lg md:text-xl max-w-2xl mx-auto text-center mb-8 backdrop-blur-sm bg-archive-base/30 p-4 rounded-md">
              Upload your resume and a job description to reveal your skill match and personalized learning path.
            </p>
          </div>
        </section>
        
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div 
              className={`lg:col-span-1 ${analysisComplete ? 'lg:block' : ''}`}
              onMouseEnter={() => setCurrentBiome('desert')}
            >
              <div className="bg-archive-secondary/70 backdrop-blur-sm rounded-md border border-archive-border p-6 shadow-lg sticky top-24">
                <div className="flex items-center mb-4">
                  <Sprout className="text-biome-desert mr-3 h-5 w-5" />
                  <VineHeading className="text-2xl font-bold" biomeType="desert">
                    Prepare Your Journey
                  </VineHeading>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-archive-text/80">Your Resume</label>
                    <div className="border-2 border-dashed border-biome-desert/40 rounded-lg p-6 flex flex-col items-center justify-center hover:border-biome-desert/70 transition-colors bg-archive-base/30">
                      <UploadCloud className="h-10 w-10 text-biome-desert mb-2" />
                      <p className="text-archive-text/70 text-sm mb-2">Upload your resume</p>
                      <p className="text-archive-text/50 text-xs mb-4">PDF or DOCX format</p>
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleResumeChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <Button variant="default" size="sm">
                          Choose File
                        </Button>
                      </label>
                      {resumeFile && (
                        <div className="mt-4 text-archive-text/70 text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {resumeFile.name}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-archive-text/80">Job Description</label>
                    <div className="border-2 border-dashed border-biome-desert/40 rounded-lg p-6 flex flex-col items-center justify-center hover:border-biome-desert/70 transition-colors bg-archive-base/30">
                      <UploadCloud className="h-10 w-10 text-biome-desert mb-2" />
                      <p className="text-archive-text/70 text-sm mb-2">Upload job description</p>
                      <p className="text-archive-text/50 text-xs mb-4">PDF, DOCX, or TXT format</p>
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleJobDescChange}
                        className="hidden"
                        id="jd-upload"
                      />
                      <label htmlFor="jd-upload" className="cursor-pointer">
                        <Button variant="default" size="sm">
                          Choose File
                        </Button>
                      </label>
                      {jobDescFile && (
                        <div className="mt-4 text-archive-text/70 text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {jobDescFile.name}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-archive-text/80">Or paste job description</label>
                    <textarea
                      className="w-full h-32 bg-archive-base/50 border border-biome-desert/40 rounded-md p-3 text-archive-text/90 focus:outline-none focus:border-biome-desert/70 focus:ring-1 focus:ring-biome-desert/50"
                      placeholder="Paste job description text here..."
                      value={jobDescText}
                      onChange={handleJobDescTextChange}
                    ></textarea>
                  </div>
                  
                  <JungleButton
                    className="w-full py-6 text-lg"
                    disabled={isAnalyzing}
                    onClick={analyzeSkills}
                  >
                    {isAnalyzing ? "Analyzing..." : "Begin Your Journey"}
                    <div className="ml-2">✨</div>
                  </JungleButton>
                </div>
              </div>
            </div>
            
            {isAnalyzing && (
              <div className="fixed inset-0 bg-archive-base/90 flex items-center justify-center z-50">
                <div 
                  ref={spellbookRef} 
                  className="relative w-80 h-96 transform scale-0 transition-transform duration-1000"
                >
                  <div className="absolute inset-0 bg-biome-wood rounded-lg border-4 border-biome-soil flex flex-col items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-repeat mix-blend-overlay pointer-events-none" 
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c5 0 10 10 15 10s10-10 15-10 10 10 15 10 10-10 15-10 10 10 15 10' stroke='%23ffffff' stroke-width='2' fill='none' /%3E%3C/svg%3E\")" }}>
                    </div>
                    
                    <div className="text-center p-6 z-10">
                      <h3 className="font-headline text-2xl mb-4 text-biome-jungle-dark">Analyzing Skills</h3>
                      <div className="relative w-40 h-40 mx-auto mb-4">
                        <div className="absolute inset-0 bg-biome-jungle-dark/20 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-biome-tropical/70 to-biome-jungle-dark/50 border border-biome-vine/30 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-24 rounded-full bg-archive-base/50 flex items-center justify-center">
                                <div className="text-4xl text-biome-tropical animate-pulse">
                                  {matchPercentage}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="absolute inset-0">
                              {Array.from({ length: 10 }).map((_, i) => (
                                <div 
                                  key={i}
                                  className="absolute w-2 h-2 bg-biome-tropical/70 rounded-full animate-ping"
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
                      <p className="text-archive-text/80">
                        Analyzing your skills and blazing your career trail...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {analysisComplete && (
              <div className="lg:col-span-2 space-y-8">
                <div 
                  className="bg-archive-secondary/70 backdrop-blur-sm rounded-md border border-archive-border p-6 shadow-lg"
                  onMouseEnter={() => setCurrentBiome('savanna')}
                >
                  <div className="flex items-center mb-4">
                    <Mountain className="text-biome-savanna mr-3 h-5 w-5" />
                    <VineHeading className="text-2xl font-bold" biomeType="savanna">
                      Your Skills Journey Map
                    </VineHeading>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 bg-biome-savanna/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-archive-secondary/90 to-biome-savanna/30 border border-biome-savanna/30 relative overflow-hidden flex items-center justify-center">
                          <div className="text-4xl font-bold text-archive-text">
                            {matchPercentage}%
                          </div>
                          
                          <div className="absolute inset-0">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div 
                                key={i}
                                className="absolute w-1 h-1 bg-biome-savanna/70 rounded-full animate-ping"
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
                      <h3 className="text-lg font-headline mb-2 text-archive-text">
                        Current Skill Match
                      </h3>
                      <Progress value={matchPercentage} className="h-2 mb-4 bg-archive-secondary" indicatorClassName="bg-biome-savanna" />
                      
                      <h3 className="text-lg font-headline mb-2 text-archive-text">
                        Potential Match After Learning
                      </h3>
                      <Progress value={100} className="h-2 bg-archive-secondary" indicatorClassName="bg-gradient-to-r from-biome-savanna to-biome-jungle-dark" />
                      
                      <p className="mt-4 text-archive-text/70">
                        Complete the recommended learning path to achieve a perfect match!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="bg-archive-secondary/70 backdrop-blur-sm rounded-md border border-archive-border p-6 shadow-lg"
                  onMouseEnter={() => setCurrentBiome('tundra')}
                >
                  <div className="flex items-center mb-4">
                    <TreePine className="text-biome-tundra mr-3 h-5 w-5" />
                    <VineHeading className="text-2xl font-bold" biomeType="tundra">
                      Skill Exploration
                    </VineHeading>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-archive-base/30 p-4 rounded-md border border-biome-tundra/30">
                      <h3 className="text-xl font-headline mb-4 text-biome-tundra flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Matched Skills
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {matchedSkills.map((skill, index) => (
                          <div key={index} className="flex items-center bg-archive-secondary/50 p-3 rounded-md border border-biome-tundra/20">
                            <div className="h-3 w-3 rounded-full bg-biome-tundra mr-3"></div>
                            <span>{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-archive-base/30 p-4 rounded-md border border-biome-tundra/30">
                      <h3 className="text-xl font-headline mb-4 text-biome-tundra flex items-center">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Skills to Learn
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {missingSkills.map((skill, index) => (
                          <div key={index} className="flex items-center bg-archive-secondary/70 p-3 rounded-md border border-biome-tundra/20">
                            <div className="h-3 w-3 rounded-full bg-biome-tundra/50 mr-3"></div>
                            <span>{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="bg-archive-secondary/70 backdrop-blur-sm rounded-md border border-archive-border p-6 shadow-lg relative overflow-hidden"
                  onMouseEnter={() => setCurrentBiome('tropical')}
                >
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-biome-tropical/5 filter blur-3xl"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="relative w-32 h-32 shrink-0">
                      <div className="absolute inset-0 bg-biome-tropical/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-archive-secondary to-biome-jungle-dark border border-biome-tropical/30 animate-float flex items-center justify-center">
                          <div className="text-biome-tropical text-3xl">AI</div>
                        </div>
                      </div>
                      
                      <div className="absolute -top-4 -right-4 w-8 h-20 bg-biome-vine/30 rounded-full rotate-45"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-16 bg-biome-vine/20 rounded-full -rotate-45"></div>
                    </div>
                    
                    <div className="flex-1">
                      <VineHeading className="text-xl mb-3" biomeType="tropical">
                        Jungle Path Guidance
                      </VineHeading>
                      <p className="text-archive-text/80 mb-4">
                        Based on your profile and the job requirements, focus on learning Node.js and PostgreSQL first. 
                        These skills will complement your strong JavaScript and React foundation, making you a more 
                        versatile full-stack developer.
                      </p>
                      <p className="text-archive-text/80">
                        Consider creating a personal project that demonstrates these skills together, 
                        such as a simple web application with a database. This will serve as a powerful 
                        portfolio piece in your next interview.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <VineHeading className="text-2xl font-bold" biomeType="tropical">
                    Your Jungle Learning Path
                  </VineHeading>
                  
                  {recommendations.map((rec, index) => (
                    <Card 
                      key={index} 
                      className={`backdrop-blur-sm bg-archive-secondary/70 border-archive-border shadow-lg transition-all duration-300 ${rec.completed ? 'border-biome-tropical/50' : ''}`}
                      onMouseEnter={() => setCurrentBiome(index % 2 === 0 ? 'tropical' : (index % 3 === 0 ? 'tundra' : 'desert'))}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-headline text-archive-text flex items-center">
                            {rec.completed && <CheckCheck className="mr-2 h-5 w-5 text-biome-tropical" />}
                            {rec.skill}
                          </h3>
                          <JungleButton 
                            variant={rec.completed ? "outline" : "default"}
                            size="sm"
                            onClick={() => toggleSkillCompletion(index)}
                          >
                            {rec.completed ? "Completed" : "Mark Complete"}
                          </JungleButton>
                        </div>
                        
                        <p className="text-archive-text/80 mb-6">
                          {rec.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="font-headline text-biome-tropical mb-2 flex items-center">
                            <Book className="h-4 w-4 mr-2" />
                            Learning Resources
                          </h4>
                          <ul className="space-y-2">
                            {rec.resources.map((resource, i) => (
                              <li key={i} className="flex items-center">
                                <Star className="h-3 w-3 text-biome-tropical mr-2" />
                                <a href="#" className="text-archive-text/80 hover:text-biome-tropical transition-colors">
                                  {resource}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-headline text-biome-tropical mb-2">Project Idea</h4>
                          <p className="text-archive-text/80">
                            {rec.project}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="backdrop-blur-sm bg-archive-secondary/70 border border-archive-border rounded-md p-6 text-center shadow-lg">
                    <VineHeading className="text-xl mb-4" biomeType="tropical">
                      Ready to Explore Further?
                    </VineHeading>
                    <JungleButton size="lg">
                      <span>View Full Learning Roadmap</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </JungleButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

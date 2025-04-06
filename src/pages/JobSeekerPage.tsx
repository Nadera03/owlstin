import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UploadCloud, BookOpen, CheckCircle2, FileText, ArrowRight, Book, CheckCheck, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface Skill {
  name: string;
  matched: boolean;
}
interface Recommendation {
  skill: string;
  description: string;
  resources: Array<{
    name: string;
    url: string;
  }>;
  project: string;
  completed: boolean;
}
export default function JobSeekerPage() {
  // Set dark mode and scroll to top on mount
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
  const spellbookRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: `File: ${e.target.files[0].name}`
      });
    }
  };
  const handleJobDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescFile(e.target.files[0]);
      toast({
        title: "Job description uploaded",
        description: `File: ${e.target.files[0].name}`
      });
    }
  };
  const handleJobDescTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescText(e.target.value);
  };
  const analyzeSkills = () => {
    if (!resumeFile || !jobDescFile && !jobDescText) {
      toast({
        title: "Missing files",
        description: "Please upload both resume and job description",
        variant: "destructive"
      });
      return;
    }
    setIsAnalyzing(true);
    setSpellbookOpen(true);

    // Mock analysis process with magical animation
    setTimeout(() => {
      // Mock data - in a real app this would come from the backend
      const mockMatchedSkills: Skill[] = [{
        name: "JavaScript",
        matched: true
      }, {
        name: "React",
        matched: true
      }, {
        name: "TypeScript",
        matched: true
      }, {
        name: "CSS",
        matched: true
      }, {
        name: "HTML",
        matched: true
      }, {
        name: "Git",
        matched: true
      }, {
        name: "REST API",
        matched: true
      }, {
        name: "Problem Solving",
        matched: true
      }, {
        name: "Communication",
        matched: true
      }];
      const mockMissingSkills: Skill[] = [{
        name: "Node.js",
        matched: false
      }, {
        name: "PostgreSQL",
        matched: false
      }, {
        name: "Docker",
        matched: false
      }, {
        name: "AWS",
        matched: false
      }, {
        name: "GraphQL",
        matched: false
      }];
      const mockRecommendations: Recommendation[] = [{
        skill: "Node.js",
        description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to run JavaScript code on the server side.",
        resources: [{
          name: "NodeJS Official Documentation",
          url: "https://nodejs.org/en/docs/"
        }, {
          name: "freeCodeCamp's Node.js Course",
          url: "https://www.freecodecamp.org/learn/apis-and-microservices/"
        }],
        project: "Build a simple REST API with Express.js and connect it to a database",
        completed: false
      }, {
        skill: "PostgreSQL",
        description: "PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development.",
        resources: [{
          name: "PostgreSQL Tutorial",
          url: "https://www.postgresqltutorial.com/"
        }, {
          name: "SQL for Web Developers on YouTube",
          url: "https://www.youtube.com/results?search_query=sql+for+web+developers"
        }],
        project: "Create a database design for a blog platform with users, posts, and comments",
        completed: false
      }, {
        skill: "Docker",
        description: "Docker is a platform for developing, shipping, and running applications in containers.",
        resources: [{
          name: "Docker Official Documentation",
          url: "https://docs.docker.com/get-started/"
        }, {
          name: "Docker for Beginners Workshop",
          url: "https://docker-curriculum.com/"
        }],
        project: "Containerize a simple web application using Docker",
        completed: false
      }, {
        skill: "AWS",
        description: "Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.",
        resources: [{
          name: "AWS Free Tier Tutorials",
          url: "https://aws.amazon.com/getting-started/hands-on/"
        }, {
          name: "AWS Certified Cloud Practitioner Training",
          url: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
        }],
        project: "Deploy a static website to AWS S3 and set up CloudFront distribution",
        completed: false
      }, {
        skill: "GraphQL",
        description: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.",
        resources: [{
          name: "GraphQL.org Tutorials",
          url: "https://graphql.org/learn/"
        }, {
          name: "How to GraphQL Course",
          url: "https://www.howtographql.com/"
        }],
        project: "Convert a small REST API to GraphQL and implement queries and mutations",
        completed: false
      }];
      setMatchedSkills(mockMatchedSkills);
      setMissingSkills(mockMissingSkills);
      setRecommendations(mockRecommendations);

      // Calculate match percentage
      const totalSkills = mockMatchedSkills.length + mockMissingSkills.length;
      const matchedCount = mockMatchedSkills.length;
      const initialPercentage = Math.round(matchedCount / totalSkills * 100);

      // Animate the percentage
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
              description: `Your skills match ${initialPercentage}% of the job requirements`
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

      // Recalculate match percentage
      const totalSkills = matchedSkills.length + missingSkills.length;
      const completedSkills = matchedSkills.length + updated.filter(r => r.completed).length;
      const newPercentage = Math.round(completedSkills / totalSkills * 100);
      setMatchPercentage(newPercentage);
      return updated;
    });
    toast({
      title: "Progress updated",
      description: "Your skill progress has been saved"
    });
  };

  // Spellbook animation effect
  useEffect(() => {
    if (spellbookOpen && spellbookRef.current) {
      spellbookRef.current.style.transform = "scale(1)";
    } else if (spellbookRef.current) {
      spellbookRef.current.style.transform = "scale(0)";
    }
  }, [spellbookOpen]);
  return <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <MagicCursor />
      <Navbar />
      
      <main className="pt-20 pb-12">
        {/* Page Header */}
        <section className="py-12 md:py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-6 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Supercharge Your Career with AI
          </h1>
            <p className="text-magical-starlight/80 text-lg md:text-xl max-w-2xl mx-auto text-center mb-8">
              Upload your resume and a job description to reveal your skill match and personalized learning path.
            </p>
          </div>
        </section>
        
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload Section */}
            <div className={`lg:col-span-1 ${analysisComplete ? 'lg:block' : ''}`}>
              <div className="magical-card p-6 sticky top-24">
                <h2 className="font-cinzel text-2xl font-bold mb-6 text-center bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                  Enchant Your Resume
                </h2>
                
                <div className="space-y-6">
                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-magical-starlight/80">Your Resume</label>
                    <div className="border-2 border-dashed border-magical-glowing-teal/30 rounded-lg p-6 flex flex-col items-center justify-center hover:border-magical-glowing-teal/50 transition-colors">
                      <UploadCloud className="h-10 w-10 text-magical-glowing-teal/70 mb-2" />
                      <p className="text-magical-starlight/70 text-sm mb-2">Upload your resume</p>
                      <p className="text-magical-starlight/50 text-xs mb-4">PDF or DOCX format</p>
                      <input type="file" accept=".pdf,.docx,.txt" onChange={handleResumeChange} className="hidden" id="resume-upload" />
                      <label htmlFor="resume-upload" className="magical-button text-sm py-2 px-4 cursor-pointer">
                        Choose File
                      </label>
                      {resumeFile && <div className="mt-4 text-magical-starlight/70 text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {resumeFile.name}
                        </div>}
                    </div>
                  </div>
                  
                  {/* Job Description Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-magical-starlight/80">Job Description</label>
                    <div className="border-2 border-dashed border-magical-glowing-teal/30 rounded-lg p-6 flex flex-col items-center justify-center hover:border-magical-glowing-teal/50 transition-colors">
                      <UploadCloud className="h-10 w-10 text-magical-glowing-teal/70 mb-2" />
                      <p className="text-magical-starlight/70 text-sm mb-2">Upload job description</p>
                      <p className="text-magical-starlight/50 text-xs mb-4">PDF, DOCX, or TXT format</p>
                      <input type="file" accept=".pdf,.docx,.txt" onChange={handleJobDescChange} className="hidden" id="jd-upload" />
                      <label htmlFor="jd-upload" className="magical-button text-sm py-2 px-4 cursor-pointer">
                        Choose File
                      </label>
                      {jobDescFile && <div className="mt-4 text-magical-starlight/70 text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {jobDescFile.name}
                        </div>}
                    </div>
                  </div>
                  
                  {/* Text Input Alternative */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-magical-starlight/80">Or paste job description</label>
                    <textarea className="w-full h-32 bg-magical-deep-purple/50 border border-magical-glowing-teal/30 rounded-md p-3 text-magical-starlight/90 focus:outline-none focus:border-magical-glowing-teal/70 focus:ring-1 focus:ring-magical-glowing-teal/50" placeholder="Paste job description text here..." value={jobDescText} onChange={handleJobDescTextChange}></textarea>
                  </div>
                  
                  {/* Analyze Button */}
                  <Button className="magical-button w-full py-6 text-lg" disabled={isAnalyzing} onClick={analyzeSkills}>
                    {isAnalyzing ? "Analyzing..." : "Analyze Skills"}
                    <div className="ml-2">✨</div>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Spellbook Animation (conditional) */}
            {isAnalyzing && <div className="fixed inset-0 bg-magical-midnight/90 flex items-center justify-center z-50">
                <div ref={spellbookRef} className="relative w-80 h-96 transform scale-0 transition-transform duration-1000">
                  {/* Spellbook */}
                  <div className="absolute inset-0 bg-magical-deep-purple rounded-lg border-4 border-magical-enchanted flex flex-col items-center justify-center">
                    {/* Magical runes and symbols */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full opacity-30">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="30" stroke="#44DDDD" strokeWidth="0.5" fill="none" className="animate-spin-slow" />
                          <circle cx="50" cy="50" r="20" stroke="#8265A7" strokeWidth="0.5" fill="none" className="animate-spin-slow" style={{
                        animationDirection: 'reverse'
                      }} />
                          <polygon points="50,20 55,35 70,35 60,45 65,60 50,50 35,60 40,45 30,35 45,35" stroke="#44DDDD" strokeWidth="0.3" fill="none" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center p-6 z-10">
                      <h3 className="font-cinzel text-2xl mb-4 text-magical-glowing-teal">Analyzing Skills</h3>
                      <div className="relative w-40 h-40 mx-auto mb-4">
                        <div className="absolute inset-0 bg-magical-glowing-teal/20 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Crystal ball with spinning particles */}
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-magical-deep-purple/70 to-magical-enchanted/50 border border-magical-glowing-teal/30 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-24 rounded-full bg-magical-midnight/50 flex items-center justify-center">
                                <div className="text-4xl text-magical-glowing-teal animate-pulse">
                                  {matchPercentage}%
                                </div>
                              </div>
                            </div>
                            
                            {/* Particle effects */}
                            <div className="absolute inset-0">
                              {Array.from({
                            length: 10
                          }).map((_, i) => <div key={i} className="absolute w-2 h-2 bg-magical-glowing-teal/70 rounded-full animate-ping" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 3}s`
                          }}></div>)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-magical-starlight/80">
                        Casting spells to analyze your magical abilities...
                      </p>
                    </div>
                  </div>
                </div>
              </div>}
            
            {/* Right Column - Analysis Results (conditional) */}
            {analysisComplete && <div className="lg:col-span-2 space-y-8">
                {/* Match Percentage */}
                <div className="magical-card p-6">
                  <h2 className="font-cinzel text-2xl font-bold mb-4 bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    Your Magical Match
                  </h2>
                  
                  {/* Orb with percentage */}
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 bg-magical-glowing-teal/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Crystal ball with match percentage */}
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-magical-deep-purple/90 to-magical-enchanted/70 border border-magical-glowing-teal/30 relative overflow-hidden flex items-center justify-center">
                          <div className="text-4xl font-bold text-magical-starlight">
                            {matchPercentage}%
                          </div>
                          
                          {/* Particle effects */}
                          <div className="absolute inset-0">
                            {Array.from({
                          length: 6
                        }).map((_, i) => <div key={i} className="absolute w-1 h-1 bg-magical-glowing-teal/70 rounded-full animate-ping" style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${1 + Math.random() * 3}s`
                        }}></div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-cinzel mb-2 text-magical-starlight">
                        Current Skill Match
                      </h3>
                      <Progress value={matchPercentage} className="h-2 mb-4 bg-magical-deep-purple" indicatorClassName="bg-magical-glowing-teal" />
                      
                      <h3 className="text-lg font-cinzel mb-2 text-magical-starlight">
                        Potential Match After Learning
                      </h3>
                      <Progress value={100} className="h-2 bg-magical-deep-purple" indicatorClassName="bg-gradient-to-r from-magical-glowing-teal to-magical-purple-light" />
                      
                      <p className="mt-4 text-magical-starlight/70">
                        Complete the recommended learning path to achieve a perfect match!
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Skill Analysis */}
                <div className="magical-card p-6">
                  <h2 className="font-cinzel text-2xl font-bold mb-6 bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    Skill Analysis Scroll
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matched Skills */}
                    <div className="magic-scroll">
                      <h3 className="text-xl font-cinzel mb-4 text-magical-glowing-teal flex items-center">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Matched Skills
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-magical-glowing-teal/30 scrollbar-track-magical-deep-purple/30">
                        {matchedSkills.map((skill, index) => <div key={index} className="flex items-center bg-magical-deep-purple/50 p-3 rounded-md border border-magical-glowing-teal/20">
                            <div className="h-3 w-3 rounded-full bg-magical-glowing-teal mr-3"></div>
                            <span>{skill.name}</span>
                          </div>)}
                      </div>
                    </div>
                    
                    {/* Missing Skills */}
                    <div className="magic-scroll">
                      <h3 className="text-xl font-cinzel mb-4 text-magical-glowing-teal flex items-center">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Skills to Learn
                      </h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-magical-glowing-teal/30 scrollbar-track-magical-deep-purple/30">
                        {missingSkills.map((skill, index) => <div key={index} className="flex items-center bg-magical-purple-dark/70 p-3 rounded-md border border-magical-purple-light/20">
                            <div className="h-3 w-3 rounded-full bg-magical-purple-light mr-3"></div>
                            <span>{skill.name}</span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* AI Orb Advice */}
                <div className="magical-card p-6 relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-magical-glowing-teal/5 filter blur-3xl"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    {/* Floating orb */}
                    <div className="relative w-32 h-32 shrink-0">
                      <div className="absolute inset-0 bg-magical-glowing-teal/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* AI orb */}
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-magical-deep-purple to-magical-enchanted border border-magical-glowing-teal/30 animate-float flex items-center justify-center">
                          <div className="text-magical-glowing-teal text-3xl">AI</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Advice content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-cinzel mb-3 bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                        Magical Career Advice
                      </h3>
                      <p className="text-magical-starlight/80 mb-4">
                        Based on your profile and the job requirements, focus on learning Node.js and PostgreSQL first. 
                        These skills will complement your strong JavaScript and React foundation, making you a more 
                        versatile full-stack developer.
                      </p>
                      <p className="text-magical-starlight/80">
                        Consider creating a personal project that demonstrates these skills together, 
                        such as a simple web application with a database. This will serve as a powerful 
                        portfolio piece in your next interview.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Learning Recommendations */}
                <div className="space-y-6">
                  <h2 className="font-cinzel text-2xl font-bold bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                    Your Magical Learning Path
                  </h2>
                  
                  {recommendations.map((rec, index) => <Card key={index} className={`magical-card transition-all duration-300 ${rec.completed ? 'border-magical-glowing-teal/50' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-cinzel text-magical-starlight flex items-center">
                            {rec.completed && <CheckCheck className="mr-2 h-5 w-5 text-magical-glowing-teal" />}
                            {rec.skill}
                          </h3>
                          <Button variant={rec.completed ? "outline" : "default"} size="sm" className={rec.completed ? "border-magical-glowing-teal text-magical-glowing-teal" : "magical-button"} onClick={() => toggleSkillCompletion(index)}>
                            {rec.completed ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                        
                        <p className="text-magical-starlight/80 mb-6">
                          {rec.description}
                        </p>
                        
                        {/* Resources */}
                        <div className="mb-4">
                          <h4 className="font-cinzel text-magical-glowing-teal mb-2 flex items-center">
                            <Book className="h-4 w-4 mr-2" />
                            Learning Resources
                          </h4>
                          <ul className="space-y-2">
                            {rec.resources.map((resource, i) => <li key={i} className="flex items-center">
                                <Star className="h-3 w-3 text-magical-glowing-teal mr-2" />
                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-magical-starlight/80 hover:text-magical-glowing-teal transition-colors">
                                  {resource.name}
                                </a>
                              </li>)}
                          </ul>
                        </div>
                        
                        {/* Project Idea */}
                        <div>
                          <h4 className="font-cinzel text-magical-glowing-teal mb-2">Project Idea</h4>
                          <p className="text-magical-starlight/80">
                            {rec.project}
                          </p>
                        </div>
                      </CardContent>
                    </Card>)}
                  
                  {/* Call to Action */}
                  <div className="magical-card p-6 text-center">
                    <h3 className="text-xl font-cinzel mb-4 bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">
                      Ready to Chart Your Course?
                    </h3>
                    <Link to="/dashboard">
                      <Button className="magical-button" size="lg">
                        <span>View Full Learning Roadmap</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </main>
    </div>;
}
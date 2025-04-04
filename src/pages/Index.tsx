
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  UploadCloud, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  FileText, 
  Award, 
  Briefcase, 
  BarChart2, 
  Download, 
  CheckCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("job-seeker");
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jobDescText, setJobDescText] = useState("");
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [candidateRankings, setCandidateRankings] = useState<any[]>([]);
  const [resumesUploaded, setResumesUploaded] = useState(0);
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
      
      // Read the file and set the text
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setJobDescText(e.target.result as string);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const handleMultipleResumesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumesUploaded(e.target.files.length);
      toast({
        title: "Resumes uploaded",
        description: `${e.target.files.length} files selected`,
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

    setIsLoading(true);
    
    // Mock analysis process
    setTimeout(() => {
      // Mock data - in a real app this would come from the backend
      setMatchPercentage(65);
      setMatchedSkills([
        "JavaScript", "React", "TypeScript", "CSS", "HTML", 
        "Git", "REST API", "Problem Solving", "Communication"
      ]);
      setMissingSkills([
        "Node.js", "PostgreSQL", "Docker", "AWS", "GraphQL"
      ]);
      
      setRecommendations([
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
      ]);

      setIsLoading(false);
      
      toast({
        title: "Analysis complete",
        description: "Your skills have been analyzed successfully",
      });
    }, 2000);
  };

  const findBestMatches = () => {
    if (!jobDescFile && !jobDescText || resumesUploaded === 0) {
      toast({
        title: "Missing files",
        description: "Please upload both job description and candidate resumes",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Mock analysis process
    setTimeout(() => {
      // Mock data - in a real app this would come from the backend
      setCandidateRankings([
        {
          name: "John Smith",
          matchPercentage: 85,
          missingSkills: ["Docker"],
          resumeSkills: ["JavaScript", "React", "Node.js", "PostgreSQL", "AWS", "GraphQL"]
        },
        {
          name: "Jane Doe",
          matchPercentage: 78,
          missingSkills: ["PostgreSQL", "GraphQL"],
          resumeSkills: ["JavaScript", "React", "Node.js", "Docker", "AWS"]
        },
        {
          name: "Alex Johnson",
          matchPercentage: 72,
          missingSkills: ["AWS", "GraphQL"],
          resumeSkills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Docker"]
        },
        {
          name: "Sarah Williams",
          matchPercentage: 65,
          missingSkills: ["Node.js", "PostgreSQL", "GraphQL"],
          resumeSkills: ["JavaScript", "React", "Docker", "AWS"]
        },
        {
          name: "Michael Brown",
          matchPercentage: 58,
          missingSkills: ["Node.js", "PostgreSQL", "AWS", "GraphQL"],
          resumeSkills: ["JavaScript", "React", "Docker"]
        }
      ]);

      setIsLoading(false);
      
      toast({
        title: "Candidate ranking complete",
        description: "Candidates have been ranked by skill match",
      });
    }, 2000);
  };

  const toggleSkillCompletion = (index: number) => {
    setRecommendations(prev => {
      const updated = [...prev];
      updated[index].completed = !updated[index].completed;
      
      // Recalculate match percentage based on completed skills
      const totalSkills = missingSkills.length + matchedSkills.length;
      const completedSkills = matchedSkills.length + updated.filter(r => r.completed).length;
      const newMatchPercentage = Math.round((completedSkills / totalSkills) * 100);
      setMatchPercentage(newMatchPercentage);
      
      return updated;
    });

    toast({
      title: "Progress updated",
      description: "Your skill progress has been saved",
    });
  };

  const potentialMatchPercentage = () => {
    const totalSkills = missingSkills.length + matchedSkills.length;
    return Math.round((totalSkills / totalSkills) * 100);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JD Buddy</h1>
        <p className="text-xl text-muted-foreground mt-2">Resume Skill Gap Analyzer</p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="job-seeker" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="job-seeker" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Job Seeker</span>
          </TabsTrigger>
          <TabsTrigger value="recruiter" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Recruiter</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Job Seeker Tab Content */}
        <TabsContent value="job-seeker" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document Upload Section */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Upload Documents
                </CardTitle>
                <CardDescription>Upload your resume and the job description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (PDF or TXT)</Label>
                  <Input 
                    id="resume" 
                    type="file" 
                    accept=".pdf,.txt" 
                    onChange={handleResumeChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description (PDF or TXT)</Label>
                  <Input 
                    id="job-description" 
                    type="file" 
                    accept=".pdf,.txt"
                    onChange={handleJobDescChange}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="job-description-text">Or paste job description here</Label>
                  <Textarea 
                    id="job-description-text" 
                    placeholder="Paste job description text here..."
                    value={jobDescText}
                    onChange={handleJobDescTextChange}
                    rows={5}
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={analyzeSkills}
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Analyze Skills"}
                </Button>
              </CardContent>
            </Card>

            {/* Match Score Section */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Skill Match Analysis
                </CardTitle>
                <CardDescription>See how your skills match the job requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Match Score</span>
                    <span className="font-bold">{matchPercentage}%</span>
                  </div>
                  <Progress value={matchPercentage} className="h-2" />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Matched Skills</h4>
                    {matchedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {matchedSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-100">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">Upload your documents to see matched skills</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Missing Skills</h4>
                    {missingSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-red-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">Upload your documents to see missing skills</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learning Recommendations
                </CardTitle>
                <CardDescription>Personalized recommendations for your missing skills</CardDescription>
                
                {/* Progress tracker */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Current Match:</span>
                    <span className="font-medium">{matchPercentage}%</span>
                  </div>
                  <Progress value={matchPercentage} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>Potential Match:</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2 bg-gray-100" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-md ${rec.completed ? "bg-green-50" : "bg-slate-50"}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center">
                          {rec.skill}
                          {rec.completed && <CheckCheck className="ml-2 h-4 w-4 text-green-500" />}
                        </h3>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleSkillCompletion(index)}
                        >
                          {rec.completed ? "Mark Incomplete" : "Mark Complete"}
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2">{rec.description}</p>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium">Learning Resources:</h4>
                        <ul className="list-disc list-inside text-sm mt-1 text-blue-600">
                          {rec.resources.map((resource: string, rIndex: number) => (
                            <li key={rIndex}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium">Project Idea:</h4>
                        <p className="text-sm mt-1">{rec.project}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Recruiter Tab Content */}
        <TabsContent value="recruiter" className="space-y-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Recruiter Mode
              </CardTitle>
              <CardDescription>Compare multiple resumes against a job description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-description-recruiter">Job Description (PDF or TXT)</Label>
                <Input 
                  id="job-description-recruiter" 
                  type="file" 
                  accept=".pdf,.txt" 
                  onChange={handleJobDescChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="job-description-text-recruiter">Or paste job description here</Label>
                <Textarea 
                  id="job-description-text-recruiter" 
                  placeholder="Paste job description text here..."
                  value={jobDescText}
                  onChange={handleJobDescTextChange}
                  rows={5}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="resumes">Candidate Resumes (Multiple PDF or TXT files)</Label>
                <Input 
                  id="resumes" 
                  type="file" 
                  accept=".pdf,.txt" 
                  multiple
                  onChange={handleMultipleResumesChange}
                />
                {resumesUploaded > 0 && (
                  <p className="text-sm text-muted-foreground">{resumesUploaded} files selected</p>
                )}
              </div>
              
              <Button 
                className="w-full" 
                onClick={findBestMatches}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Find Best Matches"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Candidate Rankings */}
          {candidateRankings.length > 0 && (
            <>
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Top Candidates
                  </CardTitle>
                  <CardDescription>Highest matching candidates based on skill match</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidateRankings.slice(0, 3).map((candidate, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                          ${index === 0 ? "bg-amber-100 text-amber-700" : 
                            index === 1 ? "bg-slate-100 text-slate-700" : 
                            "bg-orange-100 text-orange-700"}`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{candidate.name}</h3>
                            <span className="font-bold">{candidate.matchPercentage}%</span>
                          </div>
                          <Progress value={candidate.matchPercentage} className="h-2 mt-1" />
                          <div className="mt-2 flex flex-wrap gap-1">
                            {candidate.missingSkills.map((skill: string, sIndex: number) => (
                              <Badge key={sIndex} variant="outline" className="text-xs border-red-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5" />
                    All Candidates
                  </CardTitle>
                  <CardDescription>Complete candidate rankings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Rank</th>
                          <th className="text-left py-2 px-2">Candidate</th>
                          <th className="text-left py-2 px-2">Match %</th>
                          <th className="text-left py-2 px-2">Missing Skills</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidateRankings.map((candidate, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-2">{index + 1}</td>
                            <td className="py-2 px-2">{candidate.name}</td>
                            <td className="py-2 px-2">{candidate.matchPercentage}%</td>
                            <td className="py-2 px-2">
                              <div className="flex flex-wrap gap-1">
                                {candidate.missingSkills.map((skill: string, sIndex: number) => (
                                  <Badge key={sIndex} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;

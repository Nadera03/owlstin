import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Starfield from "@/components/Starfield";
import MagicCursor from "@/components/MagicCursor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText, UserCheck, Users, Filter, Download, ChevronDown, Star, Award, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface Candidate {
  id: number;
  name: string;
  matchPercentage: number;
  missingSkills: string[];
  resumeSkills: string[];
  experience: number;
  education: string;
  avatar: string;
}
export default function RecruiterPage() {
  // Set dark mode and scroll to top on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jobDescText, setJobDescText] = useState("");
  const [resumesUploaded, setResumesUploaded] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [minMatchFilter, setMinMatchFilter] = useState(0);
  const [sortBy, setSortBy] = useState<"match" | "experience" | "name">("match");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const {
    toast
  } = useToast();
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
  const handleResumesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumesUploaded(e.target.files.length);
      toast({
        title: `${e.target.files.length} resumes uploaded`,
        description: "Ready for analysis"
      });
    }
  };
  const analyzeResumes = () => {
    if (!jobDescFile && !jobDescText || resumesUploaded === 0) {
      toast({
        title: "Missing files",
        description: "Please upload job description and candidate resumes",
        variant: "destructive"
      });
      return;
    }
    setIsAnalyzing(true);

    // Mock analysis with magical animation
    setTimeout(() => {
      // Mock candidate data
      const mockCandidates: Candidate[] = [{
        id: 1,
        name: "Emma Watson",
        matchPercentage: 87,
        missingSkills: ["Docker"],
        resumeSkills: ["JavaScript", "React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Git", "REST API"],
        experience: 4,
        education: "Computer Science, MSc",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }, {
        id: 2,
        name: "Daniel Radcliffe",
        matchPercentage: 78,
        missingSkills: ["PostgreSQL", "GraphQL"],
        resumeSkills: ["JavaScript", "React", "Node.js", "Docker", "AWS", "Git", "REST API"],
        experience: 3,
        education: "Software Engineering, BSc",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }, {
        id: 3,
        name: "Hermione Granger",
        matchPercentage: 92,
        missingSkills: [],
        resumeSkills: ["JavaScript", "React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "GraphQL", "Git", "REST API"],
        experience: 5,
        education: "Computer Science, PhD",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg"
      }, {
        id: 4,
        name: "Ron Weasley",
        matchPercentage: 65,
        missingSkills: ["Node.js", "PostgreSQL", "GraphQL"],
        resumeSkills: ["JavaScript", "React", "Docker", "AWS", "Git", "REST API"],
        experience: 2,
        education: "Web Development, Bootcamp",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg"
      }, {
        id: 5,
        name: "Luna Lovegood",
        matchPercentage: 72,
        missingSkills: ["AWS", "GraphQL"],
        resumeSkills: ["JavaScript", "React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Git", "REST API"],
        experience: 3,
        education: "Information Systems, BSc",
        avatar: "https://randomuser.me/api/portraits/women/76.jpg"
      }];
      setCandidates(mockCandidates);
      setFilteredCandidates(mockCandidates);
      setSelectedCandidate(mockCandidates[0]);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis complete",
        description: `Found ${mockCandidates.length} potential candidates`
      });
    }, 3000);
  };
  const applyFilters = () => {
    let result = [...candidates];

    // Apply minimum match filter
    if (minMatchFilter > 0) {
      result = result.filter(candidate => candidate.matchPercentage >= minMatchFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "match") {
        comparison = a.matchPercentage - b.matchPercentage;
      } else if (sortBy === "experience") {
        comparison = a.experience - b.experience;
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });
    setFilteredCandidates(result);
    if (result.length > 0) {
      setSelectedCandidate(result[0]);
    } else {
      setSelectedCandidate(null);
    }
  };
  useEffect(() => {
    if (candidates.length > 0) {
      applyFilters();
    }
  }, [minMatchFilter, sortBy, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="min-h-screen bg-magical-midnight text-magical-starlight">
      <Starfield />
      <MagicCursor />
      <Navbar />
      
      <main className="pt-20 pb-12">
        {/* Page Header */}
        <section className="py-12 md:py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-6 bg-gradient-to-r from-magical-starlight via-magical-glowing-teal to-magical-starlight bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Smarter Hiring with AI-Powered Talent Insights
          </h1>
            <p className="text-magical-starlight/80 text-lg md:text-xl max-w-2xl mx-auto text-center mb-8">
              Upload your job description and candidate resumes to find the perfect match with our enchanted AI.
            </p>
          </div>
        </section>
        
        <div className="container mx-auto max-w-6xl px-4">
          {!analysisComplete ? (/* Upload Section */
        <Card className="magical-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="font-cinzel text-2xl text-center bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">Find Your Perfect Candidates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                
                {/* Resumes Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-magical-starlight/80">Candidate Resumes</label>
                  <div className="border-2 border-dashed border-magical-glowing-teal/30 rounded-lg p-6 flex flex-col items-center justify-center hover:border-magical-glowing-teal/50 transition-colors">
                    <UploadCloud className="h-10 w-10 text-magical-glowing-teal/70 mb-2" />
                    <p className="text-magical-starlight/70 text-sm mb-2">Upload multiple resumes</p>
                    <p className="text-magical-starlight/50 text-xs mb-4">PDF, DOCX, or TXT format</p>
                    <input type="file" accept=".pdf,.docx,.txt" onChange={handleResumesChange} className="hidden" multiple id="resumes-upload" />
                    <label htmlFor="resumes-upload" className="magical-button text-sm py-2 px-4 cursor-pointer">
                      Choose Files
                    </label>
                    {resumesUploaded > 0 && <div className="mt-4 text-magical-starlight/70 text-sm flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {resumesUploaded} {resumesUploaded === 1 ? 'resume' : 'resumes'} selected
                      </div>}
                  </div>
                </div>
                
                {/* Analyze Button */}
                <Button className="magical-button w-full py-6 text-lg" disabled={isAnalyzing} onClick={analyzeResumes}>
                  {isAnalyzing ? "Analyzing..." : "Find Matching Candidates"}
                  <div className="ml-2">✨</div>
                </Button>
                
                {/* Loading State */}
                {isAnalyzing && <div className="text-center py-4">
                    <div className="inline-block w-12 h-12 border-4 border-magical-glowing-teal/30 border-t-magical-glowing-teal rounded-full animate-spin"></div>
                    <p className="mt-4 text-magical-starlight/80">Casting spells to find your perfect candidates...</p>
                  </div>}
              </CardContent>
            </Card>) : (/* Results Section */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar - Candidate List */}
              <div className="lg:col-span-1">
                <Card className="magical-card sticky top-24">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-cinzel text-xl bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent flex items-center justify-between">
                      <span>Candidates ({filteredCandidates.length})</span>
                      <Button variant="ghost" size="sm" className="text-magical-glowing-teal hover:text-magical-glowing-teal/80">
                        <Download className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="mb-4 p-3 bg-magical-deep-purple/50 rounded-lg border border-magical-glowing-teal/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-magical-starlight/80 flex items-center">
                          <Filter className="h-4 w-4 mr-1" />
                          Filters
                        </span>
                        <Button variant="link" className="text-magical-glowing-teal p-0 h-auto text-xs">Reset</Button>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Match Percentage Filter */}
                        <div>
                          <label className="text-xs text-magical-starlight/70 block mb-1">
                            Min. Match: {minMatchFilter}%
                          </label>
                          <input type="range" min="0" max="100" value={minMatchFilter} onChange={e => setMinMatchFilter(parseInt(e.target.value))} className="w-full h-1 bg-magical-deep-purple rounded-lg appearance-none cursor-pointer" />
                        </div>
                        
                        {/* Sort Options */}
                        <div className="flex gap-2">
                          <select value={sortBy} onChange={e => setSortBy(e.target.value as "match" | "experience" | "name")} className="bg-magical-deep-purple border border-magical-glowing-teal/30 rounded text-xs p-1 flex-1">
                            <option value="match">Sort by: Match</option>
                            <option value="experience">Sort by: Experience</option>
                            <option value="name">Sort by: Name</option>
                          </select>
                          
                          <Button variant="outline" size="sm" className="border-magical-glowing-teal/30 p-1 h-auto" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Candidate List */}
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {filteredCandidates.length === 0 ? <p className="text-center text-magical-starlight/60 py-8">No candidates match your filters</p> : filteredCandidates.map(candidate => <div key={candidate.id} className={`p-3 rounded-lg cursor-pointer transition-all ${selectedCandidate?.id === candidate.id ? "bg-magical-glowing-teal/10 border border-magical-glowing-teal/30" : "bg-magical-deep-purple/30 hover:bg-magical-deep-purple/50 border border-magical-deep-purple/50"}`} onClick={() => setSelectedCandidate(candidate)}>
                            <div className="flex items-center mb-2">
                              <div className="relative mr-3">
                                <div className="badge-glow">
                                  <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover border border-magical-glowing-teal/30" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-magical-starlight font-medium truncate">{candidate.name}</h3>
                                <p className="text-magical-starlight/60 text-xs">{candidate.experience} years | {candidate.education}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <Progress value={candidate.matchPercentage} className="h-1.5 bg-magical-deep-purple" indicatorClassName={`${candidate.matchPercentage >= 80 ? "bg-magical-glowing-teal" : candidate.matchPercentage >= 60 ? "bg-amber-500" : "bg-magical-purple-light"}`} />
                              </div>
                              <span className="ml-2 text-sm font-medium text-magical-starlight/90">
                                {candidate.matchPercentage}%
                              </span>
                            </div>
                          </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Side - Candidate Details */}
              {selectedCandidate && <div className="lg:col-span-2 space-y-6">
                  {/* Candidate Profile */}
                  <Card className="magical-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                        {/* Avatar & Match Orb */}
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <div className="badge-glow">
                              <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-28 h-28 rounded-full object-cover border-2 border-magical-glowing-teal/50" />
                            </div>
                          </div>
                          
                          {/* Match Orb */}
                          <div className="relative w-20 h-20">
                            <div className="absolute inset-0 bg-magical-glowing-teal/20 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              {/* Crystal ball with match percentage */}
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-magical-deep-purple to-magical-enchanted border border-magical-glowing-teal/30 relative overflow-hidden flex items-center justify-center">
                                <div className={`text-xl font-bold ${selectedCandidate.matchPercentage >= 80 ? "text-magical-glowing-teal" : "text-magical-starlight"}`}>
                                  {selectedCandidate.matchPercentage}%
                                </div>
                                
                                {/* Particle effects */}
                                <div className="absolute inset-0">
                                  {Array.from({
                              length: 3
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
                          
                          {/* Match text */}
                          <span className="text-sm text-magical-starlight/70 mt-2">Match Score</span>
                        </div>
                        
                        {/* Candidate Info */}
                        <div className="flex-1">
                          <h2 className="text-3xl font-cinzel font-bold mb-2 text-magical-starlight">
                            {selectedCandidate.name}
                          </h2>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            <Badge className="bg-magical-deep-purple/70 text-magical-starlight border-magical-glowing-teal/20 px-3">
                              {selectedCandidate.experience} Years Experience
                            </Badge>
                            <Badge className="bg-magical-deep-purple/70 text-magical-starlight border-magical-glowing-teal/20 px-3">
                              {selectedCandidate.education}
                            </Badge>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-lg font-cinzel text-magical-glowing-teal mb-2 flex items-center">
                              <UserCheck className="h-4 w-4 mr-2" />
                              Matched Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedCandidate.resumeSkills.map((skill, index) => <Badge key={index} className={`px-3 py-1 ${selectedCandidate.missingSkills.includes(skill) ? "bg-magical-purple-dark/70 text-magical-purple-light" : "bg-magical-glowing-teal/10 text-magical-glowing-teal"}`}>
                                  {skill}
                                </Badge>)}
                            </div>
                          </div>
                          
                          {selectedCandidate.missingSkills.length > 0 && <div>
                              <h3 className="text-lg font-cinzel text-magical-purple-light mb-2">
                                Missing Skills
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedCandidate.missingSkills.map((skill, index) => <Badge key={index} className="bg-magical-purple-dark/70 text-magical-purple-light border-magical-purple-light/30 px-3 py-1">
                                    {skill}
                                  </Badge>)}
                              </div>
                            </div>}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                          <Button className="magical-button">Contact Candidate</Button>
                          <Button variant="outline" className="border-magical-glowing-teal/50 text-magical-starlight">Download Resume</Button>
                          <Button variant="ghost" className="text-magical-starlight">Schedule Interview</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* AI Insights */}
                  <Card className="magical-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-cinzel text-xl bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent">Real Time AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <p className="text-magical-starlight/80">
                          {selectedCandidate.name} is an {selectedCandidate.matchPercentage >= 80 ? "excellent" : "good"} match for this position, with strong skills in React and JavaScript.
                          {selectedCandidate.missingSkills.length === 0 ? " They possess all the required skills for this role." : ` They're missing ${selectedCandidate.missingSkills.join(", ")}, but their strong foundation suggests they could learn these quickly.`}
                        </p>
                        
                        <div className="bg-magical-deep-purple/30 rounded-lg p-4 border border-magical-glowing-teal/20">
                          <h4 className="font-cinzel text-magical-glowing-teal mb-2">Interview Recommendations</h4>
                          <ul className="space-y-2 list-disc list-inside text-magical-starlight/80">
                            <li>Ask about their experience with complex React applications</li>
                            <li>Discuss their approach to learning new technologies</li>
                            <li>Explore their problem-solving process with a technical challenge</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Candidate Constellation */}
                  <Card className="magical-card">
                    
                    
                  </Card>
                  
                  {/* Leadership Board */}
                  <Card className="magical-card overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="font-cinzel text-xl bg-gradient-to-r from-magical-starlight to-magical-glowing-teal bg-clip-text text-transparent flex justify-between items-center">
                        <span>Top Candidates Leaderboard</span>
                        <ChevronDown className="h-5 w-5 text-magical-glowing-teal" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="relative py-10">
                        {/* Podium */}
                        <div className="flex items-end justify-center mb-6">
                          {/* Second Place */}
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-16 h-16 mb-2 relative">
                              <img src={candidates[1]?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt="Second Place" className="w-full h-full rounded-full object-cover border-2 border-[#C0C0C0]" />
                              <div className="absolute -top-2 -right-2 bg-[#C0C0C0] rounded-full w-6 h-6 flex items-center justify-center">
                                2
                              </div>
                            </div>
                            <div className="w-20 h-16 bg-gradient-to-t from-[#C0C0C0]/80 to-[#C0C0C0]/40 rounded-t-lg flex items-center justify-center">
                              <div className="text-magical-starlight/90 text-sm">
                                {candidates[1]?.matchPercentage || 78}%
                              </div>
                            </div>
                          </div>
                          
                          {/* First Place */}
                          <div className="flex flex-col items-center z-10">
                            <Trophy className="h-8 w-8 text-[#FFD700] mb-2" />
                            <div className="w-20 h-20 mb-3 relative badge-glow">
                              <img src={candidates[0]?.avatar || "https://randomuser.me/api/portraits/women/66.jpg"} alt="First Place" className="w-full h-full rounded-full object-cover border-2 border-[#FFD700]" />
                              <div className="absolute -top-2 -right-2 bg-[#FFD700] rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                                1
                              </div>
                            </div>
                            <div className="w-28 h-24 bg-gradient-to-t from-[#FFD700]/80 to-[#FFD700]/40 rounded-t-lg flex items-center justify-center">
                              <div className="text-magical-midnight font-bold">
                                {candidates[0]?.matchPercentage || 92}%
                              </div>
                            </div>
                          </div>
                          
                          {/* Third Place */}
                          <div className="flex flex-col items-center ml-4">
                            <div className="w-16 h-16 mb-2 relative">
                              <img src={candidates[2]?.avatar || "https://randomuser.me/api/portraits/women/76.jpg"} alt="Third Place" className="w-full h-full rounded-full object-cover border-2 border-[#CD7F32]" />
                              <div className="absolute -top-2 -right-2 bg-[#CD7F32] rounded-full w-6 h-6 flex items-center justify-center">
                                3
                              </div>
                            </div>
                            <div className="w-20 h-12 bg-gradient-to-t from-[#CD7F32]/80 to-[#CD7F32]/40 rounded-t-lg flex items-center justify-center">
                              <div className="text-magical-starlight/90 text-sm">
                                {candidates[2]?.matchPercentage || 72}%
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Background Elements */}
                        <div className="absolute bottom-0 left-0 w-full h-6 bg-magical-deep-purple/30 rounded-lg"></div>
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-magical-deep-purple/20 rounded-lg"></div>
                      </div>
                      
                      {/* View All Button */}
                      <div className="text-center mt-4">
                        <Button variant="link" className="text-magical-glowing-teal">
                          View All Rankings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>}
            </div>)}
        </div>
      </main>
    </div>;
}
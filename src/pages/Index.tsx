
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, BookOpen, CheckCircle2, Users } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("job-seeker");
  const [matchPercentage, setMatchPercentage] = useState(0);

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">JD Buddy</h1>
        <p className="text-xl text-muted-foreground mt-2">Resume Skill Gap Analyzer</p>
      </div>

      <Tabs defaultValue="job-seeker" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="job-seeker">Job Seeker</TabsTrigger>
          <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="job-seeker" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document Upload Section */}
            <Card>
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
                  <Input id="resume" type="file" accept=".pdf,.txt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description (PDF or TXT)</Label>
                  <Input id="job-description" type="file" accept=".pdf,.txt" />
                </div>
                <Button className="w-full">Analyze Skills</Button>
              </CardContent>
            </Card>

            {/* Match Score Section */}
            <Card>
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
                    <div className="text-muted-foreground text-sm">Upload your documents to see matched skills</div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Missing Skills</h4>
                    <div className="text-muted-foreground text-sm">Upload your documents to see missing skills</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Learning Recommendations
              </CardTitle>
              <CardDescription>Personalized recommendations for your missing skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Upload your resume and a job description to get personalized recommendations
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recruiter" className="space-y-8">
          <Card>
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
                <Input id="job-description-recruiter" type="file" accept=".pdf,.txt" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resumes-csv">Resumes (CSV with links or ZIP file)</Label>
                <Input id="resumes-csv" type="file" accept=".csv,.zip" />
              </div>
              <Button className="w-full">Find Best Matches</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Candidate Rankings</CardTitle>
              <CardDescription>Top candidates based on skill match</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Upload a job description and candidate resumes to see rankings
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;


import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

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

interface SkillDetailModalProps {
  skill: Skill;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLevel: (id: string, level: number) => void;
}

export default function SkillDetailModal({ 
  skill, 
  isOpen, 
  onClose,
  onUpdateLevel 
}: SkillDetailModalProps) {
  const [newLevel, setNewLevel] = useState<number>(skill.level);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const handleLevelChange = (value: number[]) => {
    setNewLevel(value[0]);
  };
  
  const handleSave = () => {
    onUpdateLevel(skill.id, newLevel);
    setIsEditing(false);
  };
  
  const handleResourceClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url.trim(), '_blank');
    }
  };
  
  // Extract URLs from resource strings
  const extractUrl = (resource: string) => {
    const urlMatch = resource.match(/(https?:\/\/[^\s]+)/);
    return urlMatch ? urlMatch[0] : '';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-magical-midnight border border-magical-glowing-teal/30 text-magical-starlight max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-cinzel text-2xl">
            <span style={{ color: skill.color }}>{skill.name}</span>
            <Badge variant="outline" className="capitalize ml-2">
              {skill.category}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-magical-starlight/70">
            <div className="mt-4">
              {!isEditing ? (
                <div className="flex items-center gap-2">
                  <Progress 
                    value={skill.level} 
                    className="h-2 flex-1" 
                    indicatorClassName="bg-opacity-80"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                  />
                  <span className="text-sm font-medium">{skill.level}%</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <Slider 
                    defaultValue={[newLevel]} 
                    max={100} 
                    step={5} 
                    onValueChange={handleLevelChange} 
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs">
                    <span>Novice (0%)</span>
                    <span>Expert (100%)</span>
                  </div>
                  <div className="text-center font-medium">
                    Current Level: {newLevel}%
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-1 text-magical-glowing-teal">Description</h4>
            <p className="text-magical-starlight/80">{skill.description}</p>
          </div>
          
          {/* Resources */}
          {skill.resources && skill.resources.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 text-magical-glowing-teal">Learning Resources</h4>
              <ul className="space-y-2">
                {skill.resources.map((resource, index) => {
                  const url = extractUrl(resource);
                  const displayText = resource.replace(url, '').trim().replace(':', '');
                  
                  return (
                    <li key={index} className="flex items-start">
                      <button 
                        className={`text-left text-sm ${url ? 'text-magical-glowing-teal hover:underline flex items-center' : 'text-magical-starlight/80'}`}
                        onClick={() => url && handleResourceClick(url)}
                        disabled={!url}
                      >
                        {displayText || resource}
                        {url && <ExternalLink className="w-3 h-3 ml-1 inline" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          
          {/* Project idea */}
          {skill.projectIdea && (
            <div>
              <h4 className="text-sm font-semibold mb-1 text-magical-glowing-teal">Project Idea</h4>
              <p className="text-magical-starlight/80">{skill.projectIdea}</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-magical-glowing-teal hover:bg-magical-glowing-teal/80">
              Update Skill Level
            </Button>
          ) : (
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-magical-glowing-teal hover:bg-magical-glowing-teal/80">
                Save Changes
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

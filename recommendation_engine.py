
from typing import Dict, Set, List
import streamlit as st
from llm_utils import get_skill_description_and_resources

def generate_recommendations(missing_skills: Set[str]) -> List[Dict]:
    """
    Generate magical learning recommendations for missing skills.
    
    Args:
        missing_skills: Set of skills missing from the resume
        
    Returns:
        List of dictionaries containing recommendations for each skill
    """
    recommendations = []
    
    for skill in missing_skills:
        # Get skill info using LLM
        skill_info = get_skill_description_and_resources(skill)
        
        # Enhanced with magical elements
        magical_descriptions = {
            "Node.js": "The arcane art of server-side spellcasting with JavaScript",
            "React": "The enchanted library for crafting magical user interfaces",
            "Docker": "The mystical art of containerizing your applications in magical vessels",
            "AWS": "The vast ethereal cloud realm where applications are summoned",
            "GraphQL": "The crystal ball query language for precise data divination",
            "PostgreSQL": "The ancient repository of structured knowledge and relational wisdom",
            "TypeScript": "JavaScript enhanced with the power of type incantations"
        }
        
        # Add to recommendations list with enhanced magical elements
        recommendations.append({
            "skill": skill,
            "description": magical_descriptions.get(skill, skill_info["description"]),
            "resources": skill_info["resources"],
            "project_idea": skill_info["project_idea"],
            "spell_level": determine_spell_level(skill),  # Magical difficulty level
            "element": determine_magical_element(skill),  # Magical element association
            "completed": False  # Track progress
        })
    
    return recommendations

def determine_spell_level(skill: str) -> str:
    """Determine the magical difficulty level of a skill."""
    spell_levels = {
        "HTML": "Novice",
        "CSS": "Apprentice",
        "JavaScript": "Adept",
        "React": "Enchanter",
        "Node.js": "Conjurer", 
        "TypeScript": "Illusionist",
        "AWS": "Archmage",
        "Docker": "Summoner",
        "PostgreSQL": "Oracle",
        "GraphQL": "Diviner"
    }
    return spell_levels.get(skill, "Arcanist")

def determine_magical_element(skill: str) -> str:
    """Determine the magical element associated with a skill."""
    elements = {
        "HTML": "Earth",
        "CSS": "Water",
        "JavaScript": "Fire",
        "TypeScript": "Air",
        "React": "Aether",
        "Node.js": "Lightning",
        "AWS": "Cloud",
        "Docker": "Ocean",
        "PostgreSQL": "Crystal",
        "GraphQL": "Cosmic"
    }
    return elements.get(skill, "Arcane")

def update_skill_progress(skill: str, completed: bool) -> None:
    """
    Update progress for a specific skill in session state.
    
    Args:
        skill: The skill to update
        completed: Whether the skill has been learned
    """
    if 'recommendations' not in st.session_state:
        return
    
    for recommendation in st.session_state.recommendations:
        if recommendation["skill"] == skill:
            recommendation["completed"] = completed
            
            # Add magical celebration effects when skill is completed
            if completed:
                st.balloons()
            
            break
    
    # Recalculate match percentage based on completed skills
    if 'jd_skills' in st.session_state and 'resume_skills' in st.session_state:
        jd_skills = st.session_state.jd_skills
        resume_skills = st.session_state.resume_skills.copy()
        
        # Add completed skills to resume skills
        for recommendation in st.session_state.recommendations:
            if recommendation["completed"]:
                resume_skills.add(recommendation["skill"])
        
        # Calculate new match percentage
        if jd_skills:
            matched_skills = resume_skills.intersection(jd_skills)
            match_percentage = (len(matched_skills) / len(jd_skills)) * 100
            st.session_state.current_match_percentage = round(match_percentage, 1)
            
            # Achievement unlocking
            if st.session_state.current_match_percentage >= 90 and 'achievement_master' not in st.session_state:
                st.session_state.achievement_master = True
                st.success("🏆 Achievement Unlocked: Master Enchanter! Your skills are now highly aligned with the job requirements!")
            elif st.session_state.current_match_percentage >= 75 and 'achievement_adept' not in st.session_state:
                st.session_state.achievement_adept = True
                st.success("🏆 Achievement Unlocked: Skilled Arcanist! You're well on your way to magical mastery!")
            elif st.session_state.current_match_percentage >= 50 and 'achievement_apprentice' not in st.session_state:
                st.session_state.achievement_apprentice = True
                st.success("🏆 Achievement Unlocked: Promising Apprentice! Your journey through the arcane arts has begun!")

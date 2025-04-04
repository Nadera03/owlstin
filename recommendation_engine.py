
from typing import Dict, Set, List
import streamlit as st
from llm_utils import get_skill_description_and_resources

def generate_recommendations(missing_skills: Set[str]) -> List[Dict]:
    """
    Generate learning recommendations for missing skills.
    
    Args:
        missing_skills: Set of skills missing from the resume
        
    Returns:
        List of dictionaries containing recommendations for each skill
    """
    recommendations = []
    
    for skill in missing_skills:
        # Get skill info using LLM
        skill_info = get_skill_description_and_resources(skill)
        
        # Add to recommendations list
        recommendations.append({
            "skill": skill,
            "description": skill_info["description"],
            "resources": skill_info["resources"],
            "project_idea": skill_info["project_idea"],
            "completed": False  # Track progress
        })
    
    return recommendations

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

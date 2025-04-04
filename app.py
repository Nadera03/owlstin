
import streamlit as st
import pandas as pd
import os
import plotly.express as px
from typing import List, Dict, Set
import base64
from io import BytesIO

# Import our custom modules
from utils import (
    extract_text_from_file, 
    calculate_match_percentage, 
    get_missing_skills,
    get_matching_skills,
    process_multiple_resumes
)
from llm_utils import extract_skills_with_llm
from recommendation_engine import generate_recommendations, update_skill_progress

# Set page config
st.set_page_config(
    page_title="JD Buddy - Resume Skill Analyzer",
    page_icon="📋",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better UI
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #3498db;
        margin-bottom: 1rem;
    }
    .subheader {
        font-size: 1.5rem;
        color: #2c3e50;
        margin-bottom: 1.5rem;
    }
    .card {
        padding: 1.5rem;
        border-radius: 10px;
        background-color: #f8f9fa;
        box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
        margin-bottom: 1.5rem;
    }
    .skill-card {
        padding: 0.75rem;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        background-color: white;
        border-left: 4px solid #3498db;
    }
    .missing-skill {
        border-left: 4px solid #e74c3c;
    }
    .matched-skill {
        border-left: 4px solid #2ecc71;
    }
    .skill-title {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    .resource-link {
        color: #3498db;
        text-decoration: none;
    }
    .resource-link:hover {
        text-decoration: underline;
    }
    .progress-container {
        padding: 1rem;
        background-color: #ecf0f1;
        border-radius: 5px;
        margin-top: 1rem;
    }
</style>
""", unsafe_allow_html=True)

def initialize_session_state():
    """Initialize session state variables if they don't exist."""
    if 'resume_text' not in st.session_state:
        st.session_state.resume_text = ""
    if 'jd_text' not in st.session_state:
        st.session_state.jd_text = ""
    if 'resume_skills' not in st.session_state:
        st.session_state.resume_skills = set()
    if 'jd_skills' not in st.session_state:
        st.session_state.jd_skills = set()
    if 'recommendations' not in st.session_state:
        st.session_state.recommendations = []
    if 'initial_match_percentage' not in st.session_state:
        st.session_state.initial_match_percentage = 0.0
    if 'current_match_percentage' not in st.session_state:
        st.session_state.current_match_percentage = 0.0
    if 'mode' not in st.session_state:
        st.session_state.mode = "Job Seeker"

def render_header():
    """Render the application header."""
    st.markdown('<h1 class="main-header">JD Buddy</h1>', unsafe_allow_html=True)
    st.markdown('<p class="subheader">Analyze your resume against job descriptions and bridge your skill gaps</p>', 
                unsafe_allow_html=True)

def render_file_upload_section():
    """Render the file upload section."""
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 📤 Upload Files")
    
    if st.session_state.mode == "Job Seeker":
        col1, col2 = st.columns(2)
        
        with col1:
            resume_file = st.file_uploader("Upload your Resume (PDF or TXT)", type=["pdf", "txt"])
            if resume_file is not None:
                st.session_state.resume_text = extract_text_from_file(resume_file)
                if st.session_state.resume_text:
                    st.success(f"Resume uploaded: {resume_file.name}")
                    
        with col2:
            jd_file = st.file_uploader("Upload Job Description (PDF or TXT)", type=["pdf", "txt"])
            if jd_file is not None:
                st.session_state.jd_text = extract_text_from_file(jd_file)
                if st.session_state.jd_text:
                    st.success(f"Job Description uploaded: {jd_file.name}")
        
    else:  # Recruiter mode
        col1, col2 = st.columns(2)
        
        with col1:
            resume_files = st.file_uploader("Upload Candidate Resumes (PDF or TXT)", 
                                           type=["pdf", "txt"], accept_multiple_files=True)
            if resume_files:
                st.success(f"Uploaded {len(resume_files)} resume files")
        
        with col2:
            jd_file = st.file_uploader("Upload Job Description (PDF or TXT)", type=["pdf", "txt"])
            if jd_file is not None:
                st.session_state.jd_text = extract_text_from_file(jd_file)
                if st.session_state.jd_text:
                    st.success(f"Job Description uploaded: {jd_file.name}")
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Analysis button
    if st.session_state.mode == "Job Seeker":
        if st.session_state.resume_text and st.session_state.jd_text:
            if st.button("Analyze Skills", type="primary"):
                with st.spinner("Analyzing skills with AI..."):
                    st.session_state.resume_skills = extract_skills_with_llm(
                        st.session_state.resume_text, is_resume=True)
                    st.session_state.jd_skills = extract_skills_with_llm(
                        st.session_state.jd_text, is_resume=False)
                    
                    missing_skills = get_missing_skills(
                        st.session_state.resume_skills, st.session_state.jd_skills)
                    
                    # Generate recommendations for missing skills
                    st.session_state.recommendations = generate_recommendations(missing_skills)
                    
                    # Calculate initial match percentage
                    st.session_state.initial_match_percentage = calculate_match_percentage(
                        st.session_state.resume_skills, st.session_state.jd_skills)
                    st.session_state.current_match_percentage = st.session_state.initial_match_percentage
                
                st.success("Analysis complete! Check the results below.")
    else:  # Recruiter mode
        if resume_files and st.session_state.jd_text:
            if st.button("Rank Candidates", type="primary"):
                with st.spinner("Analyzing candidates..."):
                    # First extract JD skills if not already done
                    if not st.session_state.jd_skills:
                        st.session_state.jd_skills = extract_skills_with_llm(
                            st.session_state.jd_text, is_resume=False)
                    
                    # Process all resumes
                    st.session_state.candidate_rankings = process_multiple_resumes(
                        resume_files, st.session_state.jd_text, st.session_state.jd_skills)
                
                st.success("Candidate ranking complete!")

def render_skill_analysis_section():
    """Render the skill analysis section."""
    if not (st.session_state.resume_skills and st.session_state.jd_skills):
        return
    
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 🔍 Skill Analysis")
    
    # Create two columns for side-by-side comparison
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### 🎯 Skills in Job Description")
        for skill in st.session_state.jd_skills:
            skill_class = "matched-skill" if skill in st.session_state.resume_skills else "missing-skill"
            st.markdown(f'<div class="skill-card {skill_class}"><div class="skill-title">{skill}</div></div>', 
                      unsafe_allow_html=True)
    
    with col2:
        st.markdown("#### 📝 Your Skills")
        for skill in st.session_state.resume_skills:
            skill_class = "matched-skill" if skill in st.session_state.jd_skills else ""
            st.markdown(f'<div class="skill-card {skill_class}"><div class="skill-title">{skill}</div></div>', 
                      unsafe_allow_html=True)
    
    # Summary statistics
    st.markdown("#### 📊 Skill Match Summary")
    col1, col2, col3 = st.columns(3)
    
    missing_skills = get_missing_skills(st.session_state.resume_skills, st.session_state.jd_skills)
    matching_skills = get_matching_skills(st.session_state.resume_skills, st.session_state.jd_skills)
    
    with col1:
        st.metric("Skills Matched", f"{len(matching_skills)}/{len(st.session_state.jd_skills)}")
    
    with col2:
        st.metric("Skills Missing", len(missing_skills))
    
    with col3:
        st.metric("Initial Match Percentage", f"{st.session_state.initial_match_percentage}%")
    
    # Visualization of skill match
    skills_data = {
        "Category": ["Matched", "Missing"],
        "Count": [len(matching_skills), len(missing_skills)]
    }
    df = pd.DataFrame(skills_data)
    
    fig = px.pie(
        df, 
        values="Count", 
        names="Category",
        color="Category",
        color_discrete_map={"Matched": "#2ecc71", "Missing": "#e74c3c"},
        hole=0.4
    )
    fig.update_layout(margin=dict(t=0, b=0, l=0, r=0), height=250)
    
    st.plotly_chart(fig, use_container_width=True)
    
    st.markdown('</div>', unsafe_allow_html=True)

def render_recommendations_section():
    """Render the recommendations and progress tracking section."""
    if not st.session_state.recommendations:
        return
    
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 🚀 Skill Development Recommendations")
    
    # Show current progress
    st.markdown('<div class="progress-container">', unsafe_allow_html=True)
    st.markdown(f"#### Your Current Match: {st.session_state.current_match_percentage}%")
    st.progress(st.session_state.current_match_percentage / 100)
    
    # Calculate potential match if all skills are learned
    potential_match = 100.0
    st.markdown(f"#### Potential Match After Learning: {potential_match}%")
    st.progress(potential_match / 100)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Recommendations for each missing skill
    for i, recommendation in enumerate(st.session_state.recommendations):
        skill = recommendation["skill"]
        completed = recommendation["completed"]
        
        # Create an expander for each skill
        with st.expander(f"{skill} {'✅' if completed else ''}"):
            col1, col2 = st.columns([4, 1])
            
            with col1:
                st.markdown(f"**Description**: {recommendation['description']}")
                
                st.markdown("**Learning Resources**:")
                for resource in recommendation["resources"]:
                    st.markdown(f"- {resource}")
                
                st.markdown(f"**Project Idea**: {recommendation['project_idea']}")
            
            with col2:
                # Checkbox to mark skill as completed
                new_state = st.checkbox("I've learned this skill", 
                                      value=completed, 
                                      key=f"skill_{i}")
                
                # Update progress if checkbox state changed
                if new_state != completed:
                    update_skill_progress(skill, new_state)
    
    st.markdown('</div>', unsafe_allow_html=True)

def render_recruiter_section():
    """Render the recruiter section for comparing multiple candidates."""
    if 'candidate_rankings' not in st.session_state:
        return
    
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.markdown("### 👥 Candidate Rankings")
    
    # Display candidate rankings table
    st.dataframe(
        st.session_state.candidate_rankings[['Candidate', 'Match Percentage', 'Missing Skills']], 
        use_container_width=True,
        hide_index=True
    )
    
    # Show top 3 candidates if we have that many
    if len(st.session_state.candidate_rankings) >= 3:
        st.markdown("#### 🏆 Top 3 Candidates")
        top_candidates = st.session_state.candidate_rankings.head(3)
        
        # Create bar chart of match percentages
        fig = px.bar(
            top_candidates,
            x='Candidate',
            y='Match Percentage',
            color='Match Percentage',
            color_continuous_scale=['#e74c3c', '#f39c12', '#2ecc71'],
            text='Match Percentage'
        )
        fig.update_layout(
            xaxis_title="Candidate",
            yaxis_title="Match Percentage (%)",
            yaxis_range=[0, 100]
        )
        fig.update_traces(texttemplate='%{text:.1f}%', textposition='outside')
        
        st.plotly_chart(fig, use_container_width=True)
    
    st.markdown('</div>', unsafe_allow_html=True)

def render_sidebar():
    """Render the application sidebar."""
    with st.sidebar:
        st.image("https://img.icons8.com/color/96/000000/document-comparison.png", width=80)
        st.markdown("## JD Buddy")
        st.markdown("*Your AI career assistant*")
        
        st.markdown("---")
        
        # Mode selector
        st.markdown("### Mode")
        mode = st.radio("Choose mode:", ["Job Seeker", "Recruiter"])
        if mode != st.session_state.mode:
            st.session_state.mode = mode
            # Clear relevant session state when switching modes
            if mode == "Job Seeker":
                if 'candidate_rankings' in st.session_state:
                    del st.session_state.candidate_rankings
            else:
                if 'recommendations' in st.session_state:
                    del st.session_state.recommendations
        
        st.markdown("---")
        
        # Show current progress if available
        if st.session_state.mode == "Job Seeker" and hasattr(st.session_state, 'current_match_percentage'):
            st.markdown("### Your Progress")
            st.metric(
                "Current Match", 
                f"{st.session_state.current_match_percentage}%",
                f"{st.session_state.current_match_percentage - st.session_state.initial_match_percentage:.1f}%"
            )
        
        st.markdown("---")
        
        # About section
        st.markdown("### About")
        st.markdown("""
        JD Buddy helps you:
        - Compare your resume to job descriptions
        - Identify missing skills
        - Get personalized learning recommendations
        - Track your progress
        """)
        
        st.markdown("---")
        
        # Reset button
        if st.button("Reset All Data"):
            for key in list(st.session_state.keys()):
                del st.session_state[key]
            initialize_session_state()
            st.experimental_rerun()

def main():
    """Main application function."""
    # Initialize session state
    initialize_session_state()
    
    # Render sidebar
    render_sidebar()
    
    # Render header
    render_header()
    
    # Render file upload section
    render_file_upload_section()
    
    # Render skill analysis section (for Job Seeker mode)
    if st.session_state.mode == "Job Seeker":
        render_skill_analysis_section()
        render_recommendations_section()
    else:
        # Render recruiter section
        render_recruiter_section()

if __name__ == "__main__":
    main()

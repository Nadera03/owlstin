
import os
import pandas as pd
import pdfplumber
import PyPDF2
import io
from typing import List, Dict, Set, Tuple

def extract_text_from_pdf(pdf_file) -> str:
    """Extract text from uploaded PDF file."""
    text = ""
    try:
        # First try with pdfplumber which handles more complex PDFs
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        
        # If text is empty, try PyPDF2 as fallback
        if not text.strip():
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for page in pdf_reader.pages:
                text += page.extract_text() or ""
                
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def extract_text_from_txt(txt_file) -> str:
    """Extract text from uploaded TXT file."""
    try:
        text = txt_file.read().decode('utf-8')
        return text
    except Exception as e:
        print(f"Error extracting text from TXT: {e}")
        return ""

def extract_text_from_file(uploaded_file) -> str:
    """Extract text from uploaded file based on file type."""
    if uploaded_file is None:
        return ""
    
    file_extension = os.path.splitext(uploaded_file.name)[1].lower()
    
    # Create a copy of the file in memory
    file_copy = io.BytesIO(uploaded_file.getvalue())
    
    if file_extension == '.pdf':
        return extract_text_from_pdf(file_copy)
    elif file_extension == '.txt':
        return extract_text_from_txt(file_copy)
    else:
        return ""

def calculate_match_percentage(resume_skills: Set[str], jd_skills: Set[str]) -> float:
    """Calculate the percentage of JD skills that match with resume skills."""
    if not jd_skills:
        return 100.0
    
    matched_skills = resume_skills.intersection(jd_skills)
    match_percentage = (len(matched_skills) / len(jd_skills)) * 100
    return round(match_percentage, 1)

def get_missing_skills(resume_skills: Set[str], jd_skills: Set[str]) -> Set[str]:
    """Identify skills present in the job description but missing from the resume."""
    return jd_skills.difference(resume_skills)

def get_matching_skills(resume_skills: Set[str], jd_skills: Set[str]) -> Set[str]:
    """Identify skills present in both the resume and job description."""
    return resume_skills.intersection(jd_skills)

def process_multiple_resumes(resume_files, jd_text: str, jd_skills: Set[str]) -> pd.DataFrame:
    """Process multiple resumes and rank them based on skill match."""
    from llm_utils import extract_skills_with_llm
    
    results = []
    
    for resume_file in resume_files:
        resume_text = extract_text_from_file(resume_file)
        resume_skills = extract_skills_with_llm(resume_text, is_resume=True)
        
        match_percentage = calculate_match_percentage(resume_skills, jd_skills)
        missing_skills = get_missing_skills(resume_skills, jd_skills)
        
        results.append({
            'Candidate': resume_file.name,
            'Match Percentage': match_percentage,
            'Missing Skills': ', '.join(missing_skills),
            'Resume Skills': ', '.join(resume_skills)
        })
    
    # Sort by match percentage in descending order
    results_df = pd.DataFrame(results)
    results_df = results_df.sort_values('Match Percentage', ascending=False)
    
    return results_df

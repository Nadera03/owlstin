
# Owlstin - Resume Skill Gap Analyzer

Owlstin is a Streamlit application that helps job seekers identify missing skills by comparing their resume to job descriptions. It uses LLM technology to extract skills and provide personalized recommendations.

## Features

- **Resume & Job Description Analysis**: Upload your resume and a job description to identify skill gaps
- **Skill Extraction**: Uses AI to extract relevant skills from both documents
- **Personalized Recommendations**: Get learning resources and project ideas for each missing skill
- **Progress Tracking**: Track your progress as you acquire new skills
- **Recruiter Mode**: Compare multiple resumes against a job description to find the best candidates

## Installation

1. Clone this repository
2. Install the requirements:
```
pip install -r requirements.txt
```

3. **Set up your LLM API**:
   - For OpenAI: Set your API key as an environment variable
     ```
     export OPENAI_API_KEY=your_api_key_here
     ```
   - Or replace the placeholder implementation in `llm_utils.py` with your preferred LLM

4. Run the Streamlit app:
```
streamlit run app.py
```

## LLM Integration

JD Buddy is designed to work with popular LLMs like OpenAI's GPT models or other compatible APIs. The app includes a placeholder implementation in `llm_utils.py` that you need to replace with your preferred LLM integration.

### OpenAI Integration

To use OpenAI's API:

1. Uncomment the OpenAI implementation in `llm_utils.py`
2. Replace `your_api_key_here` with your actual OpenAI API key or set it as an environment variable:
   ```python
   openai.api_key = os.environ.get("OPENAI_API_KEY", "your_api_key_here")
   ```
3. Customize the model and parameters if needed

### Using other LLMs

The app's structure makes it easy to integrate with other LLMs:

1. Modify the `extract_skills_with_llm` function in `llm_utils.py`
2. Replace the API call with your preferred LLM's API
3. Format the prompt and parse the response according to your LLM's requirements

## Project Structure

- `app.py`: Main Streamlit application
- `utils.py`: Utility functions for text extraction and processing
- `llm_utils.py`: LLM integration functions (replace with your LLM implementation)
- `recommendation_engine.py`: Functions for generating recommendations
- `requirements.txt`: Project dependencies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

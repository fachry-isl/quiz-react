import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
from models import QuizRequest, QuizResponse, QuizQuestion
import json

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Quiz Generator API",
    description="Generate quiz questions using Google Gemini AI",
    version="1.0.0"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "active",
        "message": "AI Quiz Generator API is running",
        "version": "1.0.0"
    }

@app.post("/api/generate-quiz", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest):
    """
    Generate quiz questions based on topic using Gemini AI
    
    Args:
        request: QuizRequest containing topic, number of questions, and difficulty
        
    Returns:
        QuizResponse with generated questions matching the schema
    """
    try:
        # Initialize Gemini model with structured output
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Create prompt for quiz generation
        prompt = f"""
Generate {request.num_questions} multiple-choice quiz questions about "{request.topic}" 
at {request.difficulty} difficulty level.

For each question, provide:
1. A clear, well-formulated question
2. Exactly 4 answer options labeled A, B, C, D
3. The correct answer key (A, B, C, or D)
4. A helpful hint that guides without giving away the answer
5. A detailed explanation of why the correct answer is right

Return the response as a JSON array with this exact structure:
{{
  "questions": [
    {{
      "id": 1,
      "question": "Question text here?",
      "options": [
        {{"key": "A", "description": "A. First option"}},
        {{"key": "B", "description": "B. Second option"}},
        {{"key": "C", "description": "C. Third option"}},
        {{"key": "D", "description": "D. Fourth option"}}
      ],
      "key_answer": "B",
      "hint": "Hint text here",
      "explanation": "Detailed explanation here"
    }}
  ]
}}

Make sure:
- Each option's description includes the key prefix (e.g., "A. Option text")
- The key_answer matches one of the option keys
- Hints are helpful but don't reveal the answer directly
- Explanations are comprehensive and educational
"""

        # Generate content with structured output
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.7,
            )
        )
        
        # Parse the response
        quiz_data = json.loads(response.text)
        
        # Validate and return using Pydantic model
        quiz_response = QuizResponse(**quiz_data)
        
        return quiz_response
        
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse AI response: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Quiz generation failed: {str(e)}"
        )

@app.get("/api/health")
async def health_check():
    """Extended health check with API status"""
    return {
        "status": "healthy",
        "api_configured": bool(GEMINI_API_KEY),
        "endpoints": {
            "generate_quiz": "/api/generate-quiz",
            "health": "/api/health"
        }
    }

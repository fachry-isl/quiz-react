import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
from models import QuizRequest, QuizResponse, QuizQuestion
import json
import csv
from datetime import datetime
import traceback

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
    allow_origins=[        
        "http://localhost:5173",
        "http://127.0.0.1:5173",  # Add both localhost AND 127.0.0.1
        "http://localhost:5174",  # Vite sometimes uses different ports
        ], 
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
    print("Received request:", request)
    try:
        # Initialize Gemini model with structured output
        model = genai.GenerativeModel('gemini-2.0-flash')
        
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
- Diversity of key answers from A to D
"""

        # Generate content with structured output
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.7,
            )
        )

        # Extract token usage metadata
        usage = response.usage_metadata
        input_tokens = usage.prompt_token_count
        output_tokens = usage.candidates_token_count
        total_tokens = usage.total_token_count
        
        # Calculate costs (Gemini 2.0 Flash pricing as of Dec 2024)
        # Input: $0.075 per 1M tokens
        # Output: $0.30 per 1M tokens
        input_cost = (input_tokens / 1_000_000) * 0.075
        output_cost = (output_tokens / 1_000_000) * 0.30
        total_cost = input_cost + output_cost

        # Calculate in Rupiah (1 Dollar is Rp.16.752 as of Dec 2025)
        input_cost_rp = input_cost * 16.752
        output_cost_rp = output_cost * 16.752
        total_cost_rp = input_cost_rp + output_cost_rp

        # Log usage
        print(f"Token Usage - Input: {input_tokens}, Output: {output_tokens}, Total: {total_tokens}")
        print(f"Estimated Cost (USD) - Input: ${input_cost:.6f}, Output: ${output_cost:.6f}, Total: ${total_cost:.6f}")
        print(f"Estimated Cost (Rupiah) - Input: Rp.{input_cost_rp:.6f}, Output: Rp.{output_cost_rp:.6f}, Total: Rp.{total_cost_rp:.6f}")
        

        # Save Log
        try:
            log_usage_to_csv(
                request.topic,
                input_tokens,
                output_tokens,
                total_cost
            )
        except OSError as e:
            # This returns a clearer message to the client instead of a generic 500
            raise HTTPException(status_code=500, detail=f"Storage error writing usage log: {e}")
        
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


def _ensure_file(path: str):
    """
    Ensure `path` exists and is a regular file.
    - If the parent directory doesn't exist, create it.
    - If the path exists and is a directory, raise OSError.
    - If the path doesn't exist, create an empty file.
    Returns the path.
    """
    dirpath = os.path.dirname(path) or "."
    if dirpath and not os.path.exists(dirpath):
        os.makedirs(dirpath, exist_ok=True)

    if os.path.exists(path) and os.path.isdir(path):
        raise OSError(f"Expected a file at '{path}', but found a directory.")

    if not os.path.exists(path):
        # Create an empty file
        open(path, "w").close()

    return path

def log_usage_to_csv(topic, input_tokens, output_tokens, cost, path="/app/logs/api_usage.csv"):
    """Log token usage to CSV file, creating the file if needed."""
    try:
        _ensure_file(path)
        with open(path, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([
                datetime.now().isoformat(),
                topic,
                input_tokens,
                output_tokens,
                cost
            ])
    except OSError as e:
        print("File I/O error while writing api_usage.csv:", str(e))
        print(traceback.format_exc())
        # Re-raise so caller can map to a proper HTTP response
        raise
    except Exception as e:
        print("Unexpected error while writing api_usage.csv:", str(e))
        print(traceback.format_exc())
        raise
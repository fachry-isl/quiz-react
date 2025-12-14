from pydantic import BaseModel, Field
from typing import List

class QuizOption(BaseModel):
    """Model for quiz option"""
    key: str = Field(..., description="Option key (A, B, C, D)")
    description: str = Field(..., description="Full option text with key prefix")

class QuizQuestion(BaseModel):
    """Model for a single quiz question matching your dummy data structure"""
    id: int = Field(..., description="Unique question ID")
    question: str = Field(..., description="The quiz question text")
    options: List[QuizOption] = Field(..., description="List of answer options")
    key_answer: str = Field(..., description="Correct answer key (A, B, C, D)")
    hint: str = Field(..., description="Helpful hint for the question")
    explanation: str = Field(..., description="Detailed explanation of the correct answer")

class QuizResponse(BaseModel):
    """Response model containing generated quiz questions"""
    questions: List[QuizQuestion]

class QuizRequest(BaseModel):
    """Request model for quiz generation"""
    topic: str = Field(..., description="Topic for quiz generation", min_length=3)
    num_questions: int = Field(default=3, description="Number of questions to generate", ge=1, le=10)
    difficulty: str = Field(default="medium", description="Difficulty level: easy, medium, hard")

# AI Quiz Generator

An AI-powered application that generates multiple-choice quizzes on any topic using Google's Gemini AI.

## 🚀 Features

*   **AI-Powered Generation**: Instantly creates quizzes with questions, options, hints, and explanations using Gemini 2.0 Flash.
*   **Modern UI**: Responsive and interactive frontend built with React and TailwindCSS.
*   **FastAPI Backend**: robust and fast Python backend.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: TailwindCSS
*   **State/Interactions**: React Hooks, React Hot Toast, React Confetti

### Backend
*   **Framework**: FastAPI
*   **AI Model**: Google Gemini 2.0 Flash
*   **Validation**: Pydantic

## 📋 Prerequisites

*   **Node.js** (v18+ recommended)
*   **Python** (3.9+ recommended)
*   **Google Gemini API Key**: Get one at [Google AI Studio](https://aistudio.google.com/)

## ⚙️ Installation & Setup

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up environment variables:
Create a `.env` file in the `backend` directory and add your API key:
```env
GEMINI_API_KEY=your_api_key_here
```

Start the backend server:
```bash
uvicorn main:app --reload
```
The API will run at `http://127.0.0.1:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The application will open at `http://localhost:5173`.

## 📚 API Endpoints

*   `GET /`: Health check.
*   `GET /api/health`: Detailed status including API key configuration.
*   `POST /api/generate-quiz`: Generates a new quiz based on topic and difficulty.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch.
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

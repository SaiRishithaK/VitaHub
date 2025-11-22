# ai_engine.py
from dotenv import load_dotenv
import os
import google.generativeai as genai
from pathlib import Path

# -------------------------------
# Load .env explicitly
# -------------------------------
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Get Gemini API key from environment
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing. Please set it in .env")

# Configure Gemini SDK
genai.configure(api_key=api_key)

# -------------------------------
# Function to generate AI explanation
# -------------------------------
def explain_symptoms(symptoms: str, triage: str) -> str:
    """
    Sends symptoms + triage to Gemini AI and returns a short explanation.
    Handles exceptions gracefully.
    """
    if not symptoms:
        return "No symptoms provided."

    prompt = (
        f"I have the following symptoms: {symptoms}. "
        f"My triage level is {triage}. "
        "Explain possible causes and precautions in 3-4 simple sentences."
    )

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        # Return error as string so app doesn't crash
        return f"AI explanation unavailable. Error: {e}"

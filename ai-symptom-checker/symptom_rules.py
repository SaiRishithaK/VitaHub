import re

# Emergency red flags
RED_FLAGS = [
    r"chest pain",
    r"difficulty breathing|shortness of breath|breathless",
    r"unconscious|faint|not waking up",
    r"severe bleeding",
    r"sudden weakness|face droop|slurred speech"
]

def has_red_flag(symptoms):
    for pattern in RED_FLAGS:
        if re.search(pattern, symptoms.lower()):
            return True, pattern
    return False, None

def analyze_symptoms(symptoms, days, age):
    # Check for emergency situations first
    red_flag, matched = has_red_flag(symptoms)
    if red_flag:
        return {
            "triage": "Maybe an Emergency",
            "reason": f"Red flag detected: {matched}",
            "advice": "Seek emergency care immediately!"
        }

    # Basic rules
    symptoms_lower = symptoms.lower()

    if "fever" in symptoms_lower and "stiff neck" in symptoms_lower:
        return {
            "triage": "urgent",
            "reason": "Possible meningitis",
            "advice": "Consult a doctor immediately."
        }

    if "cough" in symptoms_lower and "blood" in symptoms_lower:
        return {
            "triage": "urgent",
            "reason": "Coughing blood",
            "advice": "Visit a doctor as soon as possible."
        }

    if days >= 14:
        return {
            "triage": "see_doctor",
            "reason": "Symptoms persisting >14 days",
            "advice": "Schedule a doctor appointment."
        }

    if "fever" in symptoms_lower and days <= 3:
        return {
            "triage": "self_care",
            "reason": "Likely viral infection",
            "advice": "Stay hydrated, rest, and monitor symptoms."
        }

    # Default fallback
    return {
        "triage": "see_doctor",
        "reason": "Unable to determine exact cause",
        "advice": "Consult a doctor if symptoms persist or worsen."
    }

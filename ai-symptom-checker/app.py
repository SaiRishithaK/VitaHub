from flask import Flask, request, render_template, jsonify
from symptom_rules import analyze_symptoms
from ai_engine import explain_symptoms  # optional AI explanation

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/check', methods=['POST'])
def check_symptoms():
    try:
        # Get user input from the form
        symptoms = request.form.get("symptoms")
        days = int(request.form.get("days"))
        age = int(request.form.get("age"))
        
        # Rule-based triage
        result = analyze_symptoms(symptoms, days, age)

        # Optional: Get AI-generated explanation
        ai_explanation = explain_symptoms(symptoms, result['triage'])

        result['ai_explanation'] = ai_explanation

        return render_template("index.html", result=result)

    except Exception as e:
        return render_template("index.html", error=str(e))

if __name__ == "__main__":
    app.run(debug=True)

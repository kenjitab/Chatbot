from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask_cors import CORS  # <-- import CORS

app = Flask(__name__)
CORS(app)  # <-- enable CORS for all routes

# Load GPT-2 model and tokenizer
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")

    # Use only the user's message as the prompt
    inputs = tokenizer(message, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_length=50,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        pad_token_id=tokenizer.eos_token_id
    )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # Remove the user's message from the start of the response if present
    if response.startswith(message):
        response = response[len(message):].strip()
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5000)

# model/model.py

from transformers import AutoTokenizer, AutoModelForQuestionAnswering

tokenizer = AutoTokenizer.from_pretrained("timpal0l/mdeberta-v3-base-squad2")
model = AutoModelForQuestionAnswering.from_pretrained("timpal0l/mdeberta-v3-base-squad2")

def answer_question(question, context):
    inputs = tokenizer(question, context, return_tensors="pt")
    outputs = model(**inputs)
    start_idx = outputs.start_logits.argmax()
    end_idx = outputs.end_logits.argmax()
    answer = tokenizer.decode(inputs["input_ids"][0][start_idx:end_idx + 1])
    return answer



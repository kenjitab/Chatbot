export async function fetchChatbotResponse(prompt) {
  const apiKey = import.meta.env.VITE_HF_API_KEY;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const data = await response.json();
  // GPT-2 API returns an array of objects with 'generated_text'
  return data[0]?.generated_text || "Sorry, I couldn't generate a response.";
}

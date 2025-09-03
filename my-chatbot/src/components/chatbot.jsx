import React, { useState, useRef, useEffect } from "react";

export default function ChatBox({ messages, handleSendMessage }) {
  const [input, setInput] = useState("");
  const chatFieldRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;

    // Get AI response from your Flask backend
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const botMessage = data.response;

    // Add both user and bot messages together
    handleSendMessage([
      { sender: "user", text: userMessage },
      { sender: "bot", text: botMessage },
    ]);

    setInput("");
  };
  

  //using a ref it will automatically scroll to the bottom when a new message is added
  useEffect(() => {
    if (chatFieldRef.current) {
      chatFieldRef.current.scrollTop = chatFieldRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="chatPanel">
      <div className="chatHeader">
        <h3>Welcome to DeepSeek.</h3>
        <p>How can I help you today?</p>
      </div>

      <div className="chatField" ref={chatFieldRef}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>

      <form className="chatForm" onSubmit={handleSend}>
        <div className="chatBox">
          <textarea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              //Checks for enter key without shift key and submits message to backend if condition passes
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button type="submit" id="sendButton">
            <img src="../images/sendmessage.png" alt="send message icon" />
          </button>
        </div>
      </form>
    </div>
  );
}

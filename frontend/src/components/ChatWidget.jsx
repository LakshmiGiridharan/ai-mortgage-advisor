import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", { message: input });
      const botMessage = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = { text: "Something went wrong. Try again.", sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="chat-widget">
      {!isOpen && (
        <button className="chat-toggle" onClick={toggleChat}>
          💬 NEED HELP? Chat now with AJ
        </button>
      )}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            AJ - Your Mortgage Assistant
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;

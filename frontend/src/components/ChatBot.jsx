import React, { useState } from 'react';
import './chatbot.css';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post('http://localhost:8000/chat', { message: input });
      const botMsg = { text: res.data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { text: "Error getting response", sender: 'bot' };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const visibleMessages = messages.slice(-2); // only last 2

  return (
    <div className="chat-container">
      <div className="chat-box">
        {visibleMessages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;

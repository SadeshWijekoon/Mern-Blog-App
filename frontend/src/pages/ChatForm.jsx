// ForumPage.js
import React, { useState } from 'react';
import Navbar from '../components/Navigation'; // Assuming you have a Navbar component

const ForumPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('John Doe'); // Assuming a default username

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        username: username,
        message: newMessage
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <Navbar /> {/* Render your Navbar component */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Forum Page</h1> {/* Page heading */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Message display area */}
          <div className="mb-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{message.username}: </span>
                <span>{message.message}</span>
              </div>
            ))}
          </div>
          {/* Message typing box */}
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-grow border rounded-md py-2 px-3 mr-2"
              placeholder="Type your message..."
            />
            {/* Send button */}
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;

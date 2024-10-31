import React, { useState, useEffect } from 'react';
import { fetchMessages, createMessage } from '../services/api';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadMessages = async () => {
            const data = await fetchMessages();
            setMessages(data);
        };
        loadMessages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = await createMessage({ sender, content });
        setMessages([...messages, newMessage]);
        setContent('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg._id}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Tu nombre"
                    required
                />
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mensaje"
                    required
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Chat;

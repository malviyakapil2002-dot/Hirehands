import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const RESPONSES = {
    'create job': 'To create a job, go to your Contractor Dashboard → Click "Create Job" in the sidebar → Fill in job title, description, location, required skills, and daily wage → Submit.',
    'assign labour': 'To assign labour, navigate to "Assign Labour" in the Contractor sidebar → Select a job → Select available labour from the dropdown → Click "Assign Labour".',
    'raise ticket': 'To raise a support ticket, go to "Raise Ticket" in your sidebar → Fill in the subject and description → Submit. A help center agent will be assigned.',
    'contact help': 'If you need help, raise a support ticket from your dashboard. A help center agent will respond to your request.',
    'mark attendance': 'To mark attendance, Labours go to "Mark Attendance" → Select your active assignment → Select status (PRESENT/ABSENT) → Submit.',
    'view payment': 'You can view payment details under "Payments" in your sidebar. Contractors can calculate payments after marking attendance.',
    'register': 'To register, click "Register" on the login page → Fill in your name, email, phone, password, and select your role → Submit.',
    'login': 'Go to the Login page → Enter your email and password → Click "Sign In". You will be redirected to your role-based dashboard.',
};

const getResponse = (msg) => {
    const lower = msg.toLowerCase();
    for (const [key, val] of Object.entries(RESPONSES)) {
        if (lower.includes(key)) return val;
    }
    return "I can help with: creating jobs, assigning labour, raising tickets, marking attendance, viewing payments, registration, and login. Try asking about one of these!";
};

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hi! I\'m the HireHands assistant. How can I help you?' }
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const send = () => {
        if (!input.trim()) return;
        const userMsg = { from: 'user', text: input };
        const botMsg = { from: 'bot', text: getResponse(input) };
        setMessages(prev => [...prev, userMsg, botMsg]);
        setInput('');
    };

    const handleKey = (e) => { if (e.key === 'Enter') send(); };

    return (
        <>
            <button className="chatbot-trigger" onClick={() => setOpen(!open)} title="Chat with us">
                {open ? '✕' : '💬'}
            </button>

            {open && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <strong>🛠️ HireHands Assistant</strong>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-msg ${m.from}`}>
                                <p>{m.text}</p>
                            </div>
                        ))}
                        <div ref={endRef} />
                    </div>
                    <div className="chatbot-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Ask me anything..."
                        />
                        <button onClick={send} className="chat-send">Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;

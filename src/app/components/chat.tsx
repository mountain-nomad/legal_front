"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DocumentDetails from './DocumentDetails'; // Make sure to import the DocumentDetails component

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center mt-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
);

interface ChatBubbleProps {
    type: 'user' | 'bot';
    message: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, message }) => {
    const bubbleStyles = type === 'user'
        ? 'bg-blue-500 text-white self-end'
        : 'bg-gray-300 text-black self-start';

    return (
        <div className={`p-4 rounded-md shadow-md ${bubbleStyles} max-w-md`}>
            <p>{message}</p>
        </div>
    );
};

interface ChatResponse {
    query: string;
    result: string;
    page_content: string;
    source: string;
}

const Chat: React.FC = () => {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState<{ query: string, response: ChatResponse }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const result = await axios.post('https://legalapi-production.up.railway.app/get_response_constitution', { query });
            setChatHistory([...chatHistory, { query, response: result.data.response }]);
            setQuery('');
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(event.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [query]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-white-100 p-4">
            <div className="w-full max-w-3xl bg-gray-200 shadow-md rounded-md p-4 flex-grow overflow-y-auto mb-4">
                <div className="flex flex-col space-y-4">
                    {chatHistory.map((entry, index) => (
                        <div key={index}>
                            <ChatBubble type="user" message={entry.query} />
                            <ChatBubble type="bot" message={`Ответ: ${entry.response.result}`} />
                            <DocumentDetails 
                                pageContent={entry.response.page_content} 
                                source={entry.response.source} 
                                page={entry.response.query} 
                            />
                        </div>
                    ))}
                    {isLoading && <LoadingSpinner />}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-3xl p-4 bg-gray-300 shadow-md rounded-md flex items-center sticky bottom-0">
                <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={handleTextareaChange}
                    placeholder="Введите ваш запрос..."
                    className="flex-grow p-2 bg-transparent text-black placeholder-gray-600 border-none focus:outline-none resize-none overflow-hidden"
                    rows={1}
                />
                {!isLoading && (
                    <button
                        type="submit"
                        className="ml-2 p-2 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Отправить
                    </button>
                )}
            </form>
        </div>
    );
};

export default Chat;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DocumentDetails from './DocumentDetails'; // Make sure to import the DocumentDetails component

const loadingStages = [
    "Изучаем дела...",
    "Рассматриваем базу...",
    "Подбираем совпадения..."
];

const LoadingMessages: React.FC = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState(loadingStages[0]);

    useEffect(() => {
        if (currentStage < loadingStages.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentStage((prevStage) => prevStage + 1);
                setLoadingMessage(loadingStages[currentStage + 1]);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [currentStage]);

    return (
        <div className="flex justify-center items-center mt-2">
            <p className="text-lg text-gray-700">{loadingMessage}</p>
        </div>
    );
};

interface ChatBubbleProps {
    type: 'user' | 'bot';
    message: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, message }) => {
    const bubbleStyles = type === 'user'
        ? 'bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#BFDBFE] text-white self-end'
        : 'bg-gray-300 text-black self-start';

    return (
        <div className={`p-2 rounded-md shadow-md ${bubbleStyles} max-w-md`}>
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
        <div className="flex flex-col items-center min-h-screen bg-white-100 p-4 pt-16">
            <div className="w-full max-w-3xl bg-gray-200 shadow-md rounded-md p-4 mb-2">
                <div className="flex flex-col space-y-2">
                    {chatHistory.length === 0 && !isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-lg text-gray-700">Добро пожаловать! Начните чат, задав свой вопрос.</p>
                        </div>
                    )}
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
                    {isLoading && <LoadingMessages />}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-3xl p-2 bg-gray-300 shadow-md rounded-md flex items-center">
                <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={handleTextareaChange}
                    placeholder="Как смягчить наказание за убийство?"
                    className="flex-grow p-2 bg-transparent text-black placeholder-gray-600 border-none focus:outline-none resize-none overflow-hidden"
                    rows={1}
                />
                {!isLoading && (
                    <button
                        type="submit"
                        className="ml-2 p-2 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled = {!query}
                    >
                        <ArrowUpIcon className="w-6 h-6 text-black" />
                    </button>
                )}
            </form>
        </div>
    );
};

export default Chat;

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

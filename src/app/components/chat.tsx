"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DocumentDetails from './DocumentDetails';

const loadingStages: string[] = [
    "Изучаем дела...",
    "Рассматриваем базу...",
    "Подбираем совпадения..."
];

const LoadingMessages: React.FC = () => {
    const [currentStage, setCurrentStage] = useState<number>(0);
    const [loadingMessage, setLoadingMessage] = useState<string>(loadingStages[0]);

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
    precedent?: string;
    precedent_page_content?: string;
    precedent_source?: string;
}

export interface ChatMessage {
    text: string;
    sender: 'user' | 'bot';
    time: string;
    page_content?: string;
    source?: string;
    precedent?: string;
    precedent_page_content?: string;
    precedent_source?: string;
}

export interface ChatItem {
    title: string;
    messages: ChatMessage[];
    time: string;
}

interface ChatProps {
    selectedChat: ChatItem | null;
    onNewQuery: () => void;
}

const Chat: React.FC<ChatProps> = ({ selectedChat, onNewQuery }) => {
    const [query, setQuery] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<Array<{ query: string; response: ChatResponse; time: string }>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current && query === '') {
            textareaRef.current.focus();
        }
    }, [query]);

    const handleRefreshToken = async (): Promise<boolean> => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return false;

        try {
            const response = await axios.post('https://legalapi-production.up.railway.app/refresh_token', { refresh_token: refreshToken });
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access_token);
                return true;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            return false;
        }
        return false;
    };

    const fetchDataWithRetry = async (url: string, data: any): Promise<any> => {
        let token = localStorage.getItem('access_token');
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.post(url, data, { headers });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                const isRefreshed = await handleRefreshToken();
                if (isRefreshed) {
                    token = localStorage.getItem('access_token');
                    const response = await axios.post(url, data, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    return response.data;
                }
            }
            throw error;
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const result = await fetchDataWithRetry('https://legalapi-production.up.railway.app/get_response_constitution', { query });

            if (result && result.response) {
                const messageTime = new Date().toISOString();
                setChatHistory([...chatHistory, { query, response: result.response, time: messageTime }]);
                setQuery('');

                const token = localStorage.getItem('access_token');
                if (token) {
                    try {
                        console.log("Saving chat history:", { query, response: result.response, time: messageTime });
                        await axios.post('https://legalapi-production.up.railway.app/save_chat', { query, response: result.response, time: messageTime }, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                    } catch (error) {
                        console.error('Error saving chat history:', error);
                    }
                }
            } else {
                console.error('Received incomplete response:', result);
            }
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

    const handleVoiceInput = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'ru-RU';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                console.log('Speech recognition started');
                setIsRecording(true);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
                setIsRecording(false);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event);
                setIsRecording(false);
            };

            recognition.onend = () => {
                console.log('Speech recognition ended');
                setIsRecording(false);
            };

            recognition.start();
        } else {
            console.error('Speech recognition not supported in this browser');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white-100 p-4 pt-4 w-full">
            <div className="w-full max-w-full bg-gray-200 shadow-md rounded-md p-4 mb-2 flex-grow">
                <div className="flex flex-col space-y-2 h-full">
                    {selectedChat ? (
                        <>
                            {selectedChat.messages.map((message, index) => (
                                <ChatBubble key={index} type={message.sender} message={message.text} />
                            ))}
                            {selectedChat.messages.map((message, index) => (
                                message.page_content && message.source && (
                                    <div className="self-start w-full text-left" key={index}>
                                        <DocumentDetails
                                            pageContent={message.page_content}
                                            source={message.source}
                                        />
                                    </div>
                                )
                            ))}
                        </>
                    ) : (
                        <>
                            {chatHistory.length === 0 && !isLoading && (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-lg text-gray-700">Добро пожаловать! Начните чат, задав свой вопрос.</p>
                                </div>
                            )}
                            {chatHistory.map((entry, index) => (
                                <div key={index}>
                                    <ChatBubble type="user" message={entry.query} />
                                    <ChatBubble type="bot" message={`Ответ: ${entry.response.result}`} />
                                    {entry.response.page_content && entry.response.source && (
                                        <div className="self-start w-full text-left">
                                            <DocumentDetails
                                                pageContent={entry.response.page_content}
                                                source={entry.response.source}
                                            />
                                        </div>
                                    )}
                                    {entry.response.precedent && (
                                        <>
                                            <ChatBubble type="bot" message={`Прецедент: ${entry.response.precedent}`} />
                                            {entry.response.precedent_page_content && entry.response.precedent_source && (
                                                <div className="self-start w-full text-left">
                                                    <DocumentDetails
                                                        pageContent={entry.response.precedent_page_content}
                                                        source={entry.response.precedent_source}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <p className="text-xs text-gray-500">{new Date(entry.time).toLocaleString()}</p>
                                </div>
                            ))}
                        </>
                    )}
                    {isLoading && <LoadingMessages />}
                </div>
            </div>
            {isRecording && (
                <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2">
                    Идет запись...
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full max-w-full p-2 bg-gray-300 shadow-md rounded-md flex items-center">
                <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={handleTextareaChange}
                    placeholder="Что мне грозит за драку на улице?"
                    className="flex-grow p-2 bg-transparent text-black placeholder-gray-600 border-none focus:outline-none resize-none overflow-hidden"
                    rows={1}
                />
                {!isLoading && (
                    <>
                        <button
                            type="submit"
                            className="ml-2 p-2 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            disabled={!query}
                        >
                            <ArrowUpIcon className="w-6 h-6 text-black" />
                        </button>
                        <button
                            type="button"
                            onClick={handleVoiceInput}
                            className="ml-2 p-2 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <MicIcon className="w-6 h-6 text-black" />
                        </button>
                    </>
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

function MicIcon(props: any) {
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
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
    );
}

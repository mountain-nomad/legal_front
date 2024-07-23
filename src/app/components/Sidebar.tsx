"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    time: string;
    page_content?: string;
    source?: string;
}

interface ChatItem {
    title: string;
    messages: Message[];
    time: string;
}

interface SidebarProps {
    onSelectChat: (chat: ChatItem) => void;
    onAddNewQuery: () => void;
}

function MenuIcon(props: any) {
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

function XIcon(props: any) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectChat, onAddNewQuery }) => {
    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const initialWidth = useRef<number>(0);
    const initialX = useRef<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchChatHistory = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const response = await axios.get('https://legalapi-production.up.railway.app/chat_history', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChatHistory(response.data.chat_history);
            } catch (error: any) {
                console.error('Error fetching chat history:', error);
            }
        };

        const fetchUsername = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const response = await axios.get('https://legalapi-production.up.railway.app/user_info', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsername(response.data.username);
            } catch (error: any) {
                console.error('Error fetching username:', error);
            }
        };

        fetchChatHistory();
        fetchUsername();
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsResizing(true);
        initialWidth.current = sidebarRef.current ? sidebarRef.current.offsetWidth : 0;
        initialX.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing && sidebarRef.current) {
            const newWidth = initialWidth.current + (e.clientX - initialX.current);
            if (newWidth > 50) { // Minimum width before turning into a burger menu
                sidebarRef.current.style.width = `${newWidth}px`;
                if (newWidth < 200) {
                    setIsCollapsed(true);
                } else {
                    setIsCollapsed(false);
                }
            }
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleButtonClick = (callback: () => void) => {
        callback();
        if (isMobile) {
            setIsCollapsed(true);
        }
    };

    const handleLoginRedirect = () => {
        if (!username) {
            router.push('/login');
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {isMobile ? (
                <div className="fixed top-0 left-0 h-16 w-16 bg-white shadow-md z-50">
                    <button onClick={toggleSidebar} className="p-1 m-2">
                        {isCollapsed ? <MenuIcon /> : <XIcon />}
                    </button>
                    {!isCollapsed && (
                        <div className="fixed top-0 left-0 h-full w-full bg-white shadow-md overflow-y-auto z-40">
                            <div className="p-4">
                                <button onClick={toggleSidebar} className="p-1 mb-4">
                                    <XIcon />
                                </button>
                                <h2 className="text-lg font-semibold mb-4">История запросов</h2>
                                <button 
                                    className="mb-4 p-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white w-full"
                                    onClick={() => handleButtonClick(onAddNewQuery)}
                                >
                                    + добавить новый запрос
                                </button>
                                <ul>
                                    {chatHistory.map((chat: ChatItem, index: number) => (
                                        <li
                                            key={index}
                                            className="mb-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                                            onClick={() => handleButtonClick(() => onSelectChat(chat))}
                                        >
                                            <p className="font-bold">{chat.title}</p>
                                            <p className="text-sm text-gray-600">{new Date(chat.time).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    className="mt-4 p-2 bg-gray-100 rounded-md text-center w-full"
                                    onClick={handleLoginRedirect}
                                    disabled={!!username}
                                >
                                    {username ? (
                                        <p>Рад вас снова видеть, {username}</p>
                                    ) : (
                                        <p>Войдите в систему, чтобы сохранять истории чатов</p>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div ref={sidebarRef} className={`mt-12 fixed top-0 left-0 h-screen bg-white shadow-md overflow-y-auto transition-width duration-200 ${isCollapsed ? 'w-16' : 'w-64'}`}>
                    <div className="relative h-full p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold mb-4">История запросов</h2>
                        </div>
                        <button 
                            className="mb-4 p-2 bg-primary rounded-md text-white w-full hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                            onClick={() => handleButtonClick(onAddNewQuery)} 
                        >
                            + добавить новый запрос
                        </button>
                        <ul>
                            {chatHistory.map((chat: ChatItem, index: number) => (
                                <li
                                    key={index}
                                    className="mb-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                                    onClick={() => handleButtonClick(() => onSelectChat(chat))}
                                >
                                    <p className="font-bold">{chat.title}</p>
                                    <p className="text-sm text-gray-600">{new Date(chat.time).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                        <button 
                            className="mt-4 p-2 bg-gray-100 rounded-md text-center w-full"
                            onClick={handleLoginRedirect}
                            disabled={!!username}
                        >
                            {username ? (
                                <p>Рад вас снова видеть, {username}</p>
                            ) : (
                                <p>Войдите в систему, чтобы сохранять истории чатов</p>
                            )}
                        </button>
                        <div
                            className="resizer w-2 bg-gray-300 cursor-ew-resize absolute right-0 top-0 bottom-0"
                            onMouseDown={handleMouseDown}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;

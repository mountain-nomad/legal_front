"use client";

import React, { useState } from "react";
import Chat from "../components/chat";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component

interface ChatMessage {
    text: string;
    sender: 'user' | 'bot';
    time: string;
    page_content?: string;
    source?: string;
}

interface ChatItem {
    title: string;
    messages: ChatMessage[];
    time: string;
}

export default function Component() {
    const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);

    const handleSelectChat = (chat: ChatItem) => {
        setSelectedChat(chat);
    };

    const handleAddNewQuery = () => {
        setSelectedChat(null); // Deselect any selected chat to add a new query
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pt-12 md:flex-row"> {/* Reduced top padding */}
            <Sidebar onSelectChat={handleSelectChat} onAddNewQuery={handleAddNewQuery} /> {/* Add the Sidebar component with the onSelectChat and onAddNewQuery handlers */}
            <div className="flex flex-col items-center justify-center flex-grow ml-0 md:ml-64 mt-4 md:mt-0"> {/* Adjusted margin-left for main content and reduced top margin */}
                <div className="max-w-full w-full px-4 sm:px-6 lg:px-8 flex flex-col flex-grow"> {/* Stretch to full width */}
                    <div className="flex flex-col items-center flex-grow space-y-0"> {/* Removed space-y-0 class */}
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">Ask</h1> {/* Reduced bottom margin */}
                        <div className="relative w-full flex flex-col flex-grow max-h-96"> {/* Stretch to full width and reduced height */}
                            <Chat selectedChat={selectedChat} onNewQuery={handleAddNewQuery} /> {/* Pass the selectedChat and onNewQuery to the Chat component */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

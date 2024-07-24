"use client";

import React, { useState } from "react";
import Chat from "../components/chat";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component

interface ChatItem {
    title: string;
    messages: Array<{ text: string, sender: string, time: string, page_content?: string, source?: string }>;
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
        <div className=" flex flex-col min-h-screen bg-gray-100 pt-12 md:flex-row"> {/* Add top padding and make it a column layout on mobile */}
            <Sidebar onSelectChat={handleSelectChat} onAddNewQuery={handleAddNewQuery} /> {/* Add the Sidebar component with the onSelectChat and onAddNewQuery handlers */}
            <div className="flex flex-col items-center justify-center w-full ml-0 md:ml-64 mt-8 md:mt-0"> {/* Adjusted margin-left for main content */}
                <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 flex flex-col flex-grow">
                    <div className="mt-8 flex flex-col items-center flex-grow space-y-0"> {/* Removed space-y-0 class */}
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">Ask</h1> {/* Reduced bottom margin */}
                        <div className="relative w-full flex flex-col flex-grow mt-2"> {/* Reduced top margin */}
                            <Chat selectedChat={selectedChat} onNewQuery={handleAddNewQuery} /> {/* Pass the selectedChat and onNewQuery to the Chat component */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

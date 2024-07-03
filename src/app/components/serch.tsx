"use client"

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BubbleAnswer from './BubbleAnswer';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center mt-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
);

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const result = await axios.post('https://legalapi-production.up.railway.app/get_request', { query });
            setResponse(result.data.response);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [query]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded-md">
                <textarea 
                    ref={textareaRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Введите запрос..." 
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                    rows={1}
                />
                <div className="flex justify-end">
                    {!isLoading && (
                        <button 
                            type="submit" 
                            className="w-1/3 p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Поиск
                        </button>
                    )}
                </div>
            </form>
            {isLoading ? <LoadingSpinner /> : response && <BubbleAnswer response={response} />}
        </div>
    );
};

export default Search;

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
        <div className="flex flex-col items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-800 shadow-md rounded-md flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Поиск по контексту..."
                    className="flex-grow p-2 bg-transparent text-white placeholder-gray-400 border-none focus:outline-none"
                />
                {!isLoading && (
                    <button
                        type="submit"
                        className="ml-2 p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Найти
                    </button>
                )}
            </form>

            <div className='w-full flex justify-center mt-4 px-4'>
                {isLoading ? <LoadingSpinner /> : response && (
                    <div className="w-full max-w-6xl">
                        <BubbleAnswer response={response} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
import React, { useState } from 'react';

interface DocumentDetailsProps {
    pageContent: string;
    source: string;
    precedentPageContent?: string;
    precedentSource?: string;
}

const DocumentDetails: React.FC<DocumentDetailsProps> = ({ pageContent, source, precedentPageContent, precedentSource }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPrecedentExpanded, setIsPrecedentExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePrecedentToggle = () => {
        setIsPrecedentExpanded(!isPrecedentExpanded);
    };

    return (
        <div className="bg-gray-200 text-black shadow-md rounded-md p-6 mt-4 max-w-4xl w-full">
            <h3 className="text-lg font-semibold mb-2">Документы:</h3>
            <button
                onClick={handleToggle}
                className="text-blue-500 underline"
            >
                {isExpanded ? 'Скрыть источник' : 'Показать источник ->'}
            </button>
            {isExpanded && (
                <div className="space-y-4 mt-4">
                    <div className="p-4 border border-gray-400 rounded-md bg-gray-300">
                        <p className="text-black">{pageContent}</p>
                        <p className="text-gray-600 mt-2 text-sm"><em>Источник: {source}</em></p>
                    </div>
                </div>
            )}

            {precedentPageContent && precedentSource && (
                <>
                    <h3 className="text-lg font-semibold mb-2 mt-4">Прецеденты:</h3>
                    <button
                        onClick={handlePrecedentToggle}
                        className="text-blue-500 underline"
                    >
                        {isPrecedentExpanded ? 'Скрыть прецедент' : 'Показать прецедент ->'}
                    </button>
                    {isPrecedentExpanded && (
                        <div className="space-y-4 mt-4">
                            <div className="p-4 border border-gray-400 rounded-md bg-gray-300">
                                <p className="text-black">{precedentPageContent}</p>
                                <p className="text-gray-600 mt-2 text-sm"><em>Источник: {precedentSource}</em></p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DocumentDetails;

import React from 'react';

interface Response {
    page: string;
    source: string;
    page_content: string;
    query: string;
    result: string;
}

interface BubbleAnswerProps {
    response: Response;
}

const BubbleAnswer: React.FC<BubbleAnswerProps> = ({ response }) => {
    return (
        <div className="bg-gray-200 text-black shadow-md rounded-md p-6 mt-4 mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Результат запроса</h2>
            <p className="mb-4"><strong>Ответ:</strong> {response.result}</p>
            <h3 className="text-lg font-semibold mb-2">Документы:</h3>
            <div className="space-y-4">
                <div className="p-4 border border-gray-400 rounded-md bg-gray-300">
                <p className="text-black">{response.page_content}</p>
                <p className="text-gray-600 mt-2 text-sm"><em>Источник: {response.source} Страница: {response.page}</em></p>
                </div>
            </div>
        </div>
    );
};

export default BubbleAnswer;

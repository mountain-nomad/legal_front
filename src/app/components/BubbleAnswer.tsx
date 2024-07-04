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
        <div className="bg-gray-800 text-white shadow-md rounded-md p-6 mt-4  mx-auto">
            <h2 className="text-xl font-semibold mb-4">Результат запроса</h2>
            <p className="mb-4"><strong>Ответ:</strong> {response.result}</p>
            <h3 className="text-lg font-semibold mb-2">Документы:</h3>
            <div className="space-y-4">
                <div className="p-4 border border-gray-700 rounded-md bg-gray-900">
                    <p className="text-gray-300">{response.page_content}</p>
                    <p className="text-gray-500 mt-2 text-sm"><em>Источник: {response.source} Страница: {response.page}</em></p>
                </div>
            </div>
        </div>
    );
};

export default BubbleAnswer;
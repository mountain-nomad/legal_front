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
        
    <div className="bg-white shadow-md rounded-md p-6 mt-4 max-w-2xl mx-auto">
    <h2 className="text-xl font-semibold mb-4">Результат запроса</h2>
    <p className="text-gray-700 mb-4"><strong>Ответ:</strong> {response.result}</p>
    <h3 className="text-lg font-semibold mb-2">Документы:</h3>
        {/* <div className="space-y-4">
            {response.source_documents.map((doc, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-gray-700">{doc.page_content}</p>
                    <p className="text-gray-500 mt-2 text-sm"><em>Источник: {doc.metadata.source}</em></p>
                </div>
                ))}
        </div> */}

            <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-gray-700">{response.page_content}</p>
                    <p className="text-gray-500 mt-2 text-sm"><em>Источник: {response.source} Страница: {response.page}</em></p>
                </div>
            </div>     


    </div>
    );
};

const bubbleStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    margin: '20px 0',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const documentStyle = {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '10px',
};

export default BubbleAnswer;

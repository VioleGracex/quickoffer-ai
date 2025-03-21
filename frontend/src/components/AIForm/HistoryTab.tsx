import React, { useRef, useState } from 'react';

interface RequestHistory {
  id: string;
  generatedText: string | null;
  timestamp: string;
  templateFileName: string | null;
  productDataFileName: string | null;
  additionalPrompt: string;
  status: 'success' | 'failed';
}

interface HistoryTabProps {
  history: RequestHistory[];
}

const HistoryTab: React.FC<HistoryTabProps> = ({ history }) => {
  const [generatedText, setGeneratedText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="max-w-5xl mx-auto p-6 dark:text-white">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">История запросов и файлов</h3>
      {history.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">История пуста.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="p-4 border rounded dark:border-gray-700">
              <p><strong>ID запроса:</strong> {item.id}</p>
              <p><strong>Время:</strong> {item.timestamp}</p>
              <p><strong>Шаблон файла:</strong> {item.templateFileName || 'N/A'}</p>
              <p><strong>Файл данных о продукте:</strong> {item.productDataFileName || 'N/A'}</p>
              <p><strong>Дополнительный запрос:</strong> {item.additionalPrompt || 'N/A'}</p>
              <p><strong>Статус:</strong> {item.status === 'success' ? 'Успех' : 'Неудача'}</p>
              {item.generatedText && (
                <>
                  <p><strong>Сгенерированный текст:</strong></p>
                  <textarea
                    ref={textareaRef}
                    value={item.generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
                    readOnly
                  ></textarea>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryTab;
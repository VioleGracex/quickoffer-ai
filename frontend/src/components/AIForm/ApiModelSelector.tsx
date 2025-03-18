import React from 'react';

interface ApiModelSelectorProps {
  api: string;
  model: string;
  handleApiChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ApiModelSelector: React.FC<ApiModelSelectorProps> = ({ api, model, handleApiChange, handleModelChange }) => {
  const getModelOptions = () => {
    if (api === 'openai') {
      return (
        <>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </>
      );
    } else if (api === 'deepseek') {
      return (
        <>
          <option value="deepseek-chat">DeepSeek Chat</option>
          <option value="deepseek-chat-mini">DeepSeek Chat Mini</option>
        </>
      );
    }
  };

  return (
    <div className="flex justify-center items-center gap-20 mb-4 mt-6 space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Выберите API</label>
        <select value={api} onChange={handleApiChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="openai">OpenAI</option>
          <option value="deepseek">DeepSeek</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Выберите модель</label>
        <select value={model} onChange={handleModelChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          {getModelOptions()}
        </select>
      </div>
    </div>
  );
};

export default ApiModelSelector;
import React from 'react';

interface GeneratedTextProps {
  generatedText: string;
  setGeneratedText: React.Dispatch<React.SetStateAction<string>>;
}

const GeneratedText: React.FC<GeneratedTextProps> = ({ generatedText, setGeneratedText }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Сгенерированный текст</h2>
      <textarea
        value={generatedText}
        onChange={(e) => setGeneratedText(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
      ></textarea>
    </div>
  );
};

export default GeneratedText;
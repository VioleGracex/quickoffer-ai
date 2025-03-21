import React, { useEffect, useRef } from 'react';

interface GeneratedTextProps {
  generatedText: string;
  setGeneratedText: React.Dispatch<React.SetStateAction<string>>;
}

const GeneratedText: React.FC<GeneratedTextProps> = ({ generatedText, setGeneratedText }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [generatedText]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Сгенерированный текст</h2>
      <textarea
        ref={textareaRef}
        value={generatedText}
        onChange={(e) => setGeneratedText(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      ></textarea>
    </div>
  );
};

export default GeneratedText;
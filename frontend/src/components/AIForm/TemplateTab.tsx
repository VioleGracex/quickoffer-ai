import React, { useEffect, useRef } from "react";
import FileUpload from "./FileUpload";
import GeneratedText from "./GeneratedText";
import ApiModelSelector from "./ApiModelSelector";
import ErrorMessage from "./ErrorMessage";
import PDFViewer from "../../pages/PDFViewer";

interface TemplateTabProps {
  api: string;
  model: string;
  templateFile: File | null;
  generatedText: string;
  error: string;
  handleApiChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleModelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setTemplateFile: (file: File | null) => void;
  setGeneratedText: (text: string) => void;
}

const TemplateTab: React.FC<TemplateTabProps> = ({
  api,
  model,
  templateFile,
  generatedText,
  error,
  handleApiChange,
  handleModelChange,
  setTemplateFile,
  setGeneratedText,
}) => {
  const generatedTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generatedText && generatedTextRef.current) {
      generatedTextRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedText]);

  return (
    <div className="max-w-5xl mx-auto p-6 dark:text-white">
      <div>
        <ApiModelSelector
          api={api}
          model={model}
          handleApiChange={handleApiChange}
          handleModelChange={handleModelChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"></div>
      <div>
        <FileUpload
          setFile={setTemplateFile}
          file={templateFile}
          label="Шаблон"
        />
      </div>

      <div className="mt-4">
        <ErrorMessage error={error} />
      </div>
      <div className="mt-4" ref={generatedTextRef}>
        <GeneratedText
          generatedText={generatedText}
          setGeneratedText={setGeneratedText}
        />
      </div>
    </div>
  );
};

export default TemplateTab;
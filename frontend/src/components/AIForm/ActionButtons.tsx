import React from 'react';
import { Button } from "@mui/material";
import { FiUploadCloud } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";

interface ActionButtonsProps {
  templateFile: File | null;
  productDataFile: File | null;
  generatedText: string;
  pdfLink: string;
  handleGenerateText: () => void;
  handleSavePdf: () => void;
  handleSendEmail: () => void;
  isFormValid: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  templateFile,
  productDataFile,
  generatedText,
  pdfLink,
  handleGenerateText,
  handleSavePdf,
  handleSendEmail,
  isFormValid,
}) => {
  return (
    <div>
      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateText}
          startIcon={<FiUploadCloud />}
          className="mb-4"
          disabled={!templateFile || !productDataFile || !isFormValid}
          classes={{ disabled: 'text-white dark:text-white' }}
        >
          Сгенерировать текст предложения
        </Button>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSavePdf}
          startIcon={<FaFilePdf />}
          className="mb-4"
          disabled={!generatedText}
          classes={{ disabled: 'text-white dark:text-white' }}
        >
          Сохранить как PDF
        </Button>
      </div>

      {pdfLink && (
        <div className="text-center">
          <a
            href={pdfLink}
            download
            className="block p-2 mb-4 text-center text-white bg-purple-600 rounded dark:bg-purple-800"
          >
            Скачать PDF
          </a>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSendEmail}
            startIcon={<FiUploadCloud />}
            className="w-full"
          >
            Отправить клиенту
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
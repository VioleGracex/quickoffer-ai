import React from "react";
import { FiDownload, FiArrowLeft, FiFileText } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Button } from '@mui/material';

interface StepThreeProps {
  ocrResult: string;
  handleDownloadText: () => void;
  setCurrentStep: (step: number) => void;
  outputFormat: string;
}

const StepThree: React.FC<StepThreeProps> = ({ ocrResult, handleDownloadText, setCurrentStep, outputFormat }) => {

  const renderIcon = () => {
    switch (outputFormat) {
      case '.pdf':
        return <FaFilePdf className="text-6xl text-gray-500 mx-auto mb-2" />;
      case '.docx':
        return <FaFileWord className="text-6xl text-gray-500 mx-auto mb-2" />;
      default:
        return <FiFileText className="text-6xl text-gray-500 mx-auto mb-2" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6  dark:text-white">
      {outputFormat === '.txt' ? (
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-300">
          <textarea
            value={ocrResult}
            readOnly
            rows={10}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center  p-4  ">
          {renderIcon()}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadText}
            startIcon={<FiDownload />}
          >
            Скачать файл
          </Button>
        </div>
      )}
      <div className="flex flex-col items-center space-y-6">
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadText}
            startIcon={<FiDownload />}
          >
            Скачать текст
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentStep(0)}
            startIcon={<FiArrowLeft />}
          >
            Начать заново
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
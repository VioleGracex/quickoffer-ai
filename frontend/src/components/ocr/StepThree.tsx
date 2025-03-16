import React from "react";
import { FiDownload, FiArrowLeft, FiFileText } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";

interface StepThreeProps {
  ocrResult: string;
  handleDownloadText: () => void;
  setCurrentStep: (step: number) => void;
  outputFormat: string;
}

const StepThree: React.FC<StepThreeProps> = ({
  ocrResult,
  handleDownloadText,
  setCurrentStep,
  outputFormat,
}) => {
  const renderIcon = () => {
    switch (outputFormat) {
      case ".pdf":
        return <FaFilePdf className="text-6xl text-gray-500" />;
      case ".docx":
        return <FaFileWord className="text-6xl text-gray-500" />;
      default:
        return <FiFileText className="text-6xl text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 dark:text-white">
      {outputFormat === ".txt" ? (
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-300">
          <textarea
            value={ocrResult}
            readOnly
            rows={10}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
          <div className="flex justify-center mt-4">
            <IconButton color="primary" onClick={handleDownloadText}>
              <FiDownload />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-row text-center bg-black max-w-[250px] mx-auto items-center justify-between p-4 rounded shadow dark:bg-gray-800">
          <div className="flex flex-col items-center justify-between w-full">
            {renderIcon()}
            <p className="mt-2 text-center text-gray-300">
              OCR Result {outputFormat}
            </p>
          </div>

          <div>
            <IconButton color="primary" onClick={handleDownloadText}>
              <FiDownload style={{ fontSize: "2rem" }} />
            </IconButton>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center space-y-6">
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

import React from "react";
import { FiDownload, FiArrowLeft, FiFileText } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";

interface StepThreeProps {
  ocrResult: string;
  handleDownloadText: () => void;
  handleDownloadPdf: () => void;
  handleDownloadDocx: () => void;
  setCurrentStep: (step: number) => void;
}

const fileTypes = [
  {
    icon: <FiFileText className="text-3xl text-gray-500 mx-auto mb-2" />,
    label: "Text",
    onClick: "handleDownloadText",
  },
  {
    icon: <FaFilePdf className="text-3xl text-gray-500 mx-auto mb-2" />,
    label: "PDF",
    onClick: "handleDownloadPdf",
  },
  {
    icon: <FaFileWord className="text-3xl text-gray-500 mx-auto mb-2" />,
    label: "Word",
    onClick: "handleDownloadDocx",
  },
];

const StepThree: React.FC<StepThreeProps> = ({
  ocrResult,
  handleDownloadText,
  handleDownloadPdf,
  handleDownloadDocx,
  setCurrentStep,
}) => {
  const downloadHandlers = {
    handleDownloadText,
    handleDownloadPdf,
    handleDownloadDocx,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 dark:text-white">
      <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-300">
        <textarea
          value={ocrResult}
          readOnly
          rows={10}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        />
      </div>
      <div className="flex flex-row justify-around">
        {fileTypes.map((fileType) => (
          <div
            key={fileType.label}
            className="flex flex-row items-center bg-black max-w-[200px] p-4 rounded shadow dark:bg-gray-800"
          >
            <div>
              {" "}
              {fileType.icon}
              <p className="text-center text-gray-300">{fileType.label}</p>
            </div>
            <div>
              <IconButton
                color="primary"
                onClick={downloadHandlers[fileType.onClick]}
              >
                <FiDownload style={{ fontSize: "2rem" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center space-y-6">
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
  );
};

export default StepThree;

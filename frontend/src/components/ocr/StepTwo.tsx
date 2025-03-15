import React, { useState } from "react";
import { FiArrowRight, FiArrowLeft, FiXCircle, FiRefreshCw } from "react-icons/fi";
import { Button, IconButton } from '@mui/material';

interface StepTwoProps {
  handleExtractText: () => void;
  handleCancel: () => void;
  error: string | null;
  handleRetry: () => void;
  setCurrentStep: (step: number) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ handleExtractText, handleCancel, error, handleRetry, setCurrentStep }) => {
  const [progress, setProgress] = useState<number>(0);

  // Simulate progress
  React.useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 10), 100);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 dark:text-white">
      {error && (
        <div className="flex justify-center items-center text-red-600 dark:text-red-400">
          {error}
          <IconButton color="primary" onClick={handleRetry}>
            <FiRefreshCw />
          </IconButton>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
          <div className={`text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full h-6 ${progress === 100 ? 'bg-green-600' : 'bg-blue-600'}`} style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-6">
        {progress < 100 ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
            startIcon={<FiXCircle />}
            className="dark:bg-red-700 dark:text-white"
          >
            Отменить
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentStep(0)}
              startIcon={<FiArrowLeft />}
              className="dark:text-black"
              sx={{ mr: 2 }}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExtractText}
              endIcon={<FiArrowRight />}
              className="dark:bg-blue-700 dark:text-white"
              sx={{ ml: 2 }}
            >
              Извлечь текст
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StepTwo;
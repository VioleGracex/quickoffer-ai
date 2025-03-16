import React, { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft, FiXCircle, FiRefreshCw } from "react-icons/fi";
import { Button, IconButton, CircularProgress } from '@mui/material';

interface StepTwoProps {
  file: File | null;
  handleExtractText: (abortController: AbortController) => Promise<void>;
  handleCancel: () => void;
  error: string | null;
  handleRetry: () => void;
  setCurrentStep: (step: number) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ file, handleExtractText, handleCancel, error, handleRetry, setCurrentStep }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  useEffect(() => {
    if (file) {
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      setLoading(true);
      handleExtractText(newAbortController).finally(() => {
        setLoading(false);
      });
    }
  }, [file, handleExtractText]);

  const handleCancelClick = () => {
    if (abortController) {
      abortController.abort();
    }
    handleCancel();
  };

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
        {loading ? (
          <CircularProgress color="primary" />
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
              onClick={() => setCurrentStep(2)}
              endIcon={<FiArrowRight />}
              className="dark:bg-blue-700 dark:text-white"
              sx={{ ml: 2 }}
            >
              Извлечь текст
            </Button>
          </>
        )}
      </div>
      <div className="flex justify-center space-x-6">
        <Button
          variant="contained"
          color="error"
          onClick={handleCancelClick}
          startIcon={<FiXCircle />}
          className="dark:bg-red-700 dark:text-white"
        >
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
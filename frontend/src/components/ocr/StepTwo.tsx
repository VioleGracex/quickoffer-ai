import React, { useEffect, useCallback, useRef, useState } from "react";
import { FiXCircle, FiRefreshCw } from "react-icons/fi";
import { Button, IconButton, CircularProgress } from '@mui/material';

interface StepTwoProps {
  file: File | null;
  handleExtractText: (abortController: AbortController) => Promise<void>;
  handleCancel: () => void;
  error: string | null;
  handleRetry: () => void; // Add handleRetry as a prop
  loading: boolean; // Add loading as a prop
}

const StepTwo: React.FC<StepTwoProps> = ({
  file,
  handleExtractText,
  handleCancel,
  error,
  handleRetry,
  loading, // Use loading prop
}) => {
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [retrying, setRetrying] = useState<boolean>(false);
  const previousFileRef = useRef<File | null>(null); // Reference to store the previous file

  // Function to start OCR text extraction
  const extractText = useCallback(() => {
    if (!file) return;

    if (previousFileRef.current && previousFileRef.current !== file) {
      // If the file has changed, reset the state
      setRetrying(false);
    }

    previousFileRef.current = file; // Update the reference to the current file

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    handleExtractText(newAbortController)
      .catch((err) => console.error("OCR extraction failed:", err))
      .finally(() => {
        setRetrying(false); // Reset retry flag after one retry attempt
      });
  }, [file, handleExtractText]);

  // Initial extraction attempt when component mounts or file changes
  useEffect(() => {
    extractText();
  }, [extractText, file]);

  // Retry button click
  const handleRetryClick = () => {
    if (!retrying) {
      setRetrying(true);
      handleRetry(); // Call handleRetry passed from the parent component
    }
  };

  // Cancel extraction and redirect to step one
  const handleCancelClick = () => {
    if (abortController) {
      abortController.abort();
    }
    handleCancel(); // Immediately call handleCancel to reset state and redirect
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 dark:text-white">
      <div className="flex justify-center items-center">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div className="flex items-center text-red-600 dark:text-red-400">
            {error}
            <IconButton color="primary" onClick={handleRetryClick} disabled={retrying}>
              <FiRefreshCw />
            </IconButton>
          </div>
        ) : null}
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
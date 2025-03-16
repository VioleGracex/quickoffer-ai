/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback, useRef } from "react";
import { uploadFile, cancelOcr } from "../../routes/OCR_api.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { Stepper, Step, StepLabel } from "@mui/material";
import StepOne from "../../components/ocr/StepOne";
import StepTwo from "../../components/ocr/StepTwo";
import StepThree from "../../components/ocr/StepThree";
import { useTheme } from "../../context/ThemeContext"; // Use your custom ThemeContext
import { v4 as uuidv4 } from "uuid";

interface RequestHistory {
  fileName: string;
  ocrService: string;
  result: string;
}

const steps = ["Загрузите файл и выберите параметры", "Загрузка", "Результат"];

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrService, setOcrService] = useState<string>("EasyOCR");
  const [ocrResult, setOcrResult] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestIdRef = useRef<string | null>(requestId);
  const { theme } = useTheme(); // Get theme from custom context

  useEffect(() => {
    requestIdRef.current = requestId;
  }, [requestId]);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleOcrServiceChange = (service: string) => {
    setOcrService(service);
  };

  const handleExtractText = useCallback(
    async (abortController: AbortController): Promise<void> => {
      setError(null);
      setLoading(true);
      if (file && requestIdRef.current) {
        try {
          const data = await uploadFile(file, ocrService, requestIdRef.current);

          if (data.status === "cancelled") {
            handleCleanup();
          } else if (data.status === "success" && data.request_id === requestIdRef.current) {
            setOcrResult(data.text || "Результат OCR пуст.");
            setHistory((prevHistory) => [
              ...prevHistory,
              {
                fileName: file.name,
                ocrService,
                result: `Extracted text from ${file.name}`,
              },
            ]);
            setCurrentStep(2);
          } else {
            setError("Request ID mismatch. Please try again.");
          }
        } catch (error: any) {
          if (error.name === "AbortError") {
            console.log("OCR request was aborted.");
            handleCleanup();
          } else {
            setError("Произошла ошибка при извлечении текста. Попробуйте еще раз.");
          }
        } finally {
          setLoading(false);
        }
      }
    },
    [file, ocrService]
  );

  const handleCleanup = () => {
    setRequestId(null); // Reset the request ID
    setError(null); // Clear error
    setOcrResult(""); // Clear the result
    setFile(null); // Clear the file
    setOcrService("EasyOCR"); // Reset the OCR service to default
    setCurrentStep(0); // Move to StepOne
    setLoading(false); // Set loading to false
  };

  const startUpload = () => {
    setRequestId(uuidv4());
    setCurrentStep(1);
    const abortController = new AbortController();
    handleExtractText(abortController);
  };

  useEffect(() => {
    if (currentStep === 1 && file && requestId) {
      const abortController = new AbortController();
      handleExtractText(abortController);
    }
  }, [file, requestId, currentStep, handleExtractText]);

  const handleRetry = () => {
    setError(null);
    const abortController = new AbortController();
    handleExtractText(abortController);
  };

  const handleCancel = async () => {
    if (requestIdRef.current) {
      // Call the backend API to cancel the OCR task
      console.log("Canceling OCR task with request ID:", requestIdRef.current);
      handleCleanup();

      try {
        const data = await cancelOcr(requestIdRef.current);
        console.log("try cancel");

        if (data.status === "success") {
         //test
        } else {
          setError("Ошибка при отмене запроса. Попробуйте еще раз.");
        }
      } catch (error) {
        setError("Ошибка при отмене запроса. Попробуйте еще раз.");
      }
    }
  };

  const handleDownloadText = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([ocrResult], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = "ocr_result.txt";
    document.body.appendChild(element);
    element.click();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            file={file}
            handleFileUpload={handleFileUpload}
            handleDeleteFile={handleDeleteFile}
            ocrService={ocrService}
            handleOcrServiceChange={handleOcrServiceChange}
            startUpload={startUpload} // Use startUpload to initiate the process
          />
        );
      case 1:
        return (
          <StepTwo
            file={file}
            handleExtractText={handleExtractText}
            handleCancel={handleCancel}
            error={error}
            handleRetry={handleRetry} // Pass handleRetry as a prop
            loading={loading} // Pass loading state
          />
        );
      case 2:
        return (
          <StepThree
            ocrResult={ocrResult}
            handleDownloadText={handleDownloadText}
            handleCleanup={handleCleanup}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <PageMeta
        title="OCR Страница | TailAdmin - React.js Admin Dashboard Template"
        description="Это страница OCR для TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="OCR Страница" />
      <ComponentCard title="OCR">
        <div className="max-w-5xl mx-auto dark:text-white">
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      color: theme === "dark" ? "#fff" : "inherit", // Using custom theme context
                      "&.Mui-active": { color: "primary.main" },
                      "&.Mui-completed": { color: "primary.main" },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {renderStepContent()}
      </ComponentCard>
      <ComponentCard title="История запросов">
        <ul className="list-disc pl-5">
          {history.map((request, index) => (
            <li key={index} className="mb-2">
              <p>
                <strong>Файл:</strong> {request.fileName}
              </p>
              <p>
                <strong>OCR Сервис:</strong> {request.ocrService}
              </p>
              <p>
                <strong>Результат:</strong> {request.result}
              </p>
            </li>
          ))}
        </ul>
      </ComponentCard>
    </div>
  );
}
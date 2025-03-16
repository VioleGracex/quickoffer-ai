import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "../../api/axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { Stepper, Step, StepLabel } from '@mui/material';
import StepOne from "../../components/ocr/StepOne";
import StepTwo from "../../components/ocr/StepTwo";
import StepThree from "../../components/ocr/StepThree";
import { useTheme } from "../../context/ThemeContext"; // Use your custom ThemeContext
import { v4 as uuidv4 } from 'uuid';

interface RequestHistory {
  fileName: string;
  ocrService: string;
  outputFormat: string;
  result: string;
}

const steps = ['Загрузите файл и выберите параметры', 'Загрузка', 'Результат'];

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrService, setOcrService] = useState<string>('EasyOCR');
  const [outputFormat, setOutputFormat] = useState<string>('.txt');
  const [ocrResult, setOcrResult] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  const { theme } = useTheme(); // Get theme from custom context

  const previousFileRef = useRef<File | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleOcrServiceChange = (service: string) => {
    setOcrService(service);
  };

  const handleOutputFormatChange = (format: string) => {
    setOutputFormat(format);
  };

  const handleExtractText = useCallback(async (abortController: AbortController): Promise<void> => {
    setError(null);
    if (file && requestId) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('ocr_service', ocrService);
      formData.append('output_format', outputFormat);
      formData.append('request_id', requestId);

      try {
        const response = await fetch(`${api.defaults.baseURL}/files/upload-ocr/`, {
          method: 'POST',
          body: formData,
          signal: abortController.signal,
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 'cancelled') {
            setError('OCR request was cancelled.');
          } else if (data.request_id === requestId) {
            setOcrResult(data.text);
            setHistory([...history, { fileName: file.name, ocrService, outputFormat, result: `Extracted text from ${file.name}` }]);
            setCurrentStep(2);
          }
        } else {
          setError('Произошла ошибка при извлечении текста. Попробуйте еще раз.');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Произошла ошибка при извлечении текста. Попробуйте еще раз.');
        }
      }
    }
  }, [file, ocrService, outputFormat, requestId, history]);

  const startUpload = () => {
    setRequestId(uuidv4());
    setCurrentStep(1);
  }

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
    if (requestId) {
      const formData = new FormData();
      formData.append('request_id', requestId);
      try {
        const response = await fetch(`${api.defaults.baseURL}/files/cancel-ocr/`, {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          setRequestId(null);
          setCurrentStep(0);
          setError(null);
        } else {
          setError('Ошибка при отмене запроса. Попробуйте еще раз.');
        }
      } catch (error) {
        setError('Ошибка при отмене запроса. Попробуйте еще раз.');
      }
    }
  };

  const handleDownloadText = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([ocrResult], { type: 'text/plain' });
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
            outputFormat={outputFormat}
            handleOutputFormatChange={handleOutputFormatChange}
            setCurrentStep={startUpload}
          />
        );
      case 1:
        return (
          <StepTwo
            file={file}
            handleExtractText={handleExtractText}
            handleCancel={handleCancel}
            error={error}
          />
        );
      case 2:
        return (
          <StepThree
            ocrResult={ocrResult}
            handleDownloadText={handleDownloadText}
            setCurrentStep={setCurrentStep}
            outputFormat={outputFormat}
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
            {steps.map((label, index) => (
              <Step key={label} onClick={() => setCurrentStep(index)}>
                <StepLabel 
                  sx={{ 
                    '& .MuiStepLabel-label': { 
                      color: theme === 'dark' ? '#fff' : 'inherit', // Using custom theme context
                      '&.Mui-active': { color: 'primary.main' }, 
                      '&.Mui-completed': { color: 'primary.main' } 
                    }
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
              <p><strong>Файл:</strong> {request.fileName}</p>
              <p><strong>OCR Сервис:</strong> {request.ocrService}</p>
              <p><strong>Формат:</strong> {request.outputFormat}</p>
              <p><strong>Результат:</strong> {request.result}</p>
            </li>
          ))}
        </ul>
      </ComponentCard>
    </div>
  );
}
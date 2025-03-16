import { useState } from "react";
import api from "../../api/axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { Stepper, Step, StepLabel } from '@mui/material';
import StepOne from "../../components/ocr/StepOne";
import StepTwo from "../../components/ocr/StepTwo";
import StepThree from "../../components/ocr/StepThree";
import { useTheme } from "../../context/ThemeContext"; // Use your custom ThemeContext

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

  const { theme } = useTheme(); // Get theme from custom context

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

  const handleExtractText = async (ocrService: string, outputFormat: string, abortController: AbortController): Promise<void> => {
    setError(null);
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('ocr_service', ocrService);
      formData.append('output_format', outputFormat);

      try {
        const response = await fetch(`${api.defaults.baseURL}/files/upload-ocr/`, {
          method: 'POST',
          body: formData,
          signal: abortController.signal,
        });

        if (response.ok) {
          const data = await response.json();
          if (data.text) {
            setOcrResult(data.text);
            setHistory([...history, { fileName: file.name, ocrService, outputFormat, result: `Extracted text from ${file.name}` }]);
            setCurrentStep(2);
          } else {
            setError('Произошла ошибка при извлечении текста. Попробуйте еще раз.');
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
  };

  const handleRetry = () => {
    setError(null);
    handleExtractText(ocrService, outputFormat, new AbortController());
  };

  const handleCancel = () => {
    setCurrentStep(0);
    setError(null);
  };

  const handleDownloadText = async () => {
    const formData = new FormData();
    formData.append('text', ocrResult);
    formData.append('output_format', outputFormat);

    try {
      const response = await fetch(`${api.defaults.baseURL}/files/convert/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ocr_result${outputFormat}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        setError('Произошла ошибка при конвертации текста. Попробуйте еще раз.');
      }
    } catch (error) {
      setError('Произошла ошибка при конвертации текста. Попробуйте еще раз.');
    }
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
            setCurrentStep={setCurrentStep}
          />
        );
      case 1:
        return (
          <StepTwo
            file={file}
            ocrService={ocrService}
            outputFormat={outputFormat}
            handleExtractText={handleExtractText}
            handleCancel={handleCancel}
            error={error}
            handleRetry={handleRetry}
            setCurrentStep={setCurrentStep}
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
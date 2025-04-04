import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { Button, IconButton } from '@mui/material';

interface StepOneProps {
  file: File | null;
  handleFileUpload: (uploadedFile: File) => void;
  handleDeleteFile: () => void;
  ocrService: string;
  handleOcrServiceChange: (service: string) => void;
  startUpload: () => void; 
}

const ocrServices = ['EasyOCR', 'Google Vision', 'Tesseract OCR'];
const supportedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const StepOne: React.FC<StepOneProps> = ({
  file,
  handleFileUpload,
  handleDeleteFile,
  ocrService,
  handleOcrServiceChange,
  startUpload,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      const uploadedFile = acceptedFiles[0];
      if (supportedFileTypes.includes(uploadedFile.type)) {
        handleFileUpload(uploadedFile);
        setErrorMessage(null);
      } else {
        handleDeleteFile();
        setErrorMessage('Неподдерживаемый формат файла. Пожалуйста, загрузите изображение или PDF.');
      }
    },
    multiple: false
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div
        {...getRootProps()}
        className={`flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:bg-gray-800'}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <FiUploadCloud className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
          <p className="text-gray-500 dark:text-gray-300">Перетащите файл сюда или нажмите, чтобы выбрать файл</p>
        </div>
      </div>
      {file && (
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md dark:border-gray-600">
          <div className="flex items-center">
            <FiUploadCloud className="text-xl text-gray-500 dark:text-gray-300 mr-2" />
            <span>{file.name}</span>
          </div>
          <IconButton onClick={handleDeleteFile} color="secondary">
            <FiTrash2 />
          </IconButton>
        </div>
      )}
      {errorMessage && (
        <div className="text-red-600 dark:text-red-400">{errorMessage}</div>
      )}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">OCR Сервис</label>
        <select
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
          value={ocrService}
          onChange={(e) => handleOcrServiceChange(e.target.value)}
        >
          {ocrServices.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={startUpload} 
          startIcon={<FiUploadCloud />}
          disabled={!file || !!errorMessage}
        >
          Загрузить файл
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
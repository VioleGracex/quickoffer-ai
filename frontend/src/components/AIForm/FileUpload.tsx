import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiTrash2, FiEye, FiXCircle } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { IconButton, CircularProgress } from "@mui/material";
import ErrorMessage from './ErrorMessage'; // Add this import

interface FileUploadProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
  label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, file, label }) => {
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add this state
  const [loading, setLoading] = useState<boolean>(false); // Add this state

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      setLoading(true); // Set loading to true when file is dropped
      if (fileRejections.length > 0) {
        setIsInvalidFile(true);
        setError("Недопустимый формат файла"); // Set error message
        setTimeout(() => {
          setIsInvalidFile(false);
          setError(null); // Clear error message
          setLoading(false); // Set loading to false after error
        }, 2000);
      } else {
        setFile(acceptedFiles[0]);
        setLoading(false); // Set loading to false after file is accepted
      }
    },
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    }
  });

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</h3>
      
      <div className="relative h-[400px]">
        {/* Toolbar - Doesn't interfere with drag & drop */}
        {file && (
          <div className="absolute top-[3px] left-[3px] right-[3px] bg-gray-100 dark:bg-gray-700 p-2 flex justify-between items-center rounded-t-lg pointer-events-auto z-10">
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate">{file.name}</span>
            <div className="flex space-x-2">
              <IconButton onClick={(e) => { e.stopPropagation(); setFile(null); }} color="secondary">
                <FiTrash2 className="hover:text-red-600 dark:hover:text-red-400" />
              </IconButton>
              <IconButton onClick={(e) => { e.stopPropagation(); window.open(URL.createObjectURL(file), '_blank'); }} color="primary">
                <FiEye className="hover:text-blue-600 dark:hover:text-blue-400" />
              </IconButton>
            </div>
          </div>
        )}
        
        <div
          {...getRootProps()}
          className={`h-full flex flex-col justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors 
          ${isDragActive ? "border-blue-500 dark:border-blue-400 bg-gray-200 dark:bg-gray-600" : "border-gray-300 dark:border-gray-600 dark:bg-gray-800"} 
          hover:border-blue-500 dark:hover:border-blue-500 ${isInvalidFile ? "animate-shake border-red-500 dark:border-red-400" : ""}`}
        >
          <input {...getInputProps()} />
          
          {/* Upload Area */}
          <div className="relative text-center">
            {loading ? (
              <CircularProgress />
            ) : isInvalidFile ? (
              <FiXCircle className="absolute inset-0 m-auto text-9xl text-red-500 dark:text-red-400 animate-shake" style={{ transform: 'translate(0%, -10%)' }} />
            ) : file ? (
              <>
                <FaFileAlt className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
                <p className="text-gray-500 dark:text-gray-300">Нажмите здесь, чтобы выбрать новый файл</p>
              </>
            ) : (
              <>
                <FaFileAlt className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
                <p className="text-gray-500 dark:text-gray-300">Перетащите файл сюда или нажмите, чтобы выбрать</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">Допустимые типы файлов: pdf, txt, docx, изображения, csv, excel</p>
              </>
            )}
          </div>
        </div>
      </div>
      <ErrorMessage error={error} /> {/* Add this line */}
    </div>
  );
};

export default FileUpload;
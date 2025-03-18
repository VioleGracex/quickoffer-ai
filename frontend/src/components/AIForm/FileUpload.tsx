import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FiTrash2 } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { IconButton } from "@mui/material";

interface FileUploadProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
  label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, file, label }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
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
      <div
        {...getRootProps()}
        className="h-[400px] flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:bg-gray-800"
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <FaFileAlt className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
          <p className="text-gray-500 dark:text-gray-300">Перетащите файл сюда или нажмите, чтобы выбрать файл</p>
          <p className="text-xs text-gray-500 dark:text-gray-300">Допустимые типы файлов: pdf, txt, docx, изображение, csv, excel</p>
        </div>
      </div>
      {file && (
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md dark:border-gray-600 mt-4">
          <div className="flex items-center">
            <span>{file.name}</span>
          </div>
          <IconButton onClick={() => setFile(null)} color="secondary">
            <FiTrash2 />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
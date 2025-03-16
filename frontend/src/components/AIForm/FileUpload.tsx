import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FiTrash2 } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { IconButton } from "@mui/material";

interface FileUploadProps {
  setTemplateFile: React.Dispatch<React.SetStateAction<File | null>>;
  setProductDataFile: React.Dispatch<React.SetStateAction<File | null>>;
  templateFile: File | null;
  productDataFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ setTemplateFile, setProductDataFile, templateFile, productDataFile }) => {
  const { getRootProps: getTemplateRootProps, getInputProps: getTemplateInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setTemplateFile(acceptedFiles[0]),
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
    }
  });

  const { getRootProps: getProductRootProps, getInputProps: getProductInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setProductDataFile(acceptedFiles[0]),
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/csv': ['.csv']
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Шаблон</h3>
          <div
            {...getTemplateRootProps()}
            className="flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:bg-gray-800"
          >
            <input {...getTemplateInputProps()} />
            <div className="text-center">
              <FaFileAlt className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
              <p className="text-gray-500 dark:text-gray-300">Перетащите шаблон сюда или нажмите, чтобы выбрать файл</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">Допустимые типы файлов: pdf, txt, docx, изображение</p>
            </div>
          </div>
          {templateFile && (
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md dark:border-gray-600 mt-4">
              <div className="flex items-center">
                <span>{templateFile.name}</span>
              </div>
              <IconButton onClick={() => setTemplateFile(null)} color="secondary">
                <FiTrash2 />
              </IconButton>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Данные о продуктах</h3>
          <div
            {...getProductRootProps()}
            className="flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:bg-gray-800"
          >
            <input {...getProductInputProps()} />
            <div className="text-center">
              <FaFileAlt className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
              <p className="text-gray-500 dark:text-gray-300">Перетащите данные о продуктах сюда или нажмите, чтобы выбрать файл</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">Допустимые типы файлов: csv, excel, txt, docx, pdf</p>
            </div>
          </div>
          {productDataFile && (
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md dark:border-gray-600 mt-4">
              <div className="flex items-center">
                <span>{productDataFile.name}</span>
              </div>
              <IconButton onClick={() => setProductDataFile(null)} color="secondary">
                <FiTrash2 />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
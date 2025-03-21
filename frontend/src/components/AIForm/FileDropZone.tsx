import React from 'react';
import { FiFile, FiX } from 'react-icons/fi';
import FileUpload from './FileUpload';

interface FileDropZoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
  label: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ file, setFile, label }) => {
  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer"
      onClick={() => document.getElementById('file-input')?.click()}
    >
      {file ? (
        <>
          <div className="flex items-center">
            <FiFile size={48} className="text-gray-400" />
            <span className="ml-2">{file.name}</span>
            <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="ml-2 text-red-600">
              <FiX />
            </button>
          </div>
          <span className="mt-2 text-gray-600">Нажмите сюда, чтобы выбрать новый файл</span>
        </>
      ) : (
        <>
          <FiFile size={48} className="text-gray-400" />
          <span className="mt-2 text-gray-600">Нажмите сюда, чтобы выбрать новый файл</span>
        </>
      )}
      <FileUpload setFile={setFile} file={file} label={label} />
    </div>
  );
};

export default FileDropZone;
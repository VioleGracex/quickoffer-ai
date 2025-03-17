import React from 'react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return error ? <div className="bg-red-500 text-white p-4 mt-6 mb-6 rounded">{error}</div> : null;
};

export default ErrorMessage;
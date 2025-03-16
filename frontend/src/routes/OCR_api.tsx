import api from '../api/axios'; // Ensure this path is correct
// Set up the axios instance with base URL

export const uploadFile = async (file: File, ocrService: string, requestId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ocr_service", ocrService);
  formData.append("request_id", requestId);

  const response = await api.post('/files/upload-ocr/', formData);
  return response.data;
};

export const cancelOcr = async (requestId: string) => {
  const formData = new FormData();
  formData.append("request_id", requestId);

  const response = await api.post('/files/cancel-ocr/', formData);
  return response.data;
};
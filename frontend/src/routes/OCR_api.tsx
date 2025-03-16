import api from '../api/axios'; // Ensure this path is correct

export const uploadFile = async (file: File, ocrService: string, requestId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ocr_service", ocrService);
  formData.append("request_id", requestId);

  const response = await api.post('/files/upload-ocr/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const cancelOcr = async (requestId: string) => {
  const formData = new FormData();
  formData.append("request_id", requestId);

  const response = await api.post('/files/cancel-ocr/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
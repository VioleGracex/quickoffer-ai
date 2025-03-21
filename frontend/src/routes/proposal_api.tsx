import api from '../api/axios';

export const generateProposal = async (formData: FormData) => {
    console.log("📌 FormData contents:");
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

  // This should be correct. Ensure formData contains both the files and the other form fields
    const response = await api.post('proposal/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};


export const savePdf = async (formData: FormData) => {
  const response = await api.post('proposal/save-pdf', formData);
  return response.data;
};

export const sendEmail = async (email: string, pdfLink: string) => {
  const response = await api.post('proposal/send-email', { email, pdfLink });
  return response.data;
};

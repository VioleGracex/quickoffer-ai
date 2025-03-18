/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import FileUpload from '../../components/AIForm/FileUpload';
import GeneratedText from '../../components/AIForm/GeneratedText';
import ApiModelSelector from '../../components/AIForm/ApiModelSelector';
import ErrorMessage from '../../components/AIForm/ErrorMessage';
import { generateProposal, savePdf, sendEmail } from '../../routes/proposal_api';
import PDFViewer from '../PDFViewer'; // Import the custom PDF Viewer component
import { Button } from '@mui/material';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
import { FaFilePdf, FaFileWord, FaDownload } from 'react-icons/fa';

const OfferAIForm: React.FC = () => {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [productDataFile, setProductDataFile] = useState<File | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [pdfLink, setPdfLink] = useState<string>('');
  const [model, setModel] = useState<string>('deepseek-chat');
  const [api, setApi] = useState<string>('deepseek');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("Шаблон КП");
  const [additionalPrompt, setAdditionalPrompt] = useState<string>('');

  const handleApiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedApi = e.target.value;
    setApi(selectedApi);
    // Reset model to default based on the selected API
    if (selectedApi === 'openai') {
      setModel('gpt-4-turbo');
    } else if (selectedApi === 'deepseek') {
      setModel('deepseek-chat');
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleGenerateText = async () => {
    const formData = new FormData();
    appendFormData(formData, 'model', model);
    appendFormData(formData, 'api', api);
    appendFormData(formData, 'requestId', uuidv4()); // Add unique request ID
    if (templateFile) {
      appendFormData(formData, 'templateFile', templateFile);
      appendFormData(formData, 'templateFileType', templateFile.type);
    }
    if (productDataFile) {
      appendFormData(formData, 'productDataFile', productDataFile);
      appendFormData(formData, 'productDataFileType', productDataFile.type);
    }

    try {
      const data = await generateProposal(formData);
      setGeneratedText(data.generatedText);
      setError('');
    } catch (error) {
      console.error('Ошибка при генерации текста предложения:', error);
      setError('Ошибка при генерации текста предложения: ' + error);
    }
  };

  const handleSavePdf = async () => {
    const formData = new FormData();
    if (templateFile) appendFormData(formData, 'templateFile', templateFile);
    appendFormData(formData, 'generatedText', generatedText);

    try {
      const data = await savePdf(formData);
      setPdfLink(data.pdfLink);
      setError('');
    } catch (error) {
      console.error('Ошибка при сохранении PDF:', error);
      setError('Ошибка при сохранении PDF: ' + error);
    }
  };

  const handleSendEmail = async () => {
    if (!pdfLink) {
      alert("Сначала сохраните PDF!");
      return;
    }

    try {
      await sendEmail("client@example.com", pdfLink);
      alert('Email успешно отправлен!');
      setError('');
    } catch (error) {
      console.error('Ошибка при отправке Email:', error);
      setError('Ошибка при отправке Email: ' + error);
    }
  };

  const handleDownloadText = () => {
    // Implement download text functionality
  };

  const handleDownloadPdf = () => {
    // Implement download PDF functionality
  };

  const handleDownloadDocx = () => {
    // Implement download DOCX functionality
  };

  const isFormValid = () => {
    return templateFile !== null && productDataFile !== null;
  };

  const appendFormData = (formData: FormData, key: string, value: any) => {
    formData.append(key, value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Шаблон КП":
        return (
          <div className="max-w-5xl mx-auto dark:text-white p-6">
            <div> <ApiModelSelector api={api} model={model} handleApiChange={handleApiChange} handleModelChange={handleModelChange} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              
            </div>
            {templateFile ? (
              <div className="mt-4 border p-2 bg-white text-black">
                <PDFViewer file={templateFile} />
              </div>
            ) : (
              <FileUpload setFile={setTemplateFile} file={templateFile} label="Шаблон" />
            )}
            <ErrorMessage error={error} />
            <GeneratedText generatedText={generatedText} setGeneratedText={setGeneratedText} />
          </div>
        );
      case "Мои Товары":
        return (
          <div className="max-w-5xl mx-auto dark:text-white p-6">
            {productDataFile ? (
              <div className="mt-4 border p-2 bg-white text-black">
                <PDFViewer file={productDataFile} />
              </div>
            ) : (
              <FileUpload setFile={setProductDataFile} file={productDataFile} label="Данные о продуктах" />
            )}
          </div>
        );
      case "История":
        return (
          <div className="max-w-5xl mx-auto dark:text-white p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">История запросов и файлов</h3>
            {/* History content goes here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-8 flex">
      {/* Left - Main content */}
      <div className="w-3/4 p-4">
        <PageMeta title="Создать КП" description="Генерация КП с помощью AI" />
        <PageBreadcrumb pageTitle="Создать КП" />
        <ComponentCard title="Создать КП">
          {renderTabContent()}
        </ComponentCard>
      </div>

      {/* Right - Sidebar */}
      <div className="w-1/4 p-4 border-l border-gray-700 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Sale Assist</h2>
          <div className="flex flex-col mb-4">
            {["Шаблон КП", "Мои Товары", "История"].map((tab) => (
              <button
                key={tab}
                className={`w-full text-left py-2 px-4 ${activeTab === tab ? "bg-gray-800 text-white" : "text-gray-700"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Шаблон КП" && "📄 "}
                {tab === "Мои Товары" && "📦 "}
                {tab === "История" && "⏳ "}
                {tab}
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Дополнительная информация (необязательно)"
            value={additionalPrompt}
            onChange={(e) => setAdditionalPrompt(e.target.value)}
          />
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateText}
              startIcon={<FiUploadCloud />}
              disabled={!templateFile || !productDataFile || !isFormValid()}
              className="w-full"
              style={{ marginBottom: '1rem', backgroundColor: (!templateFile || !productDataFile || !isFormValid()) ? 'gray' : undefined }}
            >
              + Создать КП
            </Button>
          </div>
          <div className="flex justify-around mt-4">
            <Button variant="outlined" startIcon={<FiFileText />} onClick={handleDownloadText}>
              Text
            </Button>
            <Button variant="outlined" startIcon={<FaFilePdf />} onClick={handleDownloadPdf}>
              PDF
            </Button>
            <Button variant="outlined" startIcon={<FaFileWord />} onClick={handleDownloadDocx}>
              Word
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferAIForm;
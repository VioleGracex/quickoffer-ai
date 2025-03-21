/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { generateProposal, savePdf, sendEmail } from '../../routes/proposal_api';
import TemplateTab from '../../components/AIForm/TemplateTab';
import ProductsTab from '../../components/AIForm/ProductsTab';
import HistoryTab from '../../components/AIForm/HistoryTab';
import { Button, CircularProgress } from '@mui/material';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';
import { handleApiChange, createFormData, downloadFile, createPdf, createDocx } from '../../utils/offerAIFormUtils';
import { Packer } from "docx";

interface RequestHistory {
  id: string;
  generatedText: string | null;
  timestamp: string;
  templateFileName: string | null;
  productDataFileName: string | null;
  additionalPrompt: string;
  status: 'success' | 'failed';
}

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
  const [selectedProducts, setSelectedProducts] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>('');
  const [history, setHistory] = useState<RequestHistory[]>([]);

  const handleGenerateText = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    setActiveTab("Шаблон КП"); // Switch to "Шаблон КП" tab immediately when the button is clicked
    const formData = createFormData(additionalPrompt, templateFile, productDataFile, model, api, selectedProducts);
    const newRequestId = uuidv4();
    setRequestId(newRequestId);
    formData.append('requestId', newRequestId); // Add unique request ID

    try {
      const data = await generateProposal(formData);
      setGeneratedText(data.generatedText);
      setError('');
      addToHistory(newRequestId, data.generatedText, 'success');
    } catch (error) {
      console.error('Ошибка при генерации текста предложения:', error);
      setError('Ошибка при генерации текста предложения: ' + error);
      addToHistory(newRequestId, null, 'failed');
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (newRequestId: string, generatedText: string | null, status: 'success' | 'failed') => {
    const timestamp = new Date().toISOString();
    setHistory([...history, {
      id: newRequestId,
      generatedText,
      timestamp,
      templateFileName: templateFile ? templateFile.name : null,
      productDataFileName: productDataFile ? productDataFile.name : null,
      additionalPrompt,
      status,
    }]);
  };

  const handleSavePdf = async () => {
    const formData = createFormData(additionalPrompt, templateFile, null, model, api, selectedProducts);
    formData.append('generatedText', generatedText);

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
    downloadFile(generatedText, "text/plain", "generated_text.txt");
  };

  const handleDownloadPdf = async () => {
    try {
      const pdfBytes = await createPdf(generatedText);
      downloadFile(pdfBytes, "application/pdf", "generated_text.pdf");
    } catch (error) {
      console.error('Ошибка при создании PDF:', error);
      setError('Ошибка при создании PDF: ' + error);
    }
  };

  const handleDownloadDocx = () => {
    try {
      const doc = createDocx(generatedText);
      Packer.toBlob(doc).then((blob) => {
        downloadFile(blob, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "generated_text.docx");
      });
    } catch (error) {
      console.error('Ошибка при создании DOCX:', error);
      setError('Ошибка при создании DOCX: ' + error);
    }
  };

  const isFormValid = () => {
    return templateFile !== null;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Шаблон КП":
        return (
          <TemplateTab
            api={api}
            model={model}
            templateFile={templateFile}
            generatedText={generatedText}
            error={error}
            handleApiChange={handleApiChange}
            handleModelChange={(e) => setModel(e.target.value)}
            setTemplateFile={setTemplateFile}
            setGeneratedText={setGeneratedText}
          />
        );
      case "Мои Товары":
        return (
          <ProductsTab
            productDataFile={productDataFile}
            setProductDataFile={setProductDataFile}
            setSelectedProducts={setSelectedProducts} // Ensure selectedProducts are set
          />
        );
      case "История":
        return <HistoryTab history={history} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen pt-8 flex">
      {/* Left - Main content */}
      <div className="w-3/4 p-4">
        <PageMeta title="Создать КП" description="Генерация КП с помощью AI" />
        <PageBreadcrumb pageTitle="Создать КП" />
        <ComponentCard title="Создать КП" className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-75 dark:bg-gray-900/75 rounded z-50">
              <CircularProgress size={80} />
            </div>
          )}
          {renderTabContent()}
        </ComponentCard>
      </div>

      {/* Right - Sidebar */}
      <div className="w-1/4 p-4 border-l border-gray-300 dark:border-gray-700 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Sale Assist</h2>
          <div className="flex flex-col mb-4">
            {["Шаблон КП", "Мои Товары", "История"].map((tab) => (
              <button
                key={tab}
                className={`w-full text-left py-2 px-4 ${activeTab === tab ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
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
            className="w-full p-2 border rounded resize-none dark:bg-gray-900 dark:text-white"
            rows={5}
            placeholder="Дополнительная информация (необязательно)"
            value={additionalPrompt}
            onChange={(e) => setAdditionalPrompt(e.target.value)}
          />
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateText}
              startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <FiUploadCloud />}
              disabled={loading || !templateFile || !isFormValid()}
              className="w-full"
              style={{ marginBottom: '1rem', backgroundColor: (!templateFile || !isFormValid()) ? 'gray' : undefined }}
            >
              + Создать КП
            </Button>
          </div>
          <div className="flex justify-around mt-4">
            <Button variant="outlined" startIcon={<FiFileText />} onClick={handleDownloadText} disabled={!generatedText}>
              Text
            </Button>
            <Button variant="outlined" startIcon={<FaFilePdf />} onClick={handleDownloadPdf} disabled={!generatedText}>
              PDF
            </Button>
            <Button variant="outlined" startIcon={<FaFileWord />} onClick={handleDownloadDocx} disabled={!generatedText}>
              Word
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferAIForm;
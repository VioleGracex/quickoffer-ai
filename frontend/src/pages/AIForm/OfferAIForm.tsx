/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import FileUpload from '../../components/AIForm/FileUpload';
import GeneratedText from '../../components/AIForm/GeneratedText';
import ActionButtons from '../../components/AIForm/ActionButtons';
import ApiModelSelector from '../../components/AIForm/ApiModelSelector';
import ErrorMessage from '../../components/AIForm/ErrorMessage';
import { generateProposal, savePdf, sendEmail } from '../../routes/proposal_api';
import PDFViewer from '../PDFViewer'; // Import the custom PDF Viewer component

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

  const isFormValid = () => {
    return templateFile !== null && productDataFile !== null;
  };

  const appendFormData = (formData: FormData, key: string, value: any) => {
    formData.append(key, value);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-8 flex">
      {/* Left - PDF Viewer */}
      <div className="w-3/4 p-4">
        <PageMeta title="Создать КП" description="Генерация КП с помощью AI" />
        <PageBreadcrumb pageTitle="Создать КП" />
        <ComponentCard title="Создать КП">
          <div className="max-w-5xl mx-auto dark:text-white p-6">
            <ApiModelSelector api={api} model={model} handleApiChange={handleApiChange} handleModelChange={handleModelChange} />
            <FileUpload setTemplateFile={setTemplateFile} setProductDataFile={setProductDataFile} templateFile={templateFile} productDataFile={productDataFile} />
            {templateFile ? (
              <div className="mt-4 border p-2 bg-white text-black">
                <PDFViewer file={templateFile} />
              </div>
            ) : (
              <div className="mt-4 border p-2 bg-white text-black">
                Пожалуйста, загрузите шаблон КП и данные о продукте.
              </div>
            )}
            <ErrorMessage error={error} />
            <GeneratedText generatedText={generatedText} setGeneratedText={setGeneratedText} />
            <ActionButtons
              templateFile={templateFile}
              productDataFile={productDataFile}
              generatedText={generatedText}
              pdfLink={pdfLink}
              handleGenerateText={handleGenerateText}
              handleSavePdf={handleSavePdf}
              handleSendEmail={handleSendEmail}
              isFormValid={isFormValid()}
            />
          </div>
        </ComponentCard>
      </div>

      {/* Right - Sidebar */}
      <div className="w-1/4 p-4 border-l border-gray-700">
        <h2 className="text-xl font-bold mb-4">Sale Assist</h2>
        <div className="flex flex-col">
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
          className="w-full p-2 mt-4 border rounded"
          placeholder="Дополнительная информация (необязательно)"
          value={additionalPrompt}
          onChange={(e) => setAdditionalPrompt(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OfferAIForm;
import React, { useState } from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import ClientInfoForm from '../../components/AIForm/ClientInfoForm';
import FileUpload from '../../components/AIForm/FileUpload';
import GeneratedText from '../../components/AIForm/GeneratedText';
import ActionButtons from '../../components/AIForm/ActionButtons';
import { generateProposal, savePdf, sendEmail } from '../../routes/proposal_api';

interface ClientInfo {
  companyName: string;
  legalAddress: string;
  inn: string;
  bankAccount: string;
  bankName: string;
  clientName: string;
  contactPerson: string;
  productName: string;
  pricingPlan: string;
  quantity: string;
}

const OfferAIForm: React.FC = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    companyName: '',
    legalAddress: '',
    inn: '',
    bankAccount: '',
    bankName: '',
    clientName: '',
    contactPerson: '',
    productName: '',
    pricingPlan: '',
    quantity: '',
  });

  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [productDataFile, setProductDataFile] = useState<File | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [pdfLink, setPdfLink] = useState<string>('');
  const [model, setModel] = useState<string>('gpt-4-turbo');
  const [api, setApi] = useState<string>('openai');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateText = async () => {
    const formData = new FormData();
    formData.append('clientInfo', JSON.stringify(clientInfo));
    formData.append('model', model);
    formData.append('api', api);
    if (templateFile) {
      formData.append('templateFile', templateFile);
      formData.append('templateFileType', templateFile.type);
    }
    if (productDataFile) {
      formData.append('productDataFile', productDataFile);
      formData.append('productDataFileType', productDataFile.type);
    }

    try {
      const data = await generateProposal(formData);
      setGeneratedText(data.generatedText);
    } catch (error) {
      console.error('Ошибка при генерации текста предложения:', error);
    }
  };

  const handleSavePdf = async () => {
    const formData = new FormData();
    if (templateFile) formData.append('templateFile', templateFile);
    formData.append('generatedText', generatedText);

    try {
      const data = await savePdf(formData);
      setPdfLink(data.pdfLink);
    } catch (error) {
      console.error('Ошибка при сохранении PDF:', error);
    }
  };

  const handleSendEmail = async () => {
    if (!pdfLink) {
      alert("Сначала сохраните PDF!");
      return;
    }

    try {
      await sendEmail(clientInfo.clientName, pdfLink);
      alert('Email успешно отправлен!');
    } catch (error) {
      console.error('Ошибка при отправке Email:', error);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['companyName', 'inn', 'clientName', 'contactPerson', 'productName', 'pricingPlan', 'quantity'];
    return requiredFields.every((field) => clientInfo[field as keyof ClientInfo].trim() !== '');
  };

  const fillTestData = () => {
    setClientInfo({
      companyName: 'ООО «Ромашка»',
      legalAddress: 'г. Москва, ул. Ленина, д. 1',
      inn: '770901001',
      bankAccount: '4070280102500101584',
      bankName: 'ООО «Банк RV»',
      clientName: 'ООО «Ромашка»',
      contactPerson: 'Иванов Иван Иванович',
      productName: 'Онлайн-доска',
      pricingPlan: 'Корпоративный',
      quantity: '100',
    });
  };

  const getModelOptions = () => {
    if (api === 'openai') {
      return (
        <>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </>
      );
    } else if (api === 'deepseek') {
      return (
        <>
          <option value="deepseek-chat">DeepSeek Chat</option>
          <option value="deepseek-chat-mini">DeepSeek Chat Mini</option>
        </>
      );
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <PageMeta title="Создать КП" description="Генерация КП с помощью AI" />
      <PageBreadcrumb pageTitle="Создать КП" />
      <ComponentCard title="Создать КП">
        <div className="max-w-5xl mx-auto dark:text-white">
          <ClientInfoForm clientInfo={clientInfo} handleInputChange={handleInputChange} fillTestData={fillTestData} />
          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Выберите API</label>
            <select value={api} onChange={(e) => setApi(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="openai">OpenAI</option>
              <option value="deepseek">DeepSeek</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Выберите модель</label>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              {getModelOptions()}
            </select>
          </div>
          <FileUpload setTemplateFile={setTemplateFile} setProductDataFile={setProductDataFile} templateFile={templateFile} productDataFile={productDataFile} />
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
  );
};

export default OfferAIForm;
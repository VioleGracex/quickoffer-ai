/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Add this import
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import ClientInfoForm from '../../components/AIForm/ClientInfoForm';
import FileUpload from '../../components/AIForm/FileUpload';
import GeneratedText from '../../components/AIForm/GeneratedText';
import ActionButtons from '../../components/AIForm/ActionButtons';
import ApiModelSelector from '../../components/AIForm/ApiModelSelector';
import ErrorMessage from '../../components/AIForm/ErrorMessage';
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
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

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
    appendFormData(formData, 'clientInfo', JSON.stringify(clientInfo));
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
      await sendEmail(clientInfo.clientName, pdfLink);
      alert('Email успешно отправлен!');
      setError('');
    } catch (error) {
      console.error('Ошибка при отправке Email:', error);
      setError('Ошибка при отправке Email: ' + error);
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
  const appendFormData = (formData: FormData, key: string, value: any) => {
    formData.append(key, value);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen pt-8">
      <PageMeta title="Создать КП" description="Генерация КП с помощью AI" />
      <PageBreadcrumb pageTitle="Создать КП" />
      <ComponentCard title="Создать КП">
        <div className="max-w-5xl mx-auto dark:text-white p-6">
          <ClientInfoForm clientInfo={clientInfo} handleInputChange={handleInputChange} fillTestData={fillTestData} />
          <ApiModelSelector api={api} model={model} handleApiChange={handleApiChange} handleModelChange={handleModelChange} />
          <FileUpload setTemplateFile={setTemplateFile} setProductDataFile={setProductDataFile} templateFile={templateFile} productDataFile={productDataFile} />
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
  );
};

export default OfferAIForm;
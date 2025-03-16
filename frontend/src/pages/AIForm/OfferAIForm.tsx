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
/*   const [selectedProducts, setSelectedProducts] = useState<string[]>([]); */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

/*   const handleFileChange = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }; */

  const handleGenerateText = async () => {
    const formData = new FormData();
    formData.append('clientInfo', JSON.stringify(clientInfo));
    if (templateFile) formData.append('templateFile', templateFile);
    if (productDataFile) formData.append('productDataFile', productDataFile);

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

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <PageMeta title="Создать КП" description="Генерация КП с помощью AI" />
      <PageBreadcrumb pageTitle="Создать КП" />
      <ComponentCard title="Создать КП">
      <div className="max-w-5xl mx-auto dark:text-white">
          <ClientInfoForm clientInfo={clientInfo} handleInputChange={handleInputChange} fillTestData={fillTestData} />
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

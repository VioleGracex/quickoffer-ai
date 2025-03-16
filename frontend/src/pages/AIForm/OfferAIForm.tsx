import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";


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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handleFileChange = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const handleGenerateText = async () => {
    const formData = new FormData();
    formData.append('clientInfo', JSON.stringify(clientInfo));
    if (templateFile) formData.append('templateFile', templateFile);
    if (productDataFile) formData.append('productDataFile', productDataFile);

    try {
      const response = await axios.post('/api/generate-proposal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setGeneratedText(response.data.generatedText);
    } catch (error) {
      console.error('Ошибка при генерации текста предложения:', error);
    }
  };

  const handleSavePdf = async () => {
    const formData = new FormData();
    if (templateFile) formData.append('templateFile', templateFile);
    formData.append('generatedText', generatedText);

    try {
      const response = await axios.post('/api/save-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPdfLink(response.data.pdfLink);
    } catch (error) {
      console.error('Ошибка при сохранении PDF:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      await axios.post('/api/send-email', {
        email: clientInfo.contactPerson,
        pdfLink,
      });
      alert('Email успешно отправлен!');
    } catch (error) {
      console.error('Ошибка при отправке Email:', error);
    }
  };

  const { getRootProps: getTemplateRootProps, getInputProps: getTemplateInputProps } = useDropzone({
    onDrop: handleFileChange(setTemplateFile),
    multiple: false
  });

  const { getRootProps: getProductRootProps, getInputProps: getProductInputProps } = useDropzone({
    onDrop: handleFileChange(setProductDataFile),
    multiple: false
  });

  return (
    <div className={`dark:bg-gray-900 dark:text-white`}>
      <PageMeta
        title="Страница создания КП | TailAdmin - React.js Admin Dashboard Template"
        description="Это страница создания КП для TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Страница создания КП" />
      <ComponentCard title="Создать КП">
        <div className="max-w-5xl mx-auto dark:text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Название компании</label>
              <input
                type="text"
                name="companyName"
                value={clientInfo.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Юридический адрес</label>
              <input
                type="text"
                name="legalAddress"
                value={clientInfo.legalAddress}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ИНН</label>
              <input
                type="text"
                name="inn"
                value={clientInfo.inn}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Расчетный счет</label>
              <input
                type="text"
                name="bankAccount"
                value={clientInfo.bankAccount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Название банка</label>
              <input
                type="text"
                name="bankName"
                value={clientInfo.bankName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Название клиента</label>
              <input
                type="text"
                name="clientName"
                value={clientInfo.clientName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Контактное лицо</label>
              <input
                type="text"
                name="contactPerson"
                value={clientInfo.contactPerson}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Название продукта</label>
              <input
                type="text"
                name="productName"
                value={clientInfo.productName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Тариф</label>
              <input
                type="text"
                name="pricingPlan"
                value={clientInfo.pricingPlan}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Количество лицензий</label>
              <input
                type="text"
                name="quantity"
                value={clientInfo.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div
              {...getTemplateRootProps()}
              className="flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:bg-gray-800"
            >
              <input {...getTemplateInputProps()} />
              <div className="text-center">
                <FaFilePdf className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
                <p className="text-gray-500 dark:text-gray-300">Перетащите шаблон сюда или нажмите, чтобы выбрать файл</p>
              </div>
            </div>
            <div
              {...getProductRootProps()}
              className="flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:bg-gray-800"
            >
              <input {...getProductInputProps()} />
              <div className="text-center">
                <FaFileWord className="text-3xl mx-auto mb-2 text-gray-500 dark:text-gray-300" />
                <p className="text-gray-500 dark:text-gray-300">Перетащите данные о продуктах сюда или нажмите, чтобы выбрать файл</p>
              </div>
            </div>
          </div>

          {templateFile && (
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md dark:border-gray-600 mt-4">
              <div className="flex items-center">
                <FiUploadCloud className="text-xl text-gray-500 dark:text-gray-300 mr-2" />
                <span>{templateFile.name}</span>
              </div>
              <IconButton onClick={() => setTemplateFile(null)} color="secondary">
                <FiTrash2 />
              </IconButton>
            </div>
          )}

          {productDataFile && (
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md dark:border-gray-600 mt-4">
              <div className="flex items-center">
                <FiUploadCloud className="text-xl text-gray-500 dark:text-gray-300 mr-2" />
                <span>{productDataFile.name}</span>
              </div>
              <IconButton onClick={() => setProductDataFile(null)} color="secondary">
                <FiTrash2 />
              </IconButton>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateText}
              startIcon={<FiUploadCloud />}
              className="mb-4"
              disabled={!templateFile || !productDataFile}
              classes={{ disabled: 'text-white dark:text-white' }}
            >
              Сгенерировать текст предложения
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Сгенерированный текст</h2>
            <textarea
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePdf}
              startIcon={<FaFilePdf />}
              className="mb-4"
              disabled={!generatedText}
              classes={{ disabled: 'text-white dark:text-white' }}
            >
              Сохранить как PDF
            </Button>
          </div>

          {pdfLink && (
            <div className="text-center">
              <a
                href={pdfLink}
                download
                className="block p-2 mb-4 text-center text-white bg-purple-600 rounded dark:bg-purple-800"
              >
                Скачать PDF
              </a>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSendEmail}
                startIcon={<FiUploadCloud />}
                className="w-full"
              >
                Отправить клиенту
              </Button>
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
};

export default OfferAIForm;
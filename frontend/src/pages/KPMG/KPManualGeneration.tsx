/* import React, { useState } from "react";
import { performOCR } from "../services/ocrService.ts";
import { generateText } from "../services/aiService.ts";

export default function KPManualGeneration() {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [productDataFile, setProductDataFile] = useState<File | null>(null);
  const [clientData, setClientData] = useState({
    name: "",
    companyName: "",
    taxId: "",
    dealConditions: "",
    discount: "",
  });
  const [outputFile, setOutputFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateFile || !productDataFile) {
      alert("Please upload both template and product data files.");
      return;
    }

    try {
      const templateText = await performOCR(templateFile);
      const productDataText = await performOCR(productDataFile);
      const clientInfo = `
        Client Name: ${clientData.name}
        Company Name: ${clientData.companyName}
        Tax ID: ${clientData.taxId}
        Deal Conditions: ${clientData.dealConditions}
        Discount: ${clientData.discount}
      `;

      const aiPrompt = `
        Template: ${templateText}
        Product Data: ${productDataText}
        Client Info: ${clientInfo}
        Generate a commercial proposal based on the above information.
      `;

      const aiResponseText = await generateText(aiPrompt);

      // Combine the template with AI response text and generate the output PDF
      // Assuming you have a function to merge text with the template and generate a PDF
      const outputPdf = await mergeTextWithTemplate(templateFile, aiResponseText);
      setOutputFile(outputPdf);
    } catch (error) {
      console.error("Error generating proposal:", error);
      alert("Failed to generate the proposal. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Форма создания КП</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Загрузить шаблон КП (PDF, Excel, JPG, PNG):</label>
          <input type="file" accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, setTemplateFile)} />
        </div>
        <div>
          <label className="block mb-2">Загрузить данные о товарах/продуктах (файл или ссылка):</label>
          <input type="file" accept=".pdf,.xls,.xlsx,.csv,.txt" onChange={(e) => handleFileChange(e, setProductDataFile)} />
        </div>
        <div>
          <label className="block mb-2">ФИО клиента:</label>
          <input type="text" name="name" value={clientData.name} onChange={handleInputChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-2">Название юрлица:</label>
          <input type="text" name="companyName" value={clientData.companyName} onChange={handleInputChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-2">ИНН:</label>
          <input type="text" name="taxId" value={clientData.taxId} onChange={handleInputChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-2">Условия сделки:</label>
          <textarea name="dealConditions" value={clientData.dealConditions} onChange={handleInputChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-2">Скидка:</label>
          <input type="text" name="discount" value={clientData.discount} onChange={handleInputChange} className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Отправить</button>
      </form>
      {outputFile && (
        <div className="mt-4">
          <a href={outputFile} download className="text-blue-500">Скачать сгенерированный файл</a>
        </div>
      )}
    </div>
  );
} */
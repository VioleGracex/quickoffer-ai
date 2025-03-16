/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

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

interface ClientInfoFormProps {
  clientInfo: ClientInfo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fillTestData: () => void;
}

const requiredFields = ['companyName', 'inn', 'clientName', 'contactPerson', 'productName', 'pricingPlan', 'quantity'];

const fieldLabels = {
  companyName: 'Название компании',
  legalAddress: 'Юридический адрес',
  inn: 'ИНН',
  bankAccount: 'Расчетный счет',
  bankName: 'Название банка',
  clientName: 'Название клиента',
  contactPerson: 'Контактное лицо',
  productName: 'Название продукта',
  pricingPlan: 'Тариф',
  quantity: 'Количество лицензий'
};

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({ clientInfo, handleInputChange, fillTestData }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(clientInfo).map((key) => (
          <div key={key} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {fieldLabels[key as keyof typeof fieldLabels]}{requiredFields.includes(key) && <span className="text-red-500"> *</span>}
            </label>
            <input
              type="text"
              name={key}
              value={(clientInfo as any)[key]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={fillTestData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Заполнить тестовыми данными
        </button>
      </div>
    </>
  );
};

export default ClientInfoForm;
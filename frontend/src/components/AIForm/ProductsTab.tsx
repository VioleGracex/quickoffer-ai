import React from 'react';
import { FiFile, FiX } from 'react-icons/fi';
import FileUpload from './FileUpload';

interface ProductsTabProps {
  productDataFile: File | null;
  setProductDataFile: (file: File | null) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ productDataFile, setProductDataFile }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 dark:text-white">
     
        <FileUpload setFile={setProductDataFile} file={productDataFile} label="Данные о продуктах" />
    
    </div>
  );
};

export default ProductsTab;
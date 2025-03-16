import React, { useState } from "react";
import { FiDownload, FiArrowLeft, FiFileText } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";
import { PDFDocument, rgb } from "pdf-lib"; // Import pdf-lib for PDF generation
import { Document, Packer, Paragraph, TextRun } from "docx"; // Import docx for DOCX generation

interface StepThreeProps {
  ocrResult: string;
  handleDownloadText: () => void;
  setCurrentStep: (step: number) => void;
}

const fileTypes = [
  {
    icon: <FiFileText className="text-3xl text-gray-500 mx-auto mb-2" />,
    label: "Text",
    onClick: "handleDownloadText",
  },
  {
    icon: <FaFilePdf className="text-3xl text-gray-500 mx-auto mb-2" />,
    label: "PDF",
    onClick: "handleDownloadPdf",
  },
  {
    icon: <FaFileWord className="text-3xl text-gray-500 mx-auto mb-2" />,
    label: "Word",
    onClick: "handleDownloadDocx",
  },
];

const StepThree: React.FC<StepThreeProps> = ({
  ocrResult,
  handleDownloadText,
  setCurrentStep,
}) => {
  const [editableOcrResult, setEditableOcrResult] = useState(ocrResult);

  // Handle PDF download
  const handleDownloadPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    page.drawText(editableOcrResult, {
      x: 10,
      y: height - fontSize - 10,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ocr_result.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle DOCX download
  const handleDownloadDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(editableOcrResult)],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ocr_result.docx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const downloadHandlers = {
    handleDownloadText,
    handleDownloadPdf,
    handleDownloadDocx,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-black dark:text-white">
      <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-300">
        <textarea
          value={editableOcrResult}
          onChange={(e) => setEditableOcrResult(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="flex flex-row justify-around">
        {fileTypes.map((fileType) => (
          <div
            key={fileType.label}
            className="flex flex-row items-center bg-white max-w-[200px] p-4 rounded shadow dark:bg-gray-800"
          >
            <div>
              {fileType.icon}
              <p className="text-center text-black dark:text-gray-300">
                {fileType.label}
              </p>
            </div>
            <div>
              <IconButton
                color="primary"
                onClick={downloadHandlers[fileType.onClick]}
              >
                <FiDownload style={{ fontSize: "2rem" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center space-y-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentStep(0)}
          startIcon={<FiArrowLeft />}
        >
          Начать заново
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
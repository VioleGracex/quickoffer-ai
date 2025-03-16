import React, { useState } from "react";
import { FiDownload, FiArrowLeft, FiFileText } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";
import { PDFDocument, rgb } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";

interface StepThreeProps {
  ocrResult: string;
  handleDownloadText: () => void;
  handleCleanup: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  ocrResult,
  handleDownloadText,
  handleCleanup,
}) => {
  const [editableOcrResult, setEditableOcrResult] = useState(ocrResult);

  const handleDownloadPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height } = page.getSize();
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

  const handleDownloadDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun(editableOcrResult)] }),
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

  return React.createElement(
    "div",
    { className: "max-w-2xl mx-auto space-y-6 text-black dark:text-white" },

    React.createElement(
      "div",
      {
        className:
          "bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-300",
      },
      React.createElement("textarea", {
        value: editableOcrResult,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEditableOcrResult(e.target.value),
        rows: 10,
        className:
          "w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600",
      })
    ),

    React.createElement(
      "div",
      { className: "flex flex-row justify-around" },
      [
        { icon: FiFileText, label: "Text", handler: handleDownloadText },
        { icon: FaFilePdf, label: "PDF", handler: handleDownloadPdf },
        { icon: FaFileWord, label: "Word", handler: handleDownloadDocx },
      ].map(({ icon, label, handler }) =>
        React.createElement(
          "div",
          {
            key: label,
            className:
              "flex flex-row items-center bg-white max-w-[200px] p-4 rounded shadow dark:bg-gray-800",
          },
          React.createElement(
            "div",
            null,
            React.createElement(icon, {
              className: "text-3xl text-gray-500 mx-auto mb-2",
            }),
            React.createElement(
              "p",
              { className: "text-center text-black dark:text-gray-300" },
              label
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              IconButton,
              { color: "primary", onClick: handler },
              React.createElement(FiDownload, { style: { fontSize: "2rem" } })
            )
          )
        )
      )
    ),

    React.createElement(
      "div",
      { className: "flex flex-col items-center space-y-6" },
      React.createElement(
        Button,
        {
          variant: "contained",
          color: "primary",
          onClick: () => handleCleanup(),
          startIcon: React.createElement(FiArrowLeft),
        },
        "Начать заново"
      )
    )
  );
};

export default StepThree;

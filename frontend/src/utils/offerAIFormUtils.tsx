import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Function to fetch a custom font that supports Cyrillic characters from the public directory
const fetchFont = async (path: string) => {
  const response = await fetch(path);
  const fontBytes = await response.arrayBuffer();
  return fontBytes;
};

export const handleApiChange = (e: React.ChangeEvent<HTMLSelectElement>, setApi: (value: string) => void, setModel: (value: string) => void) => {
  const selectedApi = e.target.value;
  setApi(selectedApi);
  resetModelBasedOnApi(selectedApi, setModel);
};

const resetModelBasedOnApi = (selectedApi: string, setModel: (value: string) => void) => {
  if (selectedApi === 'openai') {
    setModel('gpt-4-turbo');
  } else if (selectedApi === 'deepseek') {
    setModel('deepseek-chat');
  } else if (selectedApi === 'yandex') {
    setModel('yandex-gpt');
  }
};

export const createFormData = (additionalPrompt: string, templateFile: File | null, productDataFile: File | null, model: string, api: string, selectedProducts: string) => {
  const formData = new FormData();
  appendFormData(formData, 'model', model);
  appendFormData(formData, 'api', api);
  appendFormData(formData, 'additionalPrompt', additionalPrompt);
  appendFormData(formData, 'selectedProducts', selectedProducts);
  if (templateFile) {
    appendFormData(formData, 'templateFile', templateFile);
    appendFormData(formData, 'templateFileType', templateFile.type);
  }
  if (productDataFile) {
    appendFormData(formData, 'productDataFile', productDataFile);
    appendFormData(formData, 'productDataFileType', productDataFile.type);
  }
  return formData;
};

const appendFormData = (formData: FormData, key: string, value: any) => {
  formData.append(key, value);
};

export const downloadFile = (content: BlobPart, type: string, filename: string) => {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
export const createPdf = async (generatedText: string) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Load custom font
  const fontBytes = await fetch("/fonts/Roboto-Regular.ttf").then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const fontSize = 12;
  const margin = 50;
  const maxWidth = width - 2 * margin; // Prevents overflow
  const lineHeight = fontSize + 4; // Adjust line spacing
  let yOffset = height - margin;

  // Function to wrap text manually
  const wrapText = (text: string, maxWidth: number) => {
    const words = text.split(" ");
    let lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      let testLine = currentLine + (currentLine ? " " : "") + word;
      let textWidth = customFont.widthOfTextAtSize(testLine, fontSize);

      if (textWidth < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // Process each line
  generatedText.split("\n").forEach((line) => {
    const wrappedLines = wrapText(line, maxWidth);

    wrappedLines.forEach((wrappedLine) => {
      if (yOffset < margin) {
        page = pdfDoc.addPage(); // Add new page if needed
        yOffset = height - margin;
      }

      page.drawText(wrappedLine, {
        x: margin,
        y: yOffset,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      yOffset -= lineHeight;
    });
  });

  return await pdfDoc.save();
};

export const createDocx = (generatedText: string) => {
  const paragraphs = generatedText.split('\n').map((line) => new Paragraph(line));
  return new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });
};
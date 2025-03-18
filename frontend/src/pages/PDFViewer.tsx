import React, { useRef, useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set the workerSrc property
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [_pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    if (file && canvasRef.current) {
      const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
      loadingTask.promise.then((pdf) => {
        setPdf(pdf);
        renderPage(pdf, 1);
      });
    }
  }, [file]);

  const renderPage = (pdf: pdfjsLib.PDFDocumentProxy, pageNumber: number) => {
    pdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const context = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PDFViewer;
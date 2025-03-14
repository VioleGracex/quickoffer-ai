/* import { vision } from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

export async function performOCR(file: File): Promise<string> {
  const [result] = await client.documentTextDetection(file.path);
  const fullTextAnnotation = result.fullTextAnnotation;
  return fullTextAnnotation ? fullTextAnnotation.text : '';
} */
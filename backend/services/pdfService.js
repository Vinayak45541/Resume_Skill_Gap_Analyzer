import fs from 'fs';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

/**
 * Extract plain text from a PDF file.
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export const extractTextFromPdf = async (filePath) => {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text || '';
};

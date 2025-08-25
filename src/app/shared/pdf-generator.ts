import fs from 'fs';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import libre from 'libreoffice-convert';
import { promisify } from 'util';

const convertAsync = promisify(libre.convert);

export async function generatePdf(filePath: string, data: Record<string, any>): Promise<Buffer> {
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render(data);
    const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
    });
    const pdfBuf = await convertAsync(buf, '.pdf', undefined);
    return pdfBuf;
}
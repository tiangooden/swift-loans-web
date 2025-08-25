import fs from 'fs';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import libre from 'libreoffice-convert';
const Promise = require('bluebird');
const convertAsync = Promise.promisify(libre.convert);

export async function wordTemplateToPdf(filePath: string, data: Record<string, any>): Promise<Buffer> {
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
    return await convertAsync(buf, '.pdf', undefined);
}
import { NextRequest, NextResponse } from 'next/server';
import { generatePdf } from '../../shared/pdf-generator';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const pdfBuf = await generatePdf('approval.docx', data);
        return new NextResponse(pdfBuf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=approval.pdf`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { wordTemplateToPdf } from '../../../../shared/pdf';
import { OffersRepository } from '@/app/repository/offers.repository';
import formatDateString from '@/app/shared/date';
import { off } from 'process';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const offers = await OffersRepository.find({
            where: { id },
            select: {
                principal: true,
                interest_rate: true,
                term_in_days: true,
                application: {
                    select: {
                        user: {
                            select: {
                                first_name: true,
                                middle_name: true,
                                last_name: true,
                                trn: true,
                                bank_account: {
                                    select: {
                                        bank_name: true,
                                        branch_name: true,
                                        account_name: true,
                                        account_number: true,
                                        account_type: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const { application, ...offer } = offers[0] as any;
        const { user } = application;
        const { bank_account, ...user2 } = user;
        const disbursementDate = new Date();
        const disbursement_date = formatDateString(disbursementDate);
        const { principal, interest_rate, term_in_days } = offer;
        const repaymentDate = disbursementDate.setDate(disbursementDate.getDate() + term_in_days);
        const repayment_date = formatDateString(repaymentDate);
        const amount_to_be_repaid = parseFloat(principal) + (principal * (interest_rate / 100));
        const info = { ...user2, ...offer, ...bank_account, repayment_date, amount_to_be_repaid, disbursement_date };
        console.log(info)
        const pdfBuf = await wordTemplateToPdf('approval.docx', info);
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
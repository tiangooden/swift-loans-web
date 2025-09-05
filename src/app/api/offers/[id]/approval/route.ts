import { NextResponse } from 'next/server';
import { wordTemplateToPdf } from '../../../../lib/pdf';
import formatDateString from '@/app/lib/date';
import { OffersRepository } from '../../offers.repository';

export async function POST({ params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const offers = await OffersRepository.findMany({
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
        const { application, ...offerWithoutApplication } = offers[0] as any;
        const { user } = application;
        const { first_name, last_name } = user;
        const { bank_account, ...userWithoutAccount } = user;
        const disbursementDate = new Date();
        const disbursement_date = formatDateString(disbursementDate);
        const { principal, interest_rate, term_in_days } = offerWithoutApplication;
        const repaymentDate = disbursementDate.setDate(disbursementDate.getDate() + term_in_days);
        const repayment_date = formatDateString(repaymentDate);
        const amount_to_be_repaid = parseFloat(principal) + (principal * (interest_rate / 100));
        const info = {
            ...userWithoutAccount, ...offerWithoutApplication, ...bank_account,
            repayment_date, amount_to_be_repaid, disbursement_date
        };
        const pdfBuf = await wordTemplateToPdf('approval.docx', info);
        return new NextResponse(pdfBuf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=SwiftLoans_Approval_${first_name}_${last_name}.pdf`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
}
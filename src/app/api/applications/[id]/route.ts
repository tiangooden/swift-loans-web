import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/shared/get-user';
import { ApplicationsRepository } from '../applications.repository';
import { withValidateBody } from '@/app/shared/withValidateBody';
import { createApplicationRequestSchema } from '../schema';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    // const user = await getCurrentUser();
    const loanApplication = await ApplicationsRepository.findById(id, {
        id: true,
        amount_requested: true,
        term_in_days: true,
        purpose: true,
        status: true,
        offers: {
            orderBy: {
                created_at: 'desc',
            }
        }
    });
    if (!loanApplication) {
        return NextResponse.json({ error: 'Loan application not found' }, { status: 404 });
    }
    return NextResponse.json(loanApplication);
}

export const PUT =
    withValidateBody(createApplicationRequestSchema)
        (
            async (request: NextRequest, { data, params }: { data: any, params: any }) => {
                const user = await getCurrentUser();
                const { id } = params;
                const updatedApplication = await ApplicationsRepository.update({
                    where: { id },
                    data: { ...data, updated_at: new Date() },
                });
                return NextResponse.json(updatedApplication);
            }
        );

export async function DELETE(request: NextRequest, { params }: { params: any }) {
    const user = await getCurrentUser();
    const { id } = await params;
    await ApplicationsRepository.update({
        where: { id },
        data: { is_deleted: true, deleted_at: new Date(), },
    });
    return NextResponse.json({ message: 'Application deleted successfully' });
}

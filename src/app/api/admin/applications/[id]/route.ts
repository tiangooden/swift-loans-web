import { NextResponse } from 'next/server';
import { ApplicationsRepository } from '@/app/api/applications/applications.repository';
import { withValidateBody } from '@/app/lib/withValidateBody';
import { createApplicationRequestSchema } from '@/app/api/applications/schema';

export async function GET({ params }: { params: { id: string } }) {
    const { id } = await params;
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
            async ({ data, params }: { data: any, params: any }) => {
                const { id } = params;
                const updatedApplication = await ApplicationsRepository.update({
                    where: { id },
                    data: { ...data, updated_at: new Date() },
                });
                return NextResponse.json(updatedApplication);
            }
        );

export async function DELETE({ params }: { params: any }) {
    const { id } = await params;
    await ApplicationsRepository.update({
        where: { id },
        data: { is_deleted: true, deleted_at: new Date(), },
    });
    return NextResponse.json({ message: 'Application deleted successfully' });
}

import { NextResponse } from 'next/server';
import { APPLICATION_STATUS } from '@/app/shared/constants';
import { ApplicationsRepository } from '@/app/repository/applications.repository';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const application = await ApplicationsRepository.update({
            where: {
                id: id,
            },
            data: {
                status: APPLICATION_STATUS.WITHDRAWN,
            },
        });
        return NextResponse.json(application);
    } catch (error) {
        console.error('Error withdrawing application:', error);
        return NextResponse.json({ message: 'Failed to withdraw application' }, { status: 500 });
    }
}
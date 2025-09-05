import { NextResponse } from 'next/server';
import { APPLICATION_STATUS } from '@/app/lib/constants';
import { ApplicationsRepository } from '../../applications.repository';

export async function PATCH({ params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const application = await ApplicationsRepository.update({
            where: {
                id: id,
            },
            data: {
                status: APPLICATION_STATUS.WITHDRAWN,
                updated_at: new Date(),
            },
        });
        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to withdraw application' }, { status: 500 });
    }
}
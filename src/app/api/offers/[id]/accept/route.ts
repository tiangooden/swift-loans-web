import { LoanOffersRepository } from '@/app/repository/offers.repository';
import { OFFER_STATUS } from '@/app/shared/constants';
import { NextResponse } from 'next/server';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const offerId = params.id;
        const updatedOffer = await LoanOffersRepository.update({
            where: { id: offerId },
            data: { status: OFFER_STATUS.ACCEPTED },
        });
        return NextResponse.json(updatedOffer);
    } catch (error: any) {
        console.error('Error updating offer status:', error);
        return NextResponse.json(
            { message: 'Error updating offer status', error: error.message },
            { status: 500 }
        );
    }
}
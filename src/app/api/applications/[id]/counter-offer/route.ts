import { OffersRepository } from '@/app/api/offers/offers.repository';
import { APPLICATION_STATUS } from '@/app/shared/constants';
import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications.repository';
import { counterOfferSchema } from './schema';
import { withValidateBody } from '@/app/shared/withValidateBody';

export const POST =
  withValidateBody(counterOfferSchema)
    (
      async (request: NextRequest, { data, params }: { data: any, params: { id: string } }) => {
        try {
          const { id } = await params;
          await ApplicationsRepository.update({
            where: { id: id },
            data: {
              status: APPLICATION_STATUS.COUNTERED,
            },
          });
          await OffersRepository.create({
            ...data,
            application_id: id,
            status: APPLICATION_STATUS.OFFERED,
          });
          return NextResponse.json({ message: 'Loan application approved and offer created successfully' });
        } catch (error) {
          return NextResponse.json({ message: 'Failed to approve loan application' }, { status: 500 });
        }
      }
    );

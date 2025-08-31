import { APPLICATION_STATUS } from '@/app/shared/constants';
import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications.repository';
import { withValidateBody } from '@/app/shared/withValidateBody';
import { rejectApplicationSchema } from './schema';

export const PATCH =
  withValidateBody(rejectApplicationSchema)
    (
      async (request: NextRequest, { data, params }: { data: any, params: any }) => {
        try {
          const { id } = await params;
          const { decision_reason } = data;
          await ApplicationsRepository.update({
            where: { id: id },
            data: {
              status: APPLICATION_STATUS.REJECTED,
              decision_reason,
              decided_at: new Date(),
              updated_at: new Date()
            },
          });
          return NextResponse.json({ message: 'Loan application rejected successfully' });
        } catch (error) {
          console.log(error);
          return NextResponse.json({ message: 'Failed to reject loan application' }, { status: 500 });
        }
      }
    );
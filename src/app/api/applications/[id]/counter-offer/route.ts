import { OffersRepository } from '@/app/repository/offers.repository';
import { APPLICATION_STATUS } from '@/app/shared/constants';
import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications.repository';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await ApplicationsRepository.update({
      where: { id: id },
      data: {
        status: APPLICATION_STATUS.COUNTERED,
        updated_at: new Date(),
      },
    });
    await OffersRepository.create({
      ...data,
      application_id: id,
      status: APPLICATION_STATUS.OFFERED,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return NextResponse.json({ message: 'Loan application approved and offer created successfully' });
  } catch (error) {
    console.error('Error approving loan application:', error);
    return NextResponse.json({ message: 'Failed to approve loan application' }, { status: 500 });
  }
}

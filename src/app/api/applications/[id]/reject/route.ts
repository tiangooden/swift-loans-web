import { APPLICATION_STATUS } from '@/app/shared/constants';
import { NextRequest, NextResponse } from 'next/server';
import { ApplicationsRepository } from '../../applications.repository';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { decision_reason } = await request.json();
    await ApplicationsRepository.update({
      where: { id: id },
      data: { status: APPLICATION_STATUS.REJECTED, decision_reason: decision_reason, decided_at: new Date(), updated_at: new Date() },
    });
    return NextResponse.json({ message: 'Loan application rejected successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to reject loan application' }, { status: 500 });
  }
}
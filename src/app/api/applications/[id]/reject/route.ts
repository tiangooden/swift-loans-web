import { ApplicationsRepository } from '@/app/repository/applications.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { decision_reason } = await request.json();
    await ApplicationsRepository.update({
      where: { id: id },
      data: { status: 'rejected', decision_reason: decision_reason, decided_at: new Date() },
    });
    return NextResponse.json({ message: 'Loan application rejected successfully' });
  } catch (error) {
    console.error('Error rejecting loan application:', error);
    return NextResponse.json({ message: 'Failed to reject loan application' }, { status: 500 });
  }
}
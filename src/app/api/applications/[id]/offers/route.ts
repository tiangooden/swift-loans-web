import { NextRequest, NextResponse } from 'next/server';
import { LoanOffersRepository } from '@/app/repository/loan_offers.repository';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const loanOffers = await LoanOffersRepository.find({
      where: {
        applications: {
          id: id
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return NextResponse.json(loanOffers);
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { principal, fee, interest_rate, total_due, term_months } = await request.json();
    if (!principal || !fee || !interest_rate || !total_due || !term_months) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const loanOffer = await LoanOffersRepository.create({
      applications: {
        connect: {
          id: id,
        },
      },
      principal: parseFloat(principal),
      fee_amount: parseFloat(fee),
      interest_rate: parseFloat(interest_rate),
      total_due: parseFloat(total_due),
      offer_status: 'offered',
    });
    return NextResponse.json(loanOffer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoanOffersRepository } from '@/app/repository/loan_offers.repository';
import { UsersRepository } from '@/app/repository/users.repository';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: loanApplicationId } = await params;

    if (!loanApplicationId) {
      return NextResponse.json(
        { error: 'Loan application ID is required' },
        { status: 400 }
      );
    }

    const loanOffers = await LoanOffersRepository.find({
      where: {
          loan_applications: {
            id: parseInt(loanApplicationId)
          },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(loanOffers);
  } catch (error: any) {
    console.error('Error fetching loan offers:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: loanApplicationId } = await params;

    if (!loanApplicationId) {
      return NextResponse.json(
        { error: 'Loan application ID is required' },
        { status: 400 }
      );
    }

    const user = await UsersRepository.findByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { principal, fee, interest_rate, total_due, term_months } = body;

    if (!principal || !fee || !interest_rate || !total_due || !term_months) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const loanOffer = await LoanOffersRepository.create({
      loan_applications: {
        connect: {
          id: parseInt(loanApplicationId),
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
    console.error('Error creating loan offer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
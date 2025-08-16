import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, amount, interest_rate, term } = body;

    // Validate action
    const validActions = ['approve', 'reject', 'counter_offer'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Mock processing - replace with actual business logic
    let result = {
      success: true,
      action,
      application_id: id,
      timestamp: new Date().toISOString()
    };

    switch (action) {
      case 'approve':
        // Logic for approving loan
        result = {
          ...result,
          message: 'Loan application approved',
          next_status: 'approved'
        };
        break;

      case 'reject':
        // Logic for rejecting loan
        result = {
          ...result,
          message: 'Loan application rejected',
          next_status: 'rejected'
        };
        break;

      case 'counter_offer':
        // Validate counter offer data
        if (!amount || !interest_rate || !term) {
          return NextResponse.json(
            { error: 'Missing counter offer parameters' },
            { status: 400 }
          );
        }

        // Logic for creating counter offer
        const monthly_payment = calculateMonthlyPayment(amount, interest_rate, term);
        const total_interest = (monthly_payment * term / 30) - amount;
        const total_amount = amount + total_interest;

        result = {
          ...result,
          message: 'Counter offer created',
          next_status: 'counter_offer_sent',
          offer_details: {
            amount_offered: parseFloat(amount),
            interest_rate: parseFloat(interest_rate),
            term_in_days: parseInt(term),
            monthly_payment,
            total_interest,
            total_amount
          }
        };
        break;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing loan action:', error);
    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    );
  }
}

function calculateMonthlyPayment(principal: number, annualRate: number, termDays: number) {
  const monthlyRate = annualRate / 100 / 12;
  const months = termDays / 30;
  
  if (monthlyRate === 0) {
    return principal / months;
  }
  
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
         (Math.pow(1 + monthlyRate, months) - 1);
}
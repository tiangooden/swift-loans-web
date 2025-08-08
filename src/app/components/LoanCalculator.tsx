"use client";
import { useState, useEffect } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [loanTerm, setLoanTerm] = useState<number>(14);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);

  const loanAmounts = [
    10000, 15000, 20000, 25000, 30000
  ];
  const loanTerms = [
    { days: 14, interestRate: 0.25 },
    { days: 28, interestRate: 0.30 }
  ];

  useEffect(() => {
    const selectedTerm = loanTerms.find(term => term.days === loanTerm);
    if (selectedTerm) {
      const interest = loanAmount * selectedTerm.interestRate;
      setTotalRepayment(loanAmount + interest);
    }
  }, [loanAmount, loanTerm]);

  return (
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-6">Loan Calculator</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="loan-amount" className="block text-sm font-medium mb-2">Loan Amount</label>
          <select
            id="loan-amount"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          >
            {loanAmounts.map((amount) => (
              <option key={amount} className="bg-blue-200 text-black" value={amount}>${amount.toLocaleString()}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="loan-term" className="block text-sm font-medium mb-2">Loan Term</label>
          <select
            id="loan-term"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white"
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value))}
          >
            {loanTerms.map((term) => (
              <option key={term.days} className="bg-blue-200 text-black" value={term.days}>{term.days} days ({term.interestRate * 100}%)</option>
            ))}
          </select>
        </div>
        <div className="bg-white/20 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span>Total Repayment:</span>
            <span className="text-2xl font-bold">${totalRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
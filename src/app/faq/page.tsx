'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'What is a payday loan?',
          answer: 'A payday loan is a short-term, small-dollar loan typically due on your next payday. It\'s designed to help cover unexpected expenses or bridge the gap between paychecks. Loan amounts typically range from $100 to $1,500.'
        },
        {
          question: 'How do I qualify for a loan?',
          answer: 'To qualify for a loan with Swift Financials, you must: (1) Be at least 18 years old, (2) Have a regular source of income, (3) Have an active checking account, (4) Provide a valid phone number and email address, and (5) Be a U.S. citizen or permanent resident.'
        },
        {
          question: 'How much can I borrow?',
          answer: 'Loan amounts range from $100 to $1,500, depending on your income, state regulations, and our underwriting criteria. First-time borrowers may be limited to smaller amounts, with the ability to request larger loans after establishing a positive payment history.'
        }
      ]
    },
    {
      category: 'Application Process',
      questions: [
        {
          question: 'How long does the application take?',
          answer: 'Our online application typically takes 5-10 minutes to complete. You\'ll need basic personal information, employment details, and bank account information. Most applications receive an instant decision.'
        },
        {
          question: 'What information do I need to apply?',
          answer: 'You\'ll need: Personal information (name, address, phone, email), Social Security number, employment information (employer name, income, length of employment), and bank account details (routing and account numbers).'
        },
        {
          question: 'How quickly will I get approved?',
          answer: 'Most applications are approved instantly through our automated system. In some cases, manual review may be required, which can take up to 1 hour during business hours.'
        },
        {
          question: 'When will I receive my money?',
          answer: 'If approved, funds are typically deposited into your bank account within 1 business day. Some banks may process transfers faster, allowing same-day funding in certain cases.'
        }
      ]
    },
    {
      category: 'Loan Terms & Costs',
      questions: [
        {
          question: 'What are your interest rates and fees?',
          answer: 'Our finance fee ranges from $15-25 per $100 borrowed, depending on the loan amount and term. For example, a $500 loan for 14 days would have a $75 finance fee, making the total repayment $575. We provide all cost information upfront before you accept the loan.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in complete transparency. All fees are clearly disclosed in your loan agreement before you sign. The only additional fee that may apply is a failed payment fee if your payment is returned by your bank.'
        },
        {
          question: 'Can I pay off my loan early?',
          answer: 'Yes, you can pay off your loan early at any time without penalty. Early payment can help you save on interest charges. You can make payments through your online account or by calling our customer service team.'
        },
        {
          question: 'What happens if I can\'t repay on time?',
          answer: 'If you\'re unable to repay on the due date, contact us immediately. We may offer payment plan options or extensions (where permitted by state law). Late payments may incur additional fees and could impact your credit score.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use bank-level 256-bit SSL encryption to protect all personal and financial information. Our systems are regularly audited and we comply with all applicable privacy and security regulations.'
        },
        {
          question: 'How do I access my account online?',
          answer: 'You can log into your account using the email and password you created during registration. From your dashboard, you can view loan details, make payments, update personal information, and track your loan history.'
        },
        {
          question: 'Can I change my bank account information?',
          answer: 'Yes, you can update your bank account information by logging into your online account or calling customer service. Changes may require verification and could affect your next payment date.'
        }
      ]
    },
    {
      category: 'Payments & Renewals',
      questions: [
        {
          question: 'How do I make a payment?',
          answer: 'Payments are automatically withdrawn from your bank account on the due date. You can also make manual payments through your online account, by phone, or by visiting one of our partner locations.'
        },
        {
          question: 'Can I extend or rollover my loan?',
          answer: 'Loan extensions may be available in certain states and situations. Contact us before your due date to discuss options. Extension fees may apply, and not all borrowers will qualify for extensions.'
        },
        {
          question: 'What if my payment fails?',
          answer: 'If a payment fails due to insufficient funds or other bank issues, you\'ll be notified immediately. A failed payment fee may apply, and you\'ll need to arrange alternative payment. Continued payment failures may result in collection activities.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const allQuestions = faqData.flatMap(category => category.questions);
  let questionIndex = 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our payday loan services, application process, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">5 min</div>
            <div className="text-gray-600">Average approval time</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Customer support</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">$100-$1,500</div>
            <div className="text-gray-600">Loan amounts</div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((qa, index) => {
                  const currentIndex = questionIndex++;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(currentIndex)}
                        className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {qa.question}
                          </h3>
                          {openItem === currentIndex ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      {openItem === currentIndex && (
                        <div className="px-4 pb-4">
                          <div className="text-gray-600 leading-relaxed">
                            {qa.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFAQ.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No results found for "{searchTerm}"
            </div>
            <p className="text-gray-400">
              Try searching with different keywords or browse the categories above.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-800-QUICK-CASH"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Call 1-800-QUICK-CASH
            </a>
            <a
              href="mailto:support@Swift Financials.com"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
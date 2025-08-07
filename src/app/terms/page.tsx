'use client'

import React from 'react';
import { Shield, AlertTriangle, FileText, Clock } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 15, 2025
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-gray-700">
                Please read these terms carefully before using our services. By applying for a loan or using our website,
                you agree to be bound by these terms and conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              1. Agreement to Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Swift Loans Financial Services
                (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) concerning your use of our website and loan services.
              </p>
              <p>
                By accessing our website, submitting a loan application, or using any of our services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms and all applicable laws and regulations.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Loan Products and Services</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">Payday Loans</h3>
              <p>
                We offer short-term, small-dollar loans designed to help cover unexpected expenses. Loan amounts range from
                $100 to $1,500, with terms typically ranging from 14 to 30 days.
              </p>
              <h3 className="text-lg font-semibold">Eligibility Requirements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Must be at least 18 years of age</li>
                <li>Must be a U.S. citizen or permanent resident</li>
                <li>Must have a regular source of income</li>
                <li>Must have an active checking account</li>
                <li>Must provide valid contact information</li>
                <li>Must meet state-specific lending requirements</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Application Process</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our application process is designed to be quick and secure. You will need to provide accurate and complete
                information about your identity, employment, income, and banking details.
              </p>
              <p>
                All information provided in your application is subject to verification. Providing false or misleading
                information may result in denial of your application or termination of services.
              </p>
              <p>
                Loan approval is not guaranteed and is subject to our underwriting criteria and applicable state regulations.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Loan Terms and Costs</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold">Interest Rates and Fees</h3>
              <p>
                Our finance charges range from $15 to $25 per $100 borrowed, depending on the loan amount and term.
                The Annual Percentage Rate (APR) for our loans ranges from 200% to 600%.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Example Loan:</h4>
                <ul className="text-blue-800 space-y-1">
                  <li>Loan Amount: $500</li>
                  <li>Term: 14 days</li>
                  <li>Finance Fee: $75</li>
                  <li>Total Repayment: $575</li>
                  <li>APR: 391%</li>
                </ul>
              </div>
              <h3 className="text-lg font-semibold">Additional Fees</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Failed payment fee: $25 per occurrence</li>
                <li>Extension fee: Varies by state (where permitted)</li>
                <li>No prepayment penalties</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              5. Repayment Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Loan repayment is due in full on the agreed-upon due date. Payment will be automatically withdrawn from your
                designated bank account unless alternative arrangements are made.
              </p>
              <p>
                If you are unable to repay your loan on the due date, you must contact us immediately to discuss available options.
                Late payments may result in additional fees and collection activities.
              </p>
              <p>
                You have the right to cancel your loan by 5:00 PM the next business day after receiving the funds,
                by paying the principal amount without any fees.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Security</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We are committed to protecting your personal and financial information. All data is encrypted using
                256-bit SSL technology and stored on secure servers.
              </p>
              <p>
                We may share your information with third parties as necessary to process your loan application,
                verify your identity, or as required by law. Please review our Privacy Policy for complete details.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Responsible Lending</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We are committed to responsible lending practices. Our loans are intended for short-term financial needs
                and should not be used as a long-term financial solution.
              </p>
              <p>
                We encourage borrowers to only borrow what they can afford to repay and to explore all available options
                before taking a payday loan.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Any disputes arising from these Terms or your use of our services will be resolved through binding arbitration
                in accordance with the rules of the American Arbitration Association.
              </p>
              <p>
                You waive your right to participate in class action lawsuits or class-wide arbitration against the Company.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right to modify these Terms at any time. Any changes will be posted on our website with an
                updated effective date. Your continued use of our services after changes are posted constitutes acceptance
                of the new Terms.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have questions about these Terms or our services, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Swift Loans Financial Services</strong></p>
                <p>Phone: 1-800-QUICK-CASH</p>
                <p>Email: legal@Swift Loans.com</p>
                <p>Address: 123 Finance Street, Suite 100, Financial District, NY 10005</p>
              </div>
            </div>
          </section>

          {/* State Disclosures */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">State-Specific Disclosures</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Loan terms, availability, and regulations vary by state. Some states may have different maximum loan amounts,
                terms, or fee structures. Please refer to your loan agreement for state-specific terms that apply to your loan.
              </p>
              <p className="text-sm text-gray-600">
                This company is licensed and regulated by state authorities. License information is available upon request.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Notice */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By clicking &quot;I Agree&quot; or submitting a loan application, you acknowledge that you have read and understood
            these Terms of Service and agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
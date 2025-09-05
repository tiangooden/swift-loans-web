import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Shield, DollarSign, Star, Users } from "lucide-react";
import LoanCalculator from "./lib/component/LoanCalculator";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Fast Cash When You Need It Most
                  </h1>
                  <p className="text-xl text-blue-100">
                    Get up to $30,000 in your account as soon as today. Simple application, fast approval, and transparent terms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/user"
                      className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center space-x-2"
                    >
                      Apply Now
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/about"
                      className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                    >
                      Learn More
                    </Link>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>No hidden fees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Fast approval</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Secure platform</span>
                    </div>
                  </div>
                </div>
                <div className="lg:text-right">
                  <LoanCalculator />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Swift Loans?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We make getting a payday loan simple, fast, and transparent with industry-leading security.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Fast Approval</h3>
                  <p className="text-gray-600">
                    Get approved in minutes with our streamlined application process. Funds can be in your account the same day.
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure & Safe</h3>
                  <p className="text-gray-600">
                    Bank-level security with 256-bit SSL encryption. Your personal and financial data is always protected.
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Transparent Fees</h3>
                  <p className="text-gray-600">
                    No hidden fees or surprises. We clearly explain all costs upfront so you know exactly what you&apos;ll pay.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-gray-600">
                  Get your loan in 3 simple steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Apply Online</h3>
                  <p className="text-gray-600">
                    Fill out our secure application form in just 5 minutes. Provide basic information about yourself and your income.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Get Approved</h3>
                  <p className="text-gray-600">
                    Receive an instant decision. Our advanced system reviews your application and provides approval in minutes.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Receive Funds</h3>
                  <p className="text-gray-600">
                    Money is deposited directly into your bank account. Funds are typically available the same business day.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What Our Customers Say
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    &quot;Swift Loans saved me when I had an unexpected car repair. The process was so easy and the money was in my account the same day!&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="ml-3">
                      <p className="font-semibold">Sarah M.</p>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    &quot;Transparent fees and no hidden charges. I knew exactly what I was paying from the start. Highly recommend!&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="ml-3">
                      <p className="font-semibold">Mike R.</p>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    &quot;The customer service team was incredibly helpful. They walked me through the entire process and answered all my questions.&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="ml-3">
                      <p className="font-semibold">Jessica L.</p>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Swift Loans for their short-term lending needs.
              </p>
              <Link
                href="/apply"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center space-x-2"
              >
                Apply for Your Loan Today
                <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="mt-8 flex justify-center items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>50,000+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Bank-Level Security</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

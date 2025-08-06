import { CheckCircle, Users, DollarSign, Clock, Award, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Swift Financials</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're a trusted financial services company dedicated to providing fast, reliable payday loans
              to help you through life's unexpected expenses.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Swift Financials, we believe that everyone deserves access to financial solutions when they need them most.
                We've built our company around the core values of transparency, speed, and customer service.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Since our founding in 2015, we've helped over 500,000 customers navigate their financial challenges
                with responsible lending practices and clear terms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Licensed & Regulated</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Transparent Pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Secure Platform</span>
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
            <p className="text-lg text-gray-600">Our track record speaks for itself</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">$500M+</div>
              <div className="text-gray-600">Loans Funded</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5 Min</div>
              <div className="text-gray-600">Average Approval</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">A+</div>
              <div className="text-gray-600">BBB Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trust & Security</h3>
              <p className="text-gray-600">
                We protect your personal and financial information with bank-level security measures and comply
                with all industry regulations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600">
                No hidden fees, no surprises. We believe in clear communication and honest pricing
                for all our financial products.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer First</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We're committed to providing
                exceptional service and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Licensed & Regulated</h2>
            <p className="text-lg text-gray-600">
              We operate under strict regulatory oversight to ensure responsible lending practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">FDIC Member</h3>
              <p className="text-sm text-gray-600">Federal Deposit Insurance Corporation</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">State Licensed</h3>
              <p className="text-sm text-gray-600">Licensed in 45+ states</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">BBB Accredited</h3>
              <p className="text-sm text-gray-600">A+ Rating with Better Business Bureau</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">SOC Compliant</h3>
              <p className="text-sm text-gray-600">SOC 2 Type II Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600">Meet the people behind Swift Financials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Sarah Johnson</h3>
              <p className="text-blue-600 mb-2">Chief Executive Officer</p>
              <p className="text-sm text-gray-600">
                15+ years in financial services, formerly with JPMorgan Chase
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Michael Chen</h3>
              <p className="text-blue-600 mb-2">Chief Technology Officer</p>
              <p className="text-sm text-gray-600">
                Tech veteran with experience at Google and Facebook
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Lisa Rodriguez</h3>
              <p className="text-blue-600 mb-2">Chief Operating Officer</p>
              <p className="text-sm text-gray-600">
                Operations expert with background in fintech and lending
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

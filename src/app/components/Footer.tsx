'use client'
import React from 'react';
import Link from 'next/link';
import { DollarSign, Shield, Lock, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">Swift Loans</span>
            </div>
            <p className="text-gray-400 text-sm">
              Fast, reliable payday loans when you need them most. Licensed and regulated financial services.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-400">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-400">Bank Grade Security</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/apply" className="text-gray-400 hover:text-white transition-colors">Apply for Loan</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Check Status</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Responsible Lending</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">State Licenses</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>📞 1-800-QUICK-CASH</p>
              <p>✉️ support@Swift Loans.com</p>
              <p>🕒 24/7 Customer Support</p>
              <div className="flex items-center space-x-1 mt-4">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="text-xs">A+ BBB Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Swift Loans Financial Services. All rights reserved.</p>
          <p className="mt-2">Licensed by state regulatory authorities. Member FDIC.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
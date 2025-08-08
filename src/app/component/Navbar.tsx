'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';
import Image from 'next/image';
import { signIn, signOut } from '../auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (x: string) => x == x//(path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              {/* <DollarSign className="h-6 w-6 text-white" /> */}
              <Image width={50} height={50} src={'/favicon.ico'} alt="Swift Loans" />
              <span className="text-xl font-bold text-gray-900">Swift Loans</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              Home
            </Link>
            <Link
              href="/apply"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/apply') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              About
            </Link>
            <Link
              href="/faq"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/faq') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              Dashboard
            </Link>
            <button onClick={() => signIn('keycloak')}>Sign in</button>
            <button onClick={() => signOut()}>Sign out</button>
            <Link
              href="/admin"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1"
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/apply"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Apply Now
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gray-600 text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { Menu, X, Shield, ChevronDown, Home, FileText, Info, HelpCircle, Mail, LayoutDashboard, CreditCard, LogIn, LogOut, User, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isActive = (path: string) => pathname === path;

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
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/about') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              href="/faq"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/faq') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/contact') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/dashboard') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
            {
              !session ?
                <Link
                  href="#"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-blue-600 flex items-center space-x-1`}
                  onClick={() => signIn()}><LogIn className="h-4 w-4" /><span>Sign in</span></Link> :
                <div className="relative ml-4">
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <User className="h-4 w-4 mr-1" />{session.user?.email}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/bank-accounts"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Bank Accounts</span>
                      </Link>
                      <Link
                        href="/employment"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Employment</span>
                      </Link>
                      <Link href="/loan-applications"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Loan Applications</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/', redirect: true });
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/') ?
                  'bg-blue-600 text-white' :
                  'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/about') ?
                  'bg-blue-600 text-white' :
                  'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </Link>
              <Link
                href="/faq"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/faq') ?
                  'bg-blue-600 text-white' :
                  'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle className="h-5 w-5" />
                <span>FAQ</span>
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/contact') ?
                  'bg-blue-600 text-white' :
                  'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </Link>
              <Link
                href="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/dashboard') ?
                  'bg-blue-600 text-white' :
                  'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gray-600 text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              {
                !session ?
                  <Link
                    href="#"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-600 hover:text-blue-600 flex items-center space-x-2`}
                    onClick={() => signIn()}><LogIn className="h-5 w-5" /><span>Sign in</span></Link> :
                  <div className="relative ml-4">
                    <Link
                      href="#"
                      className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <User className="h-5 w-5 mr-1" />{session.user?.email}
                      <ChevronDown className="ml-1 h-5 w-5" />
                    </Link>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="h-5 w-5" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/bank-accounts"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <CreditCard className="h-5 w-5" />
                          <span>Bank Accounts</span>
                        </Link>
                        <Link
                          href="/employment"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Briefcase className="h-5 w-5" />
                          <span>Employment</span>
                        </Link>
                        <Link href="/loan-applications"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FileText className="h-4 w-4" />
                          <span>Loan Applications</span>
                        </Link>
                        <Link
                          href="/#"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            signOut({ callbackUrl: '/', redirect: true });
                            setIsDropdownOpen(false);
                          }}
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sign Out</span>
                        </Link>
                      </div>
                    )}
                  </div>
              }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
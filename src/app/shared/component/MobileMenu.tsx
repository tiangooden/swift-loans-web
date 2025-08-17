'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, FileText, Info, HelpCircle, Mail, LayoutDashboard, CreditCard, LogIn, LogOut, User, Briefcase, ChevronDown, Shield } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

interface MobileMenuProps {
  session: any;
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin"
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${isActive('/admin') ?
                'bg-blue-600 text-white' :
                'text-gray-600 hover:text-blue-600'
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Link>

            {session ? (
              <div className="relative ml-4">
                <button
                  className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <User className="h-5 w-5 mr-1" />
                  )}
                  {session.user?.email}
                  <ChevronDown className="ml-1 h-5 w-5" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/bank-accounts"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Bank Accounts</span>
                    </Link>
                    <Link
                      href="/employment"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Briefcase className="h-5 w-5" />
                      <span>Employment</span>
                    </Link>
                    <Link
                      href="/applications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Applications</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/', redirect: true });
                        setIsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-600 hover:text-blue-600 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="h-5 w-5" />
                <span>Sign in</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, User, CreditCard, Briefcase, FileText, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface UserDropdownProps {
  session: any;
}

export function UserDropdown({ session }: UserDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative ml-4">
      <button
        className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <User className="h-4 w-4 mr-1" />
        {session.user?.email}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href="/user"
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
            <span>Bank Account</span>
          </Link>
          <Link
            href="/employment"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Briefcase className="h-4 w-4" />
            <span>Employment</span>
          </Link>
          <Link
            href="/applications"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FileText className="h-4 w-4" />
            <span>Applications</span>
          </Link>
          <button
            onClick={() => {
              signOut({ callbackUrl: '/', redirect: true });
              setIsDropdownOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
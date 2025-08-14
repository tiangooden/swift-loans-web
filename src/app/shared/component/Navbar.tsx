import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { Menu, X, Shield, Home, FileText, Info, HelpCircle, Mail, LayoutDashboard, CreditCard, LogIn, LogOut, User, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { UserDropdown } from './UserDropdown';
import { MobileMenu } from './MobileMenu';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image width={50} height={50} src={'/favicon.ico'} alt="Swift Loans" />
              <span className="text-xl font-bold text-gray-900">Swift Loans</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              href="/faq"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-gray-600 hover:text-blue-600"
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
            
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Link
                href="/api/auth/signin"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-blue-600 flex items-center space-x-1"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign in</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <MobileMenu session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
}
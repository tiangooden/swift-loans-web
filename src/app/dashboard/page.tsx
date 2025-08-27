import React from 'react';
import { redirect } from 'next/navigation';
import getCurrentUser from '@/app/shared/get-user';
import DashboardContent from './DashboardContent';
import formatDateString from '../shared/date';

const Dashboard = async () => {
  let userData;
  try {
    const user = await getCurrentUser();
    userData = {
      name: user.first_name
        ? `${user.first_name}`
        : 'User',
      email: user.email || '',
      phone: user.phone_number || '',
      memberSince: formatDateString(user.created_at)
    };
  } catch (error) {
    redirect(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/auth/signin`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userData.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your account today.
          </p>
        </div>
        <DashboardContent userData={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
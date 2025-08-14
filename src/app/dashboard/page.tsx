'use client'

import React, { useState } from 'react';
import { User, Clock, CheckCircle, AlertCircle, DollarSign, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    memberSince: 'January 2024'
  };

  const currentLoan = {
    amount: 1000,
    fee: 150,
    total: 1150,
    dueDate: '2025-02-15',
    status: 'active',
    remainingDays: 12
  };

  const loanHistory = [
    { id: 1, amount: 500, status: 'paid', date: '2024-12-01', paidDate: '2024-12-15' },
    { id: 2, amount: 750, status: 'paid', date: '2024-10-15', paidDate: '2024-10-29' },
    { id: 3, amount: 300, status: 'paid', date: '2024-08-20', paidDate: '2024-09-03' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-orange-600 bg-orange-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userData.name}</p>
        </div>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <a href="/profile" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                <p className="text-sm text-gray-600">Manage your personal information</p>
              </div>
            </div>
          </a>

          <a href="/bank-accounts" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Bank Accounts</h3>
                <p className="text-sm text-gray-600">Link and manage your bank accounts</p>
              </div>
            </div>
          </a>

          <a href="/employment" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Employment</h3>
                <p className="text-sm text-gray-600">Update your employment details</p>
              </div>
            </div>
          </a>

          <a href="/loan-applications" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Loan Applications</h3>
                <p className="text-sm text-gray-600">Apply for new loans and track status</p>
              </div>
            </div>
          </a>
        </div>

        {/* Current Loan Alert */}
        {currentLoan.status === 'active' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Active Loan Reminder</h3>
                  <p className="text-gray-600">
                    Your loan of ${currentLoan.total} is due in {currentLoan.remainingDays} days ({currentLoan.dueDate})
                  </p>
                </div>
              </div>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Make Payment
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'loans'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Loan History
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Current Loan</h3>
                    <p className="text-2xl font-bold text-blue-600">${currentLoan.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Loans Paid</h3>
                    <p className="text-2xl font-bold text-green-600">{loanHistory.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Next Payment</h3>
                    <p className="text-2xl font-bold text-orange-600">{currentLoan.remainingDays} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Loan Details */}
            {currentLoan.status === 'active' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Current Loan Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Loan Amount</label>
                      <p className="text-lg font-semibold">${currentLoan.amount}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Finance Fee</label>
                      <p className="text-lg font-semibold">${currentLoan.fee}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Amount Due</label>
                      <p className="text-xl font-bold text-blue-600">${currentLoan.total}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Due Date</label>
                      <p className="text-lg font-semibold">{currentLoan.dueDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentLoan.status)}`}>
                        {getStatusIcon(currentLoan.status)}
                        <span className="ml-1 capitalize">{currentLoan.status}</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loans Tab */}
        {activeTab === 'loans' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Loan History</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Apply for New Loan
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loan ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Applied
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Paid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Current Loan */}
                    {currentLoan.status === 'active' && (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #LC{Date.now()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${currentLoan.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          2025-01-15
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          -
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentLoan.status)}`}>
                            {getStatusIcon(currentLoan.status)}
                            <span className="ml-1 capitalize">{currentLoan.status}</span>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Historical Loans */}
                    {loanHistory.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #LC{1000 + loan.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${loan.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {loan.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {loan.paidDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                            {getStatusIcon(loan.status)}
                            <span className="ml-1 capitalize">{loan.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{userData.name}</h3>
                  <p className="text-gray-600">Member since {userData.memberSince}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={userData.email}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h4>
                <div className="space-y-3">
                  <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Update Profile
                  </button>
                  <button className="w-full md:w-auto bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors md:ml-3">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
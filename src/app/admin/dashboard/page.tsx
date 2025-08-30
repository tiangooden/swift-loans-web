'use client'
import React, { useEffect, useState } from 'react';
import { BarChart3, DollarSign, Users, TrendingUp, Clock, CheckCircle, AlertTriangle, Eye } from "lucide-react";
import AdminNav from '../components/AdminNav';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 12547,
    activeLoans: 1834,
    totalRevenue: 2847392,
    pendingApplications: 127,
    approvalRate: 78.5,
    defaultRate: 3.2
  });
  const [recentLoans, setRecentLoans] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, loansResponse] = await Promise.all([
        axios(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/admin/dashboard-stats`),
        axios(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/all?limit=5`)
      ]);
      setStats(statsResponse.data);
      setRecentLoans(loansResponse.data.slice(0, 5));
    } catch (error) {
    }
  };

  useEffect(() => {
    // fetchDashboardData();
  }, []);

  return (
    <AdminNav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Loans</h3>
                <p className="text-2xl font-bold text-green-600">{stats.activeLoans.toLocaleString()}</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
                <p className="text-2xl font-bold text-orange-600">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600">+15% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Applications</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
                <p className="text-sm text-gray-500">Requires review</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Approval Rate</h3>
                <p className="text-2xl font-bold text-purple-600">{stats.approvalRate}%</p>
                <p className="text-sm text-green-600">+2% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Default Rate</h3>
                <p className="text-2xl font-bold text-red-600">{stats.defaultRate}%</p>
                <p className="text-sm text-red-600">-0.5% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
}
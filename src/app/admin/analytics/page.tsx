'use client'
import React, { useEffect, useState } from 'react';
import { TrendingUp, BarChart3, PieChart, DollarSign, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import AdminNav from '../components/AdminNav';

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeLoans: 0,
    totalRevenue: 0,
    pendingApplications: 0,
    approvalRate: 0,
    defaultRate: 0,
    monthlyData: [],
    statusDistribution: [],
    loanAmountDistribution: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/admin/analytics`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fallback to mock data if API fails
        setAnalytics({
          totalUsers: 12547,
          activeLoans: 1834,
          totalRevenue: 2847392,
          pendingApplications: 127,
          approvalRate: 78.5,
          defaultRate: 3.2,
          monthlyData: [
            { month: 'Jan', loans: 120, revenue: 45000 },
            { month: 'Feb', loans: 150, revenue: 58000 },
            { month: 'Mar', loans: 180, revenue: 72000 },
            { month: 'Apr', loans: 200, revenue: 85000 },
            { month: 'May', loans: 220, revenue: 92000 },
            { month: 'Jun', loans: 250, revenue: 110000 }
          ],
          statusDistribution: [
            { status: 'active', count: 1834 },
            { status: 'pending', count: 127 },
            { status: 'paid', count: 892 },
            { status: 'overdue', count: 45 }
          ],
          loanAmountDistribution: [
            { range: '$0-$500', count: 450 },
            { range: '$501-$1000', count: 789 },
            { range: '$1001-$2000', count: 567 },
            { range: '$2001+', count: 234 }
          ]
        });
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <AdminNav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive overview of business performance and key metrics.
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
                <p className="text-2xl font-bold text-blue-600">{analytics.totalUsers.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-green-600">{analytics.activeLoans.toLocaleString()}</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
                <p className="text-2xl font-bold text-orange-600">${(analytics.totalRevenue / 1000000).toFixed(1)}M</p>
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
                <p className="text-2xl font-bold text-yellow-600">{analytics.pendingApplications}</p>
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
                <p className="text-2xl font-bold text-purple-600">{analytics.approvalRate}%</p>
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
                <p className="text-2xl font-bold text-red-600">{analytics.defaultRate}%</p>
                <p className="text-sm text-red-600">-0.5% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Performance */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
            <div className="space-y-4">
              {analytics.monthlyData.map((month: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(month.revenue / 120000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">${month.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Status Distribution</h3>
            <div className="space-y-4">
              {analytics.statusDistribution.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">{item.status}</span>
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full h-2 w-32 mr-3">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === 'active' ? 'bg-green-600' :
                          item.status === 'pending' ? 'bg-yellow-600' :
                          item.status === 'paid' ? 'bg-blue-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${(item.count / 2000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Amount Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Amount Distribution</h3>
            <div className="space-y-4">
              {analytics.loanAmountDistribution.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.range}</span>
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full h-2 w-32 mr-3">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${(item.count / 1000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">$1,247</p>
                <p className="text-sm text-gray-600">Average Loan</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">14 days</p>
                <p className="text-sm text-gray-600">Avg. Processing Time</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-600">On-time Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
}
'use client'
import React, { useState } from 'react';
import { Settings, Save, Bell, Shield, CreditCard, Mail, Globe, Lock } from "lucide-react";
import AdminNav from '../components/AdminNav';
import { notifications } from '@/app/lib/notifications';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Swift Loans',
    siteDescription: 'Fast and reliable loan services',
    email: 'admin@swiftloans.com',
    phone: '+1 (555) 123-4567',
    address: '123 Finance St, New York, NY 10001',
    maxLoanAmount: 5000,
    minLoanAmount: 100,
    interestRate: 15,
    processingFee: 25,
    latePaymentFee: 35,
    enableEmailNotifications: true,
    enableSMSNotifications: true,
    enableAutoApproval: false,
    requireEmploymentVerification: true,
    requireBankVerification: true,
    maintenanceMode: false,
    termsUrl: '/terms',
    privacyUrl: '/privacy',
    supportEmail: 'support@swiftloans.com'
  });

  const handleSave = () => {
    // Save settings logic here
    notifications.success('Settings saved successfully!');
  };

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminNav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your application settings, notifications, and business rules.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                General Settings
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  autoComplete="on"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  autoComplete="on"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  autoComplete="on"
                />
              </div>
            </div>
          </div>

          {/* Loan Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Loan Settings
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Loan Amount ($)</label>
                  <input
                    type="number"
                    value={settings.maxLoanAmount}
                    onChange={(e) => handleChange('maxLoanAmount', parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    autoComplete="on"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Loan Amount ($)</label>
                  <input
                    type="number"
                    value={settings.minLoanAmount}
                    onChange={(e) => handleChange('minLoanAmount', parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    autoComplete="on"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.interestRate}
                    onChange={(e) => handleChange('interestRate', parseFloat(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    autoComplete="on"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Processing Fee ($)</label>
                  <input
                    type="number"
                    value={settings.processingFee}
                    onChange={(e) => handleChange('processingFee', parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    autoComplete="on"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Late Payment Fee ($)</label>
                <input
                  type="number"
                  value={settings.latePaymentFee}
                  onChange={(e) => handleChange('latePaymentFee', parseInt(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  autoComplete="on"
                />
              </div>
            </div>
          </div>

          {/* Verification Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Verification Settings
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="employmentVerification"
                  checked={settings.requireEmploymentVerification}
                  onChange={(e) => handleChange('requireEmploymentVerification', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="employmentVerification" className="ml-3 block text-sm text-gray-700">
                  Require Employment Verification
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bankVerification"
                  checked={settings.requireBankVerification}
                  onChange={(e) => handleChange('requireBankVerification', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="bankVerification" className="ml-3 block text-sm text-gray-700">
                  Require Bank Account Verification
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoApproval"
                  checked={settings.enableAutoApproval}
                  onChange={(e) => handleChange('enableAutoApproval', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoApproval" className="ml-3 block text-sm text-gray-700">
                  Enable Automatic Approval for Qualified Applicants
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.enableEmailNotifications}
                  onChange={(e) => handleChange('enableEmailNotifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-3 block text-sm text-gray-700">
                  Enable Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  checked={settings.enableSMSNotifications}
                  onChange={(e) => handleChange('enableSMSNotifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="smsNotifications" className="ml-3 block text-sm text-gray-700">
                  Enable SMS Notifications
                </label>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                System Settings
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-3 block text-sm text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Terms URL</label>
                <input
                  type="text"
                  value={settings.termsUrl}
                  onChange={(e) => handleChange('termsUrl', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  autoComplete="on"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Privacy URL</label>
                <input
                  type="text"
                  value={settings.privacyUrl}
                  onChange={(e) => handleChange('privacyUrl', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white shadow rounded-lg p-6">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminNav>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ApplicationForm from './ApplicationForm';
import formatDateString from '../shared/date';
import { useFetchApplications } from './useFetchApplications';
import { LoanApplication } from './types';
import { getStatusColor, getStatusIcon } from '../shared/status';
import { useDeleteApplication } from './[id]/useDeleteApplication';
import { useSaveApplication } from './useSaveApplication';
import { notifications } from '../shared/notifications';
import { HttpError } from '../shared/http-errors';

export default function LoanApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [editingApplication, setEditingApplication] = useState<LoanApplication | null>(null);
  const { data: applications, isFetching: loading, error: fetchError, refetch: fetchApplications } = useFetchApplications();
  const { mutateAsync: saveApplication, isPending: saving, error: saveError } = useSaveApplication();
  const { mutateAsync: deleteApplication, isPending: deleting, error: deleteError } = useDeleteApplication();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/auth/signin`);
    }
  }, [session, status, router]);

  const handleDelete = async (key: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    await deleteApplication(key);
  };

  const handleFormSubmit = async (data: any) => {
    setErrors([]);
    try {
      await saveApplication({ data, id: editingApplication?.id });
      setShowForm(false);
      setEditingApplication(null);
      notifications.success('Application saved successfully!');
    } catch (e: unknown) {
      const { errors, statusMessage } = (e as HttpError);
      setErrors(errors);
      notifications.error(`An error occurred: ${statusMessage}`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading applications...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Loan Applications</h1>
              </div>
              <button
                onClick={() => {
                  setEditingApplication(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                New Application
              </button>
            </div>
          </div>

          <div className="p-6">
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">No loan applications found</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${application.amount_requested?.toLocaleString() || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.term_in_days || 'N/A'} days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                          {application.purpose || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)} {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDateString(application.submitted_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => router.push(`/applications/${application.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                setEditingApplication(application);
                                setShowForm(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(application.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <ApplicationForm
                data={editingApplication}
                onSubmit={handleFormSubmit}
                saving={saving}
                errors={errors}
                onCancel={() => {
                  setShowForm(false);
                  setEditingApplication(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
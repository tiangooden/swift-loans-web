'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useAddReference } from './useAddReference';
import { useDeleteReference } from './useDeleteReference';
import { useFetchReferences } from './useFetchReferences';
import { useUpdateReference } from './useUpdateReference';

interface Reference {
  id: string;
  name: string;
  email?: string;
  phone: string;
  relationship: string;
}

const ReferencesContent: React.FC = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReference, setCurrentReference] = useState<Reference | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
  });
  const { data: references, isFetching, error: fetchError } = useFetchReferences();
  const { mutateAsync: addReference, isPending: isAdding, error: addError } = useAddReference();
  const { mutateAsync: updateReference, isPending: isUpdating, error: updateError } = useUpdateReference();
  const { mutateAsync: deleteReference, isPending: isDeleting, error: deleteError } = useDeleteReference();

  useEffect(() => {
    if (currentReference) {
      setForm({
        name: currentReference.name,
        email: currentReference.email || '',
        phone: currentReference.phone,
        relationship: currentReference.relationship
      });
    } else {
      setForm({ name: '', email: '', phone: '', relationship: '' });
    }
  }, [currentReference]);

  const filteredReferences = (references || []).filter(
    (ref) =>
      ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ref.email && ref.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ref.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.relationship.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEdit = async () => {
    if (!session) return;
    try {
      if (currentReference) {
        await updateReference({ id: currentReference.id, ...form });
      } else {
        await addReference(form);
      }
      setIsModalOpen(false);
      setCurrentReference(null);
    } catch (err) {
      console.error('Failed to save reference:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!session) return;
    try {
      await deleteReference(id);
    } catch (err) {
      console.error('Failed to delete reference:', err);
    }
  };

  const openAddModal = () => {
    setCurrentReference(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ref: Reference) => {
    setCurrentReference(ref);
    setIsModalOpen(true);
  };

  if (isFetching || isAdding || isUpdating || isDeleting) return <div className="text-center py-8">Loading...</div>;
  if (fetchError) return <div className="text-center py-8 text-red-500">Error: {fetchError.message}</div>;
  if (addError) return <div className="text-center py-8 text-red-500">Error adding reference: {addError.message}</div>;
  if (updateError) return <div className="text-center py-8 text-red-500">Error updating reference: {updateError.message}</div>;
  if (deleteError) return <div className="text-center py-8 text-red-500">Error deleting reference: {deleteError.message}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your References</h2>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" /> Add New Reference
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search references..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Relationship
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReferences.map((ref) => (
              <tr key={ref.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ref.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ref.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ref.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ref.relationship}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(ref)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ref.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {currentReference ? 'Edit Reference' : 'Add New Reference'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <XCircle className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEdit();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
                <input
                  type="text"
                  id="relationship"
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {currentReference ? 'Save Changes' : 'Add Reference'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencesContent;
'use client';

import React, { useState, useEffect } from 'react';
import { Edit, Trash2, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useAddReference } from './useAddReference';
import { useDeleteReference } from './useDeleteReference';
import { useFetchReferences } from './useFetchReferences';
import { useUpdateReference } from './useUpdateReference';
import FormButton from '../shared/component/FormButton';
import FormInput from '../shared/component/FormInput';
import { notifications } from '../shared/notifications';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

const ReferencesForm: React.FC = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReference, setCurrentReference] = useState<Reference | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
  });
  const { data: references, isFetching } = useFetchReferences();
  const { mutateAsync: addReference, isPending: isAdding } = useAddReference();
  const { mutateAsync: updateReference, isPending: isUpdating } = useUpdateReference();
  const { mutateAsync: deleteReference, isPending: isDeleting } = useDeleteReference();

  useEffect(() => {
    if (currentReference) {
      setForm({
        name: currentReference.name,
        email: currentReference.email,
        phone: currentReference.phone,
        relationship: currentReference.relationship
      });
    } else {
      setForm({ name: '', email: '', phone: '', relationship: '' });
    }
  }, [currentReference]);

  const handleAddEdit = async () => {
    if (!session) return;
    try {
      currentReference ? await updateReference({ id: currentReference.id, ...form }) : await addReference(form);
      notifications.success('Reference added successfully!');
      setIsModalOpen(false);
      setCurrentReference(null);
    } catch (err) {
      notifications.error(`Failed to ${currentReference ? 'update' : 'save'} reference: ${err}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!session) return;
    try {
      await deleteReference(id);
      notifications.success('Reference deleted successfully!');
    } catch (err) {
      notifications.error(`Failed to delete reference:${err}`);
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

  return (
    <LoadingOverlayWrapper active={isFetching} spinner text='Loading your references...'>
      <LoadingOverlayWrapper active={isAdding} spinner text='Adding your references...'>
        <LoadingOverlayWrapper active={isUpdating} spinner text='Updating your references...'>
          <LoadingOverlayWrapper active={isDeleting} spinner text='Deleting your references...'>
            <div className="min-h-screen bg-gray-50 py-8">
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">References</h2>
                  <FormButton
                    onClick={openAddModal}
                  >
                    Add Reference
                  </FormButton>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
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
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {references.map((ref) => (
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
                        <FormInput
                          label="Name"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                        <FormInput
                          label="Email"
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <FormInput
                          label="Phone"
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                        />
                        <FormInput
                          label="Relationship"
                          id="relationship"
                          name="relationship"
                          value={form.relationship}
                          onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                          required
                        />
                        <div className="flex justify-end space-x-2">
                          <FormButton
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            color="red"
                          >
                            Cancel
                          </FormButton>
                          <FormButton
                            type="submit"
                            disabled={isAdding || isUpdating}
                          >
                            {isAdding || isUpdating ? 'Saving...' : 'Save'}
                          </FormButton>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </LoadingOverlayWrapper>
        </LoadingOverlayWrapper>
      </LoadingOverlayWrapper>
    </LoadingOverlayWrapper>
  );
};

export default ReferencesForm;
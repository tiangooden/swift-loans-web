'use client';

import React, { useEffect } from 'react';
import { Edit, Trash2, XCircle } from 'lucide-react';
import FormButton from '../shared/component/FormButton';
import FormInput from '../shared/component/FormInput';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

interface ReferencesFormProps {
  references: Reference[];
  isFetching: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentReference: Reference | null;
  setCurrentReference: React.Dispatch<React.SetStateAction<Reference | null>>;
  form: {
    id: string;
    name: string;
    email: string;
    phone: string;
    relationship: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }>>;
  handleAddEdit: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  openAddModal: () => void;
  clearErrors: () => void;
  openEditModal: (ref: Reference) => void;
  errors: Map<string, string>;
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({
  references,
  isFetching,
  isAdding,
  isUpdating,
  isDeleting,
  isModalOpen,
  setIsModalOpen,
  currentReference,
  form,
  setForm,
  handleAddEdit,
  handleDelete,
  openAddModal,
  openEditModal,
  clearErrors,
  errors
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const typedValue = type === "number" ? Number(value) : value;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : typedValue,
    }));
  };

  // useEffect(() => {
  //   setErrors
  // }, [errors])

  return (
    <LoadingOverlayWrapper active={isFetching} spinner text='Loading your references...'>
      <LoadingOverlayWrapper active={isAdding} spinner text='Adding your reference...'>
        <LoadingOverlayWrapper active={isUpdating} spinner text='Updating your reference...'>
          <LoadingOverlayWrapper active={isDeleting} spinner text='Deleting your reference...'>
            <div className="min-h-screen bg-gray-50 py-8">
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">References</h2>
                  <FormButton onClick={openAddModal}>
                    Add Reference
                  </FormButton>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Relationship</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {references.map((ref) => (
                        <tr key={ref.id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{ref.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{ref.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{ref.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{ref.relationship}</td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <button onClick={() => openEditModal(ref)} className="text-blue-600 hover:text-blue-900 mr-4">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDelete(ref.id)} className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {currentReference ? 'Edit Reference' : 'Add New Reference'}
                        </h3>
                        <button onClick={() => {
                          setIsModalOpen(false);
                          clearErrors();
                        }}>
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
                          onChange={handleChange}
                          error={errors.get('name')}
                        />
                        <FormInput
                          label="Email"
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          error={errors.get('email')}
                        />
                        <FormInput
                          label="Phone"
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          error={errors.get('phone')}
                        />
                        <FormInput
                          label="Relationship"
                          id="relationship"
                          name="relationship"
                          value={form.relationship}
                          onChange={handleChange}
                          error={errors.get('relationship')}
                        />
                        <div className="flex justify-end space-x-2">
                          <FormButton type="button" onClick={() => {
                            setIsModalOpen(false);
                            clearErrors();
                          }} color="red">
                            Cancel
                          </FormButton>
                          <FormButton type="submit" disabled={isAdding || isUpdating}>
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

'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAddReference } from './useAddReference';
import { useDeleteReference } from './useDeleteReference';
import { useFetchReferences } from './useFetchReferences';
import { useUpdateReference } from './useUpdateReference';
import { notifications } from '../lib/notifications';
import ReferencesForm from './ReferencesForm';
import { processValidationErrors } from '../lib/processValidationErrors';
import { referencesSchema } from '../api/references/schema';
import { validateSchema } from '../lib/validation';

const ReferencesPage: React.FC = () => {
  const { data: session } = useSession();
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const clearErrors = () => {
    setErrors(new Map());
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReference, setCurrentReference] = useState<Reference | null>(null);
  const [form, setForm] = useState({
    id: '',
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
        id: currentReference.id,
        name: currentReference.name,
        email: currentReference.email,
        phone: currentReference.phone,
        relationship: currentReference.relationship
      });
    } else {
      setForm({ id: '', name: '', email: '', phone: '', relationship: '' });
    }
  }, [currentReference]);

  const handleAddEdit = async () => {
    if (!session) return;
    if (form.id) {
      try {
        validateSchema(currentReference, referencesSchema);
        try {
          await updateReference(form);
          notifications.success('Reference saved successfully!');
          setErrors(new Map());
          setIsModalOpen(false);
          setCurrentReference(null);
        } catch (e: any) {
          const { errors, statusMessage } = e;
          setErrors(processValidationErrors(errors));
          notifications.error(`An error occurred: ${statusMessage}`);
        }
      } catch (e: any) {
        const { errors: er, statusMessage } = e;
        setErrors(processValidationErrors(er));
        notifications.error(`An error occurred: ${statusMessage}`);
      }
    } else {
      try {
        validateSchema(form, referencesSchema);
        try {
          await addReference(form);
          notifications.success('Reference saved successfully!');
          setIsModalOpen(false);
          setForm({ id: '', name: '', email: '', phone: '', relationship: '' });
        } catch (e: any) {
          const { errors: er, statusMessage } = e;
          setErrors(processValidationErrors(er));
          notifications.error(`An error occurred: ${statusMessage}`);
        }
      } catch (e: any) {
        const { errors, statusMessage } = e;
        setErrors(processValidationErrors(errors));
        notifications.error(`An error occurred: ${statusMessage}`);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!session) return;
    try {
      await deleteReference(id);
      notifications.success('Reference deleted successfully!');
    } catch (err) {
      notifications.error(`Failed to delete reference: ${err}`);
    }
  };

  const openAddModal = () => {
    clearErrors();
    setCurrentReference(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ref: Reference) => {
    clearErrors();
    setCurrentReference(ref);
    setIsModalOpen(true);
  };

  return (
    <ReferencesForm
      references={references || []}
      isFetching={isFetching}
      isAdding={isAdding}
      isUpdating={isUpdating}
      isDeleting={isDeleting}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      currentReference={currentReference}
      setCurrentReference={setCurrentReference}
      form={form}
      setForm={setForm}
      handleAddEdit={handleAddEdit}
      handleDelete={handleDelete}
      openAddModal={openAddModal}
      openEditModal={openEditModal}
      errors={errors}
      clearErrors={clearErrors}
    />
  );
};

export default ReferencesPage;

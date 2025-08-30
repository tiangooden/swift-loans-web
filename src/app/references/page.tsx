'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAddReference } from './useAddReference';
import { useDeleteReference } from './useDeleteReference';
import { useFetchReferences } from './useFetchReferences';
import { useUpdateReference } from './useUpdateReference';
import { notifications } from '../shared/notifications';
import ReferencesForm from './ReferencesForm';

const ReferencesPage: React.FC = () => {
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
      if (currentReference) {
        await updateReference({ id: currentReference.id, ...form });
      } else {
        await addReference(form);
      }
      notifications.success('Reference saved successfully!');
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
      notifications.error(`Failed to delete reference: ${err}`);
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
    />
  );
};

export default ReferencesPage;

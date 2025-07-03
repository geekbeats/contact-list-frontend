import React, { useState, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { selectedContactAtom, Contact } from '../atoms';
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT, UPDATE_CONTACT } from '../graphql/mutations';
import { GET_CONTACTS } from '../graphql/queries';
import { JSX } from 'react/jsx-runtime';

export default function ContactForm(): JSX.Element {
  const [contact, setContact] = useAtom(selectedContactAtom);
  const [form, setForm] = useState<Contact>({ name: '', email: '', phone: '' });
  const clearSelection = useSetAtom(selectedContactAtom);

  useEffect(() => {
    if (contact) setForm(contact);
  }, [contact]);

  const [createContact] = useMutation(CREATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact?.id) {
      await updateContact({ variables: { id: contact.id, ...form } });
    } else {
      await createContact({ variables: form });
    }
    clearSelection(null);
    setForm({ name: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        placeholder="Phone"
        value={form.phone || ''}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <button type="submit">{contact ? 'Update' : 'Create'}</button>
      {contact && <button onClick={() => clearSelection(null)}>Cancel</button>}
    </form>
  );
}

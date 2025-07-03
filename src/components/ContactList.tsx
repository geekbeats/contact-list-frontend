import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACTS } from '../graphql/queries';
import { DELETE_CONTACT } from '../graphql/mutations';
import { useSetAtom } from 'jotai';
import { selectedContactAtom, Contact } from '../atoms';
import { JSX } from 'react/jsx-runtime';

export default function ContactList(): JSX.Element {
  const { data, loading, error } = useQuery(GET_CONTACTS);
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });
  const setSelectedContact = useSetAtom(selectedContactAtom);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching contacts.</p>;

  return (
    <ul>
      {(data?.getContacts as Contact[]).map((contact) => (
        <li key={contact.id}>
          <strong>{contact.name}</strong> ({contact.email} / {contact.phone})
          <button onClick={() => setSelectedContact(contact)}>Edit</button>
          <button onClick={() => deleteContact({ variables: { id: contact.id } })}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

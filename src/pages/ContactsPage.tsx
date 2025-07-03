import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { useSetAtom } from 'jotai';
import { tokenAtom } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

export default function ContactsPage(): JSX.Element {
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>📋 My Contacts</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <ContactForm />
        <ContactList />
      </div>
    </div>
  );
}

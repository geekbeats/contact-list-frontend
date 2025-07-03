import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isLoggedInAtom } from './atoms';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactsPage from './pages/ContactsPage';
import { JSX } from 'react/jsx-runtime';

export default function App(): JSX.Element {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/contacts"
          element={
            isLoggedIn ? <ContactsPage /> : <Navigate to="/login" replace />
          }
        />
        {/* Catch-all route to redirect based on auth status */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? '/contacts' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

export default function SignupPage(): JSX.Element {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Join Us 🎉</h2>
        <p className="subtitle">Create an account and manage contacts with ease</p>
        <SignupForm />
        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

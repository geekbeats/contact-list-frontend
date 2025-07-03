import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

export default function LoginPage(): JSX.Element {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Log in to manage your contacts securely</p>
        <LoginForm />
        <p className="auth-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

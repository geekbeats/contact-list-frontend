import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutations';
import { useSetAtom } from 'jotai';
import { tokenAtom } from '../atoms';
import { useNavigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

export default function SignupForm(): JSX.Element {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [signup] = useMutation(SIGNUP);
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await signup({ variables: form });
    if (data?.signup?.token) {
      localStorage.setItem('token', data.signup.token);
      setToken(data.signup.token);
      navigate('/contacts');
    }
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
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

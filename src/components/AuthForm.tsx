import React, { useState } from 'react';
import { setToken } from '../utils/auth';
import { login } from '../data/api';

const AuthForm: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      setToken(data.token);
      onAuth();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="card w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn-primary w-full mb-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AuthForm; 
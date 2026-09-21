import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal.');
      }

      // Save token to localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface-lowest p-8 rounded-2xl shadow-level1 border border-border-subtle">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary">Login Admin IAAJ</h1>
          <p className="text-sm text-on-surface-variant text-center mt-2">
            Silakan masuk untuk mengelola portal Ikatan Alumni Aman Jaya.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-outline mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-surface"
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-outline mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-surface"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary hover:bg-primary-container text-white text-sm font-display font-bold rounded-lg transition-colors flex items-center justify-center mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

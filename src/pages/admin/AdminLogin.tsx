import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password })
      });

      if (!response.ok) {
         throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('sdg_admin_token', data.access_token);
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 font-sans grid-bg">
      <div className="max-w-md w-full bg-zinc-950 border border-white/10 rounded-[10px] p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 rounded-t-[10px]"></div>
        
        <div className="flex justify-center mb-8">
           <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-500/20">
              <ShieldAlert className="w-8 h-8 text-blue-500" />
           </div>
        </div>

        <div className="text-center space-y-2 mb-8">
           <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">System Access</h1>
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Root authorization required</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-[10px] text-red-400 text-xs font-black uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Node Identifier</label>
              <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Security Key</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
           </div>
           <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all flex justify-center items-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authenticate'}
           </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

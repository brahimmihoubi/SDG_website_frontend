import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { Trash2, Shield, ClipboardList, UserPlus } from 'lucide-react';

interface Registration {
  id: number;
  fullName: string;
  email: string;
  role: string;
  dept: string;
  studyLevel: string;
  major: string;
  img: string;
}

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiFetch('/api/registrations');
      setRegistrations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (reg: Registration) => {
    try {
      const defaultMember = {
        name: reg.fullName,
        role: reg.role,
        dept: reg.dept,
        studyLevel: reg.studyLevel,
        major: reg.major,
        img: reg.img
      };

      await apiFetch('/api/members', {
        method: 'POST',
        body: JSON.stringify(defaultMember)
      });

      await apiFetch(`/api/registrations/${reg.id}`, { method: 'DELETE' });
      alert(`Successfully approved ${reg.fullName} as a Team Member!`);
      loadData();
    } catch (error) {
      alert('Failed to approve member');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      try {
        await apiFetch(`/api/registrations/${id}`, { method: 'DELETE' });
        loadData();
      } catch (error) {
        alert('Failed to delete registration');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white flex items-center">
            <ClipboardList className="w-8 h-8 mr-3 text-blue-500" /> Club Registrations
          </h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Review pending club member sign-ups</p>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[10px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Full Name</th>
              <th className="p-4">Edu Email</th>
              <th className="p-4">Specialization</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-500 uppercase tracking-widest text-xs font-black">
                  No registrations recorded.
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-xs font-sans text-gray-400">#{reg.id}</td>
                  <td className="p-4 text-sm font-black text-white italic tracking-tighter">{reg.fullName}</td>
                  <td className="p-4 text-xs font-sans text-blue-400">{reg.email}</td>
                  <td className="p-4">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-blue-600/10 border border-blue-600/30 text-blue-400 px-3 py-1 rounded-sm">
                      {reg.role}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleApprove(reg)} className="text-green-500 hover:text-green-400 transition-colors p-2 bg-black rounded-[10px] border border-green-500/20 hover:border-green-500/50" title="Approve & Promote to Team Member">
                      <UserPlus className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(reg.id)} className="text-red-500 hover:text-red-400 transition-colors p-2 bg-black rounded-[10px] border border-red-500/20 hover:border-red-500/50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrations;

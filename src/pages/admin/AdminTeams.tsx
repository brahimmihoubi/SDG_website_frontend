import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { Plus, Edit2, Trash2, Shield, Calendar, Image as ImageIcon } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  icon: string;
}

const AdminTeams = () => {
  const [teams, setTeams] = useState<any[]>([]);

  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiFetch('/api/teams');
      setTeams(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: '' });

  const handleAdd = () => {
    setEditingTeam(null);
    setFormData({ name: '', icon: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData({ name: team.name, icon: team.icon });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure?')) {
      try {
        await apiFetch(`/api/teams/${id}`, { method: 'DELETE' });
        loadData();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (true) {
         // Figure out exact edit var
         const id = editingTeam?.id;
         if (id) {
            await apiFetch(`/api/teams/${id}`, { method: 'PUT', body: JSON.stringify(formData) });
         } else {
            await apiFetch(`/api/teams`, { method: 'POST', body: JSON.stringify(formData) });
         }
      }
      loadData();
      setIsModalOpen(false);
    } catch (error: any) {
      alert('Failed to save: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Teams</h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Manage organizational structure</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Team
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[10px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Icon Name</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {teams.map((team) => (
              <tr key={team.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-xs font-sans text-gray-400">#{team.id}</td>
                <td className="p-4 text-sm font-black text-white italic tracking-tighter">{team.name}</td>
                <td className="p-4 text-xs font-sans text-blue-400">{team.icon}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(team)} className="text-gray-400 hover:text-white transition-colors p-2 bg-black rounded-[10px] border border-white/10 hover:border-white/30">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(team.id)} className="text-red-500 hover:text-red-400 transition-colors p-2 bg-black rounded-[10px] border border-red-500/20 hover:border-red-500/50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-[10px] p-8 w-full max-w-md relative shadow-2xl">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
              {editingTeam ? 'Edit Team' : 'Add New Team'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Team Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" placeholder="e.g. DEVELOPMENT" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Select Icon</label>
                <select required value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400">
                  <option value="">Select an Icon</option>
                  <option value="Terminal">Terminal (Dev)</option>
                  <option value="PenTool">PenTool (Design)</option>
                  <option value="Camera">Camera (Media)</option>
                  <option value="Calendar">Calendar (Org)</option>
                  <option value="ClipboardList">ClipboardList (Admin)</option>
                  <option value="Users">Users</option>
                  <option value="Shield">Shield</option>
                  <option value="Code">Code</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-black text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeams;

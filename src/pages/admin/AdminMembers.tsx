import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  role: string;
  dept: string;
  studyLevel: string;
  major: string;
  img: string;
}

const AdminMembers = () => {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiFetch('/api/members');
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({ name: '', role: 'MEMBER', dept: 'DEVELOPMENT', studyLevel: '', major: '', img: '' });

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({ name: '', role: 'MEMBER', dept: 'DEVELOPMENT', studyLevel: '', major: '', img: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData(member);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure?')) {
      try {
        await apiFetch(`/api/members/${id}`, { method: 'DELETE' });
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
         const id = editingMember?.id;
         if (id) {
            await apiFetch(`/api/members/${id}`, { method: 'PUT', body: JSON.stringify(formData) });
         } else {
            await apiFetch(`/api/members`, { method: 'POST', body: JSON.stringify(formData) });
         }
      }
      loadData();
      setIsModalOpen(false);
    } catch (error) {
      alert('Failed to save');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Team Members</h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Manage personnel and roles</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[10px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="p-4">Profile</th>
              <th className="p-4">Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <img src={member.img} alt={member.name} className="w-10 h-10 rounded-[10px] object-cover grayscale hover:grayscale-0 transition-all border border-white/10" />
                </td>
                <td className="p-4 text-sm font-black text-white italic tracking-tighter">{member.name}</td>
                <td className="p-4 text-xs font-sans text-blue-400">{member.dept}</td>
                <td className="p-4 text-xs font-sans text-gray-400">{member.role}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(member)} className="text-gray-400 hover:text-white transition-colors p-2 bg-black rounded-[10px] border border-white/10 hover:border-white/30"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-400 transition-colors p-2 bg-black rounded-[10px] border border-red-500/20 hover:border-red-500/50"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-[10px] p-8 w-full max-w-2xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Department</label>
                  <select required value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400">
                    <option value="ADMINISTRATION">ADMINISTRATION</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="DESIGN">DESIGN</option>
                    <option value="MEDIA">MEDIA</option>
                    <option value="ORGANIZATION">ORGANIZATION</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Role</label>
                  <select required value={formData.role || 'MEMBER'} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400">
                    <option value="MEMBER">MEMBER</option>
                    <option value="TEAM LEADER">TEAM LEADER</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Study Level</label>
                  <input required type="text" value={formData.studyLevel} onChange={e => setFormData({...formData, studyLevel: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Major</label>
                  <input required type="text" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload Image</label>
                  <input required={!editingMember} type="file" accept="image/*" onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({...formData, img: reader.result as string});
                      };
                      reader.readAsDataURL(file);
                    }
                  }} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                  {formData.img && (
                    <img src={formData.img} alt="Preview" className="w-16 h-16 object-cover rounded-[10px] mt-2 border border-white/10" />
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-black text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;

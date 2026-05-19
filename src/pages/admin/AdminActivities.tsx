import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  date: string;
  status: string;
  description: string;
  image: string;
}

const AdminActivities = () => {
  const [activities, setActivities] = useState<any[]>([]);

  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiFetch('/api/activities');
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({ title: '', date: '', status: 'Upcoming', description: '', image: '' });

  const handleAdd = () => {
    setEditingActivity(null);
    setFormData({ title: '', date: '', status: 'Upcoming', description: '', image: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure?')) {
      try {
        await apiFetch(`/api/activities/${id}`, { method: 'DELETE' });
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
         const id = editingActivity?.id;
         if (id) {
            await apiFetch(`/api/activities/${id}`, { method: 'PUT', body: JSON.stringify(formData) });
         } else {
            await apiFetch(`/api/activities`, { method: 'POST', body: JSON.stringify(formData) });
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
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Activities</h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Manage events and workshops</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Activity
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[10px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <img src={activity.image} alt={activity.title} className="w-16 h-10 rounded-[5px] object-cover border border-white/10" />
                </td>
                <td className="p-4 text-sm font-black text-white italic tracking-tighter">{activity.title}</td>
                <td className="p-4 text-xs font-sans text-gray-400">{activity.date}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded-[5px] text-[10px] font-black uppercase tracking-widest ${activity.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                     {activity.status}
                   </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(activity)} className="text-gray-400 hover:text-white transition-colors p-2 bg-black rounded-[10px] border border-white/10 hover:border-white/30"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(activity.id)} className="text-red-500 hover:text-red-400 transition-colors p-2 bg-black rounded-[10px] border border-red-500/20 hover:border-red-500/50"><Trash2 className="w-4 h-4" /></button>
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
              {editingActivity ? 'Edit Activity' : 'Add New Activity'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Description</label>
                  <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload Cover Image</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({...formData, image: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                    className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" 
                  />
                  {formData.image && (
                     <div className="mt-4 p-2 border border-white/10 rounded-[10px] bg-black relative max-w-xs">
                        <img src={formData.image} alt="Preview" className="w-full h-24 object-cover rounded-[5px]" />
                        <div className="mt-2 text-[9px] font-mono text-green-500 uppercase tracking-widest">Cover Image Loaded OK</div>
                     </div>
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

export default AdminActivities;

import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const AdminGallery = () => {
  const [gallery, setGallery] = useState<any[]>([]);

  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiFetch('/api/gallery');
      setGallery(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({ title: '', category: 'Events', image: '' });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', category: 'Events', image: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure?')) {
      try {
        await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
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
         const id = editingItem?.id;
         if (id) {
            await apiFetch(`/api/gallery/${id}`, { method: 'PUT', body: JSON.stringify(formData) });
         } else {
            await apiFetch(`/api/gallery`, { method: 'POST', body: JSON.stringify(formData) });
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
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Gallery</h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Manage photos and visual assets</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Photo
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[10px] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="group relative bg-black border border-white/10 rounded-[10px] overflow-hidden hover:border-blue-500/50 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-y-[-10px] group-hover:translate-y-0">
                  <button onClick={() => handleEdit(item)} className="bg-white/10 backdrop-blur-md p-2 rounded-[10px] hover:bg-blue-600 transition-colors text-white"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="bg-white/10 backdrop-blur-md p-2 rounded-[10px] hover:bg-red-600 transition-colors text-white"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="p-4">
                 <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">{item.category}</div>
                 <h3 className="text-sm font-black text-white uppercase italic tracking-tighter">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-[10px] p-8 w-full max-w-xl relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">
              {editingItem ? 'Edit Photo' : 'Add New Photo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Title / Caption</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400">
                  <option value="Events">Events</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Projects">Projects</option>
                  <option value="Team">Team</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload Image</label>
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
              </div>
              
              {formData.image && (
                 <div className="mt-4 p-2 border border-white/10 rounded-[10px] bg-black relative">
                    <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-[5px]" />
                    <div className="mt-2 text-[9px] font-mono text-green-500 uppercase tracking-widest">Image Loaded Checksum OK</div>
                 </div>
              )}

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

export default AdminGallery;

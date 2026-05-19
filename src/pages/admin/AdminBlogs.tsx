import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiFetch('/api/blogs');
      setBlogs(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: '', author: '', date: '', excerpt: '', content: '', image: '' });

  const handleAdd = () => {
    setEditingBlog(null);
    setFormData({ title: '', author: '', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', image: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure?')) {
      try {
        await apiFetch(`/api/blogs/${id}`, { method: 'DELETE' });
        loadData();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = editingBlog?.id;
      if (id) {
        await apiFetch(`/api/blogs/${id}`, { method: 'PUT', body: JSON.stringify(formData) });
      } else {
        await apiFetch(`/api/blogs`, { method: 'POST', body: JSON.stringify(formData) });
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
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Blog / News</h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Manage articles and announcements</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[10px] font-black text-xs uppercase tracking-widest transition-all flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Write Post
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[10px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <tr>
              <th className="p-4">Cover</th>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <img src={blog.image} alt={blog.title} className="w-16 h-10 rounded-[5px] object-cover border border-white/10" />
                </td>
                <td className="p-4 text-sm font-black text-white italic tracking-tighter">{blog.title}</td>
                <td className="p-4 text-xs font-sans text-blue-400">{blog.author}</td>
                <td className="p-4 text-xs font-sans text-gray-400">{blog.date}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(blog)} className="text-gray-400 hover:text-white transition-colors p-2 bg-black rounded-[10px] border border-white/10 hover:border-white/30"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-400 transition-colors p-2 bg-black rounded-[10px] border border-red-500/20 hover:border-red-500/50"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-[10px] p-8 w-full max-w-xl relative shadow-2xl overflow-y-auto max-h-[85vh] scrollbar-none">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-white text-left">
              {editingBlog ? 'Edit Post' : 'Write New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Post Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Author</label>
                  <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" />
                </div>
              </div>

              <div className="space-y-2">
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
                   <div className="mt-4 p-2 border border-white/10 rounded-[10px] bg-black relative max-w-full flex items-center space-x-4">
                      <img src={formData.image} alt="Preview" className="w-20 h-16 object-cover rounded-[5px] border border-white/5" />
                      <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">Cover loaded ok</span>
                   </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Short Excerpt</label>
                <textarea required rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-sans text-sm text-blue-400" placeholder="Brief summary for the blog card..." />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Content (Markdown/HTML)</label>
                <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded-[10px] focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-sm text-blue-400" placeholder="Write article content here..." />
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

export default AdminBlogs;

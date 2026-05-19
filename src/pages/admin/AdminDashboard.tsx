import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    blogs: 0,
    activities: 0,
    registrations: 0,
    teams: 0,
    gallery: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [members, blogs, activities, registrations, teams, gallery] = await Promise.all([
          apiFetch('/api/members'),
          apiFetch('/api/blogs'),
          apiFetch('/api/activities'),
          apiFetch('/api/registrations'),
          apiFetch('/api/teams'),
          apiFetch('/api/gallery')
        ]);
        setStats({
          members: members.length,
          blogs: blogs.length,
          activities: activities.length,
          registrations: registrations.length,
          teams: teams.length,
          gallery: gallery.length
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  const cardList = [
    { title: 'Total Team Members', value: stats.members, color: 'text-blue-500' },
    { title: 'Published Blogs / News', value: stats.blogs, color: 'text-white' },
    { title: 'Upcoming Activities', value: stats.activities, color: 'text-gray-400' },
    { title: 'Club Registrations', value: stats.registrations, color: 'text-blue-400' },
    { title: 'Teams & Departments', value: stats.teams, color: 'text-white' },
    { title: 'Gallery Assets', value: stats.gallery, color: 'text-gray-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">System Dashboard</h1>
          <p className="text-gray-500 font-sans text-xs uppercase tracking-widest mt-1">Overview of SDG website modules</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {cardList.map((stat, i) => (
           <div key={i} className="bg-zinc-900/50 border border-white/10 p-6 rounded-[10px] hover:border-blue-500/50 transition-all duration-300">
             <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.title}</div>
             <div className={`text-4xl font-sans font-black mt-4 ${stat.color}`}>{stat.value}</div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

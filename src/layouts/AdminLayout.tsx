import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Image as ImageIcon, FileText, Activity, Home as HomeIcon, LogOut, ClipboardList } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('sdg_admin_token')) {
      navigate('/admin/login');
    }
  }, [navigate, location.pathname]);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Registrations', path: '/admin/registrations', icon: ClipboardList },
    { name: 'Teams', path: '/admin/teams', icon: Users },
    { name: 'Team Members', path: '/admin/members', icon: Users },
    { name: 'Activities', path: '/admin/activities', icon: Activity },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Blog / News', path: '/admin/blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-black flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center space-x-3 group">
             <div className="bg-black p-1 border border-white/10 rounded-[10px] group-hover:border-blue-500 transition-all">
                <div className="w-8 h-8 bg-blue-600 rounded-[8px] flex items-center justify-center font-black text-xs text-white">SDG</div>
             </div>
             <div className="flex flex-col">
               <span className="font-black text-sm tracking-widest text-white leading-none">ADMIN</span>
               <span className="text-[9px] font-sans text-blue-500 uppercase">Control Panel</span>
             </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-[10px] transition-all text-xs font-black uppercase tracking-widest ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-[10px] transition-all text-xs font-black uppercase tracking-widest w-full">
            <LogOut className="w-4 h-4" />
            <span>Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

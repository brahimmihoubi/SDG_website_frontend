import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTeams from './pages/admin/AdminTeams';
import AdminMembers from './pages/admin/AdminMembers';
import AdminActivities from './pages/admin/AdminActivities';
import AdminGallery from './pages/admin/AdminGallery';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import ClientChatbot from './components/ClientChatbot';
import AdminChatbot from './components/AdminChatbot';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isLogin = location.pathname === '/admin/login';

  return (
    <>
      {isAdmin ? (
        isLogin ? (
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        ) : (
          <>
            <AdminLayout>
              <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/registrations" element={<AdminRegistrations />} />
                <Route path="/admin/teams" element={<AdminTeams />} />
                <Route path="/admin/members" element={<AdminMembers />} />
                <Route path="/admin/activities" element={<AdminActivities />} />
                <Route path="/admin/gallery" element={<AdminGallery />} />
                <Route path="/admin/blogs" element={<AdminBlogs />} />
              </Routes>
            </AdminLayout>
            <AdminChatbot />
          </>
        )
      ) : (
        <>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </Layout>
          <ClientChatbot />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

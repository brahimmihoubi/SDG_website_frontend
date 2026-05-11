import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoSDG from '../../assets/logo_SDG.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentDept = new URLSearchParams(location.search).get('dept');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team', hasDropdown: true },
    { name: 'Activities', path: '/activities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const departments = [
    'ADMINISTRATION',
    'DEVELOPMENT',
    'DESIGN',
    'MEDIA',
    'ORGANIZATION'
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-black md:bg-black/80 backdrop-blur-xl border-white/10 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-black p-1 rounded-lg border border-white/10 ring-1 ring-white/10 overflow-hidden">
                <img src={logoSDG} alt="SDG Logo" className="w-8 h-8 object-cover rounded-md" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-[0.2em] text-white leading-none">
                SDG Club
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase mt-0.5">UFAS 1</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-md flex items-center relative ${
                    location.pathname === link.path 
                      ? 'text-blue-500' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  )}
                </Link>
                {link.hasDropdown && (
                  <div className="absolute top-full left-4 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 shadow-2xl z-50">
                    <div className="py-2 flex flex-col">
                      {departments.map((dept) => (
                        <Link
                          key={dept}
                          to={`/team?dept=${dept}`}
                          className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-l-2 ${
                            currentDept === dept
                              ? 'text-white bg-blue-600/20 border-blue-500 pl-6'
                              : 'text-gray-400 border-transparent hover:text-white hover:bg-blue-600/20 hover:pl-6 hover:border-blue-500'
                          }`}
                        >
                          {dept}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="ml-6 pl-6 border-l border-white/10">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center"
              >
                JOIN_CORE <Terminal className="w-3 h-3 ml-2" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-black/95 backdrop-blur-2xl border-l border-white/10 z-[60] p-8 md:hidden overflow-y-auto"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-2xl font-black uppercase tracking-tight ${
                        location.pathname === link.path 
                          ? 'text-blue-500' 
                          : 'text-white hover:text-blue-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                  {link.hasDropdown && (
                    <div className="pl-6 mt-4 flex flex-col space-y-4 border-l-2 border-white/10 ml-2 py-2">
                      {departments.map((dept) => (
                        <Link
                          key={dept}
                          to={`/team?dept=${dept}`}
                          onClick={() => setIsOpen(false)}
                          className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                            currentDept === dept
                              ? 'text-blue-500'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {dept}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-10">
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white py-5 rounded-lg font-black uppercase tracking-widest shadow-xl"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

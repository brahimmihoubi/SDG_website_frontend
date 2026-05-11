import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Linkedin, Mail, Globe, ArrowUpRight } from 'lucide-react';
import logoSDG from '../../assets/logo_SDG.jpeg';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-32 pb-12 overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-32">
          {/* Brand */}
          <div className="space-y-10 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 group">
               <div className="bg-black p-1 border border-white/10 rounded-sm group-hover:border-blue-500 transition-all overflow-hidden">
                  <img src={logoSDG} alt="SDG Logo" className="w-8 h-8 object-cover rounded-sm" />
               </div>
               <div className="flex flex-col">
                  <span className="font-black text-2xl tracking-[0.2em] text-white leading-none">SDG Club</span>
               </div>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed uppercase tracking-widest text-[11px] max-w-xs">
              A high-precision technological collective architecting the future of software and systems engineering.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-sm hover:bg-blue-600 hover:border-blue-600 transition-all group">
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-8">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-200 flex items-center">
                <Globe className="w-3 h-3 mr-2 text-blue-500" /> DIRECTORIES.sh
             </h3>
             <ul className="space-y-4">
                {[
                  { name: 'Core_Origins', path: '/about' },
                  { name: 'Node_Team', path: '/team' },
                  { name: 'Operations', path: '/activities' },
                  { name: 'Visual_Logs', path: '/gallery' },
                  { name: 'Tech_Debrief', path: '/news' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-gray-500 font-black uppercase text-[11px] tracking-widest hover:text-blue-500 transition-all flex items-center group">
                       <span className="opacity-0 group-hover:opacity-100 transition-all mr-2 text-blue-500">&gt;</span>
                       {link.name}
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          {/* Research */}
          <div className="space-y-8">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-200 flex items-center">
                <Terminal className="w-3 h-3 mr-2 text-blue-500" /> RESEARCH_LIBS
             </h3>
             <ul className="space-y-4 text-xs font-mono font-black">
                {['DISTRIBUTED_SYSTEMS', 'CYBERSEC_PROTOCOLS', 'QUANTUM_INFRA', 'AI_ETHICS_CORE'].map(item => (
                  <li key={item} className="text-gray-600 hover:text-white transition-colors cursor-pointer flex items-center group">
                    {item} <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                  </li>
                ))}
             </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-200">BROADCAST_SUBSCRIPTION</h3>
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                GET WEEKLY SYSTEM UPDATES AND OPPORTUNITIES FROM THE CORE TEAM.
             </p>
             <div className="flex flex-col space-y-4">
                <input 
                  type="email" 
                  placeholder="RELAY_ADDRESS@MAIL.COM" 
                  className="w-full bg-zinc-900 border border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-[10px] text-blue-400"
                />
                <button className="w-full bg-blue-600 text-white font-black py-4 rounded-sm text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                   ESTABLISH_RECEPTION
                </button>
             </div>
          </div>
        </div>

        {/* Binary Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-[9px] font-mono text-gray-700 tracking-[0.3em] font-black uppercase">
              © 2026 SETIF DEVELOPERS GROUP // ALL RIGHTS RESERVED_
           </div>
           <div className="flex items-center space-x-8 text-[9px] font-black text-gray-700 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-500 transition-colors">Security_Protocol</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy_Layer</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Systems_Status</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

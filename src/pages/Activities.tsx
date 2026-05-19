import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import { motion } from 'motion/react';
import { Terminal, Calendar, MapPin, ArrowRight, Code, ShieldCheck, Database, Zap } from 'lucide-react';

const Activities = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    apiFetch('/api/activities').then(setEvents).catch(console.error);
  }, []);

  const categories = [
    { name: 'Weekly Workshops', icon: Code, count: 24 },
    { name: 'Research Deep-Dives', icon: Database, count: 12 },
    { name: 'Industry Symposia', icon: Zap, count: 4 },
    { name: 'Global Hackathons', icon: Terminal, count: 6 }
  ];

  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Header */}
      <section className="bg-zinc-900/40 py-32 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-6">
             <div className="text-blue-500 font-mono text-sm tracking-widest"><span className="animate-pulse">_</span> FETCH_OPERATIONS_SUCCESS</div>
             <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase leading-none tracking-tighter">OPERATIONS <br/> & <span className="text-blue-500">EVENTS.</span></h1>
             <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed uppercase tracking-widest">
               High-density technical gatherings designed to push the boundaries of collective intelligence.
             </p>
          </div>
        </div>
      </section>

      {/* Grid Summary */}
      <section className="py-24 border-b border-white/5 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {categories.map((cat, i) => (
              <div key={i} className="bg-black p-12 text-center space-y-6 hover:bg-zinc-900/50 transition-all group">
                <div className="flex justify-center">
                  <div className="border border-white/10 p-4 rounded-sm group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all">
                    <cat.icon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{cat.count} Operations Logged</div>
                   <h3 className="text-xl font-black text-white uppercase italic">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large List */}
      <section className="py-32 grid-bg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
             <div className="space-y-4">
                <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">UPCOMING_SCRIPTS</h2>
                <div className="w-32 h-1 bg-blue-600"></div>
             </div>
             <button className="px-8 py-4 border border-white/10 rounded-sm font-black text-[10px] uppercase tracking-widest text-gray-500 hover:text-white hover:border-white transition-all">Download_Agenda.pdf</button>
          </div>

          <div className="space-y-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 p-1px transition-all rounded-sm overflow-hidden"
              >
                <div className="bg-black p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 border border-white/10 rounded-sm flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-700 overflow-hidden">
                    <img src={event.image || 'https://via.placeholder.com/150'} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-6">
                       <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-sm border ${
                         event.status === 'Upcoming' ? 'bg-blue-600/10 border-blue-600/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-500'
                       }`}>
                         {event.status}
                       </span>
                       <div className="flex items-center text-xs font-mono text-gray-500"><Calendar className="w-4 h-4 mr-2" /> {event.date}</div>
                       <div className="flex items-center text-xs font-mono text-gray-500"><MapPin className="w-4 h-4 mr-2" /> Sétif 1 University</div>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-blue-500 transition-colors">{event.title}</h3>
                    <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-4xl">{event.description}</p>
                  </div>

                  <div className="flex shrink-0">
                    <button className="bg-white text-black px-12 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center group/btn">
                      INIT_RSVP <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-blue-600 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10 blur-3xl rounded-full translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl space-y-16">
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">THE POWER OF <br/> COLLABORATION.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
             {[
               { val: '12k+', lab: 'API Calls/Hour' },
               { val: '450', lab: 'Pull Requests' },
               { val: '$200k', lab: 'Project Funding' }
             ].map((stat, i) => (
               <div key={i} className="space-y-4">
                 <div className="text-6xl md:text-7xl font-mono font-black text-white">{stat.val}</div>
                 <div className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-200">{stat.lab}</div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;

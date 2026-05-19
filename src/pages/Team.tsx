import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Mail, Github, Terminal, PenTool, Camera, Calendar, ClipboardList, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { apiFetch } from '../api';
import { Link, useSearchParams } from 'react-router-dom';

const Team = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDept, setActiveDept] = useState(searchParams.get('dept') || 'ALL');
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const [departments, setDepartments] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const dept = searchParams.get('dept');
    if (dept) {
      setActiveDept(dept);
    } else {
      setActiveDept('ALL');
    }
  }, [searchParams]);

  useEffect(() => {
    apiFetch('/api/teams').then(setDepartments).catch(console.error);
    apiFetch('/api/members').then(setMembers).catch(console.error);
  }, []);

  const handleDeptChange = (dept: string) => {
    setActiveDept(dept);
    if (dept === 'ALL') {
      searchParams.delete('dept');
    } else {
      searchParams.set('dept', dept);
    }
    setSearchParams(searchParams);
  };



  return (
    <div className="pt-24 min-h-screen bg-black">

      <section className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              SDG <span className="text-blue-500">TEAM.</span>
            </h1>
            <p className="text-xl text-gray-500 font-bold uppercase tracking-widest text-center">
              MEET OUR DEPARTMENTS
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 border-b border-white/5 bg-zinc-900/20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-10">DEPARTMENTS</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleDeptChange('ALL')}
              className={`flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all border ${
                activeDept === 'ALL'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                  : 'bg-black border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              <span>ALL</span>
            </button>
            {departments.map((dept, i) => {
              const DeptIcon = (Icons as any)[dept.icon] || Icons.Users;
              return (
                <button
                  key={i}
                  onClick={() => handleDeptChange(dept.name)}
                  className={`flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all border ${
                    activeDept === dept.name
                      ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                      : 'bg-black border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white'
                  }`}
                >
                  <DeptIcon className={`w-4 h-4 ${activeDept === dept.name ? 'text-white' : 'text-blue-500'}`} />
                  <span>{dept.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {departments
                .filter(dept => activeDept === 'ALL' || activeDept === dept.name)
                .map((dept, deptIndex) => {
                  const deptMembers = members.filter(m => m.dept === dept.name);
                  const DeptIcon = (Icons as any)[dept.icon] || Icons.Users;
                  if (deptMembers.length === 0) return null;
                  return (
                    <div key={deptIndex} className="mb-24 last:mb-0">
                      <div className="flex items-center space-x-4 mb-12">
                        <div className="bg-blue-600/10 p-3 rounded-sm border border-blue-500/20">
                          <DeptIcon className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">{dept.name}</h2>
                          <p className="text-gray-500 text-sm font-mono tracking-widest uppercase mt-1">
                            {deptMembers.length} Members
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
                        {deptMembers.map((member, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-black p-10 space-y-8 hover:bg-zinc-900/30 transition-all"
                          >
                            <div 
                              onClick={() => setSelectedMember(member)}
                              className="relative aspect-square grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden rounded-sm ring-1 ring-white/10 group-hover:ring-blue-500/50 cursor-pointer"
                            >
                              <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              
                              {/* Social floating */}
                              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                 <div className="flex space-x-2">
                                    <a href="#" className="bg-white/10 backdrop-blur-md p-2 rounded-sm hover:bg-blue-600 transition-colors"><Github className="w-4 h-4 text-white" /></a>
                                    <a href="#" className="bg-white/10 backdrop-blur-md p-2 rounded-sm hover:bg-blue-600 transition-colors"><Linkedin className="w-4 h-4 text-white" /></a>
                                 </div>
                                 <a href="#" className="bg-white/10 backdrop-blur-md p-2 rounded-sm hover:bg-blue-600 transition-colors"><Mail className="w-4 h-4 text-white" /></a>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">{member.dept}</span>
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mt-1">{member.name}</h3>
                              </div>
                              <div className="font-mono text-gray-500 text-xs">
                                 <span className="text-blue-500">&gt;</span> {member.role}
                              </div>
                              <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4 italic">
                                "{member.bio}"
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Recruitment */}
      <section className="bg-black py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-12 relative z-10">
          <div className="space-y-4 text-center">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter">JOIN_THE_ARRAY()</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto uppercase tracking-widest leading-loose">
              Join Setif Developers Group to learn, build, and grow with passionate students through workshops, events, and real tech projects.
            </p>
          </div>
          <Link to="/register" className="inline-block bg-white text-black px-12 py-5 rounded-sm font-black text-lg uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
            INITIALIZE_APPLICATION
          </Link>
        </div>
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-950 border border-white/10 rounded-sm shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black border border-white/10 hover:border-white/30 text-white p-2 rounded-sm backdrop-blur-md transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full aspect-square relative">
                <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
              </div>
              
              <div className="p-8 relative -mt-24">
                <div className="mb-6">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1 rounded-sm border border-blue-500/20">
                    {selectedMember.dept}
                  </span>
                  <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mt-4 leading-none">
                    {selectedMember.name}
                  </h2>
                  <p className="font-mono text-gray-400 text-sm mt-3 flex items-center">
                    <span className="text-blue-500 mr-2">&gt;</span> {selectedMember.role}
                  </p>
                </div>
                
                <div className="space-y-5 pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-gray-300 font-medium">
                    <div className="bg-white/5 p-2 rounded-sm">
                      <span className="text-blue-500">🎓</span> 
                    </div>
                    <span className="text-sm uppercase tracking-widest font-black">{selectedMember.studyLevel} - {selectedMember.major}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed italic border-l-2 border-white/10 pl-4">
                    "{selectedMember.bio}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;

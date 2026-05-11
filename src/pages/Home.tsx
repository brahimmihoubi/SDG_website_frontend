import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code2, ShieldAlert, Cpu, Globe, ArrowRight, Database, Cloud, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -mr-96 -mt-96"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] -ml-48 -mb-48"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span>System Status: Operational</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                  code,<br/>
                  <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">create</span> & <br/>
                  connect 
                </h1>
                <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed">
                  Setif Developers Group is a student club at Farhat Abbas University Sétif 1 focused on technology, programming, and innovation through workshops, events, and collaborative projects.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-sm font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center group"
                >
                  INITIALIZE_JOIN <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/activities" 
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-sm font-black text-sm uppercase tracking-widest transition-all text-center"
                >
                  View_Operations
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="bg-gray-900/50 backdrop-blur-2xl border border-white/10 p-1 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-black/80 rounded-lg p-6 font-mono text-sm space-y-2 text-blue-400/80">
                   <div className="flex space-x-2 border-b border-white/5 pb-4 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      <span className="text-[10px] text-gray-500 ml-4 font-sans uppercase font-black tracking-widest">SDG_node_v1.0.sh</span>
                   </div>
                   <div className="flex space-x-4">
                      <span className="text-gray-600">01</span>
                      <p><span className="text-blue-500">class</span> <span className="text-white">SDG</span> {'{'}</p>
                   </div>
                   <div className="flex space-x-4">
                      <span className="text-gray-600">02</span>
                      <p className="ml-4"><span className="text-blue-500">constructor</span>() {'{'}</p>
                   </div>
                   <div className="flex space-x-4">
                      <span className="text-gray-600">03</span>
                      <p className="ml-8"><span className="text-blue-400">this</span>.<span className="text-gray-200">mission</span> = <span className="text-green-400">"Build the Future"</span>;</p>
                   </div>
                   <div className="flex space-x-4">
                      <span className="text-gray-600">04</span>
                      <p className="ml-8"><span className="text-blue-400">this</span>.<span className="text-gray-200">state</span> = <span className="text-green-400">"Operational"</span>;</p>
                   </div>
                   <div className="flex space-x-4">
                      <span className="text-gray-600">05</span>
                      <p className="ml-4">{'}'}</p>
                   </div>
                   <div className="flex space-x-4">
                      <span className="text-gray-600">06</span>
                      <p className="ml-4 tracking-[0.2em] font-black text-[11px] uppercase pt-4 animate-pulse"><span className="text-blue-600">&gt;</span> WAITING_FOR_INPUT_</p>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-blue-600 p-8 rounded-full blur-[100px] opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Bar */}
      <section className="bg-black py-16 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-widest"><Cpu className="w-5 h-5" /> <span>Hardware</span></div>
             <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-widest"><Globe className="w-5 h-5" /> <span>Network</span></div>
             <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-widest"><Code2 className="w-5 h-5" /> <span>Software</span></div>
             <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-widest"><ShieldAlert className="w-5 h-5" /> <span>Security</span></div>
             <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-widest"><Database className="w-5 h-5" /> <span>Big Data</span></div>
             <div className="flex items-center space-x-2 font-black text-xs uppercase tracking-widest"><Cloud className="w-5 h-5" /> <span>Infrastructure</span></div>
          </div>
        </div>
      </section>

      {/* Stats Monospace */}
      <section className="bg-[#050505] py-24 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Network Uptime', value: '99.9%', icon: Terminal },
              { label: 'Projects', value: '10+', icon: Code2 },
              { label: 'Active Members', value: '50+', icon: Cpu },
              { label: 'Seccessful Events', value: '15+', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <stat.icon className="w-5 h-5 text-blue-500" />
                <div className="text-6xl font-mono font-black text-white tracking-tighter">
                   {stat.value}
                </div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas - Realistic Cards */}
      <section className="py-32 grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-xl space-y-6 mb-20">
             <h2 className="text-5xl font-black uppercase italic tracking-tighter">Core Directives</h2>
             <div className="w-20 h-1 bg-blue-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 overflow-hidden rounded-sm">
             {[
               {
                 title: 'Development',
                 desc: 'High-performance engineering across distributed systems and cloud-native architectures.',
                 icon: Code2
               },
               {
                 title: 'Cyber Security',
                 desc: 'Offensive and defensive security research, penetration testing, and cryptographic audits.',
                 icon: ShieldAlert
               },
               {
                 title: 'AI & Data',
                 desc: 'Machine learning infrastructure and large-scale data processing for predictive analytics.',
                 icon: Database
               }
             ].map((item, i) => (
               <div key={i} className="bg-black p-12 space-y-8 hover:bg-zinc-900/50 transition-all group">
                 <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-sm group-hover:border-blue-500/50 transition-all">
                   <item.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase italic">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                 </div>
                 <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors flex items-center">
                    EXPLORE_REPO <ChevronRight className="ml-1 w-3 h-3" />
                 </button>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Corporate IT footer section */}
      <section className="bg-blue-600 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.8] tracking-tighter">
              DO YOU HAVE THE <br/> ENGINE TO LEAD?
            </h2>
            <p className="text-xl text-blue-100 font-medium">
              We are recruiting the next generation of engineers, hackers, and visionaries. Our system is merit-based and excellence-driven.
            </p>
            <div className="pt-6">
              <Link to="/register" className="inline-block bg-black text-white px-16 py-6 rounded-sm font-black text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                Boot_System_Join
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

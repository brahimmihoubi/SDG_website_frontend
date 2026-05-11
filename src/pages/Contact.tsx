import React from 'react';
import { Mail, Send, Terminal, Cpu, Network, Globe, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const Contact = () => {
  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Visual Header */}
      <section className="py-40 bg-zinc-900/20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl space-y-10"
          >
            <div className="text-blue-500 font-mono text-sm tracking-[0.4em] uppercase">Status: Connection_Pending</div>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">ESTABLISH <br/> <span className="text-blue-500">LINK.</span></h1>
            <p className="text-xl text-gray-500 font-medium max-w-xl leading-relaxed uppercase tracking-widest">
              High-bandwidth communication channels for research partnerships and deep-tech inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Contact Details */}
            <div className="lg:col-span-4 space-y-20">
              <div className="space-y-12">
                {[
                  { icon: Mail, title: 'Node_Inquiry', info: 'LINK@NEXUS.IT', sub: 'Protocol: PGP Preferred' },
                  { icon: Network, title: 'Mainframe_Loc', info: 'HQ: RACK-7, HUB-42', sub: 'Operating_Hours: 24/7/365' },
                  { icon: Globe, title: 'Secure_Relay', info: 'NORTH_SAT_ARRAY', sub: 'Signal_Strength: 98%' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6 group">
                    <div className="bg-zinc-900 border border-white/10 p-4 rounded-sm group-hover:bg-blue-600 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-blue-500 group-hover:text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">{item.title}</h3>
                      <p className="text-3xl font-black text-white italic uppercase tracking-tighter">{item.info}</p>
                      <p className="text-gray-500 font-medium text-xs font-mono">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-900/50 border border-white/5 p-12 rounded-sm space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Activity className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">System Support?</h3>
                <div className="grid grid-cols-1 gap-4">
                   <button className="flex items-center justify-between bg-black border border-white/10 p-6 rounded-sm hover:border-blue-500 transition-all font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-white">
                     ARCHIVE_FAQ <Terminal className="w-4 h-4 text-blue-500" />
                   </button>
                   <button className="flex items-center justify-between bg-black border border-white/10 p-6 rounded-sm hover:border-blue-500 transition-all font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-white">
                     SECURE_CHAT <Cpu className="w-4 h-4 text-blue-500" />
                   </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
               <div className="bg-zinc-900/30 p-1px border border-white/5 rounded-sm">
                 <div className="bg-black p-10 lg:p-20 space-y-12">
                   <div className="space-y-4">
                      <h2 className="text-5xl font-black italic uppercase tracking-tighter">MSG_TRANSMIT</h2>
                      <div className="w-24 h-1 bg-blue-600"></div>
                   </div>

                   <form className="space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">User_Identity</label>
                         <input type="text" placeholder="John_Doe" className="w-full bg-zinc-900 border border-white/10 rounded-sm px-8 py-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-sm text-blue-400 placeholder:opacity-30" />
                       </div>
                       <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Relay_Email</label>
                         <input type="email" placeholder="j.doe@network.com" className="w-full bg-zinc-900 border border-white/10 rounded-sm px-8 py-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-sm text-blue-400 placeholder:opacity-30" />
                       </div>
                     </div>

                     <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Buffer_Topic</label>
                       <select className="w-full bg-zinc-900 border border-white/10 rounded-sm px-8 py-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-sm text-blue-400 appearance-none uppercase tracking-widest">
                          <option>SYSTEM_GENERAL</option>
                          <option>RESEARCH_PROPOSAL</option>
                          <option>SECURITY_DISCLOSURE</option>
                          <option>ALUMNI_NET</option>
                       </select>
                     </div>

                     <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Data_Payload</label>
                       <textarea rows={6} placeholder="Write your message here..." className="w-full bg-zinc-900 border border-white/10 rounded-sm px-8 py-5 focus:ring-1 focus:ring-blue-600 focus:outline-none font-mono text-sm text-blue-400 resize-none placeholder:opacity-30"></textarea>
                     </div>

                     <button className="w-full bg-blue-600 text-white py-6 rounded-sm font-black text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center justify-center group">
                       BROADCAST_MESSAGE <Send className="ml-4 w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                     </button>
                   </form>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

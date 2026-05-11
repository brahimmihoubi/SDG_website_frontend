import React from 'react';
import { motion } from 'motion/react';
import { History, Target, ShieldCheck, Cpu, Terminal, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      {/* Visual Header */}
      <section className="py-32 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto space-y-10"
          >
            <div className="text-blue-500 font-mono text-sm tracking-[0.4em] uppercase">Status: Root_Access_Granted</div>
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">ARCHIVE <br/> & <span className="text-blue-500">ORIGIN.</span></h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-10 uppercase tracking-widest">
              Decoding the legacy of SDG through decades of technological evolution and academic rigor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Stack */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            <div className="space-y-20">
               {/* History Section */}
               <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                     <div className="bg-blue-600/10 p-3 border border-blue-500/20 rounded-sm">
                        <History className="w-6 h-6 text-blue-500" />
                     </div>
                     <h2 className="text-4xl font-black uppercase italic tracking-tighter">System_Origin</h2>
                  </div>
                  <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                     <p>
                        Established as a student initiative at Farhat Abbas University Sétif 1, SDG began as a collective of passionate developers and tech enthusiasts. We are dedicated to creating a vibrant tech community for student research and innovation.
                     </p>
                     <p>
                        By 2018, our focus shifted towards the cloud, software engineering and cybersecurity.
                     </p>
                  </div>
               </div>

               {/* Goals Section */}
               <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                     <div className="bg-blue-600/10 p-3 border border-blue-500/20 rounded-sm">
                        <Target className="w-6 h-6 text-blue-500" />
                     </div>
                     <h2 className="text-4xl font-black uppercase italic tracking-tighter">Core_Directives</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       'Automating complex academic workflows.',
                       'Democratizing access to high-performance computing.',
                       'Pioneering responsible AI development frameworks.',
                       'Securing digital infrastructure at scale.'
                     ].map((goal, i) => (
                       <div key={i} className="flex items-start space-x-4 p-6 bg-zinc-900/50 border border-white/5 rounded-sm">
                          <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                          <span className="font-bold text-gray-300 text-sm italic">{goal}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Faculty Advisor - Realistic Tech Box */}
            <div className="sticky top-32">
               <div className="bg-zinc-900 border border-white/10 p-1 rounded-sm shadow-2xl">
                 <div className="bg-black p-12 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] -mr-32 -mt-32"></div>
                    
                    <div className="space-y-4">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Advisor_Credentials</span>
                       <h3 className="text-5xl font-black uppercase italic tracking-tighter italic">Pr. LAKHFIF <br/> ABDELAZIZ</h3>
                       <div className="font-mono text-xs text-gray-500 pt-2 border-t border-white/10 mt-6 inline-block">
                          Pr. LAKHFIF ABDELAZIZ 
                       </div>
                    </div>

                    <p className="text-xl text-gray-400 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8">
                      "At SDG, we don't just study technology; we manipulate its core axioms to solve the impossible. Our students are architects, not just observers."
                    </p>

                    <div className="flex items-center space-x-6">
                       <div className="flex -space-x-4">
                          {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-black">FE</div>)}
                       </div>
                       <div className="h-px flex-1 bg-white/10"></div>
                       <Terminal className="text-blue-500 w-6 h-6" />
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values - Grid format */}
      <section className="py-32 bg-zinc-900/20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 space-y-6">
             <h2 className="text-6xl font-black uppercase italic tracking-tighter">OUR_AXIOMS</h2>
             <p className="text-gray-500 max-w-xl mx-auto font-medium uppercase tracking-widest">Immutable principles guiding every commit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
             {[
               { title: 'INTEGRITY', desc: 'Code is law. We maintain extreme transparency and ethical boundaries in all operations.', icon: ShieldCheck },
               { title: 'CURIOSITY', desc: 'Default to exploration. Every system is a puzzle waiting to be deciphered and improved.', icon: Cpu },
               { title: 'VELOCITY', desc: 'Shipping beats perfection. We iterate fast, fail safely, and scale continuously.', icon: History }
             ].map((val, i) => (
               <div key={i} className="bg-black p-16 space-y-8 hover:bg-zinc-900 transition-all text-center group">
                  <div className="flex justify-center">
                    <div className="bg-blue-600 p-4 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <val.icon className="w-8 h-8 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">{val.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {val.desc}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

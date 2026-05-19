import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Shield, ChevronDown, Terminal, Cpu } from 'lucide-react';

const faqs = [
  {
    question: "WHAT IS SETIF DEVELOPERS GROUP (SDG)?",
    answer: "SDG is an elite tech collective at Setif University designed to push the boundaries of software engineering, UI/UX design, and cyber operations. We organize high-bandwidth hackathons, code sprints, and deep-tech workshops."
  },
  {
    question: "WHO CAN ESTABLISH A LINK WITH SDG?",
    answer: "Any student actively enrolled at Setif University with a passion for technology. Whether you're a kernel developer, a frontend engineer, or a design architect, our node is open to all skill levels provided you have the drive to learn."
  },
  {
    question: "HOW DO I ENLIST IN THE RANKS?",
    answer: "Navigate to the /register endpoint. Input your academic coordinates, define your target department (DEVELOPMENT, DESIGN, MEDIA, etc.), and submit your payload. The mainframe administrators will review your request."
  },
  {
    question: "WHAT HAPPENS DURING A HACKATHON?",
    answer: "A 24-48 hour hyper-focused coding sprint where nodes (teams) collaborate to build functional prototypes solving real-world problems. Expect heavy caffeine consumption, rapid iteration, and brutalist problem-solving."
  },
  {
    question: "DO I NEED PRIOR EXPERIENCE TO JOIN?",
    answer: "Negative. While existing skills are highly valued, raw potential and dedication to the craft are our primary metrics. We provide the mentorship and architecture; you provide the processing power."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Header */}
      <section className="py-32 bg-zinc-900/20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center space-x-3 text-blue-500 font-mono text-sm tracking-[0.3em] uppercase">
              <Database className="w-5 h-5" />
              <span>System_Knowledge_Base</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              DATA <span className="text-blue-500">ARCHIVE.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed uppercase tracking-widest">
              Frequently extracted records from the central mainframe. Query the database below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-zinc-900/50 border transition-all duration-300 ${activeIndex === idx ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/5 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-6">
                    <span className="text-blue-600 font-black italic text-2xl tracking-tighter">0{idx + 1}</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white">{faq.question}</h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 border-t border-white/5 mt-4 text-gray-400 font-mono text-sm leading-relaxed">
                        <div className="flex items-start space-x-4">
                          <Terminal className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-24 bg-blue-900/10 border border-blue-500/20 p-12 text-center space-y-8 rounded-sm relative overflow-hidden">
             <Cpu className="absolute top-0 right-0 w-64 h-64 text-blue-500/5 -translate-y-1/4 translate-x-1/4" />
             <Shield className="w-12 h-12 text-blue-500 mx-auto" />
             <h2 className="text-3xl font-black italic uppercase tracking-tighter">QUERY NOT FOUND?</h2>
             <p className="text-gray-400 font-mono max-w-xl mx-auto">If the mainframe does not contain the answer to your inquiry, establish a direct link with our support node.</p>
             <a href="/contact" className="inline-block bg-blue-600 text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
               INITIALIZE CONTACT
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

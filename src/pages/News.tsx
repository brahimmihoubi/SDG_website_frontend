import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Share2, Search, Terminal, Activity } from 'lucide-react';

const News = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    apiFetch('/api/blogs').then(setPosts).catch(console.error);
  }, []);

  const categories = ['SECURITY', 'INFRA', 'AI_LAB', 'EVENTS', 'CODE_REVIEWS'];

  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Blog Header */}
      <section className="bg-zinc-900/10 py-32 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl space-y-8">
              <div className="flex items-center space-x-3 text-blue-500 font-mono text-xs tracking-widest">
                 <Terminal className="w-4 h-4" /> <span>SDG_JOURNAL_V1.log</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8]">TECH <br/> <span className="text-blue-500">DEBRIEF.</span></h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl uppercase tracking-widest">
                Technical insights, system updates, and architectural breakthroughs from the core team.
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="grep -r 'search term' ..." 
                className="w-full bg-zinc-900 border border-white/10 rounded-sm py-5 px-14 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-sm text-blue-400"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
        </div>
      </section>

      {/* Main Feed */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-16 order-2 lg:order-1">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 pb-4 border-b border-white/5 flex items-center">
                   <Activity className="w-3 h-3 mr-2 text-blue-500" /> CATEGORIES.sh
                </h3>
                <ul className="space-y-4">
                  {categories.map((cat, i) => (
                    <li key={i}>
                      <button className="text-gray-400 font-bold hover:text-blue-500 transition-colors flex items-center group text-sm uppercase tracking-widest italic">
                        <span className="text-blue-600 mr-2 opacity-0 group-hover:opacity-100 transition-all">#</span>
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-600 p-10 rounded-sm text-white space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <Terminal className="w-32 h-32" />
                </div>
                <h3 className="text-3xl font-black italic uppercase leading-none tracking-tighter">WRITE_FOR_SDG</h3>
                <p className="text-blue-100 font-medium text-sm leading-relaxed uppercase tracking-widest">
                   Have a breakthrough? <br/> Submit your kernel debrief to the board.
                </p>
                <button className="w-full bg-black text-white font-black py-5 rounded-sm text-[10px] hover:bg-zinc-900 transition-colors uppercase tracking-widest shadow-xl">INIT_SUBMISSION</button>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-9 space-y-32 order-1 lg:order-2">
              {posts.map((post, i) => (
                <motion.article 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-12"
                >
                  <div className="md:col-span-5 relative overflow-hidden rounded-sm aspect-video md:aspect-auto border border-white/5 group-hover:border-blue-500/30 transition-all duration-700">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl">
                        JOURNAL
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-7 flex flex-col justify-center space-y-6">
                    <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                      <div className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-blue-600" /> {post.date}</div>
                      <div className="flex items-center"><User className="w-3.5 h-3.5 mr-2 text-blue-600" /> @{post.author}</div>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-white group-hover:text-blue-500 transition-colors leading-[0.9] italic tracking-tighter uppercase">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <button className="flex items-center font-black uppercase tracking-widest text-[11px] text-white hover:text-blue-500 transition-colors group/btn italic">
                        READ_FULL_LOG <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                      <button className="text-gray-600 hover:text-blue-500 transition-colors"><Share2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* Pagination */}
              <div className="flex justify-center pt-20">
                <div className="flex items-center space-x-6">
                  {[1, 2, 3].map((p) => (
                    <button 
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-14 h-14 rounded-sm flex items-center justify-center font-mono font-black transition-all ${
                        currentPage === p 
                          ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                          : 'border border-white/10 text-gray-500 hover:border-white hover:text-white'
                      }`}
                    >
                      0{p}
                    </button>
                  ))}
                  <span className="text-white/20 font-mono">...</span>
                  <button 
                    onClick={() => setCurrentPage(16)}
                    className={`w-14 h-14 rounded-sm flex items-center justify-center font-mono font-black transition-all ${
                      currentPage === 16 
                        ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                        : 'border border-white/10 text-gray-500 hover:border-white hover:text-white'
                    }`}
                  >
                    16
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default News;

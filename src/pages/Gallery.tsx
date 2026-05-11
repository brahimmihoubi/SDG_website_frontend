import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Cpu, Terminal, Camera, Hash } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      title: 'Infrastructure Maintenance // DC-01',
      category: 'Nodes',
      date: 'MARCH 2024',
      hash: '0x3F2A'
    },
    {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
      title: 'Global_HACK Live Dashboard',
      category: 'Events',
      date: 'APRIL 2024',
      hash: '0x91B4'
    },
    {
      url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000',
      title: 'Cryptographic Protocol Testing',
      category: 'Research',
      date: 'JANUARY 2024',
      hash: '0xEE32'
    },
    {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
      title: 'Kernel Development Workshop',
      category: 'Workshops',
      date: 'MAY 2024',
      hash: '0x77AF'
    },
    {
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
      title: 'Collaborative Coding Session',
      category: 'Development',
      date: 'FEBRUARY 2024',
      hash: '0x22DC'
    },
    {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1000',
      title: 'Server Array Initialization',
      category: 'Nodes',
      date: 'DECEMBER 2023',
      hash: '0xCC01'
    }
  ];

  const categories = ['All', 'Nodes', 'Events', 'Research', 'Workshops', 'Development'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Header */}
      <section className="py-32 grid-bg border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
             <div className="space-y-6">
                <div className="flex items-center space-x-2 text-blue-500 font-mono text-[10px] tracking-widest leading-none">
                   <Camera className="w-3 h-3" /> <span>IMAGE_BUFFER_SUCCESS</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">THE <br/> <span className="text-blue-500">ARCHIVE.</span></h1>
                <p className="text-xl text-gray-500 font-medium uppercase tracking-widest max-w-lg leading-relaxed">
                   Visual documentation of our high-velocity technological journey.
                </p>
             </div>
             <div className="flex space-x-4">
                <div className="text-center p-6 border border-white/10 rounded-sm bg-zinc-900/30">
                   <div className="text-4xl font-mono font-black text-white leading-none">2.4k</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-2">Assets_Filtered</div>
                </div>
                <div className="text-center p-6 border border-white/10 rounded-sm bg-zinc-900/30">
                   <div className="text-4xl font-mono font-black text-blue-500 leading-none">0xFF</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-2">System_Nodes</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-zinc-900/40 border-b border-white/5 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-12 py-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap relative py-2 ${
                  activeCategory === cat 
                    ? 'text-blue-500' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="gal-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group relative cursor-pointer bg-black overflow-hidden"
                onClick={() => setSelectedImage(i)}
              >
                <div className="aspect-[4/3] grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-10 group-hover:translate-y-0 transition-all duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-blue-500 uppercase tracking-widest">
                       <Hash className="w-3 h-3" /> <span>{img.hash}</span>
                       <span className="text-gray-600">|</span>
                       <span>{img.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight">{img.title}</h3>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{img.date}</div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-blue-600 p-3 rounded-sm"><ZoomIn className="w-4 h-4 text-white" /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-blue-500 transition-colors z-20">
              <X className="w-12 h-12" />
            </button>
            <motion.div
              layoutId={`img-${selectedImage}`}
              className="relative max-w-6xl w-full border border-white/10 rounded-sm overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedImage].url} 
                alt={images[selectedImage].title}
                className="w-full h-auto opacity-90"
              />
              <div className="absolute bottom-0 inset-x-0 p-12 bg-gradient-to-t from-black to-transparent">
                 <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="text-left space-y-4">
                       <div className="text-blue-500 font-mono text-xs tracking-widest uppercase">Buffer_Ref: {images[selectedImage].hash}</div>
                       <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">{images[selectedImage].title}</h2>
                    </div>
                    <div className="text-right text-gray-500 font-black uppercase tracking-widest text-xs italic">
                       Log_Date: {images[selectedImage].date}
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

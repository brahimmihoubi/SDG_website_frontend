import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Command } from 'lucide-react';
import { apiFetch } from '../api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AdminChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'ONLINE. SDG Admin Co-Pilot ready. Ask me how to approve candidate applicants, modify active members, configure team structures, or update dynamic site news.', sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMsg = message.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await apiFetch('/api/chat/admin', {
        method: 'POST',
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-10)
        })
      });
      setMessages(prev => [...prev, { text: response.reply, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Telemetry loss. Secure link to admin mainframe severed.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Admin Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 left-6 sm:left-auto z-50 font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 150, x: 150, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.3, y: 150, x: 150, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="w-full sm:w-96 h-[400px] max-h-[60vh] sm:h-[500px] sm:max-h-none rounded-[20px] bg-zinc-950 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col justify-between p-4 sm:p-6 mb-4 origin-bottom-right overflow-hidden relative"
            >
              {/* Holographic grid scanline background overlay */}
              <div className="absolute inset-0 border border-blue-500/10 pointer-events-none z-0"></div>

              {/* Header */}
              <div className="w-full flex items-center justify-between border-b border-blue-500/10 pb-3 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center animate-pulse">
                    <Command className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-black italic uppercase tracking-wider text-blue-400">CO_PILOT_V1</h3>
                    <div className="flex items-center space-x-1">
                      <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping"></span>
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">ROOT ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 w-full overflow-y-auto my-4 space-y-3 scrollbar-none bg-black/20 rounded-[12px] p-3 relative z-10 border border-white/5">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-[12px] p-2.5 text-xs leading-relaxed font-mono whitespace-pre-line ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                          : 'bg-zinc-900 border border-white/5 text-gray-300 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 border border-white/5 text-gray-400 rounded-[12px] rounded-bl-none p-2.5 text-xs font-mono flex items-center space-x-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="w-full pt-1 relative z-10 flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="PROMPT AI..."
                  className="flex-1 min-w-0 bg-zinc-900 border border-white/10 px-4 h-12 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-base text-blue-400 placeholder-gray-600"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSend}
                  style={{ borderRadius: '10px !important' as any }}
                  className="bg-blue-600 hover:bg-blue-500 text-white w-12 h-12 rounded-[10px] transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Isolated securely at bottom-right corner) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ borderRadius: '50%' }}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] cursor-pointer border border-white/10 hover:bg-white hover:text-black transition-all duration-300 chatbot-circle"
        >
          <Bot className="w-6 h-6" />
        </motion.div>
      </div>
    </>
  );
};

export default AdminChatbot;

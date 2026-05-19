import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Trash2, Loader2, AlertTriangle, ShieldAlert, Clock, Inbox } from 'lucide-react';
import { apiFetch } from '../../api';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await apiFetch('/api/messages');
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm("WARNING: This will permanently delete this communication payload. Proceed?")) return;
    
    try {
      await apiFetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      alert('Failed to delete message payload.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-black border border-white/10 p-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-blue-500 font-mono text-sm tracking-[0.3em] uppercase">
            <Mail className="w-5 h-5" />
            <span>Support_Inbox</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">
            COMMS <span className="text-blue-500">UPLINK</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm max-w-xl">
            Intercepted messages from external nodes. Process and respond to user inquiries.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2">Total Inquiries</div>
          <div className="text-5xl font-black text-white">{messages.length}</div>
        </div>
      </div>

      {/* Messages Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-zinc-900/50 border border-white/5 p-20 text-center space-y-6">
          <Inbox className="w-16 h-16 text-gray-600 mx-auto" />
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gray-400">INBOX ZERO</h3>
          <p className="text-gray-500 font-mono">No communication payloads currently buffered in the mainframe.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={msg.id} 
              className="bg-black border border-white/10 flex flex-col hover:border-blue-500/50 transition-colors"
            >
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-6 bg-zinc-900/30">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                     <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest text-white">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-blue-400 font-mono text-xs hover:underline">{msg.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center space-x-2 text-gray-500 font-mono text-xs">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                    title="Purge Record"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-8 space-y-6">
                 <div className="inline-block bg-zinc-900 border border-white/10 px-4 py-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mr-3">TOPIC:</span>
                    <span className="font-mono text-sm text-blue-400 font-bold">{msg.subject}</span>
                 </div>
                 <div className="bg-zinc-900/50 p-6 font-mono text-sm leading-relaxed text-gray-300 border-l-2 border-blue-600 whitespace-pre-wrap">
                    {msg.content}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;

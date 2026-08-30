import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactService } from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2, X } from 'lucide-react';

const DemoMessages = [
  { _id: '1', name: 'Alice Brown', email: 'alice@example.com', phone: '12345', message: 'I am interested in personal training. How much does it cost? I want to know more about the available trainers.', status: 'unread', createdAt: new Date().toISOString() },
  { _id: '2', name: 'Bob White', email: 'bob@example.com', phone: '67890', message: 'What are your opening hours on weekends?', status: 'read', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: '3', name: 'Charlie Green', email: 'charlie@example.com', phone: '54321', message: 'Do you offer yoga classes? Specifically Ashtanga yoga.', status: 'replied', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll();
      setMessages(res?.data?.data || DemoMessages);
    } catch (error) {
      setMessages(DemoMessages);
      toast.error('Using demo data. API unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactService.updateStatus(id, newStatus);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, status: newStatus } : msg));
      toast.success(`Message marked as ${newStatus}`);
    } catch (error) {
      setMessages(messages.map(msg => msg._id === id ? { ...msg, status: newStatus } : msg));
      toast.success(`Demo message marked as ${newStatus}`);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      unread: 'bg-red-500/10 text-red-500 border-red-500/20',
      read: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      replied: 'bg-green-500/10 text-green-500 border-green-500/20',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.unread}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-neutral-400">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 text-sm">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Message</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    key={msg._id} 
                    className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <td className="p-4 font-medium text-white">{msg.name}</td>
                    <td className="p-4 text-sm">
                      <div>{msg.email}</div>
                      <div className="text-xs text-neutral-500">{msg.phone}</div>
                    </td>
                    <td className="p-4 text-sm max-w-xs truncate">{msg.message}</td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={msg.status}
                        onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-600"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="p-4 text-sm">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg p-6 relative"
            >
              <button 
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-4">Message Details</h2>
              <div className="space-y-4">
                <div><span className="text-neutral-500 text-sm">From:</span> <p className="text-white">{selectedMessage.name}</p></div>
                <div><span className="text-neutral-500 text-sm">Contact:</span> <p className="text-white">{selectedMessage.email} {selectedMessage.phone && `| ${selectedMessage.phone}`}</p></div>
                <div><span className="text-neutral-500 text-sm">Message:</span> 
                  <div className="mt-2 p-4 bg-neutral-950 rounded border border-neutral-800 text-neutral-300 whitespace-pre-wrap">
                    {selectedMessage.message}
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

export default Messages;

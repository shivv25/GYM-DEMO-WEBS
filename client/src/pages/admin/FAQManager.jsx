import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqService } from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2, Plus, Edit2, Trash2, X } from 'lucide-react';

const DemoFAQs = [
  { _id: '1', question: 'What are your opening hours?', answer: 'We are open 24/7 for all members.' },
  { _id: '2', question: 'Do I need to bring my own towel?', answer: 'No, we provide complimentary towels for all members.' },
  { _id: '3', question: 'Can I freeze my membership?', answer: 'Yes, memberships can be frozen for up to 3 months per year.' },
];

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await faqService.getAll();
      setFaqs(res?.data?.data || DemoFAQs);
    } catch (error) {
      setFaqs(DemoFAQs);
      toast.error('Using demo data. API unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        await faqService.update(editingFaq._id, formData);
        setFaqs(faqs.map(f => f._id === editingFaq._id ? { ...f, ...formData } : f));
        toast.success('FAQ updated');
      } else {
        const res = await faqService.create(formData);
        const newFaq = res?.data?.data || { _id: Date.now().toString(), ...formData };
        setFaqs([...faqs, newFaq]);
        toast.success('FAQ created');
      }
      handleCloseModal();
    } catch (error) {
      // Demo fallback
      if (editingFaq) {
        setFaqs(faqs.map(f => f._id === editingFaq._id ? { ...f, ...formData } : f));
        toast.success('Demo FAQ updated');
      } else {
        setFaqs([...faqs, { _id: Date.now().toString(), ...formData }]);
        toast.success('Demo FAQ created');
      }
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await faqService.delete(id);
      setFaqs(faqs.filter(f => f._id !== id));
      toast.success('FAQ deleted');
    } catch (error) {
      setFaqs(faqs.filter(f => f._id !== id));
      toast.success('Demo FAQ deleted');
    }
  };

  const openModal = (faq = null) => {
    setEditingFaq(faq);
    setFormData(faq ? { question: faq.question, answer: faq.answer } : { question: '', answer: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-neutral-400">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">FAQ Manager</h1>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" /> Add FAQ
        </button>
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
                  <th className="p-4 font-medium">Question</th>
                  <th className="p-4 font-medium">Answer</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq._id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 font-medium text-white max-w-xs truncate">{faq.question}</td>
                    <td className="p-4 text-sm max-w-md truncate">{faq.answer}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => openModal(faq)} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(faq._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg p-6 relative"
            >
              <button onClick={handleCloseModal} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-6">{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Question</label>
                  <textarea 
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-red-600"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Answer</label>
                  <textarea 
                    required
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-red-600"
                    rows="4"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    {editingFaq ? 'Save Changes' : 'Create FAQ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQManager;

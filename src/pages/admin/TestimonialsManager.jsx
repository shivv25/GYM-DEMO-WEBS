import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialService } from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2, Plus, Edit2, Trash2, X, Star } from 'lucide-react';

const DemoTestimonials = [
  { _id: '1', name: 'Sarah Connor', role: 'Member', rating: 5, text: 'Best gym in the city! The equipment is top-notch.', image: 'https://i.pravatar.cc/150?u=1' },
  { _id: '2', name: 'Tony Stark', role: 'Premium Member', rating: 4, text: 'Great atmosphere, love the personal trainers.', image: 'https://i.pravatar.cc/150?u=2' },
];

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', rating: 5, text: '', image: '' });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await testimonialService.getAll();
      setTestimonials(res?.data?.data || DemoTestimonials);
    } catch (error) {
      setTestimonials(DemoTestimonials);
      toast.error('Using demo data. API unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await testimonialService.update(editingItem._id, formData);
        setTestimonials(testimonials.map(t => t._id === editingItem._id ? { ...t, ...formData } : t));
        toast.success('Testimonial updated');
      } else {
        const res = await testimonialService.create(formData);
        const newItem = res?.data?.data || { _id: Date.now().toString(), ...formData };
        setTestimonials([...testimonials, newItem]);
        toast.success('Testimonial created');
      }
      handleCloseModal();
    } catch (error) {
      if (editingItem) {
        setTestimonials(testimonials.map(t => t._id === editingItem._id ? { ...t, ...formData } : t));
        toast.success('Demo testimonial updated');
      } else {
        setTestimonials([...testimonials, { _id: Date.now().toString(), ...formData }]);
        toast.success('Demo testimonial created');
      }
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialService.delete(id);
      setTestimonials(testimonials.filter(t => t._id !== id));
      toast.success('Testimonial deleted');
    } catch (error) {
      setTestimonials(testimonials.filter(t => t._id !== id));
      toast.success('Demo testimonial deleted');
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData(item ? { name: item.name, role: item.role, rating: item.rating, text: item.text, image: item.image || '' } : { name: '', role: '', rating: 5, text: '', image: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-neutral-400">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Testimonials</h1>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Testimonial
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
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Text</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((item) => (
                  <tr key={item._id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      {item.image ? <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white">{item.name.charAt(0)}</div>}
                      <div>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-neutral-500">{item.role}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-neutral-700'}`} />)}
                      </div>
                    </td>
                    <td className="p-4 text-sm max-w-xs truncate">{item.text}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(item)} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
              <h2 className="text-xl font-bold text-white mb-6">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Role</label>
                    <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Rating (1-5)</label>
                    <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Image URL</label>
                    <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Review Text</label>
                  <textarea required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" rows="3" />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">{editingItem ? 'Save Changes' : 'Create'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialsManager;

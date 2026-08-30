import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService } from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';

const DemoGallery = [
  { _id: '1', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop', category: 'Equipment', caption: 'State of the art machines' },
  { _id: '2', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop', category: 'Free Weights', caption: 'Extensive free weight area' },
  { _id: '3', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop', category: 'Classes', caption: 'Group yoga sessions' },
];

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ url: '', category: '', caption: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await galleryService.getAll();
      setImages(res?.data?.data || DemoGallery);
    } catch (error) {
      setImages(DemoGallery);
      toast.error('Using demo data. API unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await galleryService.create(formData);
      const newImage = res?.data?.data || { _id: Date.now().toString(), ...formData };
      setImages([...images, newImage]);
      toast.success('Image added');
      handleCloseModal();
    } catch (error) {
      setImages([...images, { _id: Date.now().toString(), ...formData }]);
      toast.success('Demo image added');
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await galleryService.delete(id);
      setImages(images.filter(img => img._id !== id));
      toast.success('Image deleted');
    } catch (error) {
      setImages(images.filter(img => img._id !== id));
      toast.success('Demo image deleted');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({ url: '', category: '', caption: '' });
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-neutral-400">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Gallery Manager</h1>
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((item) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={item._id} 
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group relative"
            >
              <div className="aspect-video relative overflow-hidden bg-neutral-950 flex items-center justify-center">
                {item.url ? (
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-neutral-700" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-medium text-neutral-300 mb-1">{item.category}</div>
                <div className="text-xs text-neutral-500 truncate">{item.caption}</div>
              </div>
            </motion.div>
          ))}
          
          {images.length === 0 && (
            <div className="col-span-full py-12 text-center text-neutral-500 border-2 border-dashed border-neutral-800 rounded-xl">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No images in the gallery yet.</p>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-md p-6 relative"
            >
              <button onClick={handleCloseModal} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-6">Add New Image</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Image URL</label>
                  <input required type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Category</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Caption</label>
                  <input required type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                </div>
                
                {formData.url && (
                  <div className="mt-4 aspect-video rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800">
                    <img src={formData.url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">Add Image</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryManager;

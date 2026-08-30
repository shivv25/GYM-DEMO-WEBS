import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipService } from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2, Plus, Edit2, Trash2, X } from 'lucide-react';

const DemoMemberships = [
  { _id: '1', name: 'Basic Plan', price: 29.99, currency: '$', period: 'monthly', description: 'Access to gym equipment', features: ['Locker access', 'Free wifi'], isPopular: false, cta: 'Join Now' },
  { _id: '2', name: 'Pro Plan', price: 49.99, currency: '$', period: 'monthly', description: 'Full access + classes', features: ['Locker access', 'Free wifi', 'Group classes', '1 PT session/month'], isPopular: true, cta: 'Get Pro' },
];

const MembershipsManager = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', currency: '$', period: 'monthly', description: '', features: [''], isPopular: false, cta: 'Join Now' });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await membershipService.getAll();
      setPlans(res?.data?.data || DemoMemberships);
    } catch (error) {
      setPlans(DemoMemberships);
      toast.error('Using demo data. API unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
  const removeFeature = (index) => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { ...formData, features: formData.features.filter(f => f.trim() !== '') };
    try {
      if (editingPlan) {
        await membershipService.update(editingPlan._id, submitData);
        setPlans(plans.map(p => p._id === editingPlan._id ? { ...p, ...submitData } : p));
        toast.success('Plan updated');
      } else {
        const res = await membershipService.create(submitData);
        const newPlan = res?.data?.data || { _id: Date.now().toString(), ...submitData };
        setPlans([...plans, newPlan]);
        toast.success('Plan created');
      }
      handleCloseModal();
    } catch (error) {
      if (editingPlan) {
        setPlans(plans.map(p => p._id === editingPlan._id ? { ...p, ...submitData } : p));
        toast.success('Demo plan updated');
      } else {
        setPlans([...plans, { _id: Date.now().toString(), ...submitData }]);
        toast.success('Demo plan created');
      }
      handleCloseModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      await membershipService.delete(id);
      setPlans(plans.filter(p => p._id !== id));
      toast.success('Plan deleted');
    } catch (error) {
      setPlans(plans.filter(p => p._id !== id));
      toast.success('Demo plan deleted');
    }
  };

  const openModal = (plan = null) => {
    setEditingPlan(plan);
    setFormData(plan ? { ...plan, features: plan.features?.length ? plan.features : [''] } : { name: '', price: '', currency: '$', period: 'monthly', description: '', features: [''], isPopular: false, cta: 'Join Now' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPlan(null);
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-neutral-400">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Memberships Manager</h1>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Plan
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
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Period</th>
                  <th className="p-4 font-medium">Popular</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4 font-medium text-white">{plan.name}</td>
                    <td className="p-4 font-medium text-white">{plan.currency}{plan.price}</td>
                    <td className="p-4 text-sm capitalize">{plan.period}</td>
                    <td className="p-4">
                      {plan.isPopular && <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-500 border border-red-500/20">Yes</span>}
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => openModal(plan)} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(plan._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-xl p-6 relative my-8"
            >
              <button onClick={handleCloseModal} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-6">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Price</label>
                    <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Currency</label>
                    <input required type="text" value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Period</label>
                    <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} placeholder="monthly, yearly..." className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" rows="2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Features</label>
                  {formData.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" value={feature} onChange={e => handleFeatureChange(idx, e.target.value)} className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                      <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"><X className="w-5 h-5"/></button>
                    </div>
                  ))}
                  <button type="button" onClick={addFeature} className="text-sm text-red-500 hover:text-red-400 font-medium">+ Add Feature</button>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPopular" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} className="rounded bg-neutral-950 border-neutral-800 text-red-600 focus:ring-red-600" />
                  <label htmlFor="isPopular" className="text-sm font-medium text-neutral-400">Mark as Popular Plan</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">CTA Text</label>
                  <input required type="text" value={formData.cta} onChange={e => setFormData({...formData, cta: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:border-red-600" />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">{editingPlan ? 'Save Changes' : 'Create Plan'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MembershipsManager;

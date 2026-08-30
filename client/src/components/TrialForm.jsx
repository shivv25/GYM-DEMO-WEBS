import React, { useState } from 'react';
import Button from './Button';
// import { createTrial } from '../api'; // uncomment when api is ready

const goals = [
  "Weight Loss", "Muscle Building", "General Fitness", "Strength Training", "Sports Performance", "Flexibility & Mobility"
];

const TrialForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', fitnessGoal: '', preferredDate: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // await createTrial(formData);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', fitnessGoal: '', preferredDate: '' });
        alert('1-Day Free Pass booked successfully! We will contact you soon.'); // Replace with toast
      }, 1000);
    } catch (error) {
      setStatus('error');
      alert('Failed to book trial.'); // Replace with toast
    }
  };

  const inputClasses = "w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#111] p-8 rounded-2xl border border-white/5">
      <h3 className="text-2xl font-bold text-white mb-6 font-heading">Claim Your 1-Day Free Pass</h3>
      
      <div>
        <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClasses} />
      </div>
      <div>
        <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClasses} />
      </div>
      <div>
        <input type="tel" name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClasses} />
      </div>
      
      <div>
        <input type="date" name="preferredDate" required value={formData.preferredDate} onChange={handleChange} className={inputClasses} min={new Date().toISOString().split('T')[0]} />
      </div>

      <Button type="submit" variant="primary" className="w-full mt-4" disabled={status === 'loading'}>
        {status === 'loading' ? 'Processing...' : 'GET 1-DAY PASS'}
      </Button>
    </form>
  );
};

export default TrialForm;

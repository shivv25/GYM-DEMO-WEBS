import React, { useState } from 'react';
import Button from './Button';
import { Send } from 'lucide-react';
// import { createMessage } from '../api'; // uncomment when api is ready

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // await createMessage(formData);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        alert('Message sent successfully!'); // Replace with toast
      }, 1000);
    } catch (error) {
      setStatus('error');
      alert('Failed to send message.'); // Replace with toast
    }
  };

  const inputClasses = "w-full bg-dark-50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Enter your name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="your@email" />
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="+91 " />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
        <textarea id="message" name="message" required rows="4" value={formData.message} onChange={handleChange} className={inputClasses} placeholder="How can we help you?"></textarea>
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4 ml-2 inline" />
      </Button>
    </form>
  );
};

export default ContactForm;

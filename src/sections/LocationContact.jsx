import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useGym } from '../context/GymContext';
import ContactForm from '../components/ContactForm';
import TrialForm from '../components/TrialForm';

const LocationContact = () => {
  const { gym } = useGym();
  
  return (
    <section className="py-24 bg-black text-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Contact Info & Form */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-hero uppercase font-black mb-8">Get In Touch</h2>
            <p className="text-gray-400 mb-12">Have a question or want to learn more? Reach out to us.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {gym?.contact?.address && (
                <div className="flex gap-4">
                  <MapPin className="text-[var(--color-accent)] w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-sm text-gray-400">{gym.contact.address}</p>
                  </div>
                </div>
              )}
              {gym?.contact?.phone && (
                <div className="flex gap-4">
                  <Phone className="text-[var(--color-accent)] w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-sm text-gray-400">{gym.contact.phone}</p>
                  </div>
                </div>
              )}
              {gym?.contact?.email && (
                <div className="flex gap-4">
                  <Mail className="text-[var(--color-accent)] w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-sm text-gray-400">{gym.contact.email}</p>
                  </div>
                </div>
              )}
              {gym?.contact?.hours && (
                <div className="flex gap-4">
                  <Clock className="text-[var(--color-accent)] w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Hours</h4>
                    <p className="text-sm text-gray-400 whitespace-pre-line">{gym.contact.hours}</p>
                  </div>
                </div>
              )}
            </div>

            <ContactForm />
          </motion.div>

          {/* Right: Map & Trial Form */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Claim Your Free Trial</h3>
              <TrialForm />
            </div>

            {gym?.contact?.mapEmbed && (
              <div className="w-full h-[350px] rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-xl">
                <iframe 
                  src={gym.contact.mapEmbed}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gym Location Map"
                />
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LocationContact;

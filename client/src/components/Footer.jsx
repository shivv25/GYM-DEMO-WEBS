import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useGym } from '../context/GymContext';

const Footer = () => {
  const { gym } = useGym() || { gym: { name: 'FLEX GYM' } };

  return (
    <footer className="bg-bg-dark border-t border-accent/20 pt-16 pb-8 relative overflow-hidden">
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-6">
              <Dumbbell className="w-8 h-8 text-accent" />
              <span className="font-heading font-black text-2xl tracking-tighter text-white">
                {gym?.name?.toUpperCase() || 'FLEX GYM'}
              </span>
            </a>
            <p className="text-gray-400 mb-6">
              Empowering you to reach your peak performance. Professional trainers, state-of-the-art equipment, and a community that pushes you forward.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Trainers', 'Pricing'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg">Programs</h4>
            <ul className="space-y-3">
              {['Strength Training', 'Cardio Fitness', 'CrossFit', 'Yoga & Pilates'].map((prog) => (
                <li key={prog}>
                  <a href="#programs" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    {prog}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span>{gym?.contact?.address || '123 Fitness Street, Gym City, NY 10001'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span>{gym?.contact?.phone || '+1 (555) 123-4567'}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span>{gym?.contact?.email || 'info@flexgym.com'}</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/5">
              <h5 className="text-white font-semibold mb-2">Working Hours</h5>
              <p className="text-gray-400 text-sm">Mon - Fri: 5:00 AM - 11:00 PM</p>
              <p className="text-gray-400 text-sm">Sat - Sun: 7:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {gym?.name || 'FLEX GYM'}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

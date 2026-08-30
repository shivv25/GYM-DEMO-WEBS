import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell } from 'lucide-react';
import { useGym } from '../context/GymContext';
import Button from './Button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Programs', href: '#programs' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Membership', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { gym } = useGym() || { gym: { name: 'FLEX GYM' } };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Dynamic Background Layer */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled ? 'bg-bg-dark/90 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'
        }`}
      />

      <div className={`relative container mx-auto px-4 md:px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <a href="#home" className="flex items-center gap-2 group" onClick={(e) => handleLinkClick(e, '#home')}>
          <Dumbbell className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
          <span className="font-heading font-black text-2xl tracking-tighter text-white">
            {gym?.name?.toUpperCase() || 'FLEX GYM'}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 hover:text-accent font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>
          <Button href="#contact" variant="primary" size="sm" icon>
            JOIN NOW
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bg-dark/60 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-200 text-lg font-medium py-2 border-b border-white/5 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button href="#contact" variant="primary" size="md" className="mt-4 w-full" onClick={(e) => handleLinkClick(e, '#contact')}>
              JOIN NOW
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

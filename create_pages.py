import os

base_dir = r"c:\Users\Vishal singh\OneDrive\PROJECT-S\GYM-demos\client\src"

files = {
    r"pages\HomePage.jsx": """import React from 'react';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Trainers from '../sections/Trainers';
import Memberships from '../sections/Memberships';
import Testimonials from '../sections/Testimonials';
import Gallery from '../sections/Gallery';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import TrialOffer from '../sections/TrialOffer';
import Schedule from '../sections/Schedule';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Features />
      <About />
      <Programs />
      <Trainers />
      <Memberships />
      <Schedule />
      <Testimonials />
      <Gallery />
      <FAQ />
      <TrialOffer />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomePage;
""",
    r"pages\NotFoundPage.jsx": """import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800"
      >
        404
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl text-neutral-400 mt-4 mb-8 text-center"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          to="/" 
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all uppercase tracking-wider"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
""",
    r"pages\admin\AdminLogin.jsx": """import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Neuro<span className="text-red-600">Fit</span></h1>
          <p className="text-neutral-400 mt-2">Admin Control Panel</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                placeholder="admin@neurofit.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-wider mt-4"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
""",
    r"pages\admin\Dashboard.jsx": """import React from 'react';
import { Users, Activity, DollarSign, Calendar } from 'lucide-react';
import { useGym } from '../../context/GymContext';

const Dashboard = () => {
  const { gymInfo } = useGym();
  
  const stats = [
    { label: 'Total Members', value: '1,248', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Programs', value: '12', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Monthly Revenue', value: '$45,231', icon: DollarSign, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Upcoming Classes', value: '8', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
      <p className="text-neutral-400 mb-8">Welcome back to {gymInfo?.name || 'NeuroFit'} Admin Panel.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-center">
            <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', plan: 'Pro', date: 'Oct 12' },
                  { name: 'Jane Smith', plan: 'Basic', date: 'Oct 11' },
                  { name: 'Mike Johnson', plan: 'Elite', date: 'Oct 10' }
                ].map((user, i) => (
                  <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                    <td className="py-3 text-white">{user.name}</td>
                    <td className="py-3 text-neutral-300">{user.plan}</td>
                    <td className="py-3 text-neutral-500">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Trial Leads</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Wilson', status: 'New', date: 'Today' },
                  { name: 'Tom Hardy', status: 'Contacted', date: 'Yesterday' },
                  { name: 'Alice Cooper', status: 'Signed Up', date: 'Oct 9' }
                ].map((lead, i) => (
                  <tr key={i} className="border-b border-neutral-800/50 last:border-0">
                    <td className="py-3 text-white">{lead.name}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-300">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-500">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
""",
    r"pages\admin\GymSettings.jsx": """import React from 'react';
import { useGym } from '../../context/GymContext';

const GymSettings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Gym Settings</h1>
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-4xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Gym Name</label>
              <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" defaultValue="NeuroFit" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Tagline</label>
              <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" defaultValue="Forge Your Legacy" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
            <textarea className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white h-24" defaultValue="Premium fitness facility in the heart of the city." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Phone</label>
              <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" defaultValue="(555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
              <input type="email" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" defaultValue="contact@neurofit.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Primary Color</label>
              <input type="color" className="w-full h-10 bg-neutral-800 border border-neutral-700 rounded-lg px-1 py-1 cursor-pointer" defaultValue="#dc2626" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Address</label>
            <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" defaultValue="123 Fitness Blvd, Muscle City, MC 90210" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Social Links (JSON)</label>
            <textarea className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white h-24 font-mono text-sm" defaultValue={JSON.stringify({ instagram: "#", facebook: "#", twitter: "#" }, null, 2)} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Operating Hours (JSON)</label>
            <textarea className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white h-24 font-mono text-sm" defaultValue={JSON.stringify({ mon_fri: "5AM - 11PM", sat_sun: "7AM - 9PM" }, null, 2)} />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GymSettings;
""",
    r"pages\admin\ProgramsManager.jsx": """import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ProgramsManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const demoPrograms = [
    { id: 1, name: 'CrossFit', category: 'Strength', active: true },
    { id: 2, name: 'Yoga Flow', category: 'Flexibility', active: true },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Programs Manager</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-950">
            <tr className="text-neutral-400">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoPrograms.map(p => (
              <tr key={p.id} className="border-t border-neutral-800">
                <td className="p-4 text-white font-medium">{p.name}</td>
                <td className="p-4 text-neutral-300">{p.category}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">{p.active ? 'Active' : 'Inactive'}</span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Add Program</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Name</label>
                <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-neutral-400 hover:text-white">Cancel</button>
                <button type="button" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsManager;
""",
    r"pages\admin\TrainersManager.jsx": """import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const TrainersManager = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Trainers Manager</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Trainer
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-950">
            <tr className="text-neutral-400">
              <th className="p-4 font-medium">Trainer</th>
              <th className="p-4 font-medium">Specialty</th>
              <th className="p-4 font-medium">Experience</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-neutral-800">
              <td className="p-4 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800"></div>
                Alex Mercer
              </td>
              <td className="p-4 text-neutral-300">Strength & Conditioning</td>
              <td className="p-4 text-neutral-400">8 Years</td>
              <td className="p-4 flex gap-2">
                <button className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainersManager;
""",
    r"pages\admin\MembershipsManager.jsx": """import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const MembershipsManager = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Memberships Manager</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Plan
        </button>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
        Table implementation similar to ProgramsManager...
      </div>
    </div>
  );
};

export default MembershipsManager;
""",
    r"pages\admin\TestimonialsManager.jsx": """import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const TestimonialsManager = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Testimonials Manager</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
        Table implementation similar to ProgramsManager...
      </div>
    </div>
  );
};

export default TestimonialsManager;
""",
    r"pages\admin\GalleryManager.jsx": """import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const GalleryManager = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gallery Manager</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-square bg-neutral-900 border border-neutral-800 rounded-xl relative group">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity rounded-xl">
              <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
""",
    r"pages\admin\FAQManager.jsx": """import React from 'react';
import { Plus } from 'lucide-react';

const FAQManager = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">FAQ Manager</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
        Table implementation similar to ProgramsManager...
      </div>
    </div>
  );
};

export default FAQManager;
""",
    r"pages\admin\TrialLeads.jsx": """import React from 'react';

const TrialLeads = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Trial Leads</h1>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
        Table implementation with status badges...
      </div>
    </div>
  );
};

export default TrialLeads;
""",
    r"pages\admin\Messages.jsx": """import React from 'react';

const Messages = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Contact Messages</h1>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
        Table implementation for messages...
      </div>
    </div>
  );
};

export default Messages;
""",
    r"layouts\MainLayout.jsx": """import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../sections/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white relative">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50"></div>
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#171717',
          color: '#fff',
          border: '1px solid #262626'
        }
      }} />
    </div>
  );
};

export default MainLayout;
""",
    r"layouts\AdminLayout.jsx": """import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Settings, Dumbbell, Users, 
  CreditCard, MessageSquare, Image, HelpCircle, 
  UserPlus, Mail, LogOut, Menu, X
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Programs', path: '/admin/programs', icon: Dumbbell },
    { name: 'Trainers', path: '/admin/trainers', icon: Users },
    { name: 'Memberships', path: '/admin/memberships', icon: CreditCard },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'FAQ', path: '/admin/faq', icon: HelpCircle },
    { name: 'Trial Leads', path: '/admin/leads', icon: UserPlus },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex text-white font-sans">
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#171717', color: '#fff', border: '1px solid #262626' }
      }} />
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-neutral-900 border-r border-neutral-800 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out z-40 flex flex-col`}>
        <div className="h-16 flex items-center px-6 border-b border-neutral-800">
          <Link to="/admin" className="text-xl font-black uppercase tracking-tighter">Neuro<span className="text-red-600">Fit</span> Admin</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-red-600/10 text-red-500' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-red-500' : ''}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={logout}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 lg:px-6 z-30">
          <button 
            className="lg:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-0">
          <Outlet />
        </div>
      </main>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
""",
    r"App.jsx": """import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Context
import { AuthProvider } from './context/AuthContext';
import { GymProvider } from './context/GymContext';

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const GymSettings = lazy(() => import('./pages/admin/GymSettings'));
const ProgramsManager = lazy(() => import('./pages/admin/ProgramsManager'));
const TrainersManager = lazy(() => import('./pages/admin/TrainersManager'));
const MembershipsManager = lazy(() => import('./pages/admin/MembershipsManager'));
const TestimonialsManager = lazy(() => import('./pages/admin/TestimonialsManager'));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager'));
const FAQManager = lazy(() => import('./pages/admin/FAQManager'));
const TrialLeads = lazy(() => import('./pages/admin/TrialLeads'));
const Messages = lazy(() => import('./pages/admin/Messages'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GymProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={
              <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Loading...</div>}>
                <AdminLogin />
              </Suspense>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Loading...</div>}>
                <AdminLayout />
              </Suspense>
            }>
              <Route index element={
                <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="settings" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><GymSettings /></Suspense>} />
              <Route path="programs" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><ProgramsManager /></Suspense>} />
              <Route path="trainers" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><TrainersManager /></Suspense>} />
              <Route path="memberships" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><MembershipsManager /></Suspense>} />
              <Route path="testimonials" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><TestimonialsManager /></Suspense>} />
              <Route path="gallery" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><GalleryManager /></Suspense>} />
              <Route path="faq" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><FAQManager /></Suspense>} />
              <Route path="leads" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><TrialLeads /></Suspense>} />
              <Route path="messages" element={<Suspense fallback={<div className="p-6 text-white">Loading...</div>}><Messages /></Suspense>} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </GymProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files created successfully.")

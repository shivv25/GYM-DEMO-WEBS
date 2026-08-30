import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Settings, Dumbbell, Users, 
  CreditCard, MessageSquare, Image, HelpCircle, 
  UserPlus, Mail, LogOut, Menu, X
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

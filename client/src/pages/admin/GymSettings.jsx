import React from 'react';
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

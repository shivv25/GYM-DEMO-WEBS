import React, { useState } from 'react';
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

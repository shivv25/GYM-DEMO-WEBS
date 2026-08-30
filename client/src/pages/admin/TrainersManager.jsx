import React from 'react';
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

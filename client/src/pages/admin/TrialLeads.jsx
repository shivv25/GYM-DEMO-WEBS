import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trialService } from '../../services/api';
import toast from 'react-hot-toast';
import { Loader2, Search } from 'lucide-react';

const DemoLeads = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', goal: 'Weight Loss', preferredDate: '2023-10-10', status: 'pending' },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', goal: 'Muscle Gain', preferredDate: '2023-10-12', status: 'contacted' },
  { _id: '3', name: 'Mike Ross', email: 'mike@example.com', phone: '1122334455', goal: 'Strength', preferredDate: '2023-10-15', status: 'converted' },
  { _id: '4', name: 'Rachel Zane', email: 'rachel@example.com', phone: '5544332211', goal: 'Flexibility', preferredDate: '2023-10-18', status: 'cancelled' },
  { _id: '5', name: 'Harvey Specter', email: 'harvey@example.com', phone: '6677889900', goal: 'Endurance', preferredDate: '2023-10-20', status: 'pending' }
];

const TrialLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await trialService.getAll();
      setLeads(res?.data?.data || DemoLeads);
    } catch (error) {
      console.error('Failed to fetch leads', error);
      setLeads(DemoLeads);
      toast.error('Using demo data. API unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await trialService.updateStatus(id, newStatus);
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
      toast.success(`Demo status updated to ${newStatus}`);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      contacted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      converted: 'bg-green-500/10 text-green-500 border-green-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.pending}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-neutral-400">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Trial Leads</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-red-600 transition-colors text-white placeholder-neutral-500"
          />
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 text-sm">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Goal</th>
                  <th className="p-4 font-medium">Preferred Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    key={lead._id} 
                    className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-white">{lead.name}</td>
                    <td className="p-4">
                      <div className="text-sm">{lead.email}</div>
                      <div className="text-xs text-neutral-500">{lead.phone}</div>
                    </td>
                    <td className="p-4 text-sm">{lead.goal}</td>
                    <td className="p-4 text-sm">{new Date(lead.preferredDate).toLocaleDateString()}</td>
                    <td className="p-4">{getStatusBadge(lead.status)}</td>
                    <td className="p-4">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-600"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrialLeads;

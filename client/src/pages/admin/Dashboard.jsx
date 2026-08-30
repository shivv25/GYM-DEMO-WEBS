import React from 'react';
import { Users, Activity, DollarSign, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Members', value: '1,248', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Programs', value: '12', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Monthly Revenue', value: '$45,231', icon: DollarSign, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Upcoming Classes', value: '8', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
      
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

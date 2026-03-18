// import { useToast } from '../../hooks/use-toast';

// export function AdminPanel() {
//   const { toast } = useToast();

//   return (
//     <aside className="admin-panel">
//       <div className="admin-panel-header">
//         <h2>Admin Prototype</h2>
//         <p>Quick actions to simulate backend flows.</p>
//       </div>
//       <div className="admin-panel-actions">
//         <button onClick={() => toast('Simulated: New booking request created')}>
//           Add booking request
//         </button>
//         <button onClick={() => toast('Simulated: Driver assigned to trip')}>
//           Assign driver
//         </button>
//         <button onClick={() => toast('Simulated: Trip marked as completed')}>
//           Complete trip
//         </button>
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { Users, CarFront, MapPin, TrendingUp, Shield, AlertTriangle } from "lucide-react";

const AdminPanel: React.FC = () => {
  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, change: "+12%" },
    { label: "Active Drivers", value: "342", icon: CarFront, change: "+8%" },
    { label: "Routes Today", value: "89", icon: MapPin, change: "+15%" },
    { label: "Trips Completed", value: "4,521", icon: TrendingUp, change: "+22%" },
  ];

  const recentUsers = [
    { name: "Ezekiel Mazwa", role: "Driver", status: "Verified", joined: "Feb 20, 2026" },
    { name: "Fatma Naseeb", role: "Passenger", status: "Verified", joined: "Feb 19, 2026" },
    { name: "Godbless Lema", role: "Both", status: "Pending", joined: "Feb 18, 2026" },
    { name: "Khadija Omary", role: "Driver", status: "Verified", joined: "Feb 17, 2026" },
    { name: "Godfrey Memo", role: "Passenger", status: "Suspended", joined: "Feb 15, 2026" },
  ];

  return (
    <div className="bg-background rounded-2xl p-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-muted rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon size={20} className="text-primary" />
              <span className="text-xs font-medium text-primary">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-muted rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">All</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-background text-muted-foreground rounded-full">Drivers</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-background text-muted-foreground rounded-full">Passengers</button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b border-border">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Joined</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((u) => (
              <tr key={u.name} className="border-b border-border last:border-0">
                <td className="py-3 text-sm font-medium text-foreground">{u.name}</td>
                <td className="py-3 text-sm text-muted-foreground">{u.role}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    u.status === "Verified" ? "bg-secondary text-secondary-foreground" :
                    u.status === "Pending" ? "bg-accent text-accent-foreground" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-muted-foreground">{u.joined}</td>
                <td className="py-3">
                  <button className="text-xs text-primary font-medium hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance & Alerts */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-muted rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-primary" />
            <h3 className="font-semibold text-foreground">LATRA Compliance</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">D5 License Status</span>
              <span className="text-primary font-medium">Ready</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">API Integration</span>
              <span className="text-primary font-medium">Configured</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trip Reports</span>
              <span className="text-primary font-medium">Up to date</span>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-rishfy-orange" />
            <h3 className="font-semibold text-foreground">Pending Actions</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Driver Verifications</span>
              <span className="font-medium text-foreground">5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Disputes</span>
              <span className="font-medium text-foreground">2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vehicle Reviews</span>
              <span className="font-medium text-foreground">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

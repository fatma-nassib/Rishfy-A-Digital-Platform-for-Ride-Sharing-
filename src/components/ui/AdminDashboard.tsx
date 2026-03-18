import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Route,
  Users,
  ShieldCheck,
  FileText,
  Settings,
  LogOut,
  Bell,
  Menu,
  Search,
  Download,
  Check,
  X,
} from "lucide-react";

type Page = "overview" | "trips" | "users" | "verify" | "reports" | "settings";

const StatCard: React.FC<{
  label: string;
  value: string;
  delta: string;
  Icon: React.ElementType;
}> = ({ label, value, delta, Icon }) => (
  <div className="bg-background rounded-2xl border border-border p-4 shadow-sm">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="text-primary" size={18} />
      </div>
      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
        {delta}
      </span>
    </div>
    <p className="text-2xl font-extrabold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
  </div>
);

const Badge: React.FC<{ status: "completed" | "active" | "cancelled" | "pending" | "approved" | "suspended" }> = ({
  status,
}) => {
  const meta = {
    completed: { label: "Completed", cls: "bg-primary/10 text-primary" },
    active: { label: "Active", cls: "bg-blue-500/10 text-blue-600" },
    cancelled: { label: "Cancelled", cls: "bg-destructive/10 text-destructive" },
    pending: { label: "Pending", cls: "bg-amber-500/10 text-amber-600" },
    approved: { label: "Approved", cls: "bg-primary/10 text-primary" },
    suspended: { label: "Suspended", cls: "bg-destructive/10 text-destructive" },
  }[status];

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${meta.cls}`}>
      {meta.label}
    </span>
  );
};

const data = {
  stats: [
    { label: "Total Users", value: "3,847", delta: "+8%", icon: Users },
    { label: "Active Drivers", value: "142", delta: "+12%", icon: Route },
    { label: "Trips Today", value: "289", delta: "+23%", icon: LayoutDashboard },
    { label: "Revenue (TZS)", value: "4.2M", delta: "+18%", icon: Download },
    { label: "Pending Verify", value: "18", delta: "-3", icon: ShieldCheck },
    { label: "Avg Rating", value: "4.7", delta: "+0.2", icon: FileText },
  ],
  trips: [
    { id: "#4521", passenger: "Amina Juma", driver: "Khadija Omary", route: "Mbezi → City", fare: "3,500", status: "completed", time: "06:45" },
    { id: "#4520", passenger: "David Kessy", driver: "Ezekiel Simeon", route: "Tegeta → Kariakoo", fare: "2,800", status: "active", time: "06:15" },
    { id: "#4519", passenger: "Fatuma Ali", driver: "Godfrey Omary", route: "Bunju → City", fare: "4,000", status: "completed", time: "05:50" },
    { id: "#4518", passenger: "Robert Mushi", driver: "Khadija Omary", route: "Mbezi → City", fare: "3,500", status: "cancelled", time: "05:30" },
  ] as const,
  users: [
    { name: "Khadija Omary", role: "Driver", trips: 134, rating: 4.8, status: "active", joined: "Jan 2026" },
    { name: "Ezekiel Simeon", role: "Driver", trips: 89, rating: 4.6, status: "active", joined: "Jan 2026" },
    { name: "Godfrey Omary", role: "Driver", trips: 52, rating: 4.9, status: "pending", joined: "Feb 2026" },
    { name: "Amina Juma", role: "Passenger", trips: 22, rating: 4.7, status: "active", joined: "Feb 2026" },
    { name: "David Kessy", role: "Passenger", trips: 15, rating: 4.5, status: "active", joined: "Feb 2026" },
  ] as const,
  pending: [
    { name: "Emmanuel Tarimo", vehicle: "Toyota Vitz · T 112 DAR", submitted: "2h ago", docs: [true, true, false] },
    { name: "Happiness Mlay", vehicle: "Suzuki Alto · T 783 DAR", submitted: "4h ago", docs: [true, false, false] },
    { name: "Charles Mbele", vehicle: "Honda Jazz · T 456 DAR", submitted: "6h ago", docs: [true, true, true] },
  ] as const,
};

const AdminOverview: React.FC = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.stats.map((s) => (
        <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} Icon={s.icon} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-background rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground">Recent Trips</h3>
          <button className="text-sm font-semibold text-primary hover:underline">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left text-xs text-muted-foreground">
                {["ID", "Passenger", "Driver", "Route", "Fare", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.trips.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="px-4 py-3 font-bold text-primary">{t.id}</td>
                  <td className="px-4 py-3">{t.passenger}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.driver}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.route}</td>
                  <td className="px-4 py-3 font-semibold">TZS {t.fare}</td>
                  <td className="px-4 py-3">
                    <Badge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-background rounded-2xl border border-border p-5">
        <h3 className="font-bold text-foreground mb-4">Pending Verifications</h3>
        <div className="space-y-3">
          {data.pending.map((p) => (
            <div key={p.name} className="flex items-center justify-between gap-3 border border-border rounded-xl p-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.vehicle}</p>
                <p className="text-[11px] text-muted-foreground">Submitted {p.submitted}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Check size={16} />
                </button>
                <button className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Driver" | "Passenger">("All");
  const filtered = useMemo(() => {
    return data.users.filter((u) => {
      const okRole = filter === "All" || u.role === filter;
      const okSearch = u.name.toLowerCase().includes(search.toLowerCase());
      return okRole && okSearch;
    });
  }, [filter, search]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">User Management</h2>
          <p className="text-sm text-muted-foreground">{data.users.length} total users</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background">
          <Search size={16} className="text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="outline-none bg-transparent text-sm text-foreground"
          />
        </div>
        {(["All", "Driver", "Passenger"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
              filter === f ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left text-xs text-muted-foreground">
              {["User", "Role", "Trips", "Rating", "Status", "Joined"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.name} className="border-t border-border">
                <td className="px-4 py-3 font-semibold text-foreground">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.role}</td>
                <td className="px-4 py-3 font-semibold">{u.trips}</td>
                <td className="px-4 py-3 font-semibold">{u.rating}</td>
                <td className="px-4 py-3">
                  <Badge status={u.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminTrips: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-xl font-extrabold text-foreground">Trip Monitor</h2>
        <p className="text-sm text-muted-foreground">Live trips and recent activity</p>
      </div>
      <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2">
        <Download size={16} />
        Export
      </button>
    </div>

    <div className="bg-background rounded-2xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left text-xs text-muted-foreground">
            {["Trip ID", "Passenger", "Driver", "Route", "Fare", "Time", "Status"].map((h) => (
              <th key={h} className="px-4 py-3 font-semibold uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.trips.map((t) => (
            <tr key={t.id} className="border-t border-border">
              <td className="px-4 py-3 font-bold text-primary">{t.id}</td>
              <td className="px-4 py-3">{t.passenger}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.driver}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.route}</td>
              <td className="px-4 py-3 font-semibold">TZS {t.fare}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.time}</td>
              <td className="px-4 py-3">
                <Badge status={t.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminVerify: React.FC = () => (
  <div className="p-6 space-y-4">
    <div>
      <h2 className="text-xl font-extrabold text-foreground">Driver Verification</h2>
      <p className="text-sm text-muted-foreground">Review driver applications and document status.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data.pending.map((p) => (
        <div key={p.name} className="bg-background rounded-2xl border border-border p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-bold text-foreground">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.vehicle}</p>
              <p className="text-xs text-muted-foreground mt-1">Submitted {p.submitted}</p>
            </div>
            <Badge status="pending" />
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { label: "ID Docs", ok: p.docs[0] },
              { label: "Insurance", ok: p.docs[1] },
              { label: "Reg. Cert", ok: p.docs[2] },
            ].map((d) => (
              <span
                key={d.label}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  d.ok ? "bg-primary/10 text-primary border-primary/20" : "bg-destructive/10 text-destructive border-destructive/20"
                }`}
              >
                {d.label}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 px-3 py-2 rounded-xl border border-border text-sm font-semibold">
              View docs
            </button>
            <button className="flex-1 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              Approve
            </button>
            <button className="flex-1 px-3 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminReports: React.FC = () => (
  <div className="p-6 space-y-4">
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-xl font-extrabold text-foreground">LATRA Reports</h2>
        <p className="text-sm text-muted-foreground">Monthly regulatory trip export.</p>
      </div>
      <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2">
        <Download size={16} />
        Export JSON
      </button>
    </div>

    <div className="bg-background rounded-2xl border border-border p-5">
      <p className="text-sm font-semibold text-foreground mb-2">February 2026 summary</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { v: "289", l: "Trips this month" },
          { v: "TZS 4.2M", l: "Total revenue" },
          { v: "24.3 km", l: "Avg distance" },
        ].map((x) => (
          <div key={x.l} className="rounded-xl bg-muted p-4">
            <p className="text-xl font-extrabold text-foreground">{x.v}</p>
            <p className="text-sm text-muted-foreground">{x.l}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdminSettings: React.FC = () => (
  <div className="p-6 space-y-4 max-w-3xl">
    <div>
      <h2 className="text-xl font-extrabold text-foreground">Settings</h2>
      <p className="text-sm text-muted-foreground">Platform configuration and admin preferences.</p>
    </div>

    <div className="bg-background rounded-2xl border border-border p-5 space-y-3">
      {[
        { label: "Commission Rate (%)", value: "5" },
        { label: "Max seats per route", value: "4" },
        { label: "OTP expiry (min)", value: "5" },
      ].map((x) => (
        <div key={x.label} className="flex items-center justify-between gap-4">
          <p className="text-sm text-foreground">{x.label}</p>
          <input
            defaultValue={x.value}
            className="w-24 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground text-right"
          />
        </div>
      ))}

      <button className="mt-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
        Save changes
      </button>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const [page, setPage] = useState<Page>("overview");
  const [collapsed, setCollapsed] = useState(false);

  const PageComp = useMemo(() => {
    const map: Record<Page, React.FC> = {
      overview: AdminOverview,
      trips: AdminTrips,
      users: AdminUsers,
      verify: AdminVerify,
      reports: AdminReports,
      settings: AdminSettings,
    };
    return map[page];
  }, [page]);

  const menu: { id: Page; label: string; Icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "trips", label: "Live Trips", Icon: Route },
    { id: "users", label: "Users", Icon: Users },
    { id: "verify", label: "Verify Drivers", Icon: ShieldCheck },
    { id: "reports", label: "Reports", Icon: FileText },
    { id: "settings", label: "Settings", Icon: Settings },
  ];

  return (
    <div className="h-[calc(100vh-56px)] w-full flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`h-full bg-slate-950 text-white border-r border-white/5 transition-all ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        <div className="h-14 px-3 flex items-center gap-3 border-b border-white/5">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
          >
            <Menu size={18} className="text-white/80" />
          </button>
          {!collapsed && <p className="font-extrabold">Rishfy Admin</p>}
        </div>

        <nav className="p-2 space-y-1">
          {menu.map(({ id, label, Icon }) => {
            const active = page === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPage(id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  active ? "bg-primary/15 text-white" : "text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon size={18} className={active ? "text-primary" : "text-white/60"} />
                {!collapsed && <span className={active ? "font-semibold" : "font-medium"}>{label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-2 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/60 hover:bg-white/5">
            <LogOut size={18} />
            {!collapsed && "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="h-14 bg-background border-b border-border px-5 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="font-bold text-foreground">
              {menu.find((m) => m.id === page)?.label}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center">
              <Bell size={18} className="text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-sm font-extrabold text-primary">AD</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <PageComp />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;


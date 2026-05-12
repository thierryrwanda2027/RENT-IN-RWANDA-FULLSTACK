import { getAdminStats } from "@/lib/listings";

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <p className="text-gray-500">Platform performance at a glance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Users</p>
          <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-green-500 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Listings</p>
          <p className="text-3xl font-bold">{stats.totalListings.toLocaleString()}</p>
          <p className="text-xs text-green-500 mt-2">↑ 5 new this week</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()} RWF</p>
          <p className="text-xs text-blue-500 mt-2">Target: 50M RWF</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Bookings</p>
          <p className="text-3xl font-bold">{stats.activeBookings.toLocaleString()}</p>
          <p className="text-xs text-orange-500 mt-2">Requires attention: 4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                  {i}
                </div>
                <div>
                  <p className="text-sm font-semibold">New listing submitted in Musanze</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-bold mb-6">Quick Tools</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-xl text-left hover:bg-gray-50 transition">
              <span className="block font-bold">Export CSV</span>
              <span className="text-xs text-gray-500">Download stats report</span>
            </button>
            <button className="p-4 border rounded-xl text-left hover:bg-gray-50 transition">
              <span className="block font-bold">Platform Status</span>
              <span className="text-xs text-green-500">All systems operational</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getAdminStats, getAllBookings } from "@/lib/listings";
import { FaUsers, FaHome, FaMoneyBillWave, FaCalendarCheck, FaChartLine, FaShieldAlt, FaTools, FaBell } from "react-icons/fa";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const stats = await getAdminStats();
  const recentBookings = await getAllBookings();

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Admin Console</h1>
            <p className="text-zinc-500 mt-2 font-medium">Welcome back, Thierry. Here's your platform summary.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border border-zinc-200 p-3 rounded-full hover:shadow-md transition relative">
              <FaBell className="text-zinc-600" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition shadow-lg">
              Download Reports
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
            { label: 'Total Listings', value: stats.totalListings, icon: <FaHome />, color: 'text-rose-600', bg: 'bg-rose-50', trend: '+5' },
            { label: 'Total Revenue', value: `${stats.totalRevenue.toLocaleString()} RWF`, icon: <FaMoneyBillWave />, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'RWF 2.4M' },
            { label: 'Active Bookings', value: stats.activeBookings, icon: <FaCalendarCheck />, color: 'text-amber-600', bg: 'bg-amber-50', trend: '4 pending' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 group hover:shadow-md transition duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl text-xl`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Monthly Stats</span>
              </div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-zinc-900 tracking-tighter">{stat.value}</p>
                <span className={`text-xs font-bold ${stat.color}`}>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
            <div className="p-8 border-b border-zinc-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-zinc-900">Recent Transactions</h2>
              <button className="text-sm font-bold underline hover:text-zinc-600">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-50/50">
                    <th className="px-8 py-4">Guest</th>
                    <th className="px-8 py-4">Property</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {recentBookings.slice(0, 5).map((booking, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/50 transition">
                      <td className="px-8 py-5 font-bold text-zinc-900 text-sm">{booking.user}</td>
                      <td className="px-8 py-5 text-zinc-500 text-sm">{booking.listing}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-black text-zinc-900 text-sm">{booking.amount.toLocaleString()} RWF</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions & Tools */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-3xl text-white shadow-xl shadow-zinc-200">
              <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                <FaShieldAlt className="text-rose-500" /> Platform Security
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-zinc-400">Verifications</span>
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded-lg">12 Pending</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[70%]"></div>
                </div>
                <button className="w-full bg-white text-zinc-900 py-3 rounded-xl font-bold hover:bg-zinc-100 transition">
                  Review Identity
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <h3 className="font-black text-zinc-900 mb-6 flex items-center gap-3">
                <FaTools className="text-zinc-400" /> Admin Tools
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <button className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition border border-zinc-100 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-white transition">
                    <FaChartLine className="text-zinc-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-zinc-900">Market Insights</p>
                    <p className="text-[11px] text-zinc-500">View pricing trends in Rwanda</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-50 transition border border-zinc-100 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-white transition">
                    <FaShieldAlt className="text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-zinc-900">User Audit</p>
                    <p className="text-[11px] text-zinc-500">Manage permissions and roles</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

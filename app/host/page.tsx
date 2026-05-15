import { getHostListings, getHostStats } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { FaPlus, FaCalendarCheck, FaStar, FaChartLine, FaWallet, FaCheckCircle } from "react-icons/fa";

export default async function HostPage() {
  const session = await auth();
  const email = session?.user?.email || "";
  const [listings, stats] = await Promise.all([
    getHostListings(email),
    getHostStats(email)
  ]);

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Welcome back, {session?.user?.name?.split(' ')[0]}</h1>
            <p className="text-zinc-500 mt-2 font-medium italic">Your hosting journey continues in Rwanda.</p>
          </div>
          <Link 
            href="/host/listings/new" 
            className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-zinc-800 transition shadow-xl flex items-center gap-2 transform active:scale-95"
          >
            <FaPlus size={14} /> Create new listing
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Summary */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full opacity-50 -mr-8 -mt-8"></div>
               <div className="relative">
                 <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                   <FaWallet className="text-rose-500" /> Earnings Summary
                 </h2>
                 <div className="flex flex-wrap gap-12">
                   <div>
                     <p className="text-zinc-500 text-sm font-bold mb-1">Total Earnings</p>
                     <p className="text-4xl font-black text-zinc-900 tracking-tighter">{(stats.totalEarnings / 1000000).toFixed(1)}M <span className="text-sm font-bold text-zinc-400">RWF</span></p>
                   </div>
                   <div>
                     <p className="text-zinc-500 text-sm font-bold mb-1">Pending payout</p>
                     <p className="text-4xl font-black text-zinc-900 tracking-tighter">{(stats.pendingPayout / 1000000).toFixed(1)}M <span className="text-sm font-bold text-zinc-400">RWF</span></p>
                   </div>
                 </div>
                 <div className="mt-8 pt-8 border-t border-zinc-50 flex gap-4">
                   <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">↑ 24% growth</span>
                   <button className="text-sm font-bold underline hover:text-zinc-600 ml-auto">View transaction history</button>
                 </div>
               </div>
            </section>

            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-zinc-900">Your reservations</h2>
                <div className="flex gap-4">
                  <button className="text-sm font-bold underline">Calendar view</button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[`Checking out (0)`, `Currently hosting (${stats.activeReservations})`, `Arriving soon (0)`].map((tab, i) => (
                  <button key={i} className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition border ${i === 1 && stats.activeReservations > 0 ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300 hover:text-zinc-900'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              
              {stats.activeReservations === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-zinc-100 rounded-[2rem] bg-zinc-50/50">
                  <FaCalendarCheck size={40} className="mx-auto text-zinc-200 mb-4" />
                  <p className="text-zinc-400 font-bold max-w-xs mx-auto">You don't have any guests checking out today or tomorrow.</p>
                </div>
              ) : (
                <div className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                  <p className="text-zinc-900 font-bold">You have {stats.activeReservations} active reservation(s).</p>
                  <Link href="/host/reservations" className="text-rose-500 font-bold underline text-sm mt-2 inline-block">View details</Link>
                </div>
              )}
            </section>

            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-zinc-900">Your listings</h2>
                <Link href="/host/listings" className="text-sm font-bold underline hover:text-zinc-600">Manage all ({listings.length})</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.slice(0, 4).map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`} className="flex gap-6 p-6 bg-zinc-50/50 hover:bg-white rounded-3xl transition duration-300 border border-transparent hover:border-zinc-100 group cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                      <Image src={listing.img} alt={listing.title} fill className="object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-black text-zinc-900 leading-tight mb-1">{listing.title}</h4>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{listing.location}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Active listing</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {listings.length === 0 && (
                   <p className="text-zinc-400 font-bold py-10 col-span-2 text-center">No listings yet. Start hosting today!</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-zinc-200 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-rose-500 rounded-tl-full opacity-20 -mr-4 -mb-4"></div>
              <h3 className="text-xl font-black mb-1 flex items-center gap-3">
                <FaStar className="text-rose-500" /> Superhost
              </h3>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-10">Review period ends in 12 days</p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400">
                    <span>Overall Rating</span>
                    <span className="text-white">4.9 / 4.8</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400">
                    <span>Response Rate</span>
                    <span className="text-white">100% / 90%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[95%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-zinc-800 text-center">
                <button className="text-sm font-bold text-rose-500 underline">View detailed progress</button>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <h3 className="font-black text-zinc-900 mb-8 flex items-center gap-3">
                <FaChartLine className="text-rose-500" /> Hosting Tips
              </h3>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-xl shrink-0">
                    📸
                  </div>
                  <p className="text-sm font-bold text-zinc-600 leading-relaxed">Add more high-quality photos to your listings to attract 3x more bookings.</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl shrink-0">
                    📈
                  </div>
                  <p className="text-sm font-bold text-zinc-600 leading-relaxed">Demand is rising in Kigali! Consider adjusting your weekend prices.</p>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-zinc-50">
                <button className="w-full bg-zinc-50 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition">Explore Resource Center</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

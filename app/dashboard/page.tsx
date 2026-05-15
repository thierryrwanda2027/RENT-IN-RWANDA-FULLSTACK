import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserBookings } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage({ searchParams }: Props) {
  const { tab = "upcoming" } = await searchParams;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const allBookings = await getUserBookings(session.user.email!);
  
  const now = new Date();
  const bookings = allBookings.filter(b => {
    const checkInDate = new Date(b.checkIn);
    if (tab === "upcoming") return checkInDate >= now;
    return checkInDate < now;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-12">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">Trips</h1>
          <p className="text-zinc-500 font-medium">Manage your {tab} adventures.</p>
        </header>

        <div className="space-y-12">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-zinc-100 mb-8">
            <Link 
              href="/dashboard?tab=upcoming" 
              className={`pb-4 text-sm font-bold transition ${tab === "upcoming" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              Upcoming
            </Link>
            <Link 
              href="/dashboard?tab=past" 
              className={`pb-4 text-sm font-bold transition ${tab === "past" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
            >
              Past
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="space-y-16">
              <div className="border-y border-zinc-100 py-16">
                <div className="max-w-md">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-2">No {tab} trips...yet!</h2>
                  <p className="text-zinc-500 mb-8 leading-relaxed">Time to dust off your bags and start planning your next adventure. Explore the beauty of Rwanda with RENT IN RWANDA.</p>
                  <Link 
                    href="/" 
                    className="inline-block bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition shadow-lg transform active:scale-95"
                  >
                    Start searching
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex flex-col md:flex-row bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative w-full md:w-64 aspect-[4/3] md:aspect-square overflow-hidden">
                    <Image 
                      src={booking.img} 
                      alt={booking.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${tab === 'upcoming' ? 'text-emerald-700' : 'text-zinc-500'}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-xl text-zinc-900 leading-tight">{booking.title}</h3>
                      </div>
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-3 text-zinc-500">
                          <FaMapMarkerAlt className="text-zinc-400" />
                          <span className="text-sm font-medium">{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-500">
                          <FaCalendarAlt className="text-zinc-400" />
                          <span className="text-sm font-medium">{booking.checkIn} - {booking.checkOut}</span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-500">
                          <FaCreditCard className="text-zinc-400" />
                          <span className="text-sm font-bold text-zinc-900">{booking.price.toLocaleString()} RWF total</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                      <Link href={`/listings/${booking.listingId}`} className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-zinc-800 transition text-center">View Listing</Link>
                      <button className="px-6 border border-zinc-200 py-3 rounded-xl font-bold text-sm hover:bg-zinc-50 transition">Support</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

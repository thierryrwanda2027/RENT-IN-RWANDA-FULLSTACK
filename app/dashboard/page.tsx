import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserBookings } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await getUserBookings(session.user.email!);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-screen-lg mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user.name?.split(' ')[0] || 'User'}!</h1>
          <p className="text-gray-500">Member since May 2026 · {session.user.email}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Sidebar Stats */}
          <div className="space-y-6">
            <div className="border rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-4">Account Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Total Bookings</span>
                  <span className="font-bold">{bookings.length}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-500 text-sm">Member Status</span>
                  <span className="text-rose-500 font-bold text-sm">SuperGuest</span>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 bg-slate-900 text-white shadow-sm">
              <h3 className="font-bold text-lg mb-2">Hosting</h3>
              <p className="text-sm text-slate-400 mb-6">Earn extra income by sharing your space in Rwanda.</p>
              <button className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600 transition">
                Start Hosting
              </button>
            </div>
          </div>

          {/* Right Column: Bookings List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Your Trips</h2>
            
            {bookings.length === 0 ? (
              <div className="border rounded-2xl p-10 text-center bg-gray-50">
                <p className="text-gray-500">You have no upcoming trips.</p>
                <Link href="/listings" className="mt-4 inline-block text-rose-500 font-bold underline">
                  Explore Rwanda
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 md:h-auto">
                      <Image 
                        src={booking.img} 
                        alt={booking.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{booking.title}</h4>
                          <p className="text-sm text-gray-500">{booking.location}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="mt-auto grid grid-cols-2 gap-4 border-t pt-4">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-bold">Check-in</p>
                          <p className="text-sm font-semibold">{booking.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-bold">Check-out</p>
                          <p className="text-sm font-semibold">{booking.checkOut}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

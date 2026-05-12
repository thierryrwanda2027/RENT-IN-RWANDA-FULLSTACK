import { getHostListings } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function HostPage() {
  const session = await auth();
  const listings = await getHostListings(session?.user?.email || "");

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome back, {session?.user?.name?.split(' ')[0]}</h1>
          <p className="text-gray-500 mt-2">Here's what's happening with your properties today.</p>
        </div>
        <Link 
          href="/host/listings/new" 
          className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
        >
          Create new listing
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reservation Summary */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border">
            <h2 className="text-xl font-bold mb-6">Your reservations</h2>
            <div className="flex gap-4 mb-8">
              <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-bold border border-black">Checking out (0)</button>
              <button className="px-4 py-2 hover:bg-gray-50 rounded-full text-sm font-bold border border-transparent hover:border-gray-300 transition">Currently hosting (2)</button>
              <button className="px-4 py-2 hover:bg-gray-50 rounded-full text-sm font-bold border border-transparent hover:border-gray-300 transition">Arriving soon (1)</button>
            </div>
            
            <div className="py-20 text-center border-2 border-dashed rounded-2xl bg-gray-50">
              <p className="text-gray-400 font-medium">You don't have any guests checking out today or tomorrow.</p>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your listings</h2>
              <Link href="/host/listings" className="text-sm font-bold underline">View all ({listings.length})</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition group cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={listing.img} alt={listing.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-sm group-hover:text-rose-500 transition">{listing.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{listing.location}</p>
                    <p className="text-xs font-bold mt-2 text-green-600">Active</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Hosting Stats */}
        <div className="space-y-6">
          <div className="bg-rose-500 p-8 rounded-3xl text-white shadow-xl shadow-rose-100">
            <h3 className="text-lg font-bold mb-1">Superhost Progress</h3>
            <p className="text-rose-100 text-xs mb-6">Review period ends in 12 days</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Rating</span>
                  <span>4.9 / 4.8</span>
                </div>
                <div className="h-1.5 bg-rose-400 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Response Rate</span>
                  <span>100% / 90%</span>
                </div>
                <div className="h-1.5 bg-rose-400 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[95%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border">
            <h3 className="font-bold mb-4">Hosting tips</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-2xl">📸</span>
                <p className="text-sm text-gray-600">Add more photos to your Musanze listing to attract more guests.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">💰</span>
                <p className="text-sm text-gray-600">Guests are looking for stays in Kigali. Consider adjusting your price.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

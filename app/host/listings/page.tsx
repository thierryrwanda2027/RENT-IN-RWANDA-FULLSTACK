import { getHostListings } from "@/lib/listings";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

export const dynamic = 'force-dynamic';

export default async function HostListingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const listings = await getHostListings(session.user.email!);

  return (
    <div className="min-h-screen bg-white pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Your Listings</h1>
            <p className="text-zinc-500 mt-2 font-medium">Manage and optimize your properties.</p>
          </div>
          <Link 
            href="/host/listings/new" 
            className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-zinc-800 transition shadow-xl flex items-center gap-2 transform active:scale-95"
          >
            <FaPlus size={14} /> Create new listing
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {listings.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
              <p className="text-zinc-400 font-bold">You don't have any listings yet.</p>
              <Link href="/host/listings/new" className="text-rose-500 font-bold underline mt-2 inline-block">
                Create your first listing
              </Link>
            </div>
          ) : (
            listings.map((listing) => (
              <div key={listing.id} className="flex flex-col md:flex-row gap-8 p-8 bg-white border border-zinc-100 rounded-[2.5rem] hover:shadow-2xl transition duration-500 group">
                <div className="relative w-full md:w-72 aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                  <Image src={listing.img} alt={listing.title} fill className="object-cover group-hover:scale-110 transition duration-1000" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${listing.available ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {listing.available ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-zinc-900 mb-1">{listing.title}</h3>
                        <p className="text-zinc-500 font-bold flex items-center gap-2">
                          {listing.location} <span className="text-zinc-300">|</span> {listing.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-zinc-900">{listing.price.toLocaleString()} RWF</p>
                        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">per night</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-8">
                      <div className="bg-zinc-50 px-6 py-3 rounded-2xl">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Rating</p>
                        <p className="text-lg font-black text-zinc-900 flex items-center gap-2">★ {listing.rating}</p>
                      </div>
                      <div className="bg-zinc-50 px-6 py-3 rounded-2xl">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Views</p>
                        <p className="text-lg font-black text-zinc-900">1.2k</p>
                      </div>
                      <div className="bg-zinc-50 px-6 py-3 rounded-2xl">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Bookings</p>
                        <p className="text-lg font-black text-zinc-900">24</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Link href={`/listings/${listing.id}`} className="flex-1 bg-zinc-50 text-zinc-900 py-4 rounded-2xl font-black text-sm hover:bg-zinc-100 transition flex items-center justify-center gap-2">
                      <FaEye /> Preview
                    </Link>
                    <button className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-zinc-800 transition flex items-center justify-center gap-2">
                      <FaEdit /> Edit Listing
                    </button>
                    <button className="px-6 border border-rose-100 text-rose-500 py-4 rounded-2xl font-black text-sm hover:bg-rose-50 transition flex items-center justify-center">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

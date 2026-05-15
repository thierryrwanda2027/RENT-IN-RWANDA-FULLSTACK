import { getListings } from "@/lib/listings";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { FaHome, FaCampground, FaCity, FaUmbrellaBeach, FaTree } from "react-icons/fa";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ 
    category?: string;
    location?: string;
    guests?: string;
  }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { category, location, guests } = await searchParams;
  const listings = await getListings({ 
    category, 
    location, 
    guests: guests ? parseInt(guests) : undefined 
  });

  const categories = [
    { label: 'Modern', icon: FaHome, value: 'modern' },
    { label: 'Camping', icon: FaCampground, value: 'camping' },
    { label: 'City', icon: FaCity, value: 'city' },
    { label: 'Beach', icon: FaUmbrellaBeach, value: 'beach' },
    { label: 'Countryside', icon: FaTree, value: 'countryside' },
  ];

  return (
    <div className="pb-20">
      {/* Category Filter Bar */}
      <div className="sticky top-[81px] z-40 bg-white border-b py-4 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 md:px-10 flex gap-8 md:gap-12 items-center justify-start md:justify-center">
          {categories.map((cat) => (
            <Link 
              key={cat.label} 
              href={`/?category=${cat.value}`}
              className={`flex flex-col items-center gap-2 transition whitespace-nowrap min-w-fit pb-2 border-b-2 ${
                category === cat.value 
                  ? 'text-black border-black' 
                  : 'text-gray-500 border-transparent hover:text-black hover:border-gray-300'
              }`}
            >
              <cat.icon size={24} />
              <span className="text-xs font-semibold">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="group cursor-pointer">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-3 shadow-md">
                <Link href={`/listings/${listing.id}`} className="relative block h-full w-full">
                  <SafeImage
                    src={listing.img}
                    alt={listing.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={listing.id <= 8}
                  />
                </Link>
                <div className="absolute top-3 right-3">
                  <FavoriteButton listingId={listing.id} />
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[15px] text-zinc-900">{listing.location}</h3>
                  <p className="text-zinc-500 text-sm">{listing.category}</p>
                  <p className="text-zinc-400 text-sm mb-1">{listing.available ? 'Available now' : 'Available soon'}</p>
                  <p className="mt-1">
                    <span className="font-bold text-zinc-900">RWF {listing.price.toLocaleString()}</span>
                    <span className="text-zinc-500 font-light"> night</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-900">
                  <span className="text-[12px]">★</span>
                  <span>{listing.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {listings.length === 0 && (
          <div className="text-center py-40">
            <h3 className="text-2xl font-bold text-gray-700">No listings found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* Floating Map Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <button className="bg-zinc-900 hover:bg-black text-white px-5 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
          <span>Show map</span>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><path d="M10 3.333L22 8v16L10 19.333z" fill="none"></path><path d="M22 8l8-4.667v16L22 24m-12-4.667l-8 4.667v-16L10 3.333"></path></svg>
        </button>
      </div>
    </div>
  );
}

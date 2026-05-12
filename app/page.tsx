import { getListings } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { FaHome, FaCampground, FaCity, FaUmbrellaBeach, FaTree } from "react-icons/fa";

export default async function HomePage() {
  const listings = await getListings();

  const categories = [
    { label: 'Modern', icon: FaHome },
    { label: 'Camping', icon: FaCampground },
    { label: 'City', icon: FaCity },
    { label: 'Beach', icon: FaUmbrellaBeach },
    { label: 'Countryside', icon: FaTree },
  ];

  return (
    <div className="pb-20">
      {/* Category Filter Bar */}
      <div className="sticky top-[81px] z-40 bg-white border-b py-4 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 md:px-10 flex gap-8 md:gap-12 items-center justify-start md:justify-center">
          {categories.map((cat) => (
            <button key={cat.label} className="flex flex-col items-center gap-2 text-gray-500 hover:text-black border-b-2 border-transparent hover:border-gray-300 pb-2 transition whitespace-nowrap min-w-fit">
              <cat.icon size={24} />
              <span className="text-xs font-semibold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="group cursor-pointer">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-3 shadow-md">
                <Link href={`/listings/${listing.id}`} className="relative block h-full w-full">
                  <Image
                    src={listing.img}
                    alt={listing.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    priority={listing.id <= 8}
                  />
                </Link>
                <div className="absolute top-3 right-3">
                  <FavoriteButton listingId={listing.id} />
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[15px]">{listing.location}</h3>
                  <p className="text-gray-500 text-sm">{listing.category}</p>
                  <p className="text-gray-400 text-sm mb-1">Available soon</p>
                  <p className="mt-1">
                    <span className="font-bold">{listing.price.toLocaleString()} RWF</span>
                    <span className="text-gray-400 font-light"> night</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <span>★</span>
                  <span>{listing.rating}</span>
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
    </div>
  );
}

import { getListings } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import SearchBar from "@/components/SearchBar";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const allListings = await getListings();
  const { query: queryRaw } = await searchParams;
  const query = queryRaw?.toLowerCase() || "";
  
  const listings = allListings.filter((l) => 
    l.title.toLowerCase().includes(query) || 
    l.location.toLowerCase().includes(query) ||
    l.category.toLowerCase().includes(query)
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="text-3xl font-bold">Popular homes in Rwanda</h1>
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
      </div>
      
      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No listings found for "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {listings.map((listing) => (
          <div key={listing.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
              <Link href={`/listings/${listing.id}`}>
                <Image
                  src={listing.img}
                  alt={listing.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </Link>
              <div className="absolute top-3 right-3">
                <FavoriteButton listingId={listing.id} />
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">{listing.location}</h3>
                <p className="text-gray-500 text-sm">{listing.category}</p>
                <p className="mt-1">
                  <span className="font-bold">{listing.price.toLocaleString()} RWF</span>
                  <span className="text-gray-500"> night</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>★</span>
                <span>{listing.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

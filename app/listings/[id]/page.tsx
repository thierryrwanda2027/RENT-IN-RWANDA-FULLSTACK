import { getListing, getListings } from "@/lib/listings";
import { notFound } from "next/navigation";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";

interface Props {
  params: Promise<{ id: string }>;
}

// Pre-render all listing pages at build time
export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({
    id: l.id.toString(),
  }));
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
        <div className="flex justify-between items-end mb-6 text-sm font-semibold underline">
          <div>{listing.location}</div>
          <div className="flex gap-4">
            <span>Share</span>
            <span>Save</span>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl mb-10">
          <Image
            src={listing.img}
            alt={listing.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className="border-b pb-8 mb-8">
              <h2 className="text-xl font-bold">Entire home hosted by Elias</h2>
              <p className="text-gray-500">2 guests · 1 bedroom · 1 bed · 1 bath</p>
            </div>

            <div className="listing-description text-gray-700 leading-relaxed mb-8">
              {listing.description}
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-bold mb-4">What this place offers</h3>
              <ul className="grid grid-cols-2 gap-4">
                <li>🍳 Kitchen</li>
                <li>📶 Wifi</li>
                <li>🚗 Free parking</li>
                <li>❄️ Air conditioning</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-28 border rounded-xl p-6 shadow-xl bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xl font-bold">{listing.price.toLocaleString()} RWF</span>
                  <span className="text-gray-500"> night</span>
                </div>
                <div className="text-sm font-semibold">
                  ★ {listing.rating}
                </div>
              </div>

              <BookingForm listingId={listing.id} />

              <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getListing, getListings } from "@/lib/listings";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import BookingForm from "@/components/BookingForm";
import { FaStar, FaShare, FaHeart, FaMedal, FaCheckCircle } from "react-icons/fa";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-10 py-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Title and Action Buttons */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{listing.title}</h1>
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><FaStar size={12} /> {listing.rating}</span>
              <span>·</span>
              <span className="underline cursor-pointer">12 reviews</span>
              <span>·</span>
              {listing.superhost && (
                <span className="flex items-center gap-1 text-gray-500 font-normal"><FaMedal size={12} /> Superhost</span>
              )}
              <span className="hidden md:inline">·</span>
              <span className="underline cursor-pointer">{listing.location}</span>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition underline">
                <FaShare size={14} /> Share
              </button>
              <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition underline">
                <FaHeart size={14} /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery - Airbnb Style */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12 shadow-inner">
          <div className="md:col-span-2 md:row-span-2 relative h-full w-full">
            <SafeImage
              src={listing.img}
              alt={listing.title}
              fill
              className="object-cover hover:brightness-90 transition cursor-pointer"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            />
          </div>
          {/* Secondary images (faked using the same image with different crops/filters for demonstration) */}
          <div className="hidden md:block relative h-full w-full">
            <SafeImage src={listing.img} alt="Interior" fill className="object-cover hover:brightness-90 transition cursor-pointer opacity-90" sizes="25vw" />
          </div>
          <div className="hidden md:block relative h-full w-full">
            <SafeImage src={listing.img} alt="Bathroom" fill className="object-cover hover:brightness-90 transition cursor-pointer opacity-80" sizes="25vw" />
          </div>
          <div className="hidden md:block relative h-full w-full">
            <SafeImage src={listing.img} alt="Bedroom" fill className="object-cover hover:brightness-90 transition cursor-pointer opacity-70" sizes="25vw" />
          </div>
          <div className="hidden md:block relative h-full w-full">
            <SafeImage src={listing.img} alt="Kitchen" fill className="object-cover hover:brightness-90 transition cursor-pointer opacity-60" sizes="25vw" />
            <div className="absolute bottom-4 right-4 bg-white border border-black px-4 py-1.5 rounded-lg text-sm font-bold shadow-md cursor-pointer hover:bg-gray-50 z-10">
              Show all photos
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center border-b pb-8 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-1">Entire home hosted by Thierry</h2>
                <p className="text-gray-500 font-light">4 guests · 2 bedrooms · 2 beds · 2 baths</p>
              </div>
              <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500">
                T
              </div>
            </div>

            {/* Unique Airbnb Features */}
            <div className="space-y-6 border-b pb-8 mb-8">
              <div className="flex gap-4">
                <FaMedal size={24} className="mt-1 text-zinc-900" />
                <div>
                  <h4 className="font-bold text-zinc-900">Thierry is a Superhost</h4>
                  <p className="text-sm text-zinc-500">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaCheckCircle size={24} className="mt-1 text-zinc-900" />
                <div>
                  <h4 className="font-bold text-zinc-900 text-neat">Self check-in</h4>
                  <p className="text-sm text-zinc-500">Check yourself in with the lockbox.</p>
                </div>
              </div>
            </div>

            <div className="listing-description text-zinc-700 leading-relaxed mb-8 text-[16px]">
              <p className="mb-4">{listing.description}</p>
              <p className="underline font-bold cursor-pointer text-zinc-900 hover:text-black">Show more</p>
            </div>

            <div className="border-t border-zinc-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-zinc-900">What this place offers</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                <li className="flex items-center gap-4 text-zinc-700 font-medium text-sm">🍳 Kitchen</li>
                <li className="flex items-center gap-4 text-zinc-700 font-medium text-sm">📶 Fast wifi – 45 Mbps</li>
                <li className="flex items-center gap-4 text-zinc-700 font-medium text-sm">🚗 Free parking on premises</li>
                <li className="flex items-center gap-4 text-zinc-700 font-medium text-sm">❄️ Central air conditioning</li>
                <li className="flex items-center gap-4 text-zinc-700 font-medium text-sm">⛲ Lake view</li>
                <li className="flex items-center gap-4 text-zinc-300 line-through text-sm">📺 TV</li>
              </ul>
              <button className="mt-8 border border-zinc-900 px-6 py-3 rounded-lg font-bold text-zinc-900 hover:bg-zinc-50 transition-all">
                Show all 24 amenities
              </button>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="relative">
            <div className="sticky top-28 border border-zinc-200 rounded-2xl p-6 shadow-2xl bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-2xl font-bold text-zinc-900">RWF {listing.price.toLocaleString()}</span>
                  <span className="text-zinc-500 font-light"> night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-900">
                  <FaStar className="text-[12px]" /> {listing.rating.toFixed(1)} · <span className="underline text-zinc-400 font-normal">12 reviews</span>
                </div>
              </div>

              <BookingForm listingId={listing.id} />

              <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
              
              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <div className="flex justify-between underline">
                  <span>{listing.price.toLocaleString()} RWF x 5 nights</span>
                  <span>{(listing.price * 5).toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between underline">
                  <span>Cleaning fee</span>
                  <span>25,000 RWF</span>
                </div>
                <div className="flex justify-between underline">
                  <span>Airbnb service fee</span>
                  <span>15,000 RWF</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-bold text-black text-base">
                  <span>Total before taxes</span>
                  <span>{(listing.price * 5 + 40000).toLocaleString()} RWF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

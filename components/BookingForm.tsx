"use client";

import { createBooking } from "@/actions/bookings";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  listingId: number;
}

export default function BookingForm({ listingId }: BookingFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const checkIn = formData.get("checkIn");
    const checkOut = formData.get("checkOut");
    const guests = formData.get("guests");

    router.push(`/listings/${listingId}/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests} guest`);
  };

  return (
    <div className="flex flex-col gap-4">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="listingId" value={listingId} />
        
        <div className="grid grid-cols-2 border border-zinc-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-zinc-900 focus-within:border-zinc-900 transition-all">
          <div className="p-3 border-r border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
            <label className="block text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider mb-0.5">Check-in</label>
            <input type="date" name="checkIn" className="w-full text-[13px] font-medium outline-none bg-transparent text-zinc-900 cursor-pointer" required />
          </div>
          <div className="p-3 border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
            <label className="block text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider mb-0.5">Checkout</label>
            <input type="date" name="checkOut" className="w-full text-[13px] font-medium outline-none bg-transparent text-zinc-900 cursor-pointer" required />
          </div>
          <div className="col-span-2 p-3 hover:bg-zinc-50 transition-colors">
            <label className="block text-[10px] font-extrabold uppercase text-zinc-500 tracking-wider mb-0.5">Guests</label>
            <select name="guests" className="w-full text-[13px] font-medium outline-none bg-transparent text-zinc-900 cursor-pointer">
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg">
            <p className="text-rose-600 text-xs font-bold leading-tight">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#FF385C] text-white py-3.5 rounded-lg font-bold text-[16px] hover:brightness-95 transition-all disabled:bg-zinc-200 disabled:text-zinc-400 shadow-md active:scale-[0.98]"
        >
          {isPending ? "Reserving..." : "Reserve"}
        </button>
      </form>
    </div>
  );
}

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
    setIsPending(true);
    setError(null);
    
    try {
      const result = await createBooking(formData);
      
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "Failed to create booking. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="listingId" value={listingId} />
        
        <div className="grid grid-cols-2 border rounded-lg overflow-hidden">
          <div className="p-2 border-r border-b">
            <label className="block text-[10px] font-bold uppercase text-gray-500">Check-in</label>
            <input type="date" name="checkIn" className="w-full text-sm outline-none" required />
          </div>
          <div className="p-2 border-b">
            <label className="block text-[10px] font-bold uppercase text-gray-500">Checkout</label>
            <input type="date" name="checkOut" className="w-full text-sm outline-none" required />
          </div>
          <div className="col-span-2 p-2">
            <label className="block text-[10px] font-bold uppercase text-gray-500">Guests</label>
            <select name="guests" className="w-full text-sm outline-none bg-transparent">
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </div>
        </div>

        {error && <p className="text-rose-500 text-xs font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-rose-500 text-white py-3 rounded-lg font-bold hover:bg-rose-600 transition disabled:bg-gray-300 shadow-sm active:scale-[0.98]"
        >
          {isPending ? "Reserving..." : "Reserve"}
        </button>
      </form>
    </div>
  );
}

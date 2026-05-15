"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { IoChevronBack, IoStar } from 'react-icons/io5';
import { Listing } from '@/types';
import { createBooking } from '@/actions/bookings';
import { useTransition } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isPending, startTransition] = useTransition();
  const guestsParam = searchParams.get('guests') || '1 adult';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = guestsParam.split(' ')[0] || '1';

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`);
        if (!response.ok) throw new Error('Failed to fetch listing');
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    if (id) fetchListing();
  }, [id]);

  if (!listing) return null;

  const calculateNights = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const totalNights = calculateNights(checkIn, checkOut);
  const totalPrice = listing.price * totalNights;

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append('listingId', id as string);
    formData.append('checkIn', checkIn);
    formData.append('checkOut', checkOut);
    formData.append('guests', guests);

    startTransition(async () => {
      try {
        const result = await createBooking(formData);
        if (result.success) {
          router.push('/dashboard');
        } else {
          alert(result.error || 'Something went wrong. Please check if you are logged in.');
        }
      } catch (error: any) {
        alert(error.message || 'Failed to confirm booking');
      }
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="border-b border-zinc-100 py-6 px-4 md:px-10 flex items-center gap-8">
        <button onClick={() => router.back()} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
          <IoChevronBack size={20} className="text-zinc-900" />
        </button>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Confirm and pay</h1>
      </header>

      <main className="container mx-auto px-4 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Column: Form Sections */}
        <div className="space-y-12">
          {/* Step 1: When to Pay */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">1. Choose when to pay</h2>
            </div>
            
            <div className="border border-zinc-200 rounded-2xl overflow-hidden">
              {/* Pay Now */}
              <label className="flex items-start justify-between p-6 cursor-pointer hover:bg-zinc-50 transition-colors border-b border-zinc-100">
                <div className="space-y-1">
                  <span className="font-bold text-zinc-900 text-lg">Pay ${totalPrice.toLocaleString()} now</span>
                  <p className="text-zinc-500 text-sm">Pay the total now and you're all set.</p>
                </div>
                <input type="radio" name="payment_type" defaultChecked className="mt-1 w-6 h-6 accent-zinc-900" />
              </label>

              {/* Pay Later */}
              <label className="flex items-start justify-between p-6 cursor-pointer hover:bg-zinc-50 transition-colors">
                <div className="space-y-1">
                  <span className="font-bold text-zinc-900 text-lg">Pay $0 now</span>
                  <p className="text-zinc-500 text-sm">${totalPrice.toLocaleString()} charged on Jul 22. No extra fees.</p>
                </div>
                <input type="radio" name="payment_type" className="mt-1 w-6 h-6 accent-zinc-900" />
              </label>
            </div>
            
            <button 
              onClick={handleConfirm}
              disabled={isPending}
              className="mt-6 bg-zinc-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all transform active:scale-95 shadow-lg disabled:bg-zinc-400 disabled:cursor-not-allowed"
            >
              {isPending ? 'Processing...' : 'Confirm and pay'}
            </button>
          </section>

          {/* Step 2: Placeholder */}
          <section className="opacity-40 pointer-events-none">
            <h2 className="text-2xl font-bold text-zinc-900 pb-8 border-b border-zinc-100">2. Add a payment method</h2>
          </section>

          {/* Step 3: Placeholder */}
          <section className="opacity-40 pointer-events-none">
            <h2 className="text-2xl font-bold text-zinc-900 pb-8 border-b border-zinc-100">3. Review your reservation</h2>
          </section>
        </div>

        {/* Right Column: Price Summary Sticky Card */}
        <div className="relative">
          <div className="sticky top-10 border border-zinc-200 rounded-2xl p-6 shadow-xl bg-white space-y-6">
            {/* Property Brief */}
            <div className="flex gap-4 pb-6 border-b border-zinc-100">
              <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
                <Image src={listing.img} alt={listing.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-zinc-900 font-bold leading-tight">{listing.title}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{listing.category} in Rwanda</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-zinc-900 font-bold">
                  <IoStar className="text-rose-500" />
                  <span>{listing.rating}</span>
                  <span className="text-zinc-400 font-normal">(5)</span>
                </div>
              </div>
            </div>

            {/* Protection Note */}
            <div className="py-2 border-b border-zinc-100">
              <p className="text-zinc-900 text-sm font-bold">Free cancellation</p>
              <p className="text-zinc-500 text-sm mt-1">Cancel before July 30 for a full refund. <span className="underline font-bold cursor-pointer">Full policy</span></p>
            </div>

            {/* Dates & Guests */}
            <div className="space-y-4 py-2 border-b border-zinc-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-zinc-900 font-bold">Dates</p>
                  <p className="text-zinc-500 text-sm">{checkIn} – {checkOut}</p>
                </div>
                <button className="font-bold underline text-sm hover:text-zinc-600">Change</button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-zinc-900 font-bold">Guests</p>
                  <p className="text-zinc-500 text-sm">{guests}</p>
                </div>
                <button className="font-bold underline text-sm hover:text-zinc-600">Change</button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 pt-2">
              <h4 className="text-lg font-bold text-zinc-900">Price details</h4>
              <div className="flex justify-between text-zinc-900">
                <span>${listing.price.toLocaleString()} x {totalNights} nights</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-900 font-bold text-lg pt-4 border-t border-zinc-100">
                <span>Total <span className="underline">(USD)</span></span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <button className="text-zinc-900 text-sm font-bold underline text-center w-full block mt-4">
                Price breakdown
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

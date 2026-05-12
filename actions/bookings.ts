"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const bookingSchema = z.object({
  listingId: z.coerce.number(),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.coerce.number().min(1).max(16),
});

export async function createBooking(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to book");
  }

  const rawData = {
    listingId: formData.get("listingId"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    guests: formData.get("guests"),
  };

  const validation = bookingSchema.safeParse(rawData);

  if (!validation.success) {
    return { 
      success: false, 
      errors: validation.error.flatten().fieldErrors 
    };
  }

  const { listingId, checkIn, checkOut, guests } = validation.data;

  // Fetch listing to get the price
  const listing = await prisma.listing.findUnique({
    where: { id: listingId }
  });

  if (!listing) {
    return { success: false, error: "Listing not found" };
  }

  // Calculate total price (simplified: price * number of nights)
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const totalPrice = listing.price * diffDays;

  try {
    console.log("Creating booking for user:", (session.user as any).id);
    console.log("Listing ID:", listingId);
    console.log("Dates:", checkIn, "to", checkOut);

    const booking = await prisma.booking.create({
      data: {
        listingId,
        userId: (session.user as any).id,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        status: "CONFIRMED"
      }
    });

    console.log("Booking created successfully:", booking.id);

    // Revalidate relevant pages
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    revalidatePath(`/listings/${listingId}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("CRITICAL ERROR in createBooking:", error.message || error);
    return { success: false, error: error.message || "Database error occurred" };
  }
}

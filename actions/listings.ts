"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  location: z.string().min(3, "Location is required"),
  price: z.coerce.number().min(1000, "Price must be at least 1000 RWF"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  img: z.string().url("Valid image URL is required"),
});

export async function createListing(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { success: false, error: "You must be logged in to host a property" };
  }

  const rawData = {
    title: formData.get("title"),
    location: formData.get("location"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description"),
    img: formData.get("img"),
  };

  const validation = listingSchema.safeParse(rawData);

  if (!validation.success) {
    return { 
      success: false, 
      error: validation.error.issues[0].message 
    };
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        ...validation.data,
        rating: 5.0, // Default for new listing
        superhost: false,
        available: true,
        availableFrom: new Date().toISOString().split('T')[0],
        userId: (session.user as any).id,
      }
    });

    revalidatePath("/");
    revalidatePath("/host/listings");
    
    return { success: true, id: listing.id };
  } catch (error: any) {
    console.error("Error creating listing:", error);
    return { success: false, error: "Failed to create listing. Please try again." };
  }
}

export async function deleteListing(id: number) {
  const session = await auth();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Ensure the user owns the listing or is an admin
    const listing = await prisma.listing.findUnique({
      where: { id }
    });

    if (!listing || (listing.userId !== (session.user as any).id && (session.user as any).role !== 'ADMIN')) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.listing.delete({
      where: { id }
    });

    revalidatePath("/");
    revalidatePath("/host/listings");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to delete listing" };
  }
}

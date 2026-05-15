"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(listingId: number) {
  const session = await auth();

  if (!session?.user) {
    return { success: false, error: "You must be logged in to save favorites" };
  }

  const userId = (session.user as any).id;

  try {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId,
          listingId
        }
      }
    });

    if (existing) {
      await prisma.favorite.delete({
        where: {
          id: existing.id
        }
      });
      revalidatePath("/");
      return { success: true, isFavorite: false };
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          listingId
        }
      });
      revalidatePath("/");
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    return { success: false, error: "Failed to update favorites" };
  }
}

export async function getIsFavorite(listingId: number) {
  const session = await auth();
  if (!session?.user) return false;

  const userId = (session.user as any).id;
  
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_listingId: {
        userId,
        listingId
      }
    }
  });

  return !!favorite;
}

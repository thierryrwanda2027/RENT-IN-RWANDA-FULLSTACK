import { Listing } from '../types';
import { prisma } from './prisma';

export async function getListings(): Promise<Listing[]> {
  try {
    const listings = await prisma.listing.findMany();
    return listings as Listing[];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export async function getListing(id: string | number): Promise<Listing | null> {
  try {
    const listingId = typeof id === 'string' ? parseInt(id) : id;
    if (isNaN(listingId)) return null;
    
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    });
    return listing as Listing | null;
  } catch (error) {
    console.error(`Error fetching listing ${id}:`, error);
    return null;
  }
}

export async function getAdminStats() {
  try {
    const [totalUsers, totalListings, totalRevenueResult, activeBookings] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count(),
      prisma.booking.aggregate({
        _sum: {
          totalPrice: true
        },
        where: {
          status: 'Confirmed'
        }
      }),
      prisma.booking.count({
        where: {
          status: 'Confirmed'
        }
      })
    ]);

    return {
      totalUsers,
      totalListings,
      totalRevenue: totalRevenueResult._sum.totalPrice || 0,
      activeBookings
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      totalListings: 0,
      totalRevenue: 0,
      activeBookings: 0
    };
  }
}

export async function getPendingListings(): Promise<Listing[]> {
  try {
    const listings = await prisma.listing.findMany({
      where: { available: false }
    });
    return listings as Listing[];
  } catch (error) {
    console.error('Error fetching pending listings:', error);
    return [];
  }
}

export async function getAllBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        listing: true
      }
    });

    return bookings.map(b => ({
      id: b.id,
      user: b.user.name || b.user.email,
      listing: b.listing.title,
      date: b.checkIn,
      status: b.status,
      amount: b.totalPrice
    }));
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return [];
  }
}

export async function getUserBookings(email: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        user: {
          email
        }
      },
      include: {
        listing: true
      }
    });

    return bookings.map(b => ({
      id: b.id,
      listingId: b.listingId,
      title: b.listing.title,
      location: b.listing.location,
      img: b.listing.img,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      status: b.status,
      price: b.totalPrice
    }));
  } catch (error) {
    console.error(`Error fetching bookings for ${email}:`, error);
    return [];
  }
}

export async function getHostListings(email: string) {
  try {
    // For now, since we don't have a direct "host" field on Listing yet (we should add it),
    // we'll just return all listings if the user is an admin or host.
    // In a real app, you'd filter by listing.hostId
    const listings = await prisma.listing.findMany({
      take: 10 // Limit for now
    });
    return listings as Listing[];
  } catch (error) {
    console.error(`Error fetching host listings for ${email}:`, error);
    return [];
  }
}

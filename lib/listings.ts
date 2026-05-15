import { Listing } from '../types';
import { prisma } from './prisma';

export async function getListings(params?: { category?: string, location?: string, guests?: number }): Promise<Listing[]> {
  try {
    const { category, location, guests } = params || {};
    
    const where: any = {};
    
    if (category) {
      where.category = { equals: category };
    }
    
    if (location) {
      where.location = { contains: location };
    }
    
    const listings = await prisma.listing.findMany({
      where
    });
    
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
    const [totalUsers, totalListings, totalRevenueResult, activeBookings, hostCount] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count(),
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: 'CONFIRMED' }
      }),
      prisma.booking.count({
        where: { status: 'CONFIRMED' }
      }),
      prisma.user.count({
        where: { role: 'HOST' }
      })
    ]);

    return {
      totalUsers,
      totalListings,
      totalRevenue: totalRevenueResult._sum.totalPrice || 0,
      activeBookings,
      hostCount
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      totalListings: 0,
      totalRevenue: 0,
      activeBookings: 0,
      hostCount: 0
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
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return [];

    const listings = await prisma.listing.findMany({
      where: {
        userId: user.id
      }
    });
    return listings as Listing[];
  } catch (error) {
    console.error(`Error fetching host listings for ${email}:`, error);
    return [];
  }
}

export async function getHostStats(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { totalEarnings: 0, pendingPayout: 0, activeReservations: 0, totalReservations: 0 };

    const listings = await prisma.listing.findMany({
      where: { userId: user.id },
      select: { id: true }
    });
    
    const listingIds = listings.map(l => l.id);

    const [earningsResult, activeReservations, totalReservations] = await Promise.all([
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { listingId: { in: listingIds }, status: 'CONFIRMED' }
      }),
      prisma.booking.count({
        where: { listingId: { in: listingIds }, status: 'CONFIRMED' }
      }),
      prisma.booking.count({
        where: { listingId: { in: listingIds } }
      })
    ]);

    return {
      totalEarnings: earningsResult._sum.totalPrice || 0,
      pendingPayout: (earningsResult._sum.totalPrice || 0) * 0.15, // Commission/Tax mock
      activeReservations,
      totalReservations
    };
  } catch (error) {
    console.error('Error fetching host stats:', error);
    return { totalEarnings: 0, pendingPayout: 0, activeReservations: 0, totalReservations: 0 };
  }
}

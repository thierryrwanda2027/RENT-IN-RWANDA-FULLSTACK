import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import bcrypt from 'bcryptjs';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

const propertyImages = [
  "https://images.unsplash.com/photo-1580587767526-cf3671a05b63?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80&w=1200",
];

const baseListings = [
  {
    location: 'Nyarutarama, Kigali',
    rating: 4.95,
    superhost: true,
    available: true,
    availableFrom: '2025-06-01',
    category: 'city',
    description: 'Experience luxury in the heart of Kigali. This stunning villa features modern architecture, a spacious balcony with city views, and premium amenities.',
  },
  {
    location: 'Rubavu, Gisenyi',
    rating: 4.82,
    superhost: false,
    available: true,
    availableFrom: '2025-07-15',
    category: 'beach',
    description: 'A serene beachfront retreat overlooking Lake Kivu. Enjoy breathtaking sunsets, private beach access, and a tranquil atmosphere.',
  },
  {
    location: 'Musanze, Northern Province',
    rating: 4.98,
    superhost: true,
    available: false,
    availableFrom: '2025-08-20',
    category: 'mountain',
    description: 'Escape to the mountains in this contemporary cabin. Located near the Volcanoes National Park, it offers stunning views.',
  },
  {
    location: 'Rwamagana, Eastern Province',
    rating: 4.75,
    superhost: false,
    available: true,
    availableFrom: '2025-09-10',
    category: 'countryside',
    description: 'Discover the charm of the Rwandan countryside in this cozy farmhouse surrounded by rolling hills.',
  },
  {
    location: 'Kiyovu, Kigali',
    rating: 4.85,
    superhost: true,
    available: true,
    availableFrom: '2025-10-05',
    category: 'city',
    description: 'A stylish city apartment in the prestigious Kiyovu neighborhood. Modern interiors and top-notch security.',
  },
  {
    location: 'Rebero, Kigali',
    rating: 4.90,
    superhost: true,
    available: true,
    availableFrom: '2025-11-12',
    category: 'mountain',
    description: 'Spacious hillside residence with panoramic views of Kigali. Luxury with comfort.',
  },
];

const titles = [
  'Luxury Villa with Balcony',
  'Modern Beachfront Retreat',
  'Contemporary Mountain Cabin',
  'Cozy Countryside Farmhouse',
  'Beautiful City Apartment',
  'Spacious Hillside Residence',
];

async function main() {
  console.log('Seeding listings...');

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password', 12);

  // Create Users
  const admin = await prisma.user.create({
    data: {
      name: 'Thierry Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const guest = await prisma.user.create({
    data: {
      name: 'Thierry Guest',
      email: 'guest@example.com',
      password: hashedPassword,
      role: 'GUEST',
    },
  });

  const host = await prisma.user.create({
    data: {
      name: 'Thierry Host',
      email: 'host@example.com',
      password: hashedPassword,
      role: 'HOST',
    },
  });

  console.log('Users created:', { admin: admin.email, host: host.email, guest: guest.email });

  // Create Listings
  const listingsToCreate = Array.from({ length: 50 }, (_, i) => {
    const baseIndex = i % baseListings.length;
    const base = baseListings[baseIndex];
    
    return {
      title: titles[baseIndex] + (i > 5 ? ` #${i}` : ''),
      location: base.location,
      price: 95000 + (i % 5) * 25000 + (baseIndex * 10000),
      rating: base.rating,
      superhost: base.superhost,
      available: true,
      availableFrom: base.availableFrom,
      img: propertyImages[i % propertyImages.length], 
      category: base.category,
      description: base.description,
    };
  });

  const entries = Array.from(listingsToCreate.entries());
  for (const [index, l] of entries) {
    let userId = null;
    if (index < 5) userId = admin.id;
    else if (index < 15) userId = host.id;

    await prisma.listing.create({ 
      data: {
        ...l,
        userId
      } 
    });
  }

  console.log('50 listings seeded successfully (15 owned by hosts).');

  // Create a sample booking
  const firstListing = await prisma.listing.findFirst();
  if (firstListing && guest) {
    await prisma.booking.create({
      data: {
        listingId: firstListing.id,
        userId: guest.id,
        checkIn: "2025-06-10",
        checkOut: "2025-06-15",
        guests: 2,
        totalPrice: 1250000,
        status: "CONFIRMED",
      }
    });
    console.log('Sample booking created.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import bcrypt from 'bcryptjs';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const scrapedImages = [
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-05/WhatsApp%20Image%202026-05-05%20at%2011.44.36.jpeg?itok=GIzoR946",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-05/WhatsApp%20Image%202026-05-05%20at%2011.44.42%20%287%29.jpeg?itok=5y6PkD5r",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-05/WhatsApp%20Image%202026-05-05%20at%2011.44.42%20%289%29.jpeg?itok=aKzsfXht",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-05/WhatsApp%20Image%202026-05-05%20at%2011.44.41%20%283%29.jpeg?itok=N4A2Kjr1",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-05/WhatsApp%20Image%202026-05-05%20at%2011.44.42%20%286%29.jpeg?itok=wFBJY5hj",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-29%20at%2016.02.06.jpeg?itok=GoTaQmpd",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-29%20at%2016.02.20.jpeg?itok=bClX4eGZ",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-29%20at%2016.02.21%20%281%29.jpeg?itok=n2z0aB7A",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-29%20at%2016.02.21%20%282%29.jpeg?itok=hngv86S8",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-29%20at%2016.02.21%20%283%29.jpeg?itok=1UVIUuKl",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-10/75852762-d1ec-4a54-9b42-bffcbbb93f69.jpeg?itok=fsiWG7qW",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-10/07151d77-2be0-4933-bd8e-0e5e127a1734.jpg?itok=U5lM6m2S",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-10/3ef574e5-a149-4be8-a7fd-a9fd0110c8fd.jpg?itok=D1srcmhf",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-10/25511c8c-3e3b-4906-ac61-55ba8e490d4e.jpg?itok=vIa0GZFJ",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-10/a66da4c8-dfba-4170-b917-8f54f8553bb2.jpeg?itok=vxh1BGgB",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-22%20at%2014.46.21%20%281%29.jpeg?itok=S5cQtaA1",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-22%20at%2014.46.21%20%283%29.jpeg?itok=lZPfVJyX",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-22%20at%2014.46.21%20%282%29.jpeg?itok=_8BqCPyT",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-22%20at%2014.46.21_0.jpeg?itok=sfyJeAbf",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-22%20at%2014.46.35%20%285%29.jpeg?itok=GSguIDLH",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/Nile%201.jpg.jpeg?itok=W6s0piOq",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-11/Nile%201.jpg?itok=ucMPCA6L",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-11/Nile%202.jpg?itok=sITmVji4",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-11/Nile%203.jpg?itok=tRqSItFa",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2025-11/Nile%204.jpg?itok=SovPnHV9",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-16%20at%2016.14.43%20%287%29.jpeg?itok=8pvgPz9V",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-16%20at%2016.14.43%20%2810%29.jpeg?itok=qDP-tByy",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-16%20at%2016.14.43%20%285%29.jpeg?itok=iqcaLtDB",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-16%20at%2016.14.42%20%283%29.jpeg?itok=Z_uKtn3p",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-16%20at%2016.14.42%20%287%29.jpeg?itok=GvIMg9rC",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-06%20at%2013.16.38%20%281%29.jpeg?itok=x2DX61Bm",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-06%20at%2013.16.37%20%2815%29.jpeg?itok=WYoFP-J_",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-06%20at%2013.16.37%20%2810%29.jpeg?itok=o5yZ_bPC",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-06%20at%2013.16.37.jpeg?itok=Zrcbuxyu",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-06%20at%2013.16.36%20%285%29.jpeg?itok=DzZDm1HM",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-05%20at%2014.46.30.jpeg?itok=QKS-nj0-",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-05%20at%2014.46.30%20%282%29.jpeg?itok=h5k_dXOI",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-02%20at%2015.14.58%20%2822%29.jpeg?itok=AYx0OivB",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-02%20at%2015.14.58%20%2821%29.jpeg?itok=jD7DQgSW",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-03/WhatsApp%20Image%202026-03-02%20at%2015.14.58%20%283%29.jpeg?itok=D7rXoUo1",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-11%20at%207.03.14%20AM%20%282%29.jpeg?itok=raIiKewu",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-11%20at%207.03.14%20AM%20%282%29_0.jpeg?itok=L7bMZyVT",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-11%20at%207.03.15%20AM.jpeg?itok=g_HyCSVO",
  "https://www.houseinrwanda.com/sites/default/files/styles/advert_teaser/public/advert_photos/2026-04/WhatsApp%20Image%202026-04-11%20at%207.03.09%20AM%20%281%29.jpeg?itok=nuU6C2Gc"
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
      name: 'Thierry User',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'GUEST',
    },
  });

  console.log('Users created:', { admin: admin.email, guest: guest.email });

  // Create Listings
  const listingsToCreate = Array.from({ length: 50 }, (_, i) => {
    const baseIndex = i % baseListings.length;
    const base = baseListings[baseIndex];
    
    return {
      title: titles[baseIndex],
      location: base.location,
      price: 95000 + (i % 5) * 25000 + (baseIndex * 10000),
      rating: base.rating,
      superhost: base.superhost,
      available: i !== 2, // Make one unavailable
      availableFrom: base.availableFrom,
      img: scrapedImages[i % scrapedImages.length], // Use only high-quality scraped images
      category: base.category,
      description: base.description,
    };
  });

  const entries = Array.from(listingsToCreate.entries());
  for (const [index, l] of entries) {
    await prisma.listing.create({ 
      data: {
        ...l,
        userId: index < 5 ? admin.id : null // First 5 listings owned by admin
      } 
    });
  }

  console.log('50 listings seeded successfully.');

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

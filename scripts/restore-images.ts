import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

const originalUrls = [
  "https://images.unsplash.com/photo-1580587767526-cf3671a05b63?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=1200",
  "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&q=80&w=1200",
];

async function main() {
  console.log("🔄 Restoring original images...");
  
  for (let i = 0; i < originalUrls.length; i++) {
    const id = i + 1;
    await prisma.listing.update({
      where: { id },
      data: { img: originalUrls[i] },
    });
    console.log(`✅ Restored ID ${id}`);
  }

  console.log("🏁 Restoration complete.");
  await prisma.$disconnect();
}

main();

import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

async function main() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const prisma = new PrismaClient({ adapter });

  console.log("Checking tables...");
  const tables = await prisma.$queryRawUnsafe(`SELECT name FROM sqlite_master WHERE type='table'`);
  console.log("Tables found:", JSON.stringify(tables, null, 2));

  await prisma.$disconnect();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

async function main() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const prisma = new PrismaClient({ adapter });

  console.log("Creating User table...");
  await prisma.$executeRawUnsafe(`CREATE TABLE "User" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT, "email" TEXT, "password" TEXT, "emailVerified" DATETIME, "image" TEXT, "role" TEXT NOT NULL DEFAULT 'GUEST')`);
  
  console.log("Adding unique index on User email...");
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "User_email_key" ON "User"("email")`);

  console.log("User table created successfully!");
  await prisma.$disconnect();
}

main().catch(console.error);

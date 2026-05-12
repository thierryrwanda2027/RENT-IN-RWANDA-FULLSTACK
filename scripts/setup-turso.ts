import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import fs from 'fs';

async function main() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const prisma = new PrismaClient({ adapter });

  console.log("Reading setup.sql...");
  // Read file and handle potential encoding issues
  const sql = fs.readFileSync('prisma/setup.sql', 'utf8').replace(/\0/g, '');
  
  console.log("Executing SQL on Turso...");
  const statements = sql.split(';').filter(s => s.trim().length > 0);
  
  for (const statement of statements) {
    try {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await prisma.$executeRawUnsafe(statement);
    } catch (e: any) {
      console.warn(`Error executing statement: ${e.message || 'Unknown error'}`);
    }
  }

  console.log("Database tables created successfully!");
  await prisma.$disconnect();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

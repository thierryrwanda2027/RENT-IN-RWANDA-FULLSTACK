import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

import { createClient } from '@libsql/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if we are in a server environment
const isServer = typeof window === 'undefined';

let prismaInstance: PrismaClient;

if (isServer) {
  const libsqlClient = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const adapter = new PrismaLibSql(libsqlClient);
  prismaInstance = new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
} else {
  // Client-side should ideally not use prisma directly, but we provide a placeholder
  prismaInstance = null as any;
}

export const prisma = globalForPrisma.prisma ?? prismaInstance;

if (process.env.NODE_ENV !== 'production' && isServer) globalForPrisma.prisma = prisma;

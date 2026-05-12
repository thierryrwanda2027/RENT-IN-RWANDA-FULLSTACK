/**
 * Global Configuration
 * WHAT: Centralized environment variable access.
 * WHY: Prevents 'import.meta.env' leaks across the codebase and provides type safety.
 */

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  appName: 'THIERRY BNB',
} as const;

// Type checking to ensure we don't accidentally use invalid keys
export type AppConfig = typeof config;

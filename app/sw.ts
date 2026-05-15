import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

import { Serwist, BackgroundSyncPlugin, NetworkOnly, CacheFirst, StaleWhileRevalidate, ExpirationPlugin } from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (string | PrecacheEntry)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      // Background Sync for Booking Forms (including Server Actions)
      matcher: ({ request, url }) => 
        url.pathname.includes("/api/bookings") || 
        url.pathname.includes("/api/checkout") ||
        (request.method === "POST" && request.headers.has("next-action")),
      handler: new NetworkOnly({
        plugins: [
          new BackgroundSyncPlugin("booking-queue", {
            maxRetentionTime: 24 * 60, // Retry for up to 24 hours
          }),
        ],
      }),
    },
    {
      // Image Variant Caching Strategy (Airbnb-style)
      matcher: ({ url }) => 
        url.hostname.includes("unsplash.com") || 
        url.hostname.includes("houseinrwanda.com") ||
        url.hostname.includes("pravatar.cc"),
      handler: new CacheFirst({
        cacheName: "thierry-bnb-images",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          })
        ]
      }),
    },
    {
      // App Shell / Generic Skeleton caching
      matcher: ({ url }) => url.pathname === "/app-shell",
      handler: new StaleWhileRevalidate({
        cacheName: "thierry-bnb-shell",
      }),
    },
    {
      // Listing Detail Skeleton
      matcher: ({ url }) => url.pathname === "/listings/skeleton",
      handler: new StaleWhileRevalidate({
        cacheName: "thierry-bnb-listing-shell",
      }),
    },
    {
      // Default StaleWhileRevalidate for other same-origin requests
      matcher: ({ url }) => url.origin === (self as any).location.origin,
      handler: new StaleWhileRevalidate({
        cacheName: "thierry-bnb-default",
      }),
    },
  ],
  fallbacks: {
    entries: [
      {
        url: "/listings/skeleton",
        matcher: ({ request }) => 
          request.mode === "navigate" && new URL(request.url).pathname.startsWith("/listings/"),
      },
      {
        url: "/app-shell",
        matcher: ({ request }) => request.mode === "navigate",
      },
      {
        url: "/favicon.png",
        matcher: ({ request }) => request.destination === "image",
      },
    ],
  },
});


serwist.addEventListeners();




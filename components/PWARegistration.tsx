"use client";

import { useEffect } from "react";

export default function PWARegistration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.serwist !== undefined
    ) {
      window.serwist.register();
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    serwist: any;
  }
}

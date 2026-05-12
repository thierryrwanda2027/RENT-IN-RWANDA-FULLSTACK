"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b h-20 flex items-center bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-rose-500 font-bold text-2xl tracking-tighter hover:opacity-90 transition-opacity">
          thierry bnb
        </Link>
        
        <div className="flex items-center gap-8 font-medium text-sm">
          <Link href="/listings" className="hover:text-rose-500 transition-colors">Stays</Link>
          
          {session ? (
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="hover:text-rose-500 transition-colors">Dashboard</Link>
              {(session.user as any).role === 'ADMIN' && (
                <Link href="/admin" className="hover:text-rose-500 transition-colors text-blue-600">Admin</Link>
              )}
              {(session.user as any).role === 'HOST' && (
                <Link href="/host" className="hover:text-rose-500 transition-colors text-green-600">Hosting</Link>
              )}
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

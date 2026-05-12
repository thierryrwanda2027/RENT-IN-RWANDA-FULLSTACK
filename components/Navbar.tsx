"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FaUserCircle, FaBars, FaSearch } from "react-icons/fa";

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-rose-500 p-1.5 rounded-lg transition-transform group-hover:scale-110">
            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1L1 12h3v17h10v-8h4v8h10V12h3L16 1z"/>
            </svg>
          </div>
          <span className="text-rose-500 font-bold text-xl tracking-tighter hidden md:block">
            thierry bnb
          </span>
        </Link>

        {/* Search Bar - Center */}
        <div className="hidden sm:flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer gap-4">
          <button className="font-semibold text-sm px-2">Anywhere</button>
          <div className="h-6 w-px bg-gray-300" />
          <button className="font-semibold text-sm px-2">Any week</button>
          <div className="h-6 w-px bg-gray-300" />
          <button className="text-gray-500 text-sm px-2">Add guests</button>
          <div className="bg-rose-500 p-2 rounded-full text-white">
            <FaSearch size={12} />
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <Link href="/host" className="hidden lg:block text-sm font-semibold hover:bg-gray-100 px-4 py-3 rounded-full transition">
            Airbnb your home
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 border rounded-full p-2 hover:shadow-md transition"
            >
              <FaBars className="ml-1 text-gray-600" />
              <FaUserCircle className="text-gray-500 text-3xl" />
              {session && <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full" />}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                {!session ? (
                  <>
                    <Link href="/login" className="block px-4 py-3 text-sm font-bold hover:bg-gray-50">Log in</Link>
                    <Link href="/login" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 border-b">Sign up</Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Logged in as</p>
                      <p className="font-bold truncate">{session.user?.name || session.user?.email}</p>
                    </div>
                    <Link href="/dashboard" className="block px-4 py-3 text-sm hover:bg-gray-50">Trips</Link>
                    <Link href="/dashboard" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Account</Link>
                  </>
                )}
                
                <Link href="/host" className="block px-4 py-3 text-sm hover:bg-gray-50">Airbnb your home</Link>
                <Link href="/listings" className="block px-4 py-3 text-sm hover:bg-gray-50 border-b">Help Center</Link>
                
                {session && (
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-rose-500 font-semibold"
                  >
                    Log out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

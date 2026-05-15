"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBars, FaSearch, FaGlobe, FaMapMarkerAlt, FaPlane, FaUtensils, FaPlus, FaMinus } from "react-icons/fa";
import Logo from "./Logo";

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('homes');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search/menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (guests > 1) params.set("guests", guests.toString());
    
    setIsSearchExpanded(false);
    setActiveDropdown(null);
    router.push(`/?${params.toString()}`);
  };

  return (
    <nav className={`border-b bg-white sticky top-0 z-50 transition-all duration-300 ${isSearchExpanded ? 'pb-24 pt-4' : 'py-4'} shadow-sm`}>
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          </Link>

          {/* Collapsed/Expanded Search Toggle Area */}
          <div ref={searchRef} className="absolute left-1/2 -translate-x-1/2 w-full max-w-[850px] flex flex-col items-center">
            {/* Category Toggle (Only visible when expanded) */}
            {isSearchExpanded && (
              <div className="flex items-center gap-8 mb-4">
                <button 
                  onClick={() => setActiveSearchTab('homes')}
                  className={`text-sm font-medium transition-all relative py-2 ${activeSearchTab === 'homes' ? 'text-zinc-900 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  Homes
                </button>
                <button 
                  onClick={() => setActiveSearchTab('experiences')}
                  className={`text-sm font-medium transition-all relative py-2 flex items-center gap-1 ${activeSearchTab === 'experiences' ? 'text-zinc-900 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  Experiences <span className="text-[10px] bg-rose-100 text-rose-500 px-1 rounded uppercase font-bold">New</span>
                </button>
                <button 
                  onClick={() => setActiveSearchTab('services')}
                  className={`text-sm font-medium transition-all relative py-2 flex items-center gap-1 ${activeSearchTab === 'services' ? 'text-zinc-900 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  Services <span className="text-[10px] bg-rose-100 text-rose-500 px-1 rounded uppercase font-bold">New</span>
                </button>
              </div>
            )}

            {!isSearchExpanded ? (
              <div 
                onClick={() => setIsSearchExpanded(true)}
                className="flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer gap-4 bg-white"
              >
                <button className="font-semibold text-sm px-2 text-zinc-900">Anywhere</button>
                <div className="h-6 w-px bg-zinc-200" />
                <button className="font-semibold text-sm px-2 text-zinc-900">Any week</button>
                <div className="h-6 w-px bg-zinc-200" />
                <button className="text-zinc-400 text-sm px-2">Add guests</button>
                <div className="bg-rose-500 p-2 rounded-full text-white">
                  <FaSearch size={12} />
                </div>
              </div>
            ) : (
              <div className="w-full bg-zinc-100 border border-zinc-200 rounded-full flex items-center shadow-xl relative overflow-visible">
                {/* Where */}
                <div 
                  onClick={() => setActiveDropdown('where')}
                  className={`flex-1 px-8 py-3 rounded-full cursor-pointer transition-all ${activeDropdown === 'where' ? 'bg-white shadow-lg' : 'hover:bg-zinc-200'}`}
                >
                  <p className="text-[10px] font-extrabold uppercase text-zinc-900 tracking-wider">Where</p>
                  <input 
                    type="text" 
                    placeholder="Search destinations" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-sm w-full outline-none text-zinc-900 placeholder:text-zinc-400"
                  />
                  {activeDropdown === 'where' && (
                    <div className="absolute left-0 top-[110%] w-[400px] bg-white border border-zinc-200 rounded-3xl shadow-2xl p-6 animate-in fade-in slide-in-from-top-2">
                      <p className="text-xs font-bold text-zinc-900 mb-4">Suggested destinations</p>
                      <div className="space-y-4">
                        {[
                          { name: 'Nearby', sub: "Find what's around you", icon: <FaMapMarkerAlt className="text-blue-500" /> },
                          { name: 'Paris, France', sub: "For sights like Eiffel Tower", icon: <FaPlane className="text-zinc-700" /> },
                          { name: 'London, United Kingdom', sub: "For its bustling nightlife", icon: <FaGlobe className="text-zinc-700" /> },
                          { name: 'Barcelona, Spain', sub: "Popular beach destination", icon: <FaUtensils className="text-rose-500" /> },
                        ].map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-4 p-2 hover:bg-zinc-100 rounded-xl transition cursor-pointer"
                            onClick={() => {
                              setLocation(item.name.split(',')[0]);
                              setActiveDropdown('when');
                            }}
                          >
                            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-xl">
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
                              <p className="text-xs text-zinc-500">{item.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-8 w-px bg-zinc-300" />

                {/* When */}
                <div 
                  onClick={() => setActiveDropdown('when')}
                  className={`flex-1 px-8 py-3 rounded-full cursor-pointer transition-all ${activeDropdown === 'when' ? 'bg-white shadow-lg' : 'hover:bg-zinc-200'}`}
                >
                  <p className="text-[10px] font-extrabold uppercase text-zinc-900 tracking-wider">When</p>
                  <p className="text-sm text-zinc-400">Add dates</p>
                  {activeDropdown === 'when' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[110%] w-[800px] bg-white border border-zinc-200 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-top-2 flex gap-8">
                       {/* Mock Calendar View */}
                       <div className="flex-1">
                         <p className="text-sm font-bold text-center mb-4">May 2026</p>
                         <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-zinc-400 uppercase">
                           <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                         </div>
                         <div className="grid grid-cols-7 gap-2 mt-4 text-sm">
                           {Array.from({length: 31}).map((_, i) => (
                             <span key={i} className="h-10 w-10 flex items-center justify-center rounded-full hover:border border-zinc-900 cursor-pointer">{i + 1}</span>
                           ))}
                         </div>
                       </div>
                       <div className="flex-1">
                         <p className="text-sm font-bold text-center mb-4">June 2026</p>
                         <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-zinc-400 uppercase">
                           <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                         </div>
                         <div className="grid grid-cols-7 gap-2 mt-4 text-sm">
                           {Array.from({length: 30}).map((_, i) => (
                             <span key={i} className="h-10 w-10 flex items-center justify-center rounded-full hover:border border-zinc-900 cursor-pointer">{i + 1}</span>
                           ))}
                         </div>
                       </div>
                    </div>
                  )}
                </div>

                <div className="h-8 w-px bg-zinc-300" />

                {/* Who */}
                <div 
                  onClick={() => setActiveDropdown('who')}
                  className={`flex-1 pl-8 pr-4 py-3 rounded-full cursor-pointer transition-all flex items-center justify-between ${activeDropdown === 'who' ? 'bg-white shadow-lg' : 'hover:bg-zinc-200'}`}
                >
                  <div className="flex-1">
                    <p className="text-[10px] font-extrabold uppercase text-zinc-900 tracking-wider">Who</p>
                    <p className="text-sm text-zinc-400">{guests > 0 ? `${guests} guest${guests > 1 ? 's' : ''}` : 'Add guests'}</p>
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                    className="bg-rose-500 p-4 rounded-full text-white hover:bg-rose-600 transition flex items-center gap-2"
                  >
                    <FaSearch size={16} />
                    <span className="font-bold text-sm pr-2">Search</span>
                  </div>
                  {activeDropdown === 'who' && (
                    <div className="absolute right-0 top-[110%] w-[400px] bg-white border border-zinc-200 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-top-2">
                      {[
                        { title: 'Adults', sub: 'Ages 13 or above' },
                        { title: 'Children', sub: 'Ages 2 – 12' },
                        { title: 'Infants', sub: 'Under 2' },
                        { title: 'Pets', sub: 'Bringing a service animal?', link: true },
                      ].map((item, idx) => (
                        <div key={idx} className={`flex items-center justify-between py-4 ${idx !== 3 ? 'border-b border-zinc-100' : ''}`}>
                          <div>
                            <p className="font-bold text-zinc-900 text-sm">{item.title}</p>
                            <p className={`text-xs ${item.link ? 'underline font-medium cursor-pointer' : 'text-zinc-500'}`}>{item.sub}</p>
                          </div>
                          {!item.link && (
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900"
                              >
                                <FaMinus size={10} />
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{guests}</span>
                              <button 
                                onClick={() => setGuests(guests + 1)}
                                className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-1 md:gap-4 shrink-0">
            <Link href="/host" className="hidden lg:block text-sm font-bold hover:bg-zinc-100 px-4 py-3 rounded-full transition text-zinc-900">
              RENT IN RWANDA your home
            </Link>
            <div className="p-3 hover:bg-zinc-100 rounded-full cursor-pointer transition text-zinc-900 hidden md:block">
              <FaGlobe size={16} />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 border border-zinc-300 rounded-full p-2 hover:shadow-md transition bg-white"
              >
                <FaBars className="ml-1 text-zinc-600" />
                <FaUserCircle className="text-zinc-400 text-3xl" />
                {session && <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full" />}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-zinc-200 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                  {!session ? (
                    <div className="py-2">
                      <Link href="/login" className="block px-4 py-3 text-sm font-bold text-zinc-900 hover:bg-zinc-50">Log in</Link>
                      <Link href="/login?register=true" className="block px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50 border-b border-zinc-100">Sign up</Link>
                      <div className="py-2">
                        <Link href="/host" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">RENT IN RWANDA your home</Link>
                        <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Help Center</Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="py-2 border-b border-zinc-100">
                        <Link href="/dashboard" className="block px-4 py-3 text-sm font-bold text-zinc-900 hover:bg-zinc-50">Trips</Link>
                        <Link href="#" className="block px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50">Wishlists</Link>
                      </div>
                      <div className="py-2 border-b border-zinc-100">
                        <Link href="/host" className="block px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50">Manage listings</Link>
                        {session.user.role === 'ADMIN' && (
                          <Link href="/admin" className="block px-4 py-3 text-sm font-bold text-rose-500 hover:bg-zinc-50">Admin Dashboard</Link>
                        )}
                        <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Account settings</Link>
                      </div>
                      <div className="py-2 border-b border-zinc-100">
                        <Link href="/host" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">RENT IN RWANDA your home</Link>
                        <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Help Center</Link>
                      </div>
                      <div className="py-2">
                        <button 
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-50 text-zinc-900"
                        >
                          Log out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

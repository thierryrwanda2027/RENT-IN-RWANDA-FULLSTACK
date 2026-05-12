"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBars, FaSearch, FaGlobe, FaMapMarkerAlt, FaPlane, FaUtensils, FaPlus, FaMinus } from "react-icons/fa";

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('homes');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <nav className={`border-b bg-white sticky top-0 z-50 transition-all duration-300 ${isSearchExpanded ? 'pb-24 pt-4' : 'py-4'} shadow-sm`}>
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-rose-500 p-1.5 rounded-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1L1 12h3v17h10v-8h4v8h10V12h3L16 1z"/>
              </svg>
            </div>
            <span className="text-rose-500 font-bold text-xl tracking-tighter hidden md:block">
              thierry bnb
            </span>
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
                          <div key={idx} className="flex items-center gap-4 p-2 hover:bg-zinc-100 rounded-xl transition cursor-pointer">
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
                    <p className="text-sm text-zinc-400">Add guests</p>
                  </div>
                  <div className="bg-rose-500 p-4 rounded-full text-white hover:bg-rose-600 transition flex items-center gap-2">
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
                              <button className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900"><FaMinus size={10} /></button>
                              <span className="text-sm font-medium w-4 text-center">0</span>
                              <button className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900"><FaPlus size={10} /></button>
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
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/host" className="hidden lg:block text-sm font-semibold hover:bg-zinc-100 px-4 py-3 rounded-full transition text-zinc-900">
              Become a host
            </Link>
            <div className="p-3 hover:bg-zinc-100 rounded-full cursor-pointer transition text-zinc-900">
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
                  <div className="py-2 border-b border-zinc-100">
                    <Link href="#" className="block px-4 py-3 text-sm font-bold text-zinc-900 hover:bg-zinc-50">Wishlists</Link>
                    <Link href="/dashboard" className="block px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50">Trips</Link>
                    <Link href="#" className="block px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50">Messages</Link>
                    <Link href="#" className="block px-4 py-3 text-sm text-zinc-900 hover:bg-zinc-50">Profile</Link>
                  </div>
                  <div className="py-2 border-b border-zinc-100">
                    <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Account settings</Link>
                    <div className="flex items-center justify-between px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 cursor-pointer">
                      <div className="flex items-center gap-3"><FaGlobe /> <span>Languages & currency</span></div>
                    </div>
                    <Link href="/listings" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Help Center</Link>
                  </div>
                  <div className="px-4 py-4 bg-zinc-50 flex items-center justify-between group cursor-pointer border-b border-zinc-100">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">Become a host</p>
                      <p className="text-[11px] text-zinc-500 max-w-[150px]">It's easy to start hosting and earn extra income.</p>
                    </div>
                    <img src="https://a0.muscache.com/pictures/b4317891-b361-4686-acc2-acc1de473062.jpg" alt="Host" className="w-10 h-10 object-cover rounded-md group-hover:scale-105 transition" />
                  </div>
                  <div className="py-2">
                    <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Refer a Host</Link>
                    <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50">Find a co-host</Link>
                    <Link href="#" className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 border-b border-zinc-100 pb-4">Gift cards</Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-50 text-zinc-900 pt-4"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

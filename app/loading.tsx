"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-zinc-100 border-t-rose-500 animate-spin"></div>
        
        {/* Inner Logo/Icon Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-rose-500 rounded-full animate-pulse shadow-lg shadow-rose-200"></div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-zinc-900 font-bold text-lg tracking-tight">Thierry BNB</h2>
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em] mt-1 animate-pulse">
          Fetching Rwandan Homes...
        </p>
      </div>
      
      {/* Skeleton-like progress bar */}
      <div className="w-48 h-1 bg-zinc-100 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-rose-500 w-1/2 animate-infinite-slide rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes infinite-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-infinite-slide {
          animation: infinite-slide 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

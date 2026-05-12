"use client";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-10 py-8">
      {/* Category Bar Skeleton */}
      <div className="flex gap-8 mb-10 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
            <div className="w-6 h-6 bg-zinc-100 rounded-full animate-pulse"></div>
            <div className="w-12 h-2 bg-zinc-50 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Property Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="group cursor-pointer">
            {/* Image Skeleton */}
            <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-zinc-200 animate-shimmer">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer-slide"></div>
            </div>

            {/* Content Skeleton */}
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-zinc-200 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-zinc-200 rounded w-10 animate-pulse"></div>
              </div>
              <div className="h-3 bg-zinc-100 rounded w-1/2 animate-pulse"></div>
              <div className="h-3 bg-zinc-100 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-zinc-200 rounded w-1/4 mt-2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer-slide {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-slide {
          animation: shimmer-slide 1.5s infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #f4f4f5 25%, #e4e4e7 50%, #f4f4f5 75%);
          background-size: 200% 100%;
          animation: shimmer-bg 1.5s infinite;
        }
        @keyframes shimmer-bg {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

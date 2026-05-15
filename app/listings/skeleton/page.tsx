"use client";

export default function ListingSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-10 py-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Title and Action Buttons Skeleton */}
        <div className="mb-6 space-y-4">
          <div className="h-8 bg-zinc-200 rounded-lg w-1/3 animate-pulse"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-zinc-100 rounded w-1/4 animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-8 w-20 bg-zinc-100 rounded-lg animate-pulse"></div>
              <div className="h-8 w-20 bg-zinc-100 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Image Gallery Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12">
          <div className="md:col-span-2 md:row-span-2 bg-zinc-200 animate-shimmer relative overflow-hidden"></div>
          <div className="hidden md:block bg-zinc-100 animate-pulse"></div>
          <div className="hidden md:block bg-zinc-100 animate-pulse"></div>
          <div className="hidden md:block bg-zinc-100 animate-pulse"></div>
          <div className="hidden md:block bg-zinc-100 animate-pulse"></div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-8">
            <div className="flex justify-between items-center border-b pb-8">
              <div className="space-y-2">
                <div className="h-6 bg-zinc-200 rounded w-64 animate-pulse"></div>
                <div className="h-4 bg-zinc-100 rounded w-48 animate-pulse"></div>
              </div>
              <div className="w-14 h-14 bg-zinc-100 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-6 border-b pb-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-zinc-100 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-200 rounded w-40 animate-pulse"></div>
                    <div className="h-3 bg-zinc-100 rounded w-64 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-zinc-100 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-zinc-100 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-zinc-100 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="relative">
            <div className="sticky top-28 border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-zinc-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-zinc-100 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-12 bg-zinc-100 rounded-xl animate-pulse w-full"></div>
              <div className="h-10 bg-[#00A1DE]/20 rounded-xl animate-pulse w-full"></div>
              <div className="space-y-3 pt-4 border-t">
                <div className="h-3 bg-zinc-100 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-zinc-100 rounded w-full animate-pulse"></div>
                <div className="h-5 bg-zinc-200 rounded w-full animate-pulse mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

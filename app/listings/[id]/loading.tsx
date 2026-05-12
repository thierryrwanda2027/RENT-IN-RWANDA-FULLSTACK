export default function ListingLoading() {
  return (
    <div className="container mx-auto px-4 md:px-10 py-8 animate-pulse">
      {/* Title & Stats Skeleton */}
      <div className="h-8 bg-zinc-200 rounded-lg w-1/3 mb-4"></div>
      <div className="flex gap-4 mb-6">
        <div className="h-4 bg-zinc-100 rounded w-24"></div>
        <div className="h-4 bg-zinc-100 rounded w-24"></div>
      </div>

      {/* Image Gallery Skeleton */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden mb-8">
        <div className="col-span-2 row-span-2 bg-zinc-200"></div>
        <div className="bg-zinc-100"></div>
        <div className="bg-zinc-100"></div>
        <div className="bg-zinc-100"></div>
        <div className="bg-zinc-100"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Host Info Skeleton */}
          <div className="flex justify-between items-center py-6 border-b border-zinc-100 mb-8">
            <div className="space-y-2">
              <div className="h-6 bg-zinc-200 rounded w-48"></div>
              <div className="h-4 bg-zinc-100 rounded w-32"></div>
            </div>
            <div className="w-14 h-14 bg-zinc-200 rounded-full"></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-4 bg-zinc-100 rounded w-full"></div>
            <div className="h-4 bg-zinc-100 rounded w-full"></div>
            <div className="h-4 bg-zinc-100 rounded w-2/3"></div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="relative">
          <div className="sticky top-28 h-96 border border-zinc-200 rounded-2xl p-6 shadow-sm bg-white">
            <div className="h-8 bg-zinc-200 rounded w-1/2 mb-8"></div>
            <div className="h-48 bg-zinc-100 rounded-xl mb-6"></div>
            <div className="h-12 bg-zinc-200 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
